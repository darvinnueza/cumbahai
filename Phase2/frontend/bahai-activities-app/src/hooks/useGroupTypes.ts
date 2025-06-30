import { useEffect, useState } from 'react';

import type { GroupTypeItem } from '../services/groupTypeService';
import { 
    findAll, 
    create, 
    update, 
    deleteEventType 
} from '../services/groupTypeService';

export const useGroupTypes = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [groupTypes, setGroupTypes] = useState<GroupTypeItem[]>([]);

    useEffect(() => {
        findAll()
            .then(setGroupTypes)
            .catch((err) => {
                console.error('Error cargando Tipos de Grupos:', err);
                setError('Error al cargar los Tipos de Grupos desde el servidor.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async (eventType: GroupTypeItem) => {
        setLoading(true);
        try {
            if (eventType.id === 0) {
                const nuevo = await create(eventType);
                setGroupTypes(prev => [...prev, nuevo]);
            } else {
                const actualizado = await update(eventType.id, eventType);
                setGroupTypes(prev =>
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
            setGroupTypes(prev => prev.filter(i => i.id !== id));
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
        groupTypes,
        handleDelete,
        dialogVisible,
        setDialogVisible
    }
};