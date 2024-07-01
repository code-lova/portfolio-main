import React, { useState } from "react";
import { profile } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosApiClient, {getCsrfToken} from "../../axios";

const Login = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setloginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    try {

      
      await getCsrfToken(); // Fetch CSRF token before login request

      const response = await axiosApiClient.post(`/login`, data);
      const { status, message, errors, access_token, username, role } = response.data;

      if (status === 200) {
        localStorage.setItem("auth_token", access_token);
        localStorage.setItem("auth_username", username);
        localStorage.setItem("token_creation_time", new Date().getTime());
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
        toast.success(message, {
          theme: "dark",
        });
      } else if (status === 401) {
        toast.error(message, {
          theme: "dark",
        });
        setloginInput({ ...loginInput, error_list: [] });
      } else {
        setloginInput({ ...loginInput, error_list: errors });
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
          Administrator Login
        </h1>
        <img
          src={profile}
          alt="my profile image"
          onClick={redirectToHome}
          className="w-14 mt-6 block mx-auto cursor-pointer rounded-full ring-4 shadow-lg ring-gray-600"
        />
        <p className="my-4 text-center text-2xl font-bold text-color">E.J</p>

        <div className="mt-1 p-6">
          <form onSubmit={submitLogin} className="flex flex-col gap-6">
            <label htmlFor="email" className="flex flex-col">
              <span className="font-medium mb-1 text-color">Email:</span>
              <input
                type="text"
                name="email"
                onChange={handleInput}
                value={loginInput.email}
                className="p-4 w-full h-14 cursor-pointer text-color shadow-inner-shadow bg-neutral-900 outline-none mt-2 rounded-lg focus-within:border-2 border-red-500"
              />
              <span className="text-coral-red">
                {loginInput.error_list.email}
              </span>
            </label>

            <label htmlFor="email" className="flex flex-col">
              <span className="font-medium mb-1 text-color">Password:</span>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                value={loginInput.password}
                className="p-4 w-full h-14 text-color shadow-inner-shadow bg-neutral-900 outline-none mt-2 rounded-lg focus-within:border-2 border-red-500"
              />
              <span className="text-coral-red">
                {loginInput.error_list.password}
              </span>
            </label>

            <div className="flex space-x-16 my-4">
              <div className="flex flex-row gap-1">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="remember"
                  required
                />
                <p className="text-sm">Remember login</p>
              </div>
              <div>
                <Link to="/forgotpassword" className="text-sm text-coral-red">
                  Forgot Password?
                </Link>
              </div>
            </div>

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
              ) : "Login Account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
