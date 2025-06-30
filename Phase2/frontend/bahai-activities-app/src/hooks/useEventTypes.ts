import { useEffect, useState } from 'react';

import type { EventTypeItem } from '../services/eventTypeService';
import { 
    findAll, 
    create, 
    update, 
    deleteEventType 
} from '../services/eventTypeService';

export const useEventTypes = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [eventTypes, setEventTypes] = useState<EventTypeItem[]>([]);

    useEffect(() => {
        console.log('Cargando tipos de evento...');
        findAll()
            .then((data) => {
                setEventTypes(data);
            })
            .catch((err) => {
                console.error('Error cargando tipos:', err);
                setError('Error al cargar los Tipos de Eventos desde el servidor.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSave = async (eventType: EventTypeItem) => {
        setLoading(true);
        try {
            if (eventType.id === 0) {
                const nuevo = await create(eventType);
                setEventTypes(prev => [...prev, nuevo]);
            } else {
                const actualizado = await update(eventType.id, eventType);
                setEventTypes(prev =>
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
            await deleteEventType(id);
            setEventTypes(prev => prev.filter(i => i.id !== id));
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
        eventTypes,
        handleDelete,
        dialogVisible,
        setDialogVisible
    }
};