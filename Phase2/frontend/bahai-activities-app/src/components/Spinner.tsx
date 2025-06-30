import React from 'react';
import { CircleLoader } from 'react-spinners';

interface SpinnerProps {
    loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
    
    if (!loading) return null;
    
    return (
        <>
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: 9998
            }} />
            
            <CircleLoader
                color="#025046"
                size={64}
                cssOverride={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999
                }}
            />
        </>
    );
};

export default Spinner;