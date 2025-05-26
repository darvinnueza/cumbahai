import React, { useState } from "react";

import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';

import EventDialog from "./EventDialog";

import events from '../data/eventsData.json';

import enUS from 'date-fns/locale/en-US';
import esES from 'date-fns/locale/es';
import Legend from "./Legend";

// Configuración correcta de locales
const localesConfig = {
    en: { code: 'en-US', locale: enUS },
    es: { code: 'es', locale: esES }
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
    const [language, setLanguage] = useState<'en' | 'es'>('es');
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<View>('month');

    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="md:px-8 md:py-6 rounded-xl shadow bg-white">
            <div className="flex justify-between items-center mb-4 flex-wrap">
                <div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
                        className="border p-2 rounded"
                    >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <Legend />
            </div>

            <Calendar 
                localizer={localizer}
                events={parsedEvents}
                date={date}
                onNavigate={setDate}
                view={view}
                onView={setView}
                views={['month', 'week', 'day', 'agenda']}
                culture={localesConfig[language].code}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                defaultView="month"
                className="rounded shadow bg-white p-2"
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

            {isModalOpen && selectedEvent && (
                <EventDialog 
                    event={selectedEvent} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    )
}

export default CustomCalendar;