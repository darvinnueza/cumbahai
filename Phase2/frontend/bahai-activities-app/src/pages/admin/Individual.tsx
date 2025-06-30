import { useRef, useState } from 'react';

import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { FilterMatchMode } from 'primereact/api';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';

import { AdminLabels } from '../../constants/adminLabels';
import { useIndividuals } from '../../hooks/useIndividuals';
import type { IndividualItem } from '../../services/individualService';

import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import CustomDialog from '../../components/CustomDialog';
import ActionTableButtons from '../../components/ActionTableButtons';
import CustomConfirmDialog from '../../components/CustomConfirmDialog';

const Individual = () => {

    const toast = useRef<Toast>(null);

    const {
        error,
        loading,
        handleSave,
        individuals,
        handleDelete,
        dialogVisible,
        setDialogVisible
    } = useIndividuals();

    const [formTouched, setFormTouched] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [selectedIndividual, setSelectedIndividual] = useState<IndividualItem | null>(null);
    const [eventIndividualItemToDelete, setIndividualItemToDelete] = useState<IndividualItem | null>(null);

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ageGroup: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const openNewIndividualDlg = () => {
        setSelectedIndividual({ id: 0, firstName: '', lastName: '', phone: '', email: '', birthDate: '' })
        setFormTouched(false);
        setDialogVisible(true);
    }

    const actionBodyTemplate = (rowData: IndividualItem) => (
        <ActionTableButtons
            onEdit={() => handleEdit(rowData)}
            onDelete={() => {
                setIndividualItemToDelete(rowData);
                setConfirmVisible(true);
            }}
            showViewEventsButton={false}
        />
    );

    const handleEdit = (individualType: IndividualItem) => {
        setSelectedIndividual({ ...individualType })
        setDialogVisible(true)
    }

    const handleSaveWithValidation = () => {
        setFormTouched(true);
        if (!selectedIndividual) return;
        
        const { firstName, lastName } = selectedIndividual;
        
        if (!firstName || !lastName) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: 'Por favor completa todos los campos marcados.',
                life: 4000
            });

            return;
        }
        
        handleSave(selectedIndividual);
        setDialogVisible(false);
        setFormTouched(false);
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        (filters['global'] as any).value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar Individuos" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <>
            <Toast ref={toast} />
            <PageHeader title={AdminLabels.INDIVIDUALS} onNewClick={openNewIndividualDlg} />

            {error && (
                <div className='text-red-600 font-semibold mb-4 p-2'>
                    {error}
                </div>
            )}

            <DataTable 
                value={individuals || []}
                paginator 
                header={header}
                filters={filters}
                globalFilterFields={['firstName', 'lastName', 'phone', 'email', 'ageGroup']}
                rows={5}>
                    <Column field="firstName" header="Nombres" sortable />
                    <Column field="lastName" header="Apellidos" sortable />
                    <Column field="phone" header="Télefono" sortable />
                    <Column field="email" header="Correo Electrónico" sortable />
                    <Column field='ageGroup' header="Grupo Etario" sortable />
                    <Column body={actionBodyTemplate} style={{ textAlign: 'right' }} />
            </DataTable>  

            <CustomDialog
                width = 'w-[50rem]'
                maximizable={false}
                visible={dialogVisible}
                onSave={handleSaveWithValidation}
                header='Detalles de los Tipo de Eventos'
                onHide={() => setDialogVisible(false)}>
                    {/* Field: First Name */} 
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor="firstName" className="text-sm font-semibold text-gray-600">Nombres <span className="text-red-500">*</span></label>
                        <InputText 
                            id='firstName'
                            value={selectedIndividual?.firstName || ''} 
                            onChange={(e) => setSelectedIndividual({ ...selectedIndividual!, firstName: e.target.value })} 
                            required />
                        {formTouched && !selectedIndividual?.firstName && (
                            <small className="text-red-500">Este campo es obligatorio.</small>
                        )}
                    </div>

                    {/* Field: Last Name */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor="lastName" className="text-sm font-semibold text-gray-600">Apellidos <span className="text-red-500">*</span></label>
                        <InputText 
                            id='name'
                            value={selectedIndividual?.lastName || ''}
                            onChange={(e) => setSelectedIndividual({ ...selectedIndividual!, lastName: e.target.value })} 
                            required />
                        {formTouched && !selectedIndividual?.lastName && (
                            <small className="text-red-500">Este campo es obligatorio.</small>
                        )}
                    </div>

                    {/* Field: Phone Number */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor='phone' className="text-sm font-semibold text-gray-600">Teléfono</label>
                        <InputText 
                            id='phone'
                            value={selectedIndividual?.phone || ''}
                            onChange={(e) => setSelectedIndividual({ ...selectedIndividual!, phone: e.target.value })} />
                    </div>

                    {/* Field: Email */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor='email' className="text-sm font-semibold text-gray-600">Correo Electrónico</label>
                        <InputText 
                            id='email'
                            value={selectedIndividual?.email || ''}
                            onChange={(e) => setSelectedIndividual({ ...selectedIndividual!, email: e.target.value })} />
                    </div>

                    {/* Field: Fecha de Nacimiento */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor='birthDate' className='text-sm font-semibold text-gray-600'>Fecha de Nacimiento<span className='text-red-500'>*</span></label>
                        <Calendar 
                            id='birthDate'
                            value={selectedIndividual?.birthDate ? new Date(selectedIndividual.birthDate) : null}
                            onChange={(e) =>
                                setSelectedIndividual({
                                    ...selectedIndividual!,
                                    birthDate: e.value?.toISOString() || '',
                                })
                            }
                            showIcon
                            dateFormat='dd/mm/yy'
                        />
                        {formTouched && !selectedIndividual?.birthDate && (
                            <small className='text-red-500'>Este campo es obligatorio.</small>
                        )}
                    </div>
            </CustomDialog> 

            <CustomConfirmDialog
                visible={confirmVisible}
                itemName={`${eventIndividualItemToDelete?.firstName}`}
                onCancel={() => setConfirmVisible(false)}
                onConfirm={() => {
                    if (eventIndividualItemToDelete) handleDelete(eventIndividualItemToDelete.id);
                    setConfirmVisible(false);
                }}
            />

            <Spinner loading={loading} />
        </>
    )
}

export default Individual;