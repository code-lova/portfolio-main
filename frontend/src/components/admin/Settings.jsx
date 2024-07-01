import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosApiClient from '../../axios';

const Settings = () => {

  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    oldpassword: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState({});

  const handleInput = (e) => {
    e.persist();
    setSettings({...settings, [e.target.name]: e.target.value});
  };


  const resetInputFields = () => {
    setSettings({...settings,
      oldpassword: '',
      password: '',
      password_confirmation: '',
    });
  }


  const updateSettings = async(e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      oldpassword: settings.oldpassword,
      password: settings.password,
      password_confirmation: settings.password_confirmation,
    };

    try{
      const response = await axiosApiClient.post(`/update-admin-password`, data);
      const { message, status, errors } = response.data;
      if(status === 200){
        resetInputFields();
        setError({});
        toast.success(message, {
          theme: 'dark',
        })
      }else if(status === 401){
        setError({});
        toast.error(message, {
            theme: 'dark',
          })
      }
      else if(status === 422){
        setError(errors)
      }

    }catch(error){
      console.error("Unexpected Error in response:", error);
      toast.error("An unexpected error occurred.", {
        theme: "dark",
      });
    }finally{
      setLoading(false);
    }
  }



  return (
    <section className="xl:px-[280px] mt-16 px-1 mb-8 xl:ml-20 xl:mt-2">
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold mb-4 uppercase text-coral-red">
            Administrator Settings
        </h1>
       
      </div>
    <p className="text-color">Welcome to settings where you can update Details..!</p>

      <div className="">
        <div className="mt-10 card-color p-6 xl:p-10 w-full shadow-shadow-1 rounded-lg border-1 border-black">

          <form onSubmit={updateSettings} className='mt-12 flex flex-col gap-8'>

            <label className='flex flex-col' htmlFor="name">
              <span className='font-medium mb-1 text-color'>Current Password</span>
              <input 
                type="password" 
                name='oldpassword'
                className='form-label' 
                onChange={handleInput}  
                value={settings.oldpassword}
              />
              <span className="text-coral-red">
                {error.oldpassword}
              </span>
            </label>

            <label className='flex flex-col' htmlFor="password">
              <span className='font-medium mb-1 text-color'>New Password</span>
              <input 
                type="password" 
                name='password'
                className='form-label' 
                onChange={handleInput}  
                value={settings.password}
              />
              <span className="text-coral-red">
                {error.password}
              </span>
            </label>

            <label className='flex flex-col' htmlFor="password confirmation">
              <span className='font-medium mb-1 text-color'>Confirm Password</span>
              <input 
                type="password" 
                name='password_confirmation'
                className='form-label' 
                onChange={handleInput}  
                value={settings.password_confirmation}
              />
              <span className="text-coral-red">
                {error.password_confirmation}
              </span>
            </label>

            

             <div className='mt-1 md:flex justify-center'>
              <button type="submit" disabled={loading} className='admin-form-btn'>
                {loading ? (
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
                    Processing...
                  </>
                ): 'Update Password'}
              </button>
            </div>
          
          </form>

        </div>
      </div>

    </section>
  )
}

export default Settings