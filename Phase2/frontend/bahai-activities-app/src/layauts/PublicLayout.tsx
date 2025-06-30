import { Outlet } from 'react-router-dom';

const PublicLayout = () => {

    return (
        <div className='w-full min-h-screen bg-white text-black overflow-x-hidden'>
            <header className='w-full px-4 py-2 flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>Actividades Baha'is</h1>
            </header>
            <main className='w-full'>
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;