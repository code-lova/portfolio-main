import React from "react";
import { profile } from "../../assets/images";

const Footer = () => {

    const currenYear = new Date().getFullYear()

    return(
        <section className="w-full padding">
            <div className="w-full p-8">
                
                <img src={profile} alt="my profile image" className="w-14 block mx-auto rounded-full ring-4 shadow-lg ring-gray-600" />
                <p className="my-4 text-center text-2xl font-bold text-color">E.J</p>

                <p className="my-8 text-center text-color">© {currenYear}. All rights reserved by Dark-Themes.</p>
            </div>

        </section>


    );

}

export default Footer;
