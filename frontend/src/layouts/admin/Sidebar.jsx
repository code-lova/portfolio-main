import React, { useState } from 'react';
import { logo, menu, close } from "../../assets/icons";
import { adminNavLinks } from '../../constants';
import * as riIcons from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axiosApiClient from '../../axios';
import { toast } from 'react-toastify';


const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState('');
  const navigate = useNavigate();

  const Logout = async() => {
    try{
      const response = await axiosApiClient.post('/logout');
      const {status, message} = response.data;
      if(status === 200){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_username');
        localStorage.removeItem('token_creation_time');
        toast.success(message, { theme: 'dark' });
        navigate('/login');
      }else {
        toast.error(response.data.message, { theme: 'dark' });
      }
    }catch (error) {
      console.error('An unexpected error:', error);
      toast.error('An unexpected error occurred.', { theme: 'dark' });
    }
    
  }


  return (
    <div>
      <div className={`fixed top-0 left-0 w-64 card-color shadow-shadow-1 text-white h-full p-4 transition-transform transform ${toggle ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}>
        <div className='flex justify-between items-center my-2'>
          <img src={logo} alt="logo" className="w-10 sm:block hidden" />
          <p className="text-white-400 text-[18px] font-bold cursor-pointer sm:block hidden">Administrator</p>
        </div>
        <nav className="mt-28 xl:mt-16">
          {adminNavLinks.map((navItem) => {
            const IconComponent = riIcons[navItem.icon]
            return (
              <div key={navItem.id} className='admin-nav-hover mt-8'>
                <IconComponent className='text-2xl'/>
                {navItem.id === 'logout' ? (
                  <button 
                    to={navItem.link}
                    className={`${active === navItem.link ? 'text-red-600': ' text-heading-color'} font-bold text-lg`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setToggle(!toggle);
                      setActive(navItem.link);
                      Logout();
                    }}>
                    {navItem.name}
                  </button>

                ) : (
                  <Link 
                    to={navItem.link}
                    className={`${active === navItem.link ? 'text-red-600': ' text-heading-color'} font-bold text-lg`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setToggle(!toggle);
                      setActive(navItem.link);

                    }}>
                    {navItem.name}
                  </Link>
                )}
                
              </div>
            )
          })}
          
        </nav>
      </div>
      <div className="fixed top-4 left-4 my-2 right-4 flex justify-between xl:hidden z-20">
        <img src={logo} alt="logo" className="w-10 mr-auto" />
        <button onClick={() => setToggle(!toggle)}>
          <img src={toggle ? close : menu} alt="menu" className="w-10" />
        </button>
      </div>
    </div>
  )
}

export default Sidebar