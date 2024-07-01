import React, {useState, useEffect, useRef} from 'react';
import { education, devskill, designSkill, technologies } from "../../constants";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";




// Transform the array to an object
const progressDev = devskill.reduce((acc, skill) => {
  acc[skill.id] = parseInt(skill.score);
  return acc;
}, {});

const progressDesign = designSkill.reduce((acc, skill) => {
  acc[skill.id] = parseInt(skill.score);
  return acc;
}, {});


const ProgressBar = ({ id, label, percentage }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-500">{label}</span>
        <span className="text-base font-medium text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          id={id}
          className="progress-bar h-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center leading-8"
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
  );
};



const Resume = ({id}) => {
  const [activeSection, setActiveSection] = useState('education');
  const skillContainerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

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


 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            const allProgressBars = { ...progressDev, ...progressDesign };
            for (const [id, percentage] of Object.entries(allProgressBars)) {
              document.getElementById(id).style.width = `${percentage}%`;
            }
            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillContainerRef.current) {
      observer.observe(skillContainerRef.current);
    }

    return () => {
      if (skillContainerRef.current) {
        observer.unobserve(skillContainerRef.current);
      }
    };
  }, [hasAnimated, progressDev, progressDesign]);



  return (
    <section className='w-full padding' id={id} ref={ref}>
       <div className='text-center'>
          <h1 className='uppercase text-coral-red tracking-wider text-sm font-bold'>6+ Years of Experience</h1>
          <p className='font-bold text-4xl tracking-wider text-heading-color lg:mt-2'>My Resume</p>
      </div>

      
      <div className='mt-10 flex flex-col p-2 card-color shadow-shadow-1 rounded-lg text-heading-color'>
        <ul className='text-center text-xl space-x-3 cursor-pointer md:flex justify-around md:space-x-0 list-none'>
        <li
            className={`ul-li-style ${activeSection === 'education' ? 'text-coral-red scale-105 shadow-shadow-1' : 'text-heading-color'}`}
            id='education'
            onClick={() => setActiveSection('education')}
          >
            Education
          </li>
          <li
            className={`ul-li-style ${activeSection === 'professional-skill' ? 'text-coral-red scale-105 shadow-shadow-1' : 'text-heading-color'}`}
            id='professional-skill'
            onClick={() => setActiveSection('professional-skill')}
          >
            Professional Skills
          </li>
          <li
            className={`ul-li-style ${activeSection === 'experience' ? 'text-coral-red scale-105 shadow-shadow-1' : 'text-heading-color'}`}
            id='experience'
            onClick={() => setActiveSection('experience')}
          >
            Experience
          </li>
        </ul>
      </div>

      {/* Education */}
      <div className={`mt-20 ${activeSection === 'education' ? '' : 'hidden'}`} id='education'>
        <h1 className='text-coral-red text-3xl'>Educational Qualification </h1>

        <div className="relative flex mt-5 flex-col items-start md:grid grid-cols-2">
          <div className="absolute left-[0.3rem] top-0 bottom-0 w-1 bg-black"></div>

          {education.map((edu) => {
            return (
              <div key={edu.id} className="relative flex items-center mb-8">
                <div className="relative z-10">
                    <div className="w-4 h-4 card-color rounded-full border-4 border-black flex items-center justify-center">
                        <div className="absolute w-6 h-1 bg-black left-[0.7rem] ml-1"></div>
                    </div>
                </div>
                <div className=" ml-6 p-8 card-color shadow-shadow-1 rounded-lg w-full border-1 border-black hover:bg-gradient-to-r from-neutral-900">
                  <h1 className='text-3xl text-heading-color'>{edu.name}</h1>
                  <p className='text-sm font-thin text-heading-color'>{edu.school} {edu.year}</p>
                  <p className='mt-1 text-coral-red'>{edu.type}</p>
                  
                  <div className='bg-black w-full h-[1px] my-8'></div>
    
                  <p className="text-heading-color text-[18px] font-light text-justify leading-loose"> 
                    {edu.description}
                  </p>
                </div>
              </div>
            )
          })}
          
          
        </div>
      </div>

      {/* Professional Skills */}
      <div className={`px-8 ${activeSection === 'professional-skill' ? 'md:grid grid-cols-2 gap-8' : 'hidden'} `} id='professional-skill'>

        <div className='mt-20'>
          <h1 className="text-coral-red text-[35px] mb-8">Dev Skills</h1>

          <div ref={skillContainerRef} className="space-y-4">
            {Object.entries(progressDev).map(([key, value]) => (
              <ProgressBar key={key} id={key} label={key.toUpperCase()} percentage={value} />
            ))}
          </div>
        </div>

        <div className='mt-20'>
          <h1 className="text-coral-red text-[35px] mb-8">Design Skills</h1>

          <div ref={skillContainerRef} className="space-y-4">
            {Object.entries(progressDesign).map(([key, value]) => (
              <ProgressBar key={key} id={key} label={key} percentage={value} />
            ))}
          </div>
        </div>
      </div>

      {/* Experience Tech Stack Skills */}
      <div className={`mt-20 ${activeSection === 'experience' ? '' : 'hidden'}`} id='experience'>
        <h1 className='px-5 text-coral-red text-center text-3xl'>Tech Stack</h1>
        <p className="px-2 tracking-wider text-center font-thin text-[15px] uppercase">All tech stacks i have used in web and software development </p>
        <div className="px-5 grid grid-cols-6 gap-2 mt-10 lg:ml-40">
            {technologies.map((tech) => (
                <div key={tech.name} className="flex w-14 h-[60px] p-2 items-center bg-[#212123] shadow-2xl rounded-md transitioning">
                    <img src={tech.icon} alt="tech stack" className='w-[40px] h-[40px]'/>
                </div>
            ))}
        </div>
      </div>
      

    </section>
  )
}

export default Resume