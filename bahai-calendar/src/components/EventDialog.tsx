import React from "react";

interface EventDialogProps {
    event: any;
    onClose: () => void;
}

const EventDialog: React.FC<EventDialogProps> = ({ event, onClose }) => {

    if (!event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold text-center mb-4">
                    {event.description}
                </h2>
                <div className="text-left space-y-2">
                    <p><strong>Anfitrión:</strong> {event.host.name}</p>
                    <p><strong>Contactos:</strong></p>
                    <ul className="pl-4">
                        {event.host.phones.mobile.map((p, idx) => (
                            <li key={idx}>
                                {p.name}: {p.number}
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-800"
                    >
                    Cerrar
                </button>
            </div>
        </div>
    )
}

export default EventDialog;