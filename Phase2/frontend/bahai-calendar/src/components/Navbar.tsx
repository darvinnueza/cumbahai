import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const menuRef = useRef<Menu>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => navigate('/admin'),
        },
        {
            label: 'Eventos',
            icon: 'pi pi-calendar-plus',
            items: [
                {
                    label: 'Tipos de Evento',
                    icon: 'pi pi-folder',
                    command: () => navigate('/admin/event-types')
                }
            ]
        },
        {
            label: 'Comunidad',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Individuos',
                    icon: 'pi pi-user',
                    command: () => navigate('/admin/individuals')
                },
                {
                    label: 'Familias',
                    icon: 'pi pi-users',
                    command: () => navigate('/admin/families')
                }
            ]
        }
    ];

    // Título dinámico según la ruta
    const routeTitleMap: { [key: string]: string } = {
        '/admin': 'Calendario de Actividades',
        '/admin/events': 'Administración de Eventos',
        '/admin/event-types': 'Tipos de Eventos',
        '/admin/event-type-details/:id': 'Tipos de Eventos - ',
        '/admin/individuals': 'Individuos'
    };

    let pageTitle = '';

    if (location.pathname.startsWith('/admin/event-type-details/')) {
        const name = location.state?.name;
        pageTitle = name ? `Evento: ${name}` : 'Evento';
    } else {
        pageTitle = routeTitleMap[location.pathname] || '';
    }

    return (
        <div className='flex justify-between items-center bg-white shadow-md px-4 py-2'>
            <div className="text-base font-bold text-center text-primary">
                {pageTitle}
            </div>
            <Menu model={items} popup ref={menuRef} />
            <Button 
                icon="pi pi-bars"
                className='p-button-text'
                aria-label='Menu'
                onClick={(e) => menuRef.current?.toggle(e)}
            />
        </div>
    );
}