import React from 'react';
import { profile } from '../../assets/images';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <section className='my-20 flex justify-center'>
      <div className='w-[410px] card-color h-auto rounded-2xl shadow-shadow-1 p-6'>
        <h1 className='text-center text-2xl text-coral-red font-montserrat font-extrabold'>Administrator Login</h1>
        <img src={profile} alt="my profile image" className="w-14 mt-6 block mx-auto rounded-full ring-4 shadow-lg ring-gray-600" />
        <p className="my-4 text-center text-2xl font-bold text-color">E.J</p>



      </div>
    </section>
  )
}

export default Register