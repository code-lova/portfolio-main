import React, {useState, useEffect} from "react";
import axiosApiClient from "../../axios";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";


const Portfolio = ({id}) => {

  const [project, setProject] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProject, setSelecedProject] = useState(null);

  const [threshold, setThreshold] = useState(0.4);

  //Motion effect on the component 
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


  const getProjects = async () => {
    try {
      const response = await axiosApiClient.get('/fetch-projects'); // Adjust the endpoint to your API
      if(response.data.status === 200){
        setProject(response.data.project); // Assuming response.data contains the projects array
      }
    } catch (error) {
      console.error("Unable to fetch data", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const openModal = (project) => {
    setModal(true);
    setSelecedProject(project);
  }

  const closeModal = () => {
    setModal(false);
    setSelecedProject(null);
  }
  


  return (
    <section className='w-full padding mt-8' id={id} ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? 'visible':'hidden'}
        variants={variants}  
        className='text-center'
      >
        <h1 className='uppercase text-coral-red tracking-wider text-sm font-bold'>Visit my portfolio and keep your feedback</h1>
        <p className='font-bold text-4xl tracking-wider text-heading-color lg:mt-2'>My Portfolio</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={inView ? 'visible':'hidden'}
        variants={variants}  
        className="md:grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
      >
        {project.map((item) => {
          return (
            <div onClick={() => openModal(item)} key={item.id} className='h-[90%] card-color rounded-xl cursor-pointer my-10 shadow-shadow-1 p-8 hover:bg-gradient-to-r from-neutral-900'>
              <img 
                className="object-contain ring-neutral-600 rounded-xl transitioning w-auto h-auto" 
                src={`${import.meta.env.VITE_BASE_URL}/${item.image}`} 
                alt="food recipe app"
                loading="lazy" 
              />

              <div className="mt-8">
                <h3 className="text-base font-mono text-coral-red">{item.category.name}</h3>
                <p className="text-heading-color text-2xl my-2">{item.project_name}</p>
                <p className="text-cyan-500 mt-1 text-[11px]">{item.hash_tag_tech}</p>
              </div>
          
            </div>
          )
        })}
      </motion.div>

      {modal && selectedProject && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="card-color rounded-lg overflow-hidden shadow-lg w-11/12 md:w-2/3 lg:w-10/12 h-[80vh]">
            <div className="p-4 flex justify-end">
              <button 
                className="text-white float-right text-2xl shadow-shadow-1 rounded-full w-10 h-10 hover:text-coral-red" 
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            
            <div className="">
              <div className="overflow-y-auto h-[500px] scroll-smooth px-10 xl:grid grid-cols-2 gap-x-4">

                {selectedProject.image && 
                  <img className="w-full object-cover block mx-auto rounded-xl lg:w-[600px] lg:my-[40px] xl:h-[70%]" 
                  src={`${import.meta.env.VITE_BASE_URL}/${selectedProject.image}`} 
                />}
                <div className="p-4 mt-5">
                  <h2 className="text-2xl font-bold text-heading-color">{selectedProject.category.name}</h2>
                  <p className="text-xl font-bold text-coral-red my-5">{selectedProject.project_name}</p>
                  <p className="mt-4 text-color leading-loose font-light">
                    {selectedProject.description
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index} className="text-color">
                          {paragraph}
                        </p>
                      ))
                    }
                  </p>
                
                    <a href={`${selectedProject.code_base}`} target="__blank">
                    <p className="p-2 font-bold text-coral-red">Source Code</p>
                    </a> 
                  

                  <div className="flex flex-row justify-evenly mt-12">
                    <div className="p-4 rounded-2xl text-coral-red card-color shadow-shadow-1 w-30 hover:bg-gradient-to-r from-neutral-900 transitioning">
                      <a href={selectedProject.demo_link} target="_blank" rel="noopener noreferrer">Project Demo</a>
                    </div>

                    <div className="p-4 rounded-2xl text-coral-red card-color shadow-shadow-1 w-30 hover:bg-gradient-to-r from-neutral-900 transitioning">
                      <a href={selectedProject.project_link} target="_blank" rel="noopener noreferrer">View Project</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            

          </div>
        </div>

      )}

    </section>
  )
}

export default Portfolio;