// hooks/useIndividuals.ts
import { useEffect, useState } from 'react';
import { IndividualItem, findAll, create, update, deleteIndividual } from '../services/individualService';

export const useIndividuals = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [individuals, setIndividuals] = useState<IndividualItem[]>([]);

    useEffect(() => {
        findAll()
            .then(setIndividuals)
            .catch((err) => {
                console.error('Error cargando individuos:', err);
                setError('Error al cargar los individuos desde el servidor.');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async (individual: IndividualItem) => {
        setLoading(true);
        try {
            if (individual.id === 0) {
                const nuevo = await create(individual);
                setIndividuals(prev => [...prev, nuevo]);
            } else {
                const actualizado = await update(individual.id, individual);
                setIndividuals(prev =>
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
            await deleteIndividual(id);
            setIndividuals(prev => prev.filter(i => i.id !== id));
        } catch (err) {
            console.error('Error al eliminar:', err);
        } finally {
            setLoading(false);
        }
    }

    return {
        individuals,
        setIndividuals,
        dialogVisible,
        setDialogVisible,
        handleSave,
        handleDelete,
        loading,
        error
    };
};