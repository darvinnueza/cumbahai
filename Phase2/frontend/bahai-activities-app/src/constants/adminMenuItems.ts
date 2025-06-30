import type { MenuItem } from 'primereact/menuitem';
import type { NavigateFunction } from 'react-router-dom';

import { AdminLabels } from '../constants/adminLabels';

export const getAdminMenuItems = (navigate: NavigateFunction): MenuItem[] => [
    {
        label: AdminLabels.HOME,
        icon: 'pi pi-home',
        command: () => navigate('/admin'),
    },
    {
        label: AdminLabels.EVENTS,
        icon: 'pi pi-calendar-plus',
        items: [
            {
                label: 'Actividades',
                icon: 'pi pi-calendar-plus',
                command: () => navigate('/admin/activities'),
            },
            {
                label: 'Tipo de Eventos',
                icon: 'pi pi-tags',
                command: () => navigate('/admin/event-types'),
            }
        ]
    },
    {
        label: AdminLabels.COMMUNITY,
        icon: 'pi pi-users',
        items: [
            {
                label: AdminLabels.INDIVIDUALS,
                icon: 'pi pi-user',
                command: () => navigate('/admin/individuals'),
            },
            {
                label: AdminLabels.GROUP_TYPES,
                icon: 'pi pi-users',
                command: () => navigate('/admin/group-types'),
            }
        ]
    }
];