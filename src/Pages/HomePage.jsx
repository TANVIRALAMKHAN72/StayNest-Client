import React from 'react';
import Hero from '../Component/Hero';
import About from '../Component/About';
import Coupon from '../Component/Coupon';
import ApartmentLocation from '../Component/ApartmentLocation';
import LandingApartments from '../Component/LandingApartments';


const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <About></About>
            <LandingApartments></LandingApartments>
            <Coupon></Coupon>
            <ApartmentLocation></ApartmentLocation>
        </div>
    );
};

export default HomePage;