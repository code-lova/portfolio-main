import React, {useState, useEffect} from 'react'
import {profileImg} from "../../assets/images";
import * as sIIcons from "react-icons/sl";
import { findMeSocials, bestSkills } from "../../constants";
import axiosApiClient from '../../axios';

const Hero = () => {

    const logVisit = async () => {
        try {
          await axiosApiClient.post('/log-visit');
        } catch (error) {
          console.error('Unable to log visit', error);
        }
    };

    useEffect(() => {
        logVisit();
    }, []);


    const downloadCV = async () => {
        try {
            const response = await axiosApiClient.get('/download-cv', {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'jeremiah-ebizo-resume.pdf'); // or any other extension
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }catch (error) {
            console.error('There was an error downloading the file!', error);
        }
    }


  return (
    <section className='w-full padding mt-28 lg:mt-20'>
        <div className='lg:hidden px-4'>
            <div className=' shadow-2xl ring-[14px] ring-neutral-800'>
                <img src={profileImg} alt="ebizo jeremiah profile image" 
                className='rounded-lg'/>
            </div>

            <div className='mt-10'>
                <p className='font-mono uppercase text-heading-color'>Welcome to my world</p>
                <h1 className='mt-8 text-[40px] text-primary'>
                    Hi, I'm <span className='icon-color'>Jeremiah</span> 
                </h1>
                <p className='text-[23px] text-primary'>A Full Stack Web Deveoper</p>
                <p className='my-4 leading-loose text-color'>
                    I am a passionate web developer dedicated to crafting 
                    seamless and dynamic digital experiences. 
                    Explore my work to see how I bring innovative solutions 
                    to life through clean and efficient code.
                </p>
            </div>
            
            <div className='my-14 md:flex justify-between'>
                <div>
                    <p className="px-2 tracking-wider font-thin text-[15px] uppercase text-color">Find Me With</p>
                    <div className="flex space-x-2 mt-4">
                        {findMeSocials.map((socials) => {
                            const IconComponent = sIIcons[socials.icon];
                            return(
                                <div key={socials.id} className="flex w-16 h-[70px] px-6 items-center bg-[#212123] shadow-2xl rounded-md transitioning hover:bg-black">
                                    <a href={socials.link} target="_blank" title={socials.id} rel="noopener noreferrer">
                                        <IconComponent />
                                    </a> 
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button type="button" onClick={downloadCV} className='cv-btn-sm'>Download My Resume</button>
            </div>

            {/* <div className='my-10'>
                <p className="px-2 tracking-wider font-thin text-[15px] uppercase">Tech Stack</p>
                <div className="grid grid-cols-5 gap-2 mt-4">
                    {technologies.map((tech) => (
                        <div key={tech.name} className="flex w-14 h-[60px] p-2 items-center bg-[#212123] shadow-2xl rounded-md transitioning">
                            <img src={tech.icon} alt="tech stack" className='w-[40px] h-[40px]'
                            />
                        </div>
                    ))}
                </div>
            </div> */}

            <div className='bg-black w-full h-[1px]'></div>
                
        </div>

        <div className='lg:block sm:hidden hidden'>
            <div className='grid grid-cols-2 gap-12 my-20'>
                <div className=''>
                    <p className='font-mono font-bold uppercase text-heading-color'>Welcome to my world</p>
                    <h1 className='mt-8 text-[55px] text-primary font-bold'>
                        Hi, I'm <span className='icon-color'>Jeremiah</span> 
                    </h1>
                    <p className='text-[23px] text-heading-color'>A Full Stack Web Deveoper</p>
                    <p className='my-2 leading-loose text-primary'>
                        I am a passionate web developer dedicated to crafting 
                        seamless and dynamic digital experiences. 
                        Explore my work to see how I bring innovative solutions 
                        to life through clean and efficient code.
                    </p>

                    <div className='flex space-x-14 mt-16'>

                        <div>
                            <p className="tracking-wider font-medium text-[13px] text-slate-400 uppercase">Find Me With</p>
                            <div className="flex space-x-2 mt-2">
                                {findMeSocials.map((socials) => {
                                    const IconComponent = sIIcons[socials.icon];
                                    return(
                                        <div key={socials.id} className="flex w-14 h-[60px] px-5 items-center bg-[#1e1e20] shadow-2xl shadow-black rounded-md transitioning hover:bg-black">
                                            <a href={socials.link} target="_blank" rel="noopener noreferrer">
                                                <IconComponent />
                                            </a> 
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <p className="tracking-wider font-medium text-[13px] uppercase text-slate-400">View My Resume</p>
                            {/* <div className="flex space-x-2 mt-2">
                                {bestSkills.map((skills) => {
                                    return(
                                        <div key={skills.title} className="flex w-14 p-1 h-[60px] items-center bg-[#27262c] rounded-md transitioning shadow-2xl shadow-black">
                                           <img src={skills.name} alt="skills set" className='w-12 h-10' />
                                        </div>
                                    )
                                })}
                            </div> */}
                            <button type="button" onClick={downloadCV} className='cv-btn'>Download Resume</button>
                        </div>
                        
                    </div>

                </div>

                <div>
                    <img src={profileImg} alt="ebizo jeremiah profile image" 
                        className='rounded-lg object-contain shadow-2xl ring-neutral-800 ring-8'
                    />
                </div>
            </div>
            
            <div className='bg-black w-full h-[1px]'></div>


        </div>
       
       
    </section>
  )
}

export default Hero;