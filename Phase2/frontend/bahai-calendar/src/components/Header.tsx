import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white py-6 px-4 border-b border-gray-200 shadow-sm w-full">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-bold items-center text-primary">
                <div className="md:text-left text-4xl md:text-5xl">2025–2026</div>

                <div className="md:text-left text-2xl md:text-4xl leading-tight col-span-1 md:col-span-1 break-keep whitespace-nowrap">
                    Actividades Baha&apos;is<br />
                    Comunidad de Cumbayá
                </div>
                
                <div className="md:text-right text-4xl md:text-5xl">182 B.E.</div>
            </div>
        </header>
    );
};

export default Header;