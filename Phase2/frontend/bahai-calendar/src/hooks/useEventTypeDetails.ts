import { useEffect, useState } from 'react';
import { 
    EventTypeDetailItem, 
    findByEventTypeId, 
    create, 
    update 
} from '../services/eventTypeDetailService';

export const useEventTypeDetails = (eventTypeId?: number) => {

    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [eventTypeDetails, setEventTypeDetails] = useState<EventTypeDetailItem[]>([]);

    useEffect(() => {
        if (!eventTypeId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await findByEventTypeId(eventTypeId);
                setEventTypeDetails(data);
            } catch (err) {
                console.error('Error al consultar detalles del tipo de evento:', err);
                setError('No se pudieron cargar los detalles');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventTypeId]);

    const handleSave = async (eventTypeDetail: EventTypeDetailItem) => {
        setLoading(true);
        try {
            if (eventTypeDetail.id === 0) {
                const nuevo = await create(eventTypeDetail);
                setEventTypeDetails(prev => [...prev, nuevo]);
            } else {
                const actualizado = await update(eventTypeDetail.id, eventTypeDetail);
                setEventTypeDetails(prev =>
                    prev.map(i => (i.id === actualizado.id ? actualizado : i))
                );
            }
        } catch (error) {
            console.error('Error al guardar:', error);
        } finally {
            setLoading(false);
            setDialogVisible(false);
        }
    };
    
    return {
        eventTypeDetails,
        setEventTypeDetails,
        dialogVisible,
        setDialogVisible,
        handleSave,
        error
    };
};