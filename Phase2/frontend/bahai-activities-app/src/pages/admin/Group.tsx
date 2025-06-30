import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';

import { useGroups } from '../../hooks/useGroups';
import { useIndividuals } from '../../hooks/useIndividuals';

import { AdminLabels } from '../../constants/adminLabels';

import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import CustomDialog from '../../components/CustomDialog';
import FamilyMemberPicker from '../../components/FamilyMemberPicker';
import ActionTableButtons from '../../components/ActionTableButtons';
import CustomConfirmDialog from '../../components/CustomConfirmDialog';

import type { GroupItem } from '../../services/groupService';
import type { IndividualItem } from '../../services/individualService';
import { findGroupTypeById } from '../../services/groupTypeService';

const Group = () => {
    const toast = useRef<Toast>(null);
    const { id } = useParams<{ id: string }>();
    const groupTypeId = Number(id);

    const {
        error,
        loading,
        groups,
        handleSave,
        handleDelete,
        dialogVisible,
        setDialogVisible,
    } = useGroups(groupTypeId);

    const { individuals } = useIndividuals();

    const [formTouched, setFormTouched] = useState(false);
    const [groupTypeName, setGroupTypeName] = useState('');
    const [expandedRows, setExpandedRows] = useState<any[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<GroupItem | null>(null);
    const [availableIndividuals, setAvailableIndividuals] = useState<IndividualItem[]>([]);
    const [selectedIndividuals, setSelectedIndividuals] = useState<IndividualItem[]>([]);

    // 👇 Confirm dialog states
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<GroupItem | null>(null);

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        groupName: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        const fetchGroupTypeName = async () => {
            if (groupTypeId) {
                const data = await findGroupTypeById(groupTypeId);
                if (data) setGroupTypeName(data.name);
            }
        };
        fetchGroupTypeName();
    }, [groupTypeId]);

    const openNewGroupDlg = () => {
        setSelectedGroup({
            id: 0,
            name: '',
            groupType: {
                id: groupTypeId,
                name: groupTypeName
            },
            personIds: [],
            members: []
        });
        setFormTouched(false);
        setDialogVisible(true);
    };

    const handleSaveWithValidation = () => {
        setFormTouched(true);
        if (!selectedGroup) return;

        const { name } = selectedGroup;

        if (!name) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: 'Por favor completa todos los campos marcados.',
                life: 4000
            });
            return;
        }

        selectedGroup.personIds = selectedIndividuals.map(ind => ind.id);

        handleSave(selectedGroup);
        setDialogVisible(false);
        setFormTouched(false);
        setSelectedIndividuals([]);
    };

    const headerTemplate = (data: any) => {
        const group = groups.find(g => g.name === data.groupName);
        return (
            <div className='flex justify-between items-center w-full pr-4'>
                <span className='ml-2 font-semibold text-base flex items-center gap-2'>
                    {data.groupName}
                </span>
                <ActionTableButtons
                    onEdit={() => {
                        if (group) {
                            setSelectedGroup({
                                id: group.id,
                                name: group.name,
                                groupType: {
                                    id: groupTypeId,
                                    name: groupTypeName
                                },
                                personIds: [],
                                members: group.members ?? []
                            });
                            setSelectedIndividuals(group.members ?? []);
                            setDialogVisible(true);
                        }
                    }}
                    onDelete={() => {
                        setGroupToDelete(group ?? null);
                        setConfirmVisible(true);
                    }}
                    showViewEventsButton={false}
                />
            </div>
        );
    };

    const handleDialogClose = () => {
        setDialogVisible(false);
        setSelectedIndividuals([]);
        setAvailableIndividuals(individuals);
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters({
            groupName: { value, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className='flex justify-end'>
            <IconField iconPosition='left'>
                <InputIcon className='pi pi-search' />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Buscar' />
            </IconField>
        </div>
    );

    const members = groups.flatMap(group =>
        group.members?.map(m => ({
            ...m,
            groupName: group.name
        })) ?? []
    );

    return (
        <>
            <Toast ref={toast} />
            <PageHeader title={AdminLabels.GROUP_TYPES} onNewClick={openNewGroupDlg} />

            {error && <div className='text-red-600 font-semibold mb-4 p-2'>{error}</div>}

            <DataTable
                sortOrder={1}
                header={renderHeader()}
                filters={filters}
                sortMode='single'
                // expandableRowGroups
                sortField='groupName'
                rowGroupMode='subheader'
                groupRowsBy='groupName'
                expandedRows={expandedRows}
                value={members}
                rowGroupHeaderTemplate={headerTemplate}
                onRowToggle={(e) => setExpandedRows(e.data)}>
                <Column field='firstName' header='Nombre' />
                <Column field='lastName' header='Apellido' />
                <Column field='phone' header='Télefono' sortable />
                <Column field='email' header='Correo Electrónico' sortable />
                <Column field='ageGroup' header='Grupo Etario' sortable />
            </DataTable>

            <CustomDialog
                maximizable={true}
                visible={dialogVisible}
                header='Detalles del Grupo'
                onHide={handleDialogClose}
                onSave={handleSaveWithValidation}
                width='w-[85rem]'>

                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='name' className='text-sm font-semibold text-gray-600'>
                        Nombre del Grupo {groupTypeName}<span className='text-red-500'>*</span>
                    </label>
                    <InputText
                        id='name'
                        value={selectedGroup?.name || ''}
                        onChange={(e) => setSelectedGroup({ ...selectedGroup!, name: e.target.value })}
                        required />
                    {formTouched && !selectedGroup?.name && (
                        <small className='text-red-500'>Este campo es obligatorio.</small>
                    )}
                </div>

                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-sm font-semibold text-gray-600'>Seleccione a los Integrantes del Grupo {groupTypeName}</label>
                    <div className='flex w-full'>
                        <FamilyMemberPicker
                            source={individuals}
                            target={selectedIndividuals}
                            onChange={(event) => {
                                setAvailableIndividuals(event.source);
                                setSelectedIndividuals(event.target);
                            }}
                        />
                    </div>
                </div>
            </CustomDialog>

            {/* 👇 Confirm dialog */}
            <CustomConfirmDialog
                visible={confirmVisible}
                itemName={`el grupo "${groupToDelete?.name}"`}
                onCancel={() => {
                    setConfirmVisible(false);
                    setGroupToDelete(null);
                }}
                onConfirm={() => {
                    if (groupToDelete) {
                        handleDelete(groupToDelete.id);
                        toast.current?.show({
                            severity: 'info',
                            summary: 'Grupo eliminado',
                            detail: `"${groupToDelete.name}" ha sido eliminado.`,
                            life: 3000
                        });
                    }
                    setConfirmVisible(false);
                    setGroupToDelete(null);
                }}
            />

            <Spinner loading={loading} />
        </>
    );
};

export default Group;