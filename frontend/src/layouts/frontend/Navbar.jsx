import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../../constants";
import { logo, menu, close } from "../../assets/icons";
import * as sIIcons from "react-icons/sl"
import { findMeSocials } from "../../constants";
import { profile } from "../../assets/images"



const Navbar = () => {
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    const [tokenValidity, setTokenValidity] = useState(false);
    const navigate = useNavigate();



    const validToken = () => {
        const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds
        const token = localStorage.getItem("auth_token");
        const tokenCreationTime = localStorage.getItem('token_creation_time');
        if(token && tokenCreationTime && (new Date().getTime() - tokenCreationTime < TOKEN_EXPIRATION_TIME)){
            setTokenValidity(true)
        }else{
            setTokenValidity(false)
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_username');
            localStorage.removeItem('token_creation_time');
            navigate('/'); // Redirect to login if token is invalid
        }
    }


    useEffect(() => {
        validToken();
    }, [navigate]);


    
    return(
        <nav className="w-full p-6 card-color fixed shadow-2xl z-50 top-0 left-0 md:px-20 py-8">
            <div className="w-full flex justify-between items-center">
                <Link to="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setActive('');
                        window.scrollTo(0, 0)
                    }}>
                
                    <img src={logo} alt="logo" className="w-11 object-contain"/>
                    <p className=" text-white-400 text-[18px] font-bold cursor-pointer sm:block hidden">Ebizo Jeremiah</p>
                </Link> 
                <ul className="list-none hidden lg:flex space-x-5 font-bold text-[16px]">
                    {navLinks.map((nav) => {
                        return(
                            <li key={nav.id} className={`${active === nav.title ? 'text-red-600': 'text-white-400'}  hover:text-red-600 transitioning cursor-pointer`}
                                onClick={() => setActive(nav.title)}>

                               {/* here we are just check to see if the id is 'login' and is authenticated
                                with a valid token and not expired then we link to dasboard else link to login page and other links */}
                                {nav.id === 'login' ? (
                                    tokenValidity ? (
                                        <Link 
                                            to="/admin/dashboard"
                                            className="p-[12px] rounded-lg card-color shadow-shadow-1 text-coral-red bg-gradient-to-r from-neutral-900 hover:transitioning"
                                        >
                                        Dashboard
                                        </Link> 
                                    ) : (
                                        <Link 
                                            to="/login"
                                            className="p-[12px] rounded-lg card-color shadow-shadow-1 text-coral-red bg-gradient-to-r from-neutral-900 hover:transitioning"
                                        >
                                        {nav.title}
                                        </Link> 
                                    )
                                   
                                ): (
                                    <a href={`#${nav.title}`}>{nav.title}</a> 
                                )}
                            </li>
                        )
                    })}
                </ul>

                {/* hamburger menu for mobile view and smaller devices   */}
                <div className="lg:hidden flex">
                    <img src={toggle ? close: menu} alt="menu" className="menu-icon"
                        onClick={() => setToggle(!toggle)}
                    />

                    <div className={`black-overlay ${toggle ? 'visible' : 'hidden'}`} onClick={() => setToggle(false)}></div>

                    
                    <div className={`sidebar ${toggle ? 'open' : ''} overflow-y-auto`}>
                        
                        <div className="w-full border-b border-stone-500 p-6">
                            <img src={profile} alt="logo" 
                                className="w-12 h-12 rounded-full ring-neutral-700 ring-4" 
                            />
                            <p className="mt-2 text-color">Passionate about crafting seamless and dynamic digital experiences.</p>
                        </div>


                        <ul className="list-none flex flex-col gap-2 text-[16px] p-6 mt-[15px]">

                            {navLinks.map((nav) => {
                                return(
                                    <li key={nav.id} className={`${active === nav.title ? 'text-red-600': ' text-heading-color'} font-poppins uppercase cursor-pointer p-2`}
                                        onClick={() => {
                                            setToggle(!toggle);
                                            setActive(nav.title);
                                        }}
                                    >
                                    {/* here we are just check to see if the id is 'login' and is authenticated
                                     with a valid token and not expired then we link to dasboard else link to login page and other links */}
                                    {nav.id === 'login' ? (
                                        tokenValidity ? (
                                        <Link 
                                            to="/admin/dashboard"
                                            className="text-coral-red"
                                        >
                                        Dashboard
                                        </Link>  
                                        ) : (
                                            <Link 
                                                to="/login"
                                                className="text-coral-red"
                                            >
                                            {nav.title}
                                            </Link>  
                                        )
                                    ): (
                                        <a href={`#${nav.title}`}>{nav.title}</a> 
                                    )}

                                    </li>
                                )
                            })}
                        </ul>
                        

                        <div className="mt-40 border-t border-stone-500 p-4">
                            <p className="px-2">Find Me With</p>
                            <div className="flex space-x-2 mt-4">
                                {findMeSocials.map((socials) => {
                                    const IconComponent = sIIcons[socials.icon];
                                    return(
                                        <div key={socials.id} className="flex w-16 h-[70px] px-6 items-center bg-[#27272a] shadow-2xl rounded-md transitioning">
                                            <a href={socials.link} target="_blank" rel="noopener noreferrer">
                                                <IconComponent />
                                            </a> 
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
           

        </nav>


    );

}

export default Navbar;
