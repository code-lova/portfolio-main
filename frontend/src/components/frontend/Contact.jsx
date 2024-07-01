import React, { useState } from 'react';
import { contact1 } from '../../assets/images';
import { contact } from '../../constants';
import {findMeSocials } from '../../constants';
import * as sIIcons from "react-icons/sl";
import axiosApiClient from '../../axios';
import { toast } from 'react-toastify';



const Contact = ({id}) => {

  const [btnLoading, setBtnLoading] = useState(false);

  const [contactInput, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState({});

  const handleInput = (e) => {
    e.persist();
    setContact({...contactInput, [e.target.name]: e.target.value});
  }


  const resetInputFields = () =>{
    setContact({...contactInput,
      name: "",
      email: "",
      message: "",
    });
}


  const sendMessage = async(e) => {
    e.preventDefault();
    setBtnLoading(true);
    const data = contactInput;
    try{
      const response = await axiosApiClient.post(`/contact-message`, data);
      const { message, status, errors } = response.data;
      if(status === 200){
        resetInputFields();
        setError({});
        toast.success(message, { theme: 'dark' })
      }else if(status === 422){
        setError(errors)
      }
    }catch(error){
      console.error("Unexpected Error in response:", error);
      toast.error("An unexpected error occurred.", { theme: "dark" });
    }finally{
      setBtnLoading(false);
    }

  }
  
  return (
    <section className='w-full padding' id={id}>
       <div className='text-center'>
          <h1 className='uppercase text-coral-red tracking-wider text-sm font-bold mt-1'>Contact</h1>
          <p className='font-bold text-4xl tracking-wider text-heading-color lg:mt-2'>Contact Me</p>
      </div>

      <div className='lg:grid grid-cols-2 gap-8'>

        <div className="mt-10 p-4 card-color shadow-shadow-1 rounded-lg w-full border-1 border-black">
          <div className='p-2'>
            <img className='rounded-xl object-contain w-full transitioning' src={contact1} alt="blog image" loading='lazy'/>
            <h1 className='my-4 text-3xl font-bold tracking-wider text-heading-color'>Jeremiah Ebizo</h1>
            <p className='my-2 text-xl text-coral-red'>Fullstack Web Developer</p>
            <p className='text-color text-[17px] mb-6'>I am available for freelance work. Connect with me via and call or email. </p>
            {contact.map((contacts) => (
              <div key={contacts.title}>
                <p className='text-color'>Phone: <span className='text-heading-color px-2'>{contacts.phone}</span> </p>
                <p className='text-color'>Email: <span className='text-heading-color px-2'>{contacts.email}</span> </p>
              </div>
            ))}
           
           <div className='my-14'>
                <p className="tracking-wider font-thin text-[15px] uppercase text-color">Find Me With</p>
                <div className="flex space-x-2 mt-4">
                    {findMeSocials.map((socials) => {
                        const IconComponent = sIIcons[socials.icon];
                        return(
                          <a href={socials.link} target="_blank" title={socials.id} rel="noopener noreferrer" key={socials.id}>
                            <div className="flex w-16 h-[70px] px-6 items-center card-color shadow-shadow-1 rounded-md hover:bg-gradient-to-r from-neutral-900 transitioning">
                              <IconComponent />
                            </div>
                          </a> 
                        )
                    })}
                </div>
            </div>

          </div>
        </div>


        <div className='mt-10 p-10 card-color shadow-shadow-1 rounded-lg w-full border-1 border-black'>
          
          <form onSubmit={sendMessage} className='mt-12 flex flex-col gap-8'>

            <label className='flex flex-col' htmlFor="name">
              <span className='font-medium mb-1 text-color'>Your Name</span>
              <input 
                type="text" 
                name='name'
                className='p-4 w-full h-14 text-color shadow-inner-shadow bg-neutral-900 outline-none mt-2 rounded-lg focus-within:border-2 border-red-500' 
                required
                onChange={handleInput}  
                value={contactInput.name}
              />
              <span className="text-coral-red">
                {error.name}
              </span>
            </label>

            <label className='flex flex-col' htmlFor="email">
              <span className='font-medium mb-1 text-color'>Email</span>
              <input 
                type="text" 
                name='email'
                onChange={handleInput} 
                className='p-4 w-full h-14 text-color shadow-inner-shadow bg-neutral-900 outline-none mt-2 rounded-lg focus-within:border-2 border-red-500' 
                required
                value={contactInput.email}
              />
              <span className="text-coral-red">
                {error.email}
              </span>
            </label>


            <label className='flex flex-col' htmlFor="message">
              <span className='font-medium mb-1 text-color'>Message</span>
              <textarea 
                name="message"
                onChange={handleInput}
                value={contactInput.message}
                required
                className='p-4 w-full h-40 text-color shadow-inner-shadow bg-neutral-900 outline-none mt-2 rounded-lg focus-within:border-2 border-red-500' 
              />
              <span className="text-coral-red">
                {error.message}
              </span>
            </label>

            <div className='md:flex justify-center'>
              <button type="submit" disabled={btnLoading} className='admin-form-btn'>
                {btnLoading ? (
                  <>
                    <svg 
                      className="animate-spin h-5 w-5 text-coral-red mr-3" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 10-8 8h4l-3-3 3-3H4z"
                      />
                    </svg>
                    Sending Message...
                  </>
                ): 'Send Message'}
              </button>
            </div>


          </form>

        </div>
      </div>

      <div className='bg-black w-full h-[1px] mt-20'></div>

     

    </section>
  )
}

export default Contact