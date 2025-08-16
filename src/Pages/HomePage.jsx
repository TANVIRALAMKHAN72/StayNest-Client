import React from 'react';
import Hero from '../Component/Hero';
import About from '../Component/About';
import Coupon from '../Component/Coupon';
import ApartmentLocation from '../Component/ApartmentLocation';
import LandingApartments from '../Component/LandingApartments';
import ReviewsSection from '../Component/ReviewsSection';
import NewsletterSection from '../Component/NewsletterSection';
import Partners from '../Component/Partners';


const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <About></About>
            <LandingApartments></LandingApartments>
            <Coupon></Coupon>
            <ReviewsSection></ReviewsSection>
            <Partners></Partners>
            <ApartmentLocation></ApartmentLocation>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default HomePage;