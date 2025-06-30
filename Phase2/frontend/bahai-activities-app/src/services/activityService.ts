import { API_BASE_URL } from '../config/api';

export interface ActivityItem {
    id: number;
    event: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
        eventTypeName: string;
    };
    host: {
        id: number;
        person: any | null;
        group: {
            id: number;
            name: string;
            groupType: string;
            members: {
                id: number;
                firstName: string;
                lastName: string;
                phone: string;
                email: string;
                birthDate: string;
                ageGroup: string;
            }[] | null;
        }
    };
    dateTime: string;
}   

export const findAll = async (): Promise<ActivityItem[]> => {
    const response = await fetch(`${API_BASE_URL}/activities`);
    const json = await response.json();

    if (!Array.isArray(json.data)) {
        throw new Error('La respuesta del servidor no contiene un array en "data"');
    }
    
    console.log('json.data: ', json.data);
    return json.data || [];
};

export async function findByEventTypeId(eventTypeId: number): Promise<ActivityItem[]> {
    const response = await fetch(`${API_BASE_URL}/activities/by-event-type/${eventTypeId}`);
    if (!response.ok) {
        throw new Error('Error al obtener la actividad');
    }

    const json = await response.json();
    console.log('json.data: ', json.data);
    return json.data || [];
}

