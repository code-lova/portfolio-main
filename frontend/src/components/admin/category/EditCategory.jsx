import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosApiClient from '../../../axios';
import { toast } from 'react-toastify';

const EditCategory = () => {
    const [loading, setLoading] = useState(false);
    const [categoryInput, setCategory] = useState({
        name: '',
        slug: '',
        status: '',
    });
    const [error, setErrors] = useState({});
    let { id } = useParams();

   
    const getCategory = async () => {
        try {
            const response = await axiosApiClient.get(`/edit-category/${id}`);
            
            const { status, category } = response.data;
            if (status === 200) {
                setCategory(category);
            }
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, [id]);


    const handleInput = (e) => {
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    };

  
    const Update = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosApiClient.post(`/update-category/${id}`, categoryInput);
            const {status, message, errors} = response.data;
            if (status === 200) {
                toast.success(message, { theme: 'dark' });
                setErrors({});
            } else if (status === 422) {
                setErrors(errors);
            } else {
                toast.error("An unexpected error occurred.", {
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Unexpected Error in response:", error);
            toast.error("An unexpected error occurred.", {
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="xl:px-[280px] mt-16 px-1 mb-8">
            <div className="flex items-center space-x-8">
                <h1 className="text-3xl font-bold mb-4 uppercase text-coral-red">
                    Update a Category
                </h1>
                <span>
                    <Link to="/admin/category" className="admin-small-btn text-sm">Back</Link>
                </span>
            </div>
            <p className="text-color">Update a Project Category.</p>

            <div className="">
                <div className="mt-10 card-color p-6 xl:p-10 w-full shadow-shadow-1 rounded-lg border-1 border-black">

                    <form onSubmit={Update} className='mt-12 flex flex-col gap-8'>

                        <label className='flex flex-col' htmlFor="name">
                            <span className='font-medium mb-1 text-color'>Category Name</span>
                            <input 
                                type="text" 
                                name='name'
                                className='form-label' 
                                required
                                onChange={handleInput}  
                                value={categoryInput.name}
                            />
                            <span className="text-coral-red">
                                {error.name}
                            </span>
                        </label>

                        <label className='flex flex-col' htmlFor="slug">
                            <span className='font-medium mb-1 text-color'>Slug</span>
                            <input 
                                type="text" 
                                name='slug'
                                className='form-label' 
                                required
                                onChange={handleInput}  
                                value={categoryInput.slug}
                            />
                            <span className="text-coral-red">
                                {error.slug}
                            </span>
                        </label>

                        <label className='flex flex-col' htmlFor="status">
                            <span className='font-medium mb-1 text-color'>Status</span>
                            <select name="status" className='form-label' onChange={handleInput} value={categoryInput.status}>
                                <option value="1">ON</option>
                                <option value="0">OFF</option>
                            </select>
                            <span className="text-coral-red">
                                {error.status}
                            </span>
                        </label>

                        <button type="submit" disabled={loading} className='my-8 w-full rounded-lg cursor-pointer h-16 card-color shadow-shadow-1 text-coral-red tracking-wider bg-gradient-to-r from-neutral-900 hover:transitioning'>
                            {loading ? 'Updating...' : 'Update Category'}
                        </button>
                    </form>

                </div>
            </div>

        </section>
    );
};

export default EditCategory;
