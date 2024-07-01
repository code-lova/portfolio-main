import React from 'react';
import { testimonials } from '../../constants';

const Testimonials = ({id}) => {
  return (
    <section className='w-full padding' id={id}>
     <div className='text-center'>
          <h1 className='uppercase text-coral-red tracking-wider text-sm font-bold'>What Others Say</h1>
          <p className='font-bold text-4xl tracking-wider text-heading-color lg:mt-2'>Testimonial</p>
      </div>

      <div className='lg:flex flex-row'>
        {testimonials.map((item) => (
          <div key={item.title} className="mt-10 p-8 card-color shadow-shadow-1 rounded-lg w-full border-1 border-black">
            <div className='flex justify-between'>
              <p className='text-xl text-heading-color'>{item.name} </p>
              <div>
                {Array(item.star).fill(0).map((_, index) => (
                  <span key={index} className='text-yellow-300 text-sm '>&#9733;</span>
                ))}
              </div>
            </div>

            <p className='font-thin text-sm text-heading-color my-2'>{item.client}</p>
            <p className='mb-5 text-coral-red text-[15px]'>{item.date}</p>
            <div className='bg-black w-full h-[1px]'></div>
            <div className='mt-5'>
              <p className='info-text'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Testimonials