import React, {useState} from 'react';
import { toast } from 'react-toastify';
import axiosApiClient from '../../axios';

const Switch = () => {

    const [loading, setLoading] = useState(false);
    const [settingInput, setSettingInput] = useState({
        blog: '',
        email_notification: '',
        erroList: [],
    });


  const handleInput = (e) => {
    e.persist();
    setSettingInput({...settingInput, [e.target.name]: e.target.value});
  };


  const resetInputFields = () => {
    setSettingInput({...settingInput,
      blog: '',
      email_notification: '',
      erroList: [],
    });
  }


  const submitStatusUpdate = async(e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
        blog: settingInput.blog,
        email_notification: settingInput.email_notification,
    };

    try{
      const response = await axiosApiClient.post(`/update-switch-settings`, data);
      const { message, status, errors } = response.data;
      if(status === 200){
        resetInputFields();
        toast.success(message, { theme: 'dark' })
      }else if(status === 422){
        setSettingInput({...settingInput, erroList: errors })
      }
    }catch(error){
      console.error("Unexpected Error in response:", error);
      toast.error("An unexpected error occurred.", { theme: "dark" });
    }finally{
      setLoading(false);
    }
  }

  return (
    <section className="xl:px-[280px] mt-16 px-1 mb-8 xl:ml-20">
        <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold mb-4 uppercase text-coral-red">
            Update Alert
        </h1>
       
        </div>
        <p className="text-color">Switch On or Off the email and blog..!</p>

        <div className="">
            <div className="mt-10 card-color p-6 xl:p-10 w-full shadow-shadow-1 rounded-lg border-1 border-black">

            <form onSubmit={submitStatusUpdate} className='mt-12 flex flex-col gap-8'>
                <label className='flex flex-col' htmlFor="status">
                    <span className='font-medium mb-1 text-color'>Email Notification</span>
                    <select name="email_notification" className='form-label' onChange={handleInput}  value={settingInput.email_notification}>
                        <option value="">Set Email Alert Status</option>
                        <option value="1">ON</option>
                        <option value="0">OFF</option>
                    </select>
                    <span className="text-coral-red">
                        {settingInput.erroList.email_notification}
                    </span>
                </label>

                <label className='flex flex-col' htmlFor="status">
                    <span className='font-medium mb-1 text-color'>Blog State</span>
                    <select name="blog" className='form-label' onChange={handleInput}  value={settingInput.blog}>
                        <option value="">Set Blog Status</option>
                        <option value="1">ON</option>
                        <option value="0">OFF</option>
                    </select>
                    <span className="text-coral-red">
                        {settingInput.erroList.blog}
                    </span>
                </label>

                <div className='mt-10 md:flex justify-center'>
                <button type="submit" disabled={loading} className='my-8 w-full lg:w-[400px] md:w-[400px] rounded-lg cursor-pointer h-16 card-color shadow-shadow-1 text-coral-red tracking-wider bg-gradient-to-r from-neutral-900 hover:transitioning'>
                    {loading ? 'Updating...': 'Update Switch'}
                </button>
                </div>
            </form>
            </div>
        </div>

  </section>
  )
}

export default Switch