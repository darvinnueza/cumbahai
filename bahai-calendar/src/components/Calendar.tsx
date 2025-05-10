import React, { useState } from "react";

import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';

import EventDialog from "./EventDialog";

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

    const events = [
        {
            title: "Bahá/Esplendor",
            description: "Fiesta de 19 Días - Bahá/Esplendor", 
            host: {
                name: "Ahourayan Roya",
                phones: {
                    mobile: [
                        {
                            name: "Roya Ahourayan",
                            number: "+593 98 406 0552"
                            
                        }
                    ]
                }
            },
            start: new Date(2026, 2, 20, 18, 0),
            end: new Date(2026, 2, 21, 18, 0),
            type: "F19D"
        },
        {
            title: "Jalál/Gloria",
            description: "Fiesta de 19 Días - Jalál/Gloria", 
            host: {
                name: "Ashrafi Manucher",
                phones: {
                    mobile: [
                        {
                            name: "Manucher Ashrafi",
                            number: "+593 99 902 1021"
                        }
                    ]
                }
            },
            start: new Date(2026, 3, 8, 18, 0),
            end: new Date(2026, 3, 9, 18, 0),
            type: "F19D"
        },
        {
            title: "Jamál/Belleza",
            description: "Fiesta de 19 Días - Jamál/Belleza", 
            host: {
                name: "Ayala Hilda",
                phones: {
                    mobile: [
                        {
                            name: "Hilda Ayala",
                            number: "+593 98 702 2011"
                        }
                    ]
                }
            },
            start: new Date(2026, 4, 27, 18, 0),
            end: new Date(2026, 4, 10, 18, 0),
            type: "F19D"
        },
        {
            title: "‘Aẓamat/Grandeza",
            description: "Fiesta de 19 Días - ‘Aẓamat/Grandeza",
            host: {
                name: "Fam. Baez Lojan",
                phones: {
                    mobile: [
                        {
                            name: "Josefina Lojan",
                            number: "+593 99 521 2781"
                        },
                        {
                            name: "Fernando Baez",
                            number: "+593 99 786 6337"
                        }
                    ]
                }
            },
            start: new Date(2025, 4, 15, 18, 0),
            end: new Date(2025, 4, 16, 18, 0),
            type: "F19D"
        },
        {
            title: "Núr/Luz",
            description: "Fiesta de 19 Días - Núr/Luz",
            host: {
                name: "Mansuri Gretchen",
                phones: {
                    mobile: [
                        {
                            name: "Gretchen Mansuri",
                            number: "+593 99 537 0289"
                        }
                    ]
                }
            },
            start: new Date(2025, 5, 3, 18, 0),
            end: new Date(2025, 5, 4, 18, 0),
            type: "F19D"
        },
        {
            title: "Raḥmat/Misericordia",
            description: "Fiesta de 19 Días - Raḥmat/Misericordia",
            host: {
                name: "Fam. Paredes Mansuri",
                phones: {
                    mobile: [
                        {
                            name: "Freddy Paredes",
                            number: "+593 98 450 5216"
                        },
                        {
                            name: "Najin Mansuri",
                            number: "+593 99 537 0290"
                        }
                    ]
                }
            },
            start: new Date(2025, 5, 22, 18, 0),
            end: new Date(2025, 5, 23, 18, 0),
            type: "F19D"
        },
        {
            title: "Kalimát/Palabras",
            description: "Fiesta de 19 Días - Kalimát/Palabras",
            host: {
                name: "Fam. Vinueza Mier",
                phones: {
                    mobile: [
                        {
                            name: "Charito Vinueza",
                            number: "+593 98 349 9974"
                        }
                    ]
                }
            },
            start: new Date(2025, 6, 11, 18, 0),
            end: new Date(2025, 6, 12, 18, 0),
            type: "F19D"
        },
        {
            title: "Kamál/Perfección",
            description: "Fiesta de 19 Días - Kamál/Perfección",
            host: {
                name: "Fam. Vinueza Flores",
                phones: {
                    mobile: [
                        {
                            name: "Dario Vinueza",
                            number: "+593 98 708 1772"
                        }
                    ]
                }
            },
            start: new Date(2025, 6, 30, 18, 0),
            end: new Date(2025, 6, 31, 18, 0),
            type: "F19D"
        },
        {
            title: "Asmá’/Nombres",
            description: "Fiesta de 19 Días - Asmá’/Nombres",
            host: {
                name: "Vahdat Tarasieh",
                phones: {
                    mobile: [
                        {
                            name: "Tarasieh Vahdat",
                            number: "+593 99 189 8025"
                        }
                    ]
                }
            },
            start: new Date(2025, 7, 18, 18, 0),
            end: new Date(2025, 7, 19, 18, 0),
            type: "F19D"
        },
        {
            title: "‘Izzat/Fuerza",
            description: "Fiesta de 19 Días - ‘Izzat/Fuerza",
            host: {
                name: "Ahourayan Roya",
                phones: {
                    mobile: [
                        {
                            name: "Roya Ahourayan",
                            number: "+593 98 406 0552"
                        }
                    ]
                }
            },
            start: new Date(2025, 8, 6, 18, 0),
            end: new Date(2025, 8, 7, 18, 0),
            type: "F19D"
        },
        {
            title: "Mashíyyat/Voluntad",
            description: "Fiesta de 19 Días - Mashíyyat/Voluntad",
            host: {
                name: "Ashrafi Manucher",
                phones: {
                    mobile: [
                        {
                            name: "Manucher Ashrafi",
                            number: "+593 99 902 1021"
                        }
                    ]
                }
            },
            start: new Date(2025, 8, 25, 18, 0),
            end: new Date(2025, 8, 26, 18, 0),
            type: "F19D"
        },
        {
            title: "‘Ilm/Conocimiento",
            description: "Fiesta de 19 Días - ‘Ilm/Conocimiento",
            host: {
                name: "Ayala Hilda",
                phones: {
                    mobile: [
                        {
                            name: "Hilda Ayala",
                            number: "+593 98 702 2011"
                        }
                    ]
                }
            },
            start: new Date(2025, 9, 14, 18, 0),
            end: new Date(2025, 9, 15, 18, 0),
            type: "F19D"
        },
        {
            title: "Qudrat/Poder",
            description: "Fiesta de 19 Días - Qudrat/Poder",
            host: {
                name: "Fam. Baez Lojan",
                phones: {
                    mobile: [
                        {
                            name: "Josefina Lojan",
                            number: "+593 99 521 2781"
                        },
                        {
                            name: "Fernando Baez",
                            number: "+593 99 786 6337"
                        }
                    ]
                }
            },
            start: new Date(2025, 10, 2, 18, 0),
            end: new Date(2025, 10, 3, 18, 0),
            type: "F19D"
        },
        {
            title: "Qawl/Expresión",
            description: "Fiesta de 19 Días - Qawl/Expresión",
            host: {
                name: "Mansuri Gretchen",
                phones: {
                    mobile: [
                        {
                            name: "Gretchen Mansuri",
                            number: "+593 99 537 0289"
                        }
                    ]
                }
            },
            start: new Date(2025, 10, 21, 18, 0),
            end: new Date(2025, 10, 22, 18, 0),
            type: "F19D"
        },
        {
            title: "Masá’il/Preguntas",
            description: "Fiesta de 19 Días - Masá’il/Preguntas",
            host: {
                name: "Fam. Paredes Mansuri",
                phones: {
                    mobile: [
                        {
                            name: "Freddy Paredes",
                            number: "+593 98 450 5216"
                        },
                        {
                            name: "Najin Mansuri",
                            number: "+593 99 537 0290"
                        }
                    ]
                }
            },
            start: new Date(2025, 11, 10, 18, 0),
            end: new Date(2025, 11, 11, 18, 0),
            type: "F19D"
        },
        {
            title: "Sharaf/Honor",
            description: "Fiesta de 19 Días - Sharaf/Honor",
            host: {
                name: "Fam. Vinueza Mier",
                phones: {
                    mobile: [
                        {
                            name: "Charito Vinueza",
                            number: "+593 98 349 9974"
                        }
                    ]
                }
            },
            start: new Date(2025, 11, 29, 18, 0),
            end: new Date(2025, 11, 30, 18, 0),
            type: "F19D"
        },
        {
            title: "Sulṭán/Soberanía",
            description: "Fiesta de 19 Días - Sulṭán/Soberanía",
            host: {
                name: "Fam. Vinueza Flores",
                phones: {
                    mobile: [
                        {
                            name: "Dario Vinueza",
                            number: "+593 98 708 1772"
                        }
                    ]
                }
            },
            start: new Date(2026, 0, 17, 18, 0),
            end: new Date(2026, 0, 18, 18, 0),
            type: "F19D"
        },
        {
            title: "Mulk/Dominio",
            description: "Fiesta de 19 Días - Mulk/Dominio",
            host: {
                name: "Vahdat Tarasieh",
                phones: {
                    mobile: [
                        {
                            name: "Tarasieh Vahdat",
                            number: "+593 99 189 8025"
                        }
                    ]
                }
            },
            start: new Date(2026, 1, 5, 18, 0),
            end: new Date(2026, 1, 6, 18, 0),
            type: "F19D"
        },
        {
            title: "‘Alá’/Sublimidad",
            description: "Fiesta de 19 Días - ‘Alá’/Sublimidad",
            host: {
                name: "Ahourayan Roya",
                phones: {
                    mobile: [
                        {
                            name: "Roya Ahourayan",
                            number: "+593 98 406 0552"
                        }
                    ]
                }
            },
            start: new Date(2026, 2, 1, 18, 0),
            end: new Date(2026, 2, 2, 18, 0),
            type: "F19D"
        },
        {
            title: "Declaración del Báb",
            description: "Día Sagrado - Declaración del Báb",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2025, 4, 22, 18, 0),
            end: new Date(2025, 4, 23, 18, 0),
            type: "DS"
        },
        {
            title: "Ascensión de Bahá'u'lláh",
            description: "Día Sagrado - Ascensión de Bahá'u'lláh",
            host: {
                name: "Fam. Paredes Mansuri",
                phones: {
                    mobile: [
                        {
                            name: "Freddy Paredes",
                            number: "+593 98 450 5216"
                        },
                        {
                            name: "Najin Mansuri",
                            number: "+593 99 537 0290"
                        }
                    ]
                }
            },
            start: new Date(2025, 4, 27, 18, 0),
            end: new Date(2025, 4, 28, 18, 0),
            type: "DS"
        },
        {
            title: "Martirio del Báb",
            description: "Día Sagrado - Martirio del Báb",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2025, 6, 9, 18, 0),
            end: new Date(2025, 6, 9, 18, 0),
            type: "DS"
        },
        {
            title: "Nacimiento del Báb",
            description: "Día Sagrado - Nacimiento del Báb",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2025, 9, 21, 18, 0),
            end: new Date(2025, 9, 22, 18, 0),
            type: "DS"
        },
        {
            title: "Nacimiento de Bahá'u'lláh",
            description: "Día Sagrado - Nacimiento de Bahá'u'lláh",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2025, 9, 22, 18, 0),
            end: new Date(2025, 9, 23, 18, 0),
            type: "DS"
        },
        {
            title: "Día de la Alianza",
            description: "Día Sagrado - Día de la Alianza",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2025, 10, 24, 18, 0),
            end: new Date(2025, 10, 25, 18, 0),
            type: "DS"
        },
        {
            title: "Ascensión de 'Abdu'l-Bahá",
            description: "Día Sagrado - Ascensión de 'Abdu'l-Bahá",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2025, 10, 27, 18, 0),
            end: new Date(2025, 10, 27, 18, 0),
            type: "DS"
        },
        {
            title: "Período de Ayuno",
            description: "Día Sagrado - Período de Ayuno",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2026, 2, 2, 18, 0),
            end: new Date(2026, 2, 20, 18, 0),
            type: "DS"
        },
        {
            title: "Naw-Rúz",
            description: "Día Sagrado - Naw-Rúz",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2026, 2, 20, 18, 0),
            end: new Date(2026, 2, 21, 18, 0),
            type: "DS"
        },
        {
            title: "Primer día de Ridván",
            description: "Día Sagrado - Primer día de Ridván",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2026, 3, 20, 18, 0),
            end: new Date(2026, 3, 21, 18, 0),
            type: "DS"
        },
        {
            title: "Noveno día de Ridván",
            description: "Día Sagrado - Noveno día de Ridván",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2026, 3, 28, 18, 0),
            end: new Date(2026, 3, 29, 18, 0),
            type: "DS"
        },
        {
            title: "Duodécimo día de Ridván",
            description: "Día Sagrado - Duodécimo día de Ridván",
            host: {
                name: "Sin Anfitrión",
                phones: {
                    mobile: []
                }
            },
            start: new Date(2026, 4, 1, 18, 0),
            end: new Date(2026, 4, 2, 18, 0),
            type: "DS"
        }
    ];

    return (
        <div className="p-4">
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
                events={events}
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
                    if (event.type === 'jeque') backgroundColor = '#f87171';  // rojo

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