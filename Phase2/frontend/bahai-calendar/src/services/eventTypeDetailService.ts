export interface EventTypeDetailItem {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
};

export const findAll = async (): Promise<EventTypeDetailItem[]> => {
    const response = await fetch('http://localhost:8081/api/v1/eventTypeDetails');
    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    
    return json.data;
};

export async function findByEventTypeId(eventTypeId: number): Promise<EventTypeDetailItem[]> {
    const response = await fetch(`http://localhost:8081/api/v1/eventTypeDetails/by-type/${eventTypeId}`);
    if (!response.ok) {
        throw new Error('Error al obtener eventos por tipo');
    }

    const json = await response.json();
    return json.data || [];
}

export const create = async (eventTypeDetail: Omit<EventTypeDetailItem, 'id'>): Promise<EventTypeDetailItem> => {
    const response = await fetch('http://localhost:8081/api/v1/eventTypeDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventTypeDetail),
    });

    if (!response.ok) {
        throw new Error('Error al crear el Evento');
    }

    const json = await response.json();

    return json.data ?? json;
}

export const update = async (id: number, eventTypeDetail: Omit<EventTypeDetailItem, 'id'>): Promise<EventTypeDetailItem> => {
    const response = await fetch(`http://localhost:8081/api/v1/eventTypeDetails/by-type/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventTypeDetail),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el Evento');
    }

    const json = await response.json();
    return json.data ?? json;
};

export const deleteEventType = async (id: number): Promise<void> => {
    const response = await fetch(`http://localhost:8081/api/v1/eventTypeDetails/by-type/${id}`, {
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