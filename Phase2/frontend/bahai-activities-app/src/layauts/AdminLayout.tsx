import { useMemo, useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import type { MenuItem } from 'primereact/menuitem';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { getAdminMenuItems } from '../constants/adminMenuItems';
import { breadcrumbLabelMap } from '../constants/breadcrumbLabels';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef<Menu>(null);
    const menuItems = getAdminMenuItems(navigate);
    const home = { icon: 'pi pi-home', url: '/cumbaya/admin' };

    const breadcrumbItems: MenuItem[] = useMemo(() => {
        const pathParts = location.pathname
            .replace('/cumbaya', '')
            .split('/')
            .filter(Boolean);

        let path = '';
        return pathParts.map((part, idx) => {
            const previous = pathParts[idx - 1];

            // build the path for the URL
            if (previous === 'event-types') {
                path += '/event-types';
            } else if (previous === 'group-types' && !isNaN(Number(part))) {
                path += '/group-types';
            } else {
                path += `/${part}`;
            }

            // dinámica de los labels
            const isEventId = previous === 'event-types';
            const isGroupId = previous === 'group-types';
            const dynamicLabel = (isEventId || isGroupId) && location.state?.name;

            return {
                label: breadcrumbLabelMap[part] || dynamicLabel || part,
                url: `/cumbaya${path}`,
            };
        });
    }, [location.pathname, location.state]);

    return (
        <div className='w-full min-h-screen bg-white text-black overflow-x-hidden'>
            <header className='w-full px-4 py-4 flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>Actividades Baha'is</h1>
                <div className='flex items-center gap-2'>
                    <Menu model={menuItems} popup ref={menuRef} />
                    <Button 
                        icon='pi pi-bars' 
                        className='p-button-sm'
                        aria-label='Menu'
                        onClick={(e) => menuRef.current?.toggle(e)} 
                    />
                </div>
            </header>

            <BreadCrumb model={breadcrumbItems} home={home} className='px-4 py-4 border-b' />

            <main className='w-full'>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;