import type { FC } from 'react';

import { Button } from 'primereact/button';

interface ActionTableButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
    onViewEvents?: () => void;
    showViewEventsButton?: boolean;
}

const ActionTableButtons: FC<ActionTableButtonsProps> = ({ 
    onEdit, 
    onDelete,
    onViewEvents,
    showViewEventsButton = false,
}) => (
    <div className='flex justify-end gap-2'>
        <Button
            icon='pi pi-pencil'
            size='small'
            onClick={onEdit}
            rounded
        />
        <Button
            icon='pi pi-trash'
            size='small'
            severity='danger'
            onClick={onDelete}
            rounded
        />
        {showViewEventsButton && (
            <Button
                icon='pi pi-list'
                size='small'
                severity='secondary'
                onClick={onViewEvents}
                rounded
            />
        )}
    </div>
);

export default ActionTableButtons;