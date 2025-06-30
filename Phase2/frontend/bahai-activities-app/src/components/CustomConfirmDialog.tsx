import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface CustomConfirmDialogProps {
    visible: boolean;
    itemName: string;
    header?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const CustomConfirmDialog = ({
    visible,
    itemName,
    header = 'Confirmar Eliminación',
    onCancel,
    onConfirm
}: CustomConfirmDialogProps) => {
    return (
        <Dialog
            visible={visible}
            header={header}
            onHide={onCancel}
            style={{ width: '400px' }}
            modal
            closable={false}
            className='rounded-lg'
            footer={
                <div className='flex justify-end gap-2'>
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        severity="secondary"
                        className='p-button-sm'
                        onClick={onCancel}
                    />
                    <Button
                        label="Sí, eliminar"
                        icon="pi pi-check"
                        className='p-button-sm'
                        onClick={onConfirm}
                    />
                </div>
            }
        >
            <p className="text-sm text-gray-700">
                ¿Estás seguro de que deseas eliminar a{' '}
                <span className="font-semibold">{itemName}</span>?
            </p>
        </Dialog>
    );
};

export default CustomConfirmDialog;