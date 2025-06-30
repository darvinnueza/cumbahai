import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';

import { useEvent } from '../../hooks/useEvent';
import type { EventItem } from '../../services/eventService';

import Spinner from '../../components/Spinner';
import PageHeader from '../../components/PageHeader';
import CustomDialog from '../../components/CustomDialog';
import ActionTableButtons from '../../components/ActionTableButtons';
import CustomConfirmDialog from '../../components/CustomConfirmDialog';
import { AdminLabels } from '../../constants/adminLabels';

const Event = () => {

    const { id } = useParams();
    const eventTypeId = Number(id); // convierte a número

    const toast = useRef<Toast>(null);

    const { 
        error,
        event,
        loading,
        handleSave,
        handleDelete,
        dialogVisible,
        setDialogVisible,
    } = useEvent(eventTypeId);

    const [formTouched, setFormTouched] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [EventToDelete, setEventToDelete] = useState<EventItem | null>(null);

    const openNewEventDlg = () => {
        setSelectedEvent({ id: 0, name: '', startDate: '', endDate: '', eventTypeId: eventTypeId })
        setFormTouched(false);
        setDialogVisible(true);
    }

    const actionBodyTemplate = (rowData: EventItem) => (
        <ActionTableButtons
            onEdit={() => handleEdit(rowData)}
            onDelete={() => {
                setEventToDelete(rowData);
                setConfirmVisible(true);
            }}
            showViewEventsButton={false}
        />
    );

    const handleEdit = (event: EventItem) => {
        setSelectedEvent({ ...event })
        setDialogVisible(true)
    }

    const handleSaveWithValidation = () => {
        setFormTouched(true);
        if (!selectedEvent) return;
        
        const { name } = selectedEvent;
        
        if (!name) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: 'Por favor completa los campos obligatorios.',
                life: 4000
            });

            return;
        }
        
        handleSave(selectedEvent);
        setDialogVisible(false);
        setFormTouched(false);
    };
    
    return (
        <>
            <Toast ref={toast} />
            <PageHeader title={AdminLabels.ACTIVITIES} onNewClick={openNewEventDlg} />

            {error && (
                <div className='text-red-600 font-semibold mb-4 p-2'>
                    {error}
                </div>
            )}

            <DataTable 
                value={event || []}
                paginator 
                rows={5}>
                    <Column field='name' header='Nombre' sortable />
                    <Column field='startDate' header='Fecha Inicio' sortable />
                    <Column field='endDate' header='Fecha Fin' sortable />
                    <Column body={actionBodyTemplate} style={{ textAlign: 'right' }} />
            </DataTable>

            <CustomDialog
                visible={dialogVisible}
                header='Detalles de los Tipo de Eventos'
                onHide={() => setDialogVisible(false)}
                onSave={handleSaveWithValidation}
                width = 'w-[50rem]'>
                {/* Field: Name */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='name' className='text-sm font-semibold text-gray-600'>Nombre<span className='text-red-500'>*</span></label>
                    <InputText 
                        id='name'
                        value={selectedEvent?.name || ''}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent!, name: e.target.value })} 
                        required />
                    {formTouched && !selectedEvent?.name && (
                        <small className='text-red-500'>Este campo es obligatorio.</small>
                    )}
                </div>

                {/* Field: Fecha Inicio */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='startDate' className='text-sm font-semibold text-gray-600'>Fecha Inicio<span className='text-red-500'>*</span></label>
                    <Calendar 
                        id='startDate'
                        value={selectedEvent?.startDate ? new Date(selectedEvent.startDate) : null}
                        onChange={(e) =>
                            setSelectedEvent({
                                ...selectedEvent!,
                                startDate: e.value?.toISOString() || '',
                            })
                        }
                        showIcon
                        dateFormat='dd/mm/yy'
                    />
                    {formTouched && !selectedEvent?.startDate && (
                        <small className='text-red-500'>Este campo es obligatorio.</small>
                    )}
                </div>

                {/* Field: Fecha Fin */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='endDate' className='text-sm font-semibold text-gray-600'>Fecha Fin<span className='text-red-500'>*</span></label>
                    <Calendar 
                        id='endDate'
                        value={selectedEvent?.endDate ? new Date(selectedEvent.endDate) : null}
                        onChange={(e) =>
                            setSelectedEvent({
                                ...selectedEvent!,
                                endDate: e.value?.toISOString() || '',
                            })
                        }
                        showIcon
                        dateFormat='dd/mm/yy'
                    />
                    {formTouched && !selectedEvent?.endDate && (
                        <small className='text-red-500'>Este campo es obligatorio.</small>
                    )}
                </div>
            </CustomDialog>

            <CustomConfirmDialog
                visible={confirmVisible}
                itemName={`${EventToDelete?.name}`}
                onCancel={() => setConfirmVisible(false)}
                onConfirm={() => {
                    if (EventToDelete) handleDelete(EventToDelete.id);
                    setConfirmVisible(false);
                }}
            />

            <Spinner loading={loading} />
        </>
    )
};

export default Event;