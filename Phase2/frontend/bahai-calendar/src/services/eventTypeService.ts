export interface EventTypeItem {
    id: number;
    name: string;
};

export const findAll = async (): Promise<EventTypeItem[]> => {
    const response = await fetch('http://localhost:8081/api/v1/eventTypes');
    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    
    return json.data;
};

export const create = async (eventType: Omit<EventTypeItem, 'id'>): Promise<EventTypeItem> => {
    const response = await fetch('http://localhost:8081/api/v1/eventTypes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventType),
    });

    if (!response.ok) {
        throw new Error('Error al crear el Tipo de Evento');
    }

    const json = await response.json();

    return json.data ?? json;
}

export const update = async (id: number, eventType: Omit<EventTypeItem, 'id'>): Promise<EventTypeItem> => {
    const response = await fetch(`http://localhost:8081/api/v1/eventTypes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventType),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar el Tipo de Evento');
    }

    const json = await response.json();
    return json.data ?? json;
};

export const deleteEventType = async (id: number): Promise<void> => {
    const response = await fetch(`http://localhost:8081/api/v1/eventTypes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar el Tipo de Evento');
    }
};