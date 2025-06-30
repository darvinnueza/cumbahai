export interface IndividualItem {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthDate: string;
}

export const findAll = async (): Promise<IndividualItem[]> => {
    const response = await fetch('http://localhost:8081/api/v1/persons');
    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    
    return json.data;
};

export const create = async (catalog: Omit<IndividualItem, 'id'>): Promise<IndividualItem> => {
    const response = await fetch('http://localhost:8081/api/v1/persons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(catalog),
    });

    if (!response.ok) {
        throw new Error('Error al crear al Individuo');
    }

    const json = await response.json();

    return json.data ?? json;
}

export const update = async (id: number, catalog: Omit<IndividualItem, 'id'>): Promise<IndividualItem> => {
    const response = await fetch(`http://localhost:8081/api/v1/persons/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(catalog),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar al Individuo');
    }

    const json = await response.json();
    return json.data ?? json;
};

export const deleteIndividual = async (id: number): Promise<void> => {
    const response = await fetch(`http://localhost:8081/api/v1/persons/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar al Individuo');
    }
};