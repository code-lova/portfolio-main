import React, { useState } from "react";
import { profile } from "../../assets/images";
import { toast } from "react-toastify";
import axiosApiClient, {getCsrfToken} from "../../axios";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);
    const [resetInput, setResetInput] = useState({
      email: "",
    });
    const [error, setError] = useState({});
  
    const handleInput = (e) => {
      e.persist();
      setResetInput({ ...resetInput, [e.target.name]: e.target.value });
    };
  
    const submitResetPassword = async (e) => {
      e.preventDefault();
      setBtnLoading(true);

      const data = {
        email: resetInput.email,
      };
      try {
        await getCsrfToken(); // Fetch CSRF token before login request
        const response = await axiosApiClient.post(`/forgot-password`, data);
        const { status, message, errors } = response.data;
        if (status === 200) {
            toast.success(message, { theme: "dark" });
            setError({});
        } else if (status === 422) {
          setError(errors);
          toast.error("Please fix the errors to proceed", { theme: "dark" });
        } else if(status === 401){
          setError({});
          toast.error(message, { theme: "dark" });
        }
      } catch (error) {
        console.error("An unexpected error:", error);
        toast.error("An unexpected error occurred.", {
          theme: "dark",
        });
      } finally {
        setBtnLoading(false);
      }
    };
  
    const redirectToHome = () => {
      navigate('/');
    }


  return (
    <section className="my-20 flex justify-center">
      <div className="w-[410px] card-color h-auto rounded-2xl shadow-shadow-1 p-6">
        <h1 className="text-center text-2xl text-coral-red font-montserrat font-extrabold">
          Reset Password
        </h1>
        <img
          src={profile}
          alt="my profile image"
          onClick={redirectToHome}
          className="w-14 mt-6 block mx-auto cursor-pointer rounded-full ring-4 shadow-lg ring-gray-600"
        />
        <p className="my-4 text-center text-2xl font-bold text-color">E.J</p>

        <div className="mt-1 p-6">
          <form onSubmit={submitResetPassword} className="flex flex-col gap-6">
            <label htmlFor="email" className="flex flex-col">
              <span className="font-medium mb-1 text-color">Email:</span>
              <input
                type="text"
                name="email"
                onChange={handleInput}
                value={resetInput.email}
                placeholder="Enter authorized email address"
                className="p-4 w-full h-14 cursor-pointer text-color shadow-inner-shadow bg-neutral-900 outline-none mt-2 rounded-lg focus-within:border-2 border-red-500"
              />
              {error.email && (
                <span className="text-sm text-coral-red px-2">{error.email[0]}</span>
              )}
            </label>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={btnLoading}
                className="admin-form-btn"
              >
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
                    Processing...
                  </>
                ) : "Send Password Reset Link"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default Forgotpassword