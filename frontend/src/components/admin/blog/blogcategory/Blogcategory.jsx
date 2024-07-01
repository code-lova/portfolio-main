import React, { useEffect, useState } from 'react'
import { blogcat } from '../../../../assets/images';
import { Link } from 'react-router-dom';
import axiosApiClient from '../../../../axios';
import {toast} from "react-toastify"

const Blogcategory = () => {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getBlogCategories();
    },[]);

    const getBlogCategories = async() => {
        try{
            const response = await axiosApiClient.get('/blog-categories');
            const {status, categories} = response.data;
            if(status === 200){
                setCategory(categories);
                setLoading(false);
            }
        }catch(error){
            console.error("Unexpected data response:", error)
        }
    }


    const deleteBlogCategory = async (e, id) => {
        e.preventDefault();
        
        const confirmDeletion = window.confirm("Delete data?");
        if (!confirmDeletion) return;
        
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "Deleting..."; // Change button text to "Deleting...".
    
        try {
            const response = await axiosApiClient.delete(`/delete-blog-category/${id}`);
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
                Blog Categories
            </h1>
            <span>
                <Link to="/admin/add-blog-category" className="admin-small-btn text-sm">
                    Create
                </Link>
            </span>
        </div>
        <p className="text-color">List of all Blog Categories!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-72 text-center">

            { category && category.length > 0 ? (
                category.map((catItem) => {
                    return (
                        <div key={catItem.id} id='catcard' className="mt-10 card-color p-6 w-[300px] shadow-shadow-1 rounded-lg border-1 border-black">
                            <img
                                src={blogcat}
                                alt="download"
                                className="block mx-auto rounded-xl object-contain"
                                width={700}
                                height={450}
                            />
                            <p className="text-base font-extrabold text-color mt-6">
                                {catItem.name}
                            </p>
            
                            <div className="flex justify-between">
                                <Link to={`/admin/edit-blog-category/${catItem.id}`} className="admin-small-btn">
                                    Edit
                                </Link>
            
                                <button onClick={(e) => deleteBlogCategory(e, catItem.id)} className="admin-small-btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })

                ): (
                    
                    <div className="mt-16 card-color p-6 w-[300px] md:w-[400px] lg:ml-40 shadow-shadow-1 rounded-lg border-1 border-black">
                        <p className="text-heading-color font-semibold text-[18px]">You have not created any category yet</p>
                    </div>
                )
            }
        </div>

    </section>
  )
}

export default Blogcategory