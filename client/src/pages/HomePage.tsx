import React from 'react';
import HeroSection from '../components/HeroSection';
import FeedbackComponent from '../components/FeedbackComponent';
import BlogSection from '../components/home/BlogSection';
import RecentBooks from '../components/home/RecentBookSection';



const HomePage: React.FC = () => {
    return (
        <div>
            <section className="container my-5">
            <HeroSection />
            </section>
            <section className="container my-5">
            <RecentBooks />   
            <BlogSection />
            
            </section>
            
            
            <section className="container my-5">
                <h2>Customer Feedback</h2>
                <FeedbackComponent feedback="Great platform!" user="sakura" />
                <FeedbackComponent feedback="Amazing book collection!" user="dilhani" />
                <FeedbackComponent feedback="I love this site!. The bloging feature is amazing." user="nimesha" />
            </section>


           
        </div>

    );
};

export default HomePage;
