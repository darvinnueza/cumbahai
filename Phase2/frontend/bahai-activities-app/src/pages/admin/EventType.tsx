import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';

import { AdminLabels } from '../../constants/adminLabels';
import { useEventTypes } from '../../hooks/useEventTypes';
import type { EventTypeItem } from '../../services/eventTypeService';

import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import CustomDialog from '../../components/CustomDialog';
import ActionTableButtons from '../../components/ActionTableButtons';
import CustomConfirmDialog from '../../components/CustomConfirmDialog';

const EventType = () => {

    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const { 
        error,
        loading,
        handleSave,
        eventTypes,
        handleDelete,
        dialogVisible,
        setDialogVisible,
    } = useEventTypes();

    const [formTouched, setFormTouched] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedEventType, setSelectedEventType] = useState<EventTypeItem | null>(null);
    const [eventTypeItemToDelete, setEventTypeItemToDelete] = useState<EventTypeItem | null>(null);

    const openNewEventTypeDlg = () => {
        setSelectedEventType({ id: 0, name: '' })
        setFormTouched(false);
        setDialogVisible(true)
    }

    const actionBodyTemplate = (rowData: EventTypeItem) => (
        <ActionTableButtons
            onEdit={() => handleEdit(rowData)}
            onDelete={() => {
                setEventTypeItemToDelete(rowData);
                setConfirmVisible(true);
            }}
            onViewEvents={() => navigate(`/admin/event-types/${rowData.id}`, { state: { name: rowData.name } })}
            showViewEventsButton={true}
        />
    );

    const handleEdit = (eventType: EventTypeItem) => {
        setSelectedEventType({ ...eventType })
        setDialogVisible(true)
    }

    const handleSaveWithValidation = () => {
        setFormTouched(true);
        if (!selectedEventType) return;
        
        const { name } = selectedEventType;
        
        if (!name) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: 'Por favor completa todos los campos marcados.',
                life: 4000
            });

            return;
        }
        
        handleSave(selectedEventType);
        setDialogVisible(false);
        setFormTouched(false);
    };

    return (
        <>
            <Toast ref={toast} />
            <PageHeader title={AdminLabels.EVENT_TYPES} onNewClick={openNewEventTypeDlg} />

            {error && (
                <div className='text-red-600 font-semibold mb-4 p-2'>
                    {error}
                </div>
            )}

            <DataTable 
                value={eventTypes || []}
                paginator 
                rows={8}>
                    <Column field='name' header='Nombre' sortable />
                    <Column body={actionBodyTemplate} style={{ textAlign: 'right' }} />
            </DataTable>   

            <CustomDialog
                maximizable={false}
                visible={dialogVisible}
                header='Detalles de los Tipo de Eventos'
                onHide={() => setDialogVisible(false)}
                onSave={handleSaveWithValidation}
                width = 'w-[50rem]'>
                {/* Field: Name */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='name' className='text-sm font-semibold text-gray-600'>Nombre del Evento<span className='text-red-500'>*</span></label>
                    <InputText 
                        id='name'
                        value={selectedEventType?.name || ''}
                        onChange={(e) => setSelectedEventType({ ...selectedEventType!, name: e.target.value })} 
                        required />
                        {formTouched && !selectedEventType?.name && (
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
    )
};

export default EventType;