import { FC } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from "primereact/datatable";

import { useEventTypeDetails } from '../hooks/useEventTypeDetails';
import { EventTypeItem } from '../services/eventTypeService';

interface EventDialogProps {
    visible: boolean;
    onHide: () => void;
    eventType: EventTypeItem | null;
    onCreateNewEvent?: () => void;
}

const EventDialog: FC<EventDialogProps> = ({ visible, onHide, eventType, onCreateNewEvent }) => {
    
    const {
        events,
        error
    } = useEventTypeDetails(eventType?.id);
    
    return (
        <Dialog 
            header={`Eventos Asociados a "${eventType?.name}"`}
            visible={visible} 
            style={{ width: '75vw' }} 
            maximizable 
            modal 
            contentStyle={{ height: '300px' }} 
            onHide={onHide}
        >
            {eventType ? (
                <div className='p-2'>
                    <div className='flex justify-between items-center mb-4'>
                        <Button 
                            label='Nuevo'
                            icon='pi pi-plus'
                            className='text-white font-medium px-4 py-2 text-sm rounded-lg border-none'
                            style={{ backgroundColor: '#038574' }}
                            onClick={onCreateNewEvent}
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 font-semibold mb-4">
                            {error}
                        </div>
                    )}
                    
                    <DataTable
                        value={events || []}
                        paginator 
                        rows={8}
                        selection={null}
                        className='shadow-md rounded-lg border border-gray-200'
                        rowClassName={() => 'hover:bg-gray-100 transition-all'}>
                            <Column field="name" header="Nombre" sortable />
                            <Column field="startDate" header="Fecha Inicio" sortable />
                            <Column field="endDate" header="Fecha Fin" sortable />
                    </DataTable>
                </div>
            ) : (
                <p>No hay datos disponibles.</p>
            )}
        </Dialog>
    );
};

export default EventDialog;