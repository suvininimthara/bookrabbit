import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './NotFoundPage.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };
  return (
    <Container className="text-center mt-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Oops! The page you're looking for does not exist.</p>
      <p>It seems like you’ve followed a broken link or entered a URL that doesn’t exist.</p>
      <button type="button" onClick={handleBackClick} className='notfound'>
                Back to Home
            </button>
    </Container>
  );
};

export default NotFoundPage;
