import React, { useState } from "react";

import type { View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import { enUS, es } from 'date-fns/locale';

import events from '../data/eventsData.json';

// Configuración correcta de locales
const localesConfig = {
    en: { code: 'en-US', locale: enUS },
    es: { code: 'es', locale: es }
};

const messagesConfig = {
    en: {
        next: "Next",
        previous: "Back",
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        agenda: "Agenda",
        date: "Date",
        time: "Time",
        event: "Event",
        noEventsInRange: "No events in this range."
    },
    es: {
        next: "Siguiente",
        previous: "Anterior",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
        agenda: "Agenda",
        date: "Fecha",
        time: "Hora",
        event: "Evento",
        noEventsInRange: "No hay eventos en este rango."
    }
};

const CustomCalendar: React.FC = () => {

    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<View>('month');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [language, setLanguage] = useState<'en' | 'es'>('es');
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: language === 'es' ? 1 : 0 }),
        getDay,
        locales: { [localesConfig[language].code]: localesConfig[language].locale }
    });

    const parsedEvents = events.map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end)
    }));
    
    return (
        <Calendar 
            date={date}
            view={view}
            onView={setView}
            onNavigate={setDate}
            localizer={localizer}
            events={parsedEvents}
            endAccessor="end"
            defaultView="month"
            startAccessor="start"
            style={{ height: 600 }}
            culture={localesConfig[language].code}
            className="rounded shadow bg-white p-2"
            views={['month', 'week', 'day', 'agenda']}
            messages={messagesConfig[language]}
            onSelectEvent={(event) => {
                setSelectedEvent(event);
                setIsModalOpen(true);
            }}
            eventPropGetter={(event) => {
                let backgroundColor = '#3174ad'; // por defecto
                if (event.type === 'F19D') backgroundColor = '#008573'; // verde
                if (event.type === 'DS') backgroundColor = '#641B17';  // rojo
                if (event.type === 'DEV') backgroundColor = '#1976D2';  // azul
                return {
                    style: {
                        backgroundColor,
                        color: 'white',
                        borderRadius: '6px',
                        padding: '4px'
                    }
                }
            }}
        />
    )
}

export default CustomCalendar;