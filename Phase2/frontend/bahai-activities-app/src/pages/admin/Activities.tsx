import { useRef, useState } from 'react';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import type { EventItem } from '../../services/eventService';
import type { ActivityItem } from '../../services/activityService';
import type { EventTypeItem } from '../../services/eventTypeService';
import type { IndividualItem } from '../../services/individualService';

import { useActivity } from '../../hooks/useActivity';
import { useEventTypes } from '../../hooks/useEventTypes';

import Spinner from '../../components/Spinner';
import ActivityListCard from './ActivityListCard';
import ActivityGridCard from './ActivityGridCard';
import CustomDialog from '../../components/CustomDialog';
import { RadioButton } from 'primereact/radiobutton';
import { useIndividuals } from '../../hooks/useIndividuals';

const Activities = () => {

    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const toast = useRef<Toast>(null);

    const { 
        loading: loadingEventTypes,
        eventTypes
    } = useEventTypes();

    const {
        individuals,
        loading: loadingIndividuals,
        loadIndividuals
    } = useIndividuals();

    const persons = individuals.map(p => ({
        ...p,
        fullName: `${p.firstName} ${p.lastName}`
    }));
    
    const [eventId, setEventId] = useState<number>();
    const [formTouched, setFormTouched] = useState(false);
    const [eventTypeId, setEventTypeId] = useState<number>();
    const [hostType, setHostType] = useState<'individual' | 'grupo'>();
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
    const [selectedEventType, setSelectedEventType] = useState<EventTypeItem | null>(null);
    const [selectedIndividual, setSelectedIndividual] = useState<IndividualItem | null>(null);

    const {
        error,
        events,
        loading: loadingActivities,
        activities,
        dialogVisible,
        setDialogVisible
    } = useActivity(eventTypeId);

    const openNewActivityDlg = () => {
        setSelectedActivity({
            id: 0,
            event: {
                id: 0,
                name: '',
                startDate: '',
                endDate: '',
                eventTypeName: ''
            },
            host: {
                id: 0,
                person: null,
                group: {
                    id: 0,
                    name: '',
                    groupType: '',
                    members: []
                }
            },
            dateTime: ''
        });
        setFormTouched(false);
        setDialogVisible(true);
    };

    const listItem = (activity: ActivityItem, index: number) => {
        return (
            <div className='col-12' key={activity.id}>
                <ActivityListCard activity={activity} />
            </div>
        );
    }

    const gridItem = (activity: ActivityItem) => {
        return (
            <ActivityGridCard activity={activity} />
        );
    }

    const itemTemplate = (activity: ActivityItem, layout: string, index: number) => {
        if (!activity) return null;

        if (layout === 'list') return listItem(activity, index);
        else if (layout === 'grid') return gridItem(activity);
    };

    const listTemplate = (activities: ActivityItem[], layout: string) => {
        if (layout === 'grid') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {activities.map((activity, index) => itemTemplate(activity, layout, index))}
                </div>
            );
        }

        return (
            <div className="grid">
                {activities.map((activity, index) => itemTemplate(activity, layout, index))}
            </div>
        );
    };

    const header = () => (
        <div className="flex items-center justify-between">
            <Button
                label='Nuevo'
                icon="pi pi-plus"
                onClick={openNewActivityDlg}
                disabled={!selectedEventType}
            />

            <div className='flex items-center gap-12'>
                <div>Buscador</div>

                <Dropdown 
                    value={selectedEventType} 
                    options={eventTypes} 
                    optionLabel="name"
                    onChange={(e) => {
                        const selected: EventTypeItem = e.value;
                        setEventTypeId(selected.id)
                        setSelectedEventType(e.value)
                    }} 
                    placeholder="Tipo de Evento"
                    className="p-dropdown-sm text-sm w-60" />

                <DataViewLayoutOptions
                    layout={layout}
                    onChange={(e) => setLayout(e.value as 'grid' | 'list')}
                />
            </div>
        </div>
    );

    const handleSaveWithValidation = () => {
        console.log('selectedEvent: ', selectedEvent);
    }

    return (
        <>
            <Toast ref={toast} />

            {error && (
                <div className='text-red-600 font-semibold mb-4 p-2'>
                    {error}
                </div>
            )}

            <DataView
                value={activities}
                layout={layout}
                header={header()}
                listTemplate={(activities) =>
                    listTemplate(activities, layout)
                }
            />

            <CustomDialog
                visible={dialogVisible}
                header='Registrar Nueva Actividad'
                onHide={() => setDialogVisible(false)}
                onSave={handleSaveWithValidation}
                width = 'w-[50rem]'>
                    {/* Field: Event */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label htmlFor='name' className='text-sm font-semibold text-gray-600'>Evento<span className='text-red-500'>*</span></label>
                        <Dropdown
                            value={selectedEvent}
                            options={events} 
                            optionLabel="name"
                            onChange={(e) => {
                                const selected: EventItem = e.value;
                                setEventId(selected.id)
                                setSelectedEvent(e.value)
                            }} />
                    </div>

                    {/* Field: HostType */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label className='text-sm font-semibold text-gray-600'>Tipo de Anfitrión<span className='text-red-500'>*</span></label>
                        <div className='flex gap-6 mt-2'>
                            <div className="flex items-center gap-2">
                                <RadioButton
                                    inputId="hostIndividual"
                                    name="hostType"
                                    value="individual"
                                    onChange={(e) => {
                                        setHostType(e.value);
                                        loadIndividuals();
                                    }}
                                    checked={hostType === 'individual'}
                                />
                                <label htmlFor="hostIndividual" className="text-sm">Individual</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <RadioButton
                                    inputId="hostGroup"
                                    name="hostType"
                                    value="grupo"
                                    onChange={(e) => setHostType(e.value)}
                                    checked={hostType === 'grupo'}
                                />
                                <label htmlFor="hostGroup" className="text-sm">Grupo</label>
                            </div>
                        </div>
                    </div>

                    {/* Field: Individuals */}
                    {hostType === 'individual' && (
                        <div className='flex flex-col gap-1 mb-4'>
                            <label className='text-sm font-semibold text-gray-600'>Seleccionar Persona<span className='text-red-500'>*</span></label>
                            <Dropdown
                                value={selectedIndividual}
                                options={persons}
                                optionLabel="fullName"
                                onChange={(e) => setSelectedIndividual(e.value)}
                                placeholder="Seleccione una persona"
                                className="w-full"
                                loading={loadingIndividuals}
                            />
                        </div>
                    )}
            </CustomDialog>

            {loadingEventTypes && <Spinner loading={true} />}
            {loadingActivities && <Spinner loading={true} />}
        </>
    );
};

export default Activities;