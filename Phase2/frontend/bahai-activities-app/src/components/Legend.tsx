import React from "react";

const Legend: React.FC = () => {
    return (
        <div className="flex space-x-4 my-4">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{
                    backgroundColor: "#008573"
                }}></div>
                <span>Fiesta de 19 Días</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{
                    backgroundColor: "#641B17"
                }}></div>
                <span>Días Sagrados</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{
                    backgroundColor: "#1976D2"
                }}></div>
                <span>Devocional Quincenal</span>
            </div>
        </div>
    );
};

export default Legend;