import { Calendar, Users, Mail, Phone, User } from 'lucide-react';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import type { ActivityItem } from "../../services/activityService";
import ActionTableButtons from '../../components/ActionTableButtons';

interface Props {
    activity: ActivityItem;
    onEdit: (activity: ActivityItem) => void;
    onDelete: (id: number) => void;
}

const ActivityListCard = ({ activity, onEdit, onDelete }: Props) => {

    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "d 'de' MMMM 'de' yyyy", { locale: es });
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 mb-2 mt-2">
            <div className="flex justify-between items-start pb-2">
                <div className="flex flex-col text-left">
                    <h3 className="text-lg font-bold text-gray-800">{activity.event.name}</h3>
                    <p className="text-sm text-gray-500">{activity.event.eventTypeName}</p>
                </div>
                <div className="flex flex-col font-semibold text-gray-600 text-xs space-y-1">
                    <div className="flex items-center gap-1 justify-end whitespace-nowrap">
                        <Calendar size={14} />
                        <p>{formatDate(activity.event.startDate)}</p>
                    </div>
                    <div className="flex items-center gap-1 justify-end whitespace-nowrap">
                        <Calendar size={14} />
                        <p>{formatDate(activity.event.endDate)}</p>
                    </div>
                </div>
            </div>

            <div className="border-t pt-3 w-full text-left">
                <p className="text-sm text-gray-500 font-semibold mb-2">Anfitrión</p>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span className="font-bold text-gray-700">{activity.host.group.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <p><span className="font-bold">Celebración:</span> {formatDate(activity.dateTime)}</p>
                    </div>
                </div>
            </div>

            <div className="border-t pt-3 w-full text-left">
                <p className="text-sm text-gray-500 font-semibold mb-2">Contactos</p>
                <div className="flex flex-col gap-2">
                    {activity.host.group.members?.map((member, index) => (
                        <div key={index} className="text-sm text-gray-800 flex items-start gap-2">
                            <User size={14} className="mt-0.5 text-gray-500" />
                            <div>
                                <div className="font-medium mb-2">{member.firstName} {member.lastName}</div>
                                <div className="flex flex-col gap-1 mb-2">
                                    {member.phone && (
                                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                                            <Phone size={14} />
                                            {member.phone}
                                        </div>
                                    )}
                                    {member.email && (
                                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                                            <Mail size={14} />
                                            {member.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Botones al final */}
            <div className="border-t pt-3 w-full flex justify-end">
                <ActionTableButtons 
                    onEdit={() => onEdit(activity)} 
                    onDelete={() => onDelete(activity.id)} 
                />
            </div>
        </div>
    )
};

export default ActivityListCard;