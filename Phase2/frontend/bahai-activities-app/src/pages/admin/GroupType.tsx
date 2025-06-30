import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';

import { useGroupTypes } from '../../hooks/useGroupTypes';
import { AdminLabels } from '../../constants/adminLabels';

import type { GroupTypeItem } from '../../services/groupTypeService';

import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import CustomDialog from '../../components/CustomDialog';
import ActionTableButtons from '../../components/ActionTableButtons';
import CustomConfirmDialog from '../../components/CustomConfirmDialog';

const GroupType = () => {
    
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const {
        error,
        loading,
        handleSave,
        groupTypes,
        handleDelete,
        dialogVisible,
        setDialogVisible,
    } = useGroupTypes();

    const [formTouched, setFormTouched] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedGroupType, setSelectedGroupType] = useState<GroupTypeItem | null>(null);
    const [eventTypeItemToDelete, setEventTypeItemToDelete] = useState<GroupTypeItem | null>(null);

    const openNewGroupTypeDlg = () => {
        setSelectedGroupType({ id: 0, name: '' });
        setFormTouched(false);
        setDialogVisible(true);
    };

    const handleEdit = (groupType: GroupTypeItem) => {
        setSelectedGroupType({ ...groupType });
        setDialogVisible(true);
    };

    const handleSaveWithValidation = () => {
        setFormTouched(true);
        if (!selectedGroupType) return;

        const { name } = selectedGroupType;

        if (!name) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: 'Por favor completa todos los campos marcados.',
                life: 4000
            });
            return;
        }

        handleSave(selectedGroupType);
        setDialogVisible(false);
        setFormTouched(false);
    };

    const actionBodyTemplate = (rowData: GroupTypeItem) => (
        <ActionTableButtons
            onEdit={() => handleEdit(rowData)}
            onDelete={() => {
                setEventTypeItemToDelete(rowData);
                setConfirmVisible(true);
            }}
            onViewEvents={() => navigate(`/admin/group-types/${rowData.id}`, { state: { name: rowData.name } })}
            showViewEventsButton={true}
        />
    );

    return (
        <>
            <Toast ref={toast} />
            <PageHeader title={AdminLabels.GROUP_TYPES} onNewClick={openNewGroupTypeDlg} />

            {error && (
                <div className='text-red-600 font-semibold mb-4 p-2'>
                    {error}
                </div>
            )}

            <DataTable 
                value={groupTypes || []}
                paginator 
                rows={8}>
                <Column field='name' header='Nombre' sortable />
                <Column body={actionBodyTemplate} style={{ textAlign: 'right' }} />
            </DataTable> 

            <CustomDialog
                maximizable={false}
                visible={dialogVisible}
                header='Detalles del Tipo de Grupo'
                onHide={() => setDialogVisible(false)}
                onSave={handleSaveWithValidation}
                width='w-[50rem]'>
                
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='name' className='text-sm font-semibold text-gray-600'>
                        Nombre del Grupo<span className='text-red-500'>*</span>
                    </label>
                    <InputText 
                        id='name'
                        value={selectedGroupType?.name || ''}
                        onChange={(e) =>
                            setSelectedGroupType({ ...selectedGroupType!, name: e.target.value })
                        } 
                        required 
                    />
                    {formTouched && !selectedGroupType?.name && (
                        <small className='text-red-500'>Este campo es obligatorio.</small>
                    )}
                </div>
            </CustomDialog>

            <CustomConfirmDialog
                visible={confirmVisible}
                itemName={`${eventTypeItemToDelete?.name}`}
                onCancel={() => setConfirmVisible(false)}
                onConfirm={() => {
                    if (eventTypeItemToDelete) handleDelete(eventTypeItemToDelete.id);
                    setConfirmVisible(false);
                }}
            />

            <Spinner loading={loading} />
        </>
    );
};

export default GroupType;