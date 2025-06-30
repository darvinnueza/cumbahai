import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ReactNode } from 'react';

interface CustomDialogProps {
    visible: boolean;
    header: string;
    onHide: () => void;
    onSave: () => void;
    children: ReactNode;
    saveLabel?: string;
    showCancel?: boolean;
    width?: string;
}

export default function CustomDialog({
    visible,
    header,
    onHide,
    onSave,
    children,
    showCancel = true
}: CustomDialogProps) {
    return (
        <Dialog 
            visible={visible} 
            onHide={onHide} 
            header={header}
            className="w-[40rem]"
            modal
            style={{ overflow: 'visible' }}
            contentClassName="transition-all duration-200 ease-out scale-95 opacity-0 animate-fade-in">
                <div className="mb-4">{children}</div>
                <div className='flex justify-end gap-2'>
                    {showCancel && (
                    <Button 
                        label="Cancelar"
                        icon="pi pi-times"
                        className="bg-white text-gray-700 border border-gray-300 px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
                        onClick={onHide} />
                    )}
                    <Button 
                        label="Guardar" 
                        icon="pi pi-check" 
                        className='text-white font-medium px-4 py-2 text-sm rounded-md' 
                        style={{ backgroundColor: '#038574', border: 'none' }}
                        onClick={onSave} />
                </div>
        </Dialog>
  );
}