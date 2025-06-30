import { useEffect, useState } from 'react';

import type { EventItem } from '../services/eventService';
import {
    create,
    update,
    findByEventTypeId,
    remove
} from '../services/eventService';

export const useEvent = (eventTypeId?: number) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [event, setEvent] = useState<EventItem[]>([]);

    useEffect(() => {
        if (!eventTypeId) return;
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await findByEventTypeId(eventTypeId);
                setEvent(data);
            } catch (err) {
                console.error('Error al consultar detalles del tipo de evento:', err);
                setError('No se pudieron cargar los detalles');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [eventTypeId]);

    const handleSave = async (eventType: EventItem) => {
        setLoading(true);
        try {
            if (eventType.id === 0) {
                const nuevo = await create(eventType);
                setEvent(prev => [...prev, nuevo]);
            } else {
                const actualizado = await update(eventType.id, eventType);
                setEvent(prev =>
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

    const handleDelete = async (id: number) => {
            setLoading(true);
            try {
                await remove(id);
                setEvent(prev => prev.filter(i => i.id !== id));
            } catch (err) {
                console.error('Error al eliminar:', err);
            } finally {
                setLoading(false);
            }
        }

    return {
        error,
        loading,
        handleSave,
        handleDelete,
        dialogVisible,
        setDialogVisible,
        event,
        setEvent
    };
}