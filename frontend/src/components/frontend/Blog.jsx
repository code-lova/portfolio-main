import React, { useState, useEffect } from 'react'
import axiosApiClient from '../../axios';
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";




const Blog = ({id}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selecteBlog, setSelecedBlog] = useState(null);
  const [blog, setBlog] = useState([]);
  const [threshold, setThreshold] = useState(0.4);


  const getBlogs = async () => {
    try {
      const response = await axiosApiClient.get('/fetch-blogs'); // Adjust the endpoint to your API
      const {status, blog} = response.data;
      if(status === 200){
        setBlog(blog); // Assuming response.data contains the projects array
      }
    } catch (error) {
      console.error("Unable to fetch data", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const openModal = (blog) => {
    setModalVisible(true);
    setSelecedBlog(blog);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelecedBlog(null);
  };



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


    // Function to get ordinal suffix
    const getOrdinalSuffix = (day) => {
      if (day >= 11 && day <= 13) {
          return "th";
      }
      switch (day % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
      }
    };

     //Function to format the time and date
    function timeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = now - date;

      const seconds = Math.floor(diffTime / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
          return `${seconds} sec ago`;
      } else if (minutes < 60) {
          return `${minutes} mins ago`;
      } else if (hours < 24) {
          return `${hours} hrs ago`;
      } else {
          return `${days} days ago`;
      }
    }


  return (
    <section className='w-full padding' id={id} ref={ref}>
      <motion.div 
        initial="hidden"
        animate={inView ? 'visible':'hidden'}
        variants={variants}  
        className='text-center'
      >
          <h1 className='uppercase text-coral-red tracking-wider text-sm font-bold mt-10'>Visit my blog and keep your feedback</h1>
          <p className='font-bold text-4xl tracking-wider text-heading-color lg:mt-2'>My Blog</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={inView ? 'visible':'hidden'}
        variants={variants} 
        className='lg:grid grid-cols-3 gap-5 mb-20 mt-10'
      >
        {blog && blog.length > 0 ? (
          blog.map((item) => {
           
            const formattedDate = timeAgo(item.created_at);
            return(
              <div onClick={() => openModal(item)} key={item.id} className="mt-10 p-8 cursor-pointer card-color shadow-shadow-1 rounded-lg w-full border-1 border-black hover:bg-gradient-to-r from-neutral-900 transitioning">
              <div className='p-2'>
                <img 
                  className='rounded-xl block mx-auto object-contain' 
                  src={`${import.meta.env.VITE_BASE_URL}/${item.image}`} 
                  alt="blog image" 
                  loading='lazy' 
                  width={500} 
                  height={400}
                />
                <div className='flex justify-between mt-5'>
                  <p className=' text-coral-red text-sm uppercase'>{item.blogcategory.name}</p>
                  <p className='text-sm text-color'>{formattedDate}</p>
                </div>
    
                <p className='my-6 text-xl truncate text-heading-color cursor-pointer hover:text-coral-red'>
                 {item.title}
                </p>
              </div>
            </div>
            )
          })
          ): (
            <p className='mt-10 card-color p-8 shadow-shadow-1 rounded-lg'>Fetching Blog Post...</p>
          )
        }
       

        
      </motion.div>
      
      <div className='bg-black w-full h-[1px]'></div>
      
      {modalVisible && selecteBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="card-color rounded-lg overflow-hidden shadow-lg w-11/12 md:w-2/3 lg:w-1/2 h-[80vh]">
            <div className="p-4 flex justify-end">
              <button 
                className="text-white float-right text-2xl shadow-shadow-1 rounded-full w-10 h-10 hover:text-coral-red" 
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <div className="overflow-y-auto h-[500px] p-4">
              {selecteBlog.image && 
                <img className="w-full h-64 object-cover rounded-xl" 
                src={`${import.meta.env.VITE_BASE_URL}/${selecteBlog.image}`} 
                  alt={selecteBlog.title} 
              />}
              <div className="p-4 mt-5">
                <h2 className="text-2xl font-bold text-heading-color">{selecteBlog.title}</h2>
                <p className="text-sm text-gray-500 my-5">{`${new Date(selecteBlog.created_at).toLocaleString('default', { month: 'long' })} ${new Date(selecteBlog.created_at).getDate()}${getOrdinalSuffix(new Date(selecteBlog.created_at).getDate())}, ${new Date(selecteBlog.created_at).getFullYear()}`}</p>
                <div className="mt-4 text-color leading-loose tracking-wider">
                  {selecteBlog.description
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-4 text-color">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

    
  );
}

export default Blog