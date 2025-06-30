import { Button } from 'primereact/button';
import { FC } from 'react';

interface ActionTableButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
    onViewEvents?: () => void;
    viewEventsLabel?: string;
    showViewEventsButton?: boolean;
}

const ActionTableButtons: FC<ActionTableButtonsProps> = ({ 
    onEdit, 
    onDelete,
    onViewEvents,
    viewEventsLabel = 'Ver Eventos Asociados',
    showViewEventsButton = false,
}) => (
    <div className='flex items-center gap-2'>
        <Button
            icon="pi pi-pencil"
            className="p-button-text p-button-danger text-primary"
            onClick={onEdit}
        />
        <Button
            icon="pi pi-trash"
            className="p-button-text p-button-danger text-red-600"
            onClick={onDelete}
        />
        {showViewEventsButton && (
            <Button
                icon="pi pi-list"
                className="p-button-text"
                tooltip={viewEventsLabel}
                onClick={onViewEvents}
            />
        )}
    </div>
);

export default ActionTableButtons;