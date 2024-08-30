import React from 'react';

interface ContributorCardProps {
    name: string;
    contribution: string;
}

const ContributorCardComponent: React.FC<ContributorCardProps> = ({ name, contribution }) => {
    return (
        <div className="card p-3 text-center">
            <img src="contributer.jpeg" className="card-img-top rounded-circle" alt={name} />
            <h5>{name}</h5>
            <p>{contribution}</p>
        </div>
    );
};

export default ContributorCardComponent;
