import { API_BASE_URL } from '../config/api';

export interface GroupTypeItem {
    id: number;
    name: string;
};

export const findAll = async (): Promise<GroupTypeItem[]> => {
    const response = await fetch(`${API_BASE_URL}/groupTypes`);

    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    
    return json.data;
};

export const findGroupTypeById = async (id: number): Promise<{ id: number; name: string }> => {
    const response = await fetch(`${API_BASE_URL}/groupTypes/${id}`);
    const json = await response.json();
    return json.data;
};

export const create = async (groupType: Omit<GroupTypeItem, 'id'>): Promise<GroupTypeItem> => {
    const response = await fetch(`${API_BASE_URL}/groupTypes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupType),
    });

    if (!response.ok) {
        throw new Error('Error al crear el Tipo de Grupo');
    }

    const json = await response.json();

    return json.data ?? json;
}

export const update = async (id: number, groupType: Omit<GroupTypeItem, 'id'>): Promise<GroupTypeItem> => {
    const response = await fetch(`${API_BASE_URL}/groupTypes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupType),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el Tipo de Grupo');
    }

    const json = await response.json();
    return json.data ?? json;
};

export const deleteEventType = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/groupTypes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el Tipo de Grupo');
    }
};