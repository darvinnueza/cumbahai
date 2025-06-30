import React from 'react';

import { Button } from 'primereact/button';

interface PageHeaderProps {
    title: string;
    onNewClick: () => void;
    newLabel?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onNewClick, newLabel = 'Nuevo' }) => {
    return (
        <div className="flex items-center justify-between px-4 py-4 border border-gray-300 rounded-md bg-gray-50 mt-2 mb-2">
            <Button
                label={newLabel}
                icon="pi pi-plus"
                onClick={onNewClick}
            />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
    );
};

export default PageHeader;