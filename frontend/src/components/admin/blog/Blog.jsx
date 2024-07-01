import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosApiClient from "../../../axios";
import { toast } from "react-toastify";

const Blog = () => {

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    getBlogs();
  },[]);

  const getBlogs = async() => {
    try{
        const response = await axiosApiClient.get('/fetch-blog');
        const {status, blogs} = response.data;
        if(status === 200){
          setBlogs(blogs);
        }
    }catch(error){
        console.error("Unexpected data response:", error)
    }finally{
      setLoading(false);
    }
  }


  const deleteBlog = async (e, id) => {
    e.preventDefault();
    
    const confirmDeletion = window.confirm("Delete data?");
    if (!confirmDeletion) return;
    
    const thisClicked = e.currentTarget;
    thisClicked.innerHTML = "Deleting..."; // Change button text to "Deleting...".

    try {
        const response = await axiosApiClient.delete(`/delete-blog/${id}`);
        const { status, message } = response.data;
        
        if (status === 200) {
            toast.success(message, { theme: 'dark' });
            thisClicked.closest("#catcard").remove(); // Remove the parent div.
        } else if(status === 404) {
            toast.error(message, { theme: 'dark' });
            thisClicked.innerHTML = "Delete"; // Revert button text.
        }
    } catch (error) {
        console.error("Error deleting category", error);
        toast.error("An unexpected error occurred.", { theme: 'dark' });
        thisClicked.innerHTML = "Delete"; // Revert button text.
    }
  }






  if(loading){
    return (
        <div className="font-mono font-bold text-xl">
          <p className="text-center mt-20 text-coral-red">Loading...</p>
        </div>
    );
  }

  return (
    <section className="xl:px-[280px] mt-16 px-8 mb-8 xl:mt-1">
    <div className="flex items-center space-x-8">
      <h1 className="text-3xl font-bold mb-4 uppercase text-coral-red">
        My Portfolio Blog
      </h1>
      <span>
        <Link to="/admin/create-blog" className="admin-small-btn text-sm">
          Create
        </Link>
      </span>
    </div>
    <p className="text-color">See all amazing blogs!</p>

    <div className="mt-8 text-center grid grid-cols-1 gap-8 xl:gap-x-72 md:grid-cols-2 lg:grid-cols-3">

    
      {blogs && blogs.length > 0 ? (
        blogs.map((item) => {
          return(
            <div key={item.id} id="catcard" className="card-color p-6 w-[300px] md:p-4 shadow-shadow-1 rounded-lg">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                alt={`${item.title}` || 'image'}
                className="block mx-auto rounded-xl object-contain"
                width={700}
              />
              <div className="">
                <p className="text-base font-thin text-color mt-6">
                  {item.title}
                </p>
                <p className="text-base font-bold text-coral-red mt-6">
                  {item.blogcategory.name}
                </p>
                <p>Status: {item.status === 1 ? ("Show"): ("Hidden")}</p>
              </div>
              
    
              <div className="flex justify-between">
                <Link to={`/admin/edit-blog/${item.id}`} className="admin-small-btn">
                  Edit
                </Link>
    
                <Link onClick={(e) => deleteBlog(e, item.id)} className="admin-small-btn">
                  Delete
                </Link>
              </div>
            </div>
          )
        })
        ): (
          <div className="mt-16 card-color p-6 w-[300px] md:w-[400px] lg:ml-40 shadow-shadow-1 rounded-lg border-1 border-black">
              <p className="text-heading-color font-semibold text-[18px]">You have not created any Blog yet</p>
          </div>
        )
      }
    </div>
  </section>
  )
}

export default Blog;