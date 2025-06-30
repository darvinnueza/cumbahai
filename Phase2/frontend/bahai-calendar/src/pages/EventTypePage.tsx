import { useRef, useState } from 'react';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';

import ActionTableButtons from '../components/ActionTableButtons';
import CustomDialog from '../components/CustomDialog';
import CustomConfirmDialog from '../components/CustomConfirmDialog';
import { useEventTypes } from '../hooks/useEventTypes';
import { EventTypeItem } from '../services/eventTypeService';

const EventTypePage = () => {

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [eventTypeItemToDelete, setEventTypeItemToDelete] = useState<EventTypeItem | null>(null);
    const toast = useRef<Toast>(null);
    const [selectedEventType, setSelectedEventType] = useState<EventTypeItem | null>(null);
    const [formTouched, setFormTouched] = useState(false);
    const { 
        eventTypes, 
        handleSave,
        handleDelete,
        dialogVisible,
        setDialogVisible,
        loading, 
        error 
    } = useEventTypes();

    const navigate = useNavigate();

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

    const handleEdit = (catalog: EventTypeItem) => {
        setSelectedEventType({ ...catalog })
        setDialogVisible(true)
    }

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
            onViewEvents={() => navigate(`/admin/event-type-details/${rowData.id}`, { state: { name: rowData.name } })}
            showViewEventsButton={true}
            viewEventsLabel={`Ver Eventos de ${rowData.name}`}
        />
    );

    return (
        <div className='min-h-screen'>
            <Header />
            <Navbar />
            <Toast ref={toast} />
            <div className='p-4'>
                <div className='flex justify-between items-center border rounded-md bg-gray-50 p-4 mb-4'>
                    <Button 
                        label='Nuevo'
                        icon='pi pi-plus'
                        className='text-white font-medium px-4 py-2 text-sm rounded-lg border-none'
                        style={{ backgroundColor: '#038574' }}
                        onClick={openNewEventTypeDlg}
                    />
                </div>

                {error && (
                    <div className="text-red-600 font-semibold mb-4">
                    {error}
                    </div>
                )}
                
                <DataTable 
                    value={eventTypes || []}
                    paginator 
                    rows={8} 
                    selection={null}
                    className='shadow-md rounded-lg border border-gray-200'
                    rowClassName={() => 'hover:bg-gray-100 transition-all'}>
                        <Column field="name" header="Nombre" sortable />
                        <Column body={actionBodyTemplate} header="Acciones" />
                </DataTable>
            </div>
            
            <CustomDialog
                visible={dialogVisible}
                header="Detalles de los Tipo de Eventos"
                onHide={() => setDialogVisible(false)}
                onSave={handleSaveWithValidation}>
                {/* Field: Name */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor="name" className="text-sm font-semibold text-gray-600">Nombre del Evento<span className="text-red-500">*</span></label>
                    <InputText 
                        id='name'
                        className={`w-full px-4 py-2 border-2 text-sm rounded-md focus:outline-none focus:ring-2 ${
                                formTouched && !selectedEventType?.name
                                    ? 'border-red-500 focus:ring-red-400'
                                    : 'border-primary focus:ring-[#4AC2AD]'
                            }`}
                        value={selectedEventType?.name || ''}
                        onChange={(e) => setSelectedEventType({ ...selectedEventType!, name: e.target.value })} 
                        required />
                        {formTouched && !selectedEventType?.name && (
                            <small className="text-red-500">Este campo es obligatorio.</small>
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
        </div>
    )
}

export default EventTypePage;