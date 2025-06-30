import { useRef, useState } from "react";

import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { useParams } from 'react-router-dom';

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Column } from "primereact/column";
import { Calendar } from 'primereact/calendar';
import { DataTable } from "primereact/datatable";

import { useEventTypeDetails } from "../hooks/useEventTypeDetails";
import { EventTypeDetailItem } from '../services/eventTypeDetailService';
import CustomDialog from "../components/CustomDialog";
import { InputText } from "primereact/inputtext";

const EventTypeDetailPage = () => {

    const { id } = useParams();
    const eventTypeId = Number(id); // convierte a número
    const toast = useRef<Toast>(null);
    const { 
        eventTypeDetails,
        dialogVisible, 
        setDialogVisible,
        handleSave,
        error 
    } = useEventTypeDetails(eventTypeId);

    const [selectedEventTypeDetail, setSelectedEventTypeDetail] = useState<EventTypeDetailItem | null>(null);
    const [formTouched, setFormTouched] = useState(false);

    const openNewEventTypeDetailDlg = () => {
        setSelectedEventTypeDetail({ id: 0, name: '', startDate: '', endDate: '' })
        setFormTouched(false);
        setDialogVisible(true)
    }

    const handleSaveWithValidation = () => {
        setFormTouched(true);
        if (!selectedEventTypeDetail) return;
        
        const { name } = selectedEventTypeDetail;
        
        if (!name) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Campos obligatorios',
                detail: 'Por favor completa todos los campos marcados.',
                life: 4000
            });

            return;
        }
        
        handleSave(selectedEventTypeDetail);
        setDialogVisible(false);
        setFormTouched(false);
    };

    const [date, setDate] = useState(null);

    return (
        <div className="min-h-screen">
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
                        onClick={openNewEventTypeDetailDlg}
                    />
                </div>

                {error && (
                    <div className="text-red-600 font-semibold mb-4">
                        {error}
                    </div>
                )}

                <DataTable 
                    value={eventTypeDetails || []}
                    paginator 
                    rows={8} 
                    selection={null}
                    className='shadow-md rounded-lg border border-gray-200'
                    rowClassName={() => 'hover:bg-gray-100 transition-all'}>
                        <Column field="name" header="Nombre" sortable />
                        <Column field="startDate" header="Fecha Inicio" sortable />
                        <Column field="endDate" header="Fecha Fin" sortable />
                </DataTable>
            </div>

            <CustomDialog
                visible={dialogVisible}
                header="Detalle del Evento"
                onHide={() => setDialogVisible(false)}
                onSave={handleSaveWithValidation}>
                {/* Field: Name */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor="name" className="text-sm font-semibold text-gray-600">Nombre<span className="text-red-500">*</span></label>
                    <InputText 
                        id='name'
                        className={`w-full px-4 py-2 border-2 text-sm rounded-md focus:outline-none focus:ring-2 ${
                                formTouched && !selectedEventTypeDetail?.name
                                    ? 'border-red-500 focus:ring-red-400'
                                    : 'border-primary focus:ring-[#4AC2AD]'
                        }`}
                        value={selectedEventTypeDetail?.name || ''}
                        onChange={(e) => setSelectedEventTypeDetail({ ...selectedEventTypeDetail!, name: e.target.value })} 
                        required />
                    {formTouched && !selectedEventTypeDetail?.name && (
                        <small className="text-red-500">Este campo es obligatorio.</small>
                    )}
                </div>

                {/* Field: Fecha Inicio */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor="startDate" className="text-sm font-semibold text-gray-600">Fecha Inicio<span className="text-red-500">*</span></label>
                    <Calendar 
                        id="startDate"
                        value={selectedEventTypeDetail?.startDate ? new Date(selectedEventTypeDetail.startDate) : null}
                        className={`w-full px-4 py-2 border-2 text-sm rounded-md focus:outline-none focus:ring-0 ${
                            formTouched && !selectedEventTypeDetail?.name
                                ? 'border-red-500'
                                : 'border-primary'
                        }`}
                        onChange={(e) =>
                            setSelectedEventTypeDetail({
                            ...selectedEventTypeDetail!,
                            startDate: e.value?.toISOString() || '',
                            })
                        }
                        showIcon
                        dateFormat="dd/mm/yy"
                        locale="es"
                        placeholder="DD/MM/YYYY"
                        readOnlyInput={false}
                    />
                </div>
            </CustomDialog>
        </div>
    )
}

export default EventTypeDetailPage;