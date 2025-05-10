import React from 'react';

interface EventDialogProps {
    event: any;
    onClose: () => void;
}

const EventDialog: React.FC<EventDialogProps> = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center">
                {/* Evento */}
                <h2 className="text-3xl font-semibold text-emerald-800 mb-2">
                    {event.event}
                </h2>
                {/* Titulo */}
                <p className="text-lg text-gray-700 font-bold mb-4">
                    {event.title}
                </p>
                {/* Anfitrión */}
                <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Anfitrión
                    </h3>
                    <p className="text-md text-gray-800 mb-4">{event.host.name}</p>

                    {/* Contactos */}
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Contactos
                    </h3>
                    <ul className="text-md text-gray-700 space-y-1">
                        {event.host.phones.mobile.map((contact: any, index: number) => (
                            <li key={index}>
                                {contact.name}: {contact.number}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800"
                >
                    Cerrar
                </button>
            </div>
        </div>
    )
}

export default EventDialog;