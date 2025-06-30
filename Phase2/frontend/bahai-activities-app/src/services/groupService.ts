import { API_BASE_URL } from '../config/api';

export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthDate: string;
}

export interface GroupItem {
    id: number;
    name: string;
    groupType: {
        id: number;
        name: string;
    };
    personIds: number[];
    members?: Member[];
}

export const findAll = async (): Promise<GroupItem[]> => {
    const response = await fetch(`${API_BASE_URL}/groups`);
    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }

    return json.data;
};

export const findByTypeId = async (typeId: number): Promise<GroupItem[]> => {
    const response = await fetch(`${API_BASE_URL}/groups/by-type/${typeId}`);
    const json = await response.json();
    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    return json.data;
};

export const findGroupsByType = async (typeId: number): Promise<GroupItem[]> => {
    const response = await fetch(`${API_BASE_URL}/groups/by-type/${typeId}`);
    const json = await response.json();
    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    return json.data;
};

export const create = async (group: Omit<GroupItem, 'id' | 'groupType'> & { groupTypeId: number }): Promise<GroupItem> => {
    const response = await fetch(`${API_BASE_URL}/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
    });

    if (!response.ok) {
        throw new Error('Error al crear el Grupo');
    }

    const json = await response.json();

    return json.data ?? json;
}

export const update = async (id: number, group: Omit<GroupItem, 'id' | 'groupType'> & { groupTypeId: number }): Promise<GroupItem> => {
    const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el Grupo');
    }

    const json = await response.json();
    return json.data ?? json;
};

export const remove = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el Grupo');
    }
};