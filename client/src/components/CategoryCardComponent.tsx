import React from 'react';

interface CategoryCardProps {
    category: string;
    description: string;
}

const CategoryCardComponent: React.FC<CategoryCardProps> = ({ category, description }) => {
    return (
        <div className="card p-3">
            <h5>{category}</h5>
            <p>{description}</p>
        </div>
    );
};

export default CategoryCardComponent;
