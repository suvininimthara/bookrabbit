import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to Bookrabbit</h1>
                <p>Your favorite bookstore and book recommendation system</p>
                <Link to="/book" className="btn-primary">Explore Books</Link>
            </div>
        </section>
    );
};

export default Hero;
