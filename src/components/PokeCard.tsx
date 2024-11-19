import React from 'react';

interface PokeCardProps {
    id: number;
    image: string;
    name: string;
}

const PokeCard: React.FC<PokeCardProps> = ({ id, image, name }) => {
    return (
        <div
            key={id}
            className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4"
        >
            <img src={image} alt={name} className="w-20 h-20 mb-2" />
            <h3 className="text-lg font-bold">{name}</h3>
        </div>
    );
};

export default PokeCard;
