import { PickList } from 'primereact/picklist';
import type { IndividualItem } from '../services/individualService';

interface FamilyMemberPickerProps {
    source: IndividualItem[];
    target: IndividualItem[];
    onChange: (event: { source: IndividualItem[]; target: IndividualItem[] }) => void;
}

export default function FamilyMemberPicker({ source, target, onChange }: FamilyMemberPickerProps) {
    const itemTemplate = (item: IndividualItem) => {
        return (
            <div className="flex flex-col items-start p-2 gap-1">
                <span className="font-bold">{item.firstName} {item.lastName}</span>
                <span className="text-sm text-gray-500">{item.email}</span>
            </div>
        );
    };

    return (
        <div className='flex px-8 py-8 border border-gray-300 rounded-lg  w-full justify-center'>
            <PickList
                dataKey="id"
                source={source}
                target={target}
                onChange={onChange}
                itemTemplate={itemTemplate}
                filter
                filterBy="firstName,lastName,email"
                breakpoint="1280px"
                sourceHeader="Individuos Disponibles"
                targetHeader="Individuos Seleccionados"
                sourceStyle={{ height: '12rem', width: '32rem' }}
                targetStyle={{ height: '12rem', width: '32rem' }}
                sourceFilterPlaceholder="Buscar por nombre"
                targetFilterPlaceholder="Buscar por nombre"
                className="!flex-row [&_.p-picklist-buttons]:!flex-col [&_.p-picklist-buttons]:!items-center [&_.p-picklist-buttons]:!justify-center"
            />
        </div>
    );
}