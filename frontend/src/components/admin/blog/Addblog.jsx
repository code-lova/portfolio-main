import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosApiClient from '../../../axios';
import { toast } from 'react-toastify';

const Addblog = () => {

  const [blogInput, setBlogInput] = useState({
    blog_category_id: '',
    title: '',
    description: '',
    meta_title: '',
    meta_keywords: '',
    meta_description: '',
    status: '',
  });
  const [error, setErrors] = useState({});
  const [picture, setPicture] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  },[]);


  const getCategories = async() => {
    try{
        const response = await axiosApiClient.get('/blog-categories');
        const {status, categories} = response.data;
        if(status === 200){
          setCategory(categories);
        }
    }catch(error){
        console.error("Unexpected data response:", error)
    }
  }




  const handleInput = (e) => {
    e.persist();
    setBlogInput({...blogInput, [e.target.name]: e.target.value});
  }

  
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  }

  const resetInputFields = () => {
    setBlogInput({
      ...blogInput,
      blog_category_id: '',
      title: '',
      description: '',
      meta_title: '',
      meta_keywords: '',
      meta_description: '',
      status: '',
    })
  };


  const createBlog = async(e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append('image', picture.image);
    formData.append('blog_category_id', blogInput.blog_category_id);
    formData.append('title', blogInput.title);
    formData.append('description', blogInput.description);
    formData.append('meta_title', blogInput.meta_title);
    formData.append('meta_keywords', blogInput.meta_keywords);
    formData.append('meta_description', blogInput.meta_description);
    formData.append('status', blogInput.status);

    try{
      const response = await axiosApiClient.post('/store-blog', formData);
      const {status, message, errors} = response.data;
      if(status === 200){
        resetInputFields();
        setErrors({});
        imageInputRef.current.value = ''; //clearing image input field
        setPicture([]); // reset image state
        navigate('/admin/blog');
        toast.success(message, { theme: 'dark' });
      }else if(status === 422){
        setErrors(errors);
      }else{
        toast.error(message, { theme: 'dark'});
      }
    }catch(error){
      console.error("Error creating new peoject:", error);
      toast.error("An unexpected error occurred.", {
        theme: "dark",
      });
    }finally{
      setBtnLoading(false);
    }
  }




  return (
    <section className="xl:px-[280px] mt-16 xl:mt-8 px-1 mb-8 xl:ml-18">
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold mb-4 uppercase text-coral-red">
            Create a new blog
        </h1>
        <span>
            <Link to="/admin/blog" className="admin-small-btn text-sm">Back</Link>
        </span>
      </div>
      <p className="text-color">Create a Blog to keep others informed..!</p>

      <div className="">
        <div className="mt-10 card-color p-6 w-full xl:w-[1000px] shadow-shadow-1 rounded-lg border-1 border-black">

          <form encType='multipart/form-data' onSubmit={createBlog}>

            <div className='mt-12 flex flex-col gap-8 lg:grid grid-cols-2'>

              <label className='flex flex-col' htmlFor="title">
                <span className='font-medium mb-1 text-color'>Blog Title</span>
                <input 
                  type="text" 
                  name='title'
                  className='form-label' 
                  required
                  onChange={handleInput}  
                  value={blogInput.title}
                />
                <span className="text-coral-red">
                  {error.title}
                </span>
              </label>

              <label className='flex flex-col' htmlFor="catid">
                <span className='font-medium mb-1 text-color'>Select Category</span>
                <select name="blog_category_id" className='form-label' onChange={handleInput}  value={blogInput.blog_category_id}>
                  <option value="">Select category</option>
                  {category.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    )
                  })}
                </select>
                <span className="text-coral-red">
                  {error.blog_category_id}
                </span>
              </label>

              <label className='flex flex-col' htmlFor="image">
                <span className='font-medium mb-1 text-color'>Blog Image</span>
                <input 
                  type="file" 
                  name='image'
                  className='form-label form-input' 
                  required
                  onChange={handleImage}  
                  ref={imageInputRef}
                />
                <span className="text-coral-red">
                  {error.image}
                </span>
              </label>


              <label className='flex flex-col' htmlFor="meta_title">
                <span className='font-medium mb-1 text-color'>Meta Title</span>
                <input 
                  type="text" 
                  name='meta_title'
                  className='form-label' 
                  required
                  onChange={handleInput}  
                  value={blogInput.meta_title}
                />
                <span className="text-coral-red">
                  {error.meta_title}
                </span>
              </label>

              <label className='flex flex-col' htmlFor="meta_keyword">
                <span className='font-medium mb-1 text-color'>Meta Keyword</span>
                <input 
                  type="text" 
                  name='meta_keywords'
                  className='form-label' 
                  required
                  onChange={handleInput}  
                  value={blogInput.meta_keywords}
                />
                <span className="text-coral-red">
                  {error.meta_keywords}
                </span>
              </label>


              <label className='flex flex-col' htmlFor="status">
                <span className='font-medium mb-1 text-color'>Status</span>
                <select name="status" className='form-label' onChange={handleInput}  value={blogInput.status}>
                  <option value="">Please Select Status</option>
                  <option value="1">Show</option>
                  <option value="0">Hide</option>
                </select>
                <span className="text-coral-red">
                  {error.status}
                </span>
              </label>

            </div>

            <label className='flex flex-col mt-10' htmlFor="description">
              <span className='font-medium mb-1 text-color'>Description</span>
              <textarea 
                name="description"
                className='textarea'
                onChange={handleInput}  
                value={blogInput.description}
              />
              <span className="text-coral-red">
                {error.description}
              </span>
            </label>

            <label className='flex flex-col mt-10' htmlFor="meta_description">
              <span className='font-medium mb-1 text-color'>Meta Description</span>
              <textarea 
                name="meta_description"
                className='textarea'
                onChange={handleInput}  
                value={blogInput.meta_description}
              />
              <span className="text-coral-red">
                {error.meta_description}
              </span>
            </label>

            
            
            <div className='mt-10 md:flex justify-center'>
              <button type="submit" disabled={btnLoading} className='admin-form-btn'>
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
                ): 'Create Blog'}
              </button>
            </div>
            

          </form>
        </div>
      </div>
    </section>
  )
}

export default Addblog