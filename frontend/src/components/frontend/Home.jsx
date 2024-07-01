import React from "react";
import Portfolio from "./Portfolio";
import Resume from "./Resume";
import Contact from "./Contact";
import Features from "./Features";
import Blog from "./Blog";
import Hero from "./Hero";
import Testimonials from "./Testimonials";


const Home = () => {

    return(
        <>
            <Hero />
            <Features id='Features'/>
            <Portfolio id='Portfolio'/>
            <Resume id='Resume'/>
            <Testimonials id='Testimonials'/>
            <Blog id='Blog'/>
            <Contact id='Contact'/>
        </>
    );

}

export default Home;
