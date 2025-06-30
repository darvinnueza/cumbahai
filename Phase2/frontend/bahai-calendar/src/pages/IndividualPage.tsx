import { useState, useRef } from 'react';

import { Button } from 'primereact/button';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from 'primereact/inputtext';

import { Toast } from 'primereact/toast';

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Spinner from '../components/Spinner';
import ActionTableButtons from '../components/ActionTableButtons';
import CustomDialog from '../components/CustomDialog';
import { useIndividuals } from '../hooks/useIndividuals';
import { IndividualItem } from '../services/individualService';
import CustomConfirmDialog from '../components/CustomConfirmDialog';

const IndividualPage = () => {

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [individualToDelete, setIndividualToDelete] = useState<IndividualItem | null>(null);
    const toast = useRef<Toast>(null);
    const [selectedIndividual, setselectedIdividual] = useState<IndividualItem | null>(null);
    const [formTouched, setFormTouched] = useState(false);
    const { 
        individuals, 
        handleSave,
        handleDelete,
        dialogVisible,
        setDialogVisible,
        loading, 
        error 
    } = useIndividuals();

    const handleSaveWithValidation = () => {
        setFormTouched(true);
        if (!selectedIndividual) return;
        
        const { firstName, lastName } = selectedIndividual;
        
        if (!firstName || !lastName) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: 'Por favor completa todos los campos marcados.',
                life: 4000
            });

            return;
        }
        
        handleSave(selectedIndividual);
        setDialogVisible(false);
        setFormTouched(false);
    };

    const handleEdit = (idividual: IndividualItem) => {
        setselectedIdividual({ ...idividual })
        setDialogVisible(true)
    }

    const openNewnIdividualDlg = () => {
        setselectedIdividual({ id: 0, firstName: '', lastName: '', phone: '', email: '', birthDate: '' })
        setFormTouched(false);
        setDialogVisible(true)
    }

    const actionBodyTemplate = (rowData: IndividualItem) => (
        <ActionTableButtons
            onEdit={() => handleEdit(rowData)}
            onDelete={() => {
                setIndividualToDelete(rowData);
                setConfirmVisible(true);
            }}
        />
    );

    return (
        <div className='min-h-screen'>
            <Header />
            <Navbar />
            <Toast ref={toast} />
            <div className='p-4'>
                <div className='flex justify-between items-center border rounded-md bg-gray-50 p-4 mb-4'>
                    <Button 
                        label='Nuevo'
                        icon='pi pi-plus'
                        className='text-white font-medium px-4 py-2 text-sm rounded-lg border-none'
                        style={{ backgroundColor: '#038574' }}
                        onClick={openNewnIdividualDlg}
                    />
                </div>

                {error && (
                    <div className="text-red-600 font-semibold mb-4">
                    {error}
                    </div>
                )}

                <DataTable 
                    value={individuals || []}
                    paginator 
                    rows={8} 
                    className='shadow-md rounded-lg border border-gray-200'
                    rowClassName={() => 'hover:bg-gray-100 transition-all'}>
                        <Column field="firstName" header="Nombres" sortable />
                        <Column field="lastName" header="Apellidos" sortable />
                        <Column field="phone" header="Télefono" sortable />
                        <Column field="email" header="Correo Electrónico" sortable />
                        <Column field='ageGroup' header="Grupo Etario" sortable />
                        <Column body={actionBodyTemplate} header="Acciones" />
                </DataTable>
            </div>

            <CustomDialog
                visible={dialogVisible}
                header="Detalles del Individuo"
                onHide={() => setDialogVisible(false)}
                onSave={handleSaveWithValidation}>
                    {/* Field: First Name */} 
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor="firstName" className="text-sm font-semibold text-gray-600">Nombres <span className="text-red-500">*</span></label>
                        <InputText 
                            id='firstName'
                            className={`w-full px-4 py-2 border-2 text-sm rounded-md focus:outline-none focus:ring-2 ${
                                formTouched && !selectedIndividual?.firstName
                                    ? 'border-red-500 focus:ring-red-400'
                                    : 'border-primary focus:ring-[#4AC2AD]'
                            }`}
                            value={selectedIndividual?.firstName || ''} 
                            onChange={(e) => setselectedIdividual({ ...selectedIndividual!, firstName: e.target.value })} 
                            required />
                        {formTouched && !selectedIndividual?.firstName && (
                            <small className="text-red-500">Este campo es obligatorio.</small>
                        )}
                    </div>

                    {/* Field: Last Name */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor="lastName" className="text-sm font-semibold text-gray-600">Apellidos <span className="text-red-500">*</span></label>
                        <InputText 
                            id='name'
                            className={`w-full px-4 py-2 border-2 text-sm rounded-md focus:outline-none focus:ring-2 ${
                                formTouched && !selectedIndividual?.firstName
                                    ? 'border-red-500 focus:ring-red-400'
                                    : 'border-primary focus:ring-[#4AC2AD]'
                            }`}
                            value={selectedIndividual?.lastName || ''}
                            onChange={(e) => setselectedIdividual({ ...selectedIndividual!, lastName: e.target.value })} 
                            required />
                        {formTouched && !selectedIndividual?.lastName && (
                            <small className="text-red-500">Este campo es obligatorio.</small>
                        )}
                    </div>

                    {/* Field: Phone Number */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor='phone' className="text-sm font-semibold text-gray-600">Teléfono</label>
                        <InputText 
                            id='phone'
                            className='w-full px-4 py-2 border-2 border-primary text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC2AD]'
                            value={selectedIndividual?.phone || ''}
                            onChange={(e) => setselectedIdividual({ ...selectedIndividual!, phone: e.target.value })} />
                    </div>

                    {/* Field: Email */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor='email' className="text-sm font-semibold text-gray-600">Correo Electrónico</label>
                        <InputText 
                            id='email'
                            className='w-full px-4 py-2 border-2 border-primary text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC2AD]'
                            value={selectedIndividual?.email || ''}
                            onChange={(e) => setselectedIdividual({ ...selectedIndividual!, email: e.target.value })} />
                    </div>

                    {/* Field: Fecha de nacimiento */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor='birthDate' className="text-sm font-semibold text-gray-600">
                            Fecha de nacimiento
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            className="w-full px-4 py-2 border-2 border-primary text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#4AC2AD]"
                            value={selectedIndividual?.birthDate || ''}
                            onChange={(e) => setselectedIdividual({ ...selectedIndividual!, birthDate: e.target.value })}
                        />
                    </div>
            </CustomDialog>

            <CustomConfirmDialog
                visible={confirmVisible}
                itemName={`${individualToDelete?.firstName} ${individualToDelete?.lastName}`}
                onCancel={() => setConfirmVisible(false)}
                onConfirm={() => {
                    if (individualToDelete) handleDelete(individualToDelete.id);
                    setConfirmVisible(false);
                }}
            />

            <Spinner loading={loading} />
        </div>
    )

};

export default IndividualPage;