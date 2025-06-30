import { API_BASE_URL } from '../config/api';

export interface EventItem {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    eventTypeId: number;
};

export const findAll = async (): Promise<EventItem[]> => {
    const response = await fetch(`${API_BASE_URL}/event`);
    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    
    return json.data;
};

export async function findByEventTypeId(eventTypeId: number): Promise<EventItem[]> {
    const response = await fetch(`${API_BASE_URL}/event/by-type/${eventTypeId}`);
    if (!response.ok) {
        throw new Error('Error al obtener eventos por tipo');
    }

    const json = await response.json();
    return json.data || [];
}

export const create = async (event: Omit<EventItem, 'id'>): Promise<EventItem> => {
    console.log('event: ', event);
    const response = await fetch(`${API_BASE_URL}/event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    });

    if (!response.ok) {
        throw new Error('Error al crear el Evento');
    }

    const json = await response.json();

    return json.data ?? json;
}

export const update = async (id: number, event: Omit<EventItem, 'id'>): Promise<EventItem> => {
    const response = await fetch(`${API_BASE_URL}/event/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el Evento');
    }

    const json = await response.json();
    return json.data ?? json;
};

export const remove = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/event/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el Evento');
    }
};