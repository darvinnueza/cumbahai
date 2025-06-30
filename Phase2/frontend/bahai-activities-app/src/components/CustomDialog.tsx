import type { ReactNode } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface CustomDialogProps {
    header: string;
    width?: string;
    visible: boolean;
    onHide: () => void;
    onSave: () => void;
    saveLabel?: string;
    children: ReactNode;
    showCancel?: boolean;
    maximizable?: boolean;
}

export default function CustomDialog({
    width,
    header,
    onHide,
    onSave,
    visible,
    children,
    maximizable,
    showCancel = true,
    saveLabel = 'Guardar',
}: CustomDialogProps) {
    return (
        <Dialog
            modal
            visible={visible}
            onHide={onHide}
            header={header}
            maximizable={maximizable}
            className={`${width}`}
        >
            <div className="space-y-6">
                {/* Contenido del formulario */}
                <div>{children}</div>

                {/* Acciones */}
                <div className="flex justify-end gap-3 pt-4">
                    {showCancel && (
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            severity="secondary"
                            className='p-button-sm'
                            onClick={onHide}
                        />
                    )}
                    <Button
                        label={saveLabel}
                        icon="pi pi-check"
                        className='p-button-sm'
                        onClick={onSave}
                    />
                </div>
            </div>
        </Dialog>
    );
}