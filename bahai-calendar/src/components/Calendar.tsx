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
            event: "Fiesta de 19 Días",
            title: "Bahá/Esplendor",
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
            event: "Fiesta de 19 Días",
            title: "Jalál/Gloria",
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
            event: "Fiesta de 19 Días",
            title: "Jamál/Belleza",
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
            event: "Fiesta de 19 Días",
            title: "‘Aẓamat/Grandeza",
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
            event: "Fiesta de 19 Días",
            title: "Núr/Luz",
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
            event: "Fiesta de 19 Días",
            title: "Raḥmat/Misericordia",
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
            event: "Fiesta de 19 Días",
            title: "Kalimát/Palabras",
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
            event: "Fiesta de 19 Días",
            title: "Kamál/Perfección",
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
            event: "Fiesta de 19 Días",
            title: "Asmá’/Nombres",
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
            event: "Fiesta de 19 Días",
            title: "‘Izzat/Fuerza",
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
            event: "Fiesta de 19 Días",
            title: "Mashíyyat/Voluntad",
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
            event: "Fiesta de 19 Días",
            title: "‘Ilm/Conocimiento",
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
            event: "Fiesta de 19 Días",
            title: "Qudrat/Poder",
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
            event: "Fiesta de 19 Días",
            title: "Qawl/Expresión",
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
            event: "Fiesta de 19 Días",
            title: "Masá’il/Preguntas",
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
            event: "Fiesta de 19 Días",
            title: "Sharaf/Honor",
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
            event: "Fiesta de 19 Días",
            title: "Sulṭán/Soberanía",
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
            event: "Fiesta de 19 Días",
            title: "Mulk/Dominio",
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
            event: "Fiesta de 19 Días",
            title: "‘Alá’/Sublimidad",
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
            event: "Día Sagrado",
            title: "Declaración del Báb",
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
            event: "Día Sagrado",
            title: "Ascensión de Bahá'u'lláh",
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
            event: "Día Sagrado",
            title: "Martirio del Báb",
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
            event: "Día Sagrado",
            title: "Nacimiento del Báb",
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
            event: "Día Sagrado",
            title: "Nacimiento de Bahá'u'lláh",
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
            event: "Día Sagrado",
            title: "Día de la Alianza",
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
            event: "Día Sagrado",
            title: "Ascensión de 'Abdu'l-Bahá",
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
            event: "Día Sagrado",
            title: "Período de Ayuno",
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
            event: "Día Sagrado",
            title: "Naw-Rúz",
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
            event: "Día Sagrado",
            title: "Primer día de Ridván",
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
            event: "Día Sagrado",
            title: "Noveno día de Ridván",
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
            event: "Día Sagrado",
            title: "Duodécimo día de Ridván",
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