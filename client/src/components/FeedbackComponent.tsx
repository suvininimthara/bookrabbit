import React from 'react';


interface FeedbackProps {
    feedback: string;
    user: string;
}

const FeedbackComponent: React.FC<FeedbackProps> = ({ feedback, user }) => {
    return (
        <div className="card p-3 mt-3">
            <h6>"{feedback}"</h6>
            <p>- {user}</p>
        </div>
    );
};

export default FeedbackComponent;
