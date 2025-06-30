import { useEffect, useState } from "react";

import type { ActivityItem } from '../services/activityService';
import type { EventItem } from '../services/eventService';

import {
    findAll,
    findByEventTypeId as findActivitiesByEventTypeId,
} from '../services/activityService';

import {
    findByEventTypeId as findEventsByEventTypeId,
} from '../services/eventService';

export const useActivity = (eventTypeId?: number) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [events, setEvents] = useState<EventItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = eventTypeId 
                    ? await findActivitiesByEventTypeId(eventTypeId)
                    : await findAll();
                setActivities(data);
            } catch (err) {
                console.error('Error al consultar las actividades:', err);
                setError('No se pudieron cargar las actividades');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [eventTypeId]);

    useEffect(() => {
        if (!eventTypeId) return;

        const fetchData = async () => {
            try {
                setLoading(false);
                const data = await findEventsByEventTypeId(eventTypeId);
                setEvents(data);
            } catch (err) {

            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [eventTypeId]);
    
    return {
        error,
        events,
        loading,
        setLoading,
        activities,
        dialogVisible,
        setDialogVisible
    }
}