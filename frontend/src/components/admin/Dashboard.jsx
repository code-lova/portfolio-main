import React, {useState, useEffect} from 'react'
import * as riIcons from "react-icons/ri";
import { Link } from 'react-router-dom';
import axiosApiClient from '../../axios';

const Dashboard = () => {


  const todayDate = new Date().getDate();

  const [visits, setVisits] = useState(0);
  const [project, setProject] = useState(0);
  const [blog, setBlog] = useState(0);
  const [projectCat, setProjectCategory] = useState(0);
  const [blogCat, setBlogCategory] = useState(0);
  const [contactMessage, setContactMessage] = useState(0);

  

  const fetchVisits = async () => {
    try {
      const response = await axiosApiClient.get('/visits');
      setVisits(response.data.visits);
    } catch (error) {
      console.error('Unable to fetch visit count', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosApiClient.get('/projects-count');
      const { projects } = response.data;
      if(projects && projects > 0){
        setProject(projects);
      }
    } catch (error) {
      console.error('Unable to fetch project count', error);
    }
  };

  const fetchBlog = async () => {
    try {
      const response = await axiosApiClient.get('/blog-count');
      const { blogs } = response.data;
      if(blogs && blogs > 0){
        setBlog(blogs);
      }
    } catch (error) {
      console.error('Unable to fetch blog count', error);
    }
  };


  const fetchProjectCategory = async () => {
    try {
      const response = await axiosApiClient.get('/project-category-count');
      const { projectCategory } = response.data;
      if(projectCategory && projectCategory > 0){
        setProjectCategory(projectCategory);
      }
    } catch (error) {
      console.error('Unable to fetch category count', error);
    }
  };


  const fetchBlogCategory = async () => {
    try {
      const response = await axiosApiClient.get('/blog-category-count');
      const { blogCategory } = response.data;
      if(blogCategory && blogCategory > 0){
        setBlogCategory(blogCategory);
      }
    } catch (error) {
      console.error('Unable to fetch blog category count', error);
    }
  };


  const fetchContactMessage = async () => {
    try {
      const response = await axiosApiClient.get('/contact-message-count');
      const { message } = response.data;
      if(message && message > 0){
        setContactMessage(message);
      }
    } catch (error) {
      console.error('Unable to fetch message count', error);
    }
  };

  



  useEffect(() => {

    fetchVisits();
    fetchProjects();
    fetchBlog();
    fetchProjectCategory();
    fetchBlogCategory();
    fetchContactMessage();

  }, []);


  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();
  
    // Format the day and month to always be two digits
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedMonth}/${formattedDay}/${year}`;
  }


  return (
    <section className='xl:px-[280px] mt-16 px-2 mb-8 xl:mt-0'>
     <h1 className="text-3xl font-bold mb-4 uppercase text-heading-color">Dashboard</h1>
      <p className='text-color'>Welcome to the admin dashboard!</p>

      {/* Add more dashboard content here */}

      <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-72'>

        <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
          <div className='flex justify-between font-bold text-2xl items-center'>
            <h1 className='uppercase text-color'> Number of Visits</h1>
            <span className='text-4xl'> <riIcons.RiWebhookLine /></span>
          </div>
          <p className='text-8xl font-extrabold text-color'>{visits}</p>
          <p className='text-3xl font-bold text-coral-red'>Date: {getFormattedDate()}</p>
        </div>

        <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
          <div className='flex justify-between font-bold text-2xl items-center'>
            <h1 className='uppercase text-color'> Number of Projects</h1>
            <span className='text-4xl'> <riIcons.RiProjector2Fill /></span>
          </div>
          <p className='text-8xl font-extrabold text-color'>{project}</p>
          <p className='text-3xl font-bold text-coral-red'>
            <Link to="/admin/projects">
                View Projects
            </Link>
          </p>
        </div>

        <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
            <div className='flex justify-between font-bold text-2xl items-center'>
              <h1 className='uppercase text-color'>List of Blog Post</h1>
              <span className='text-4xl'> <riIcons.RiBloggerLine /></span>
            </div>
            <p className='text-8xl font-extrabold text-color'>{blog}</p>
            <p className='text-3xl font-bold text-coral-red'>
              <Link to="/admin/blog">
                  All Blogs
              </Link>
            </p>
        </div>

        <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
            <div className='flex justify-between font-bold text-2xl items-center'>
              <h1 className='uppercase text-color'>Project Category</h1>
              <span className='text-4xl'> <riIcons.RiFileShield2Fill /></span>
            </div>
            <p className='text-8xl font-extrabold text-color'>{projectCat}</p>
            <p className='text-3xl font-bold text-coral-red'>
              <Link to="/admin/category">
                  view
              </Link>
            </p>
        </div>

        <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
            <div className='flex justify-between font-bold text-2xl items-center'>
              <h1 className='uppercase text-color'>Blog category</h1>
              <span className='text-4xl'> <riIcons.RiNodeTree /></span>
            </div>
            <p className='text-8xl font-extrabold text-color'>{blogCat}</p>
            <p className='text-3xl font-bold text-coral-red'>
              <Link to="/admin/blog-category">
                  view
              </Link>
            </p>
        </div>

        <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
            <div className='flex justify-between font-bold text-2xl items-center'>
              <h1 className='uppercase text-color'>Contact Messages</h1>
              <span className='text-4xl'> <riIcons.RiMessage2Fill /></span>
            </div>
            <p className='text-8xl font-extrabold text-color'>{contactMessage}</p>
            <p className='text-3xl font-bold text-coral-red'>
              <Link to="/admin/contact-message">
                  view
              </Link>
            </p>
        </div>

      </div>
    </section>
  )
}

export default Dashboard