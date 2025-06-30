// hooks/useEventTypes.ts
import { useEffect, useState } from 'react';
import { EventTypeItem, findAll, create, update, deleteEventType } from '../services/eventTypeService';

export const useEventTypes = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [eventTypes, setEventTypes] = useState<EventTypeItem[]>([]);

    const [selectedTypeForEvents, setSelectedTypeForEvents] = useState<EventTypeItem | null>(null);
    const [eventDialogVisible, setEventDialogVisible] = useState(false);

    useEffect(() => {
        findAll()
            .then(setEventTypes)
            .catch((err) => {
                console.error('Error cargando Tipos de Eventos:', err);
                setError('Error al cargar los Tipos de Eventos desde el servidor.');
            })
            .finally(() => setLoading(false));
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
        eventTypes,
        setEventTypes,
        dialogVisible,
        setDialogVisible,
        eventDialogVisible,
        selectedTypeForEvents,
        setEventDialogVisible,
        handleSave,
        handleDelete,
        loading,
        error
    };
};