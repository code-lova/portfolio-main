import React from "react";
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const FrontEndLayout = () => {

    return(
        <main className="relative max-container">
            <Navbar />
            <Outlet />
            <Footer />
        </main>


    );

}

export default FrontEndLayout;
