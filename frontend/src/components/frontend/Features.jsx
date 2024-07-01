import React, {useState, useRef, useEffect} from 'react'
import { features } from '../../constants';
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Features = ({ id }) => {

  const [threshold, setThreshold] = useState(0.4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Adjust the breakpoint as needed
        setThreshold(0.1);
      } else {
        setThreshold(0.4);
      }
    };

    handleResize(); // Set initial threshold
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  


  return (
    <section className='w-full padding' id={id} ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? 'visible':'hidden'}
        variants={variants} 
        className='text-center md:text-left lg:text-left'
      >
        <h1 className='uppercase text-coral-red tracking-wider'>Features</h1>
        <p className='font-bold text-3xl lg:text-4xl tracking-wider text-heading-color'>What I Do</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={inView ? 'visible':'hidden'}
        variants={variants} 
        className='grid grid-cols-1 lg:grid-cols-3 gap-5 md:grid-cols-2'
      >
        {features.map((feature) => (
          <div key={feature.title} className='mt-10 card-color w-full h-[320px] lg:h-[320px] md:h-[320px] rounded-lg p-8 shadow-shadow-1 transitioning hover:bg-gradient-to-r from-neutral-900'>
            <img src={feature.icon} alt="frontend dev" width={45} height={20} className='my-2'/>
            <p className='text-heading-color my-4 text-xl'>{feature.title}</p>
            {feature.desc.map((description, index) => (
              <p key={index} className='text-heading-color tracking-wider font-thin'>{description}</p>
            ))}
          </div>
        ))}
      </motion.div>

    </section>
  )
}

export default Features