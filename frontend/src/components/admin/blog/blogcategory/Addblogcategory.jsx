import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosApiClient from '../../../../axios';
import { toast } from 'react-toastify';

const Addblogcategory = () => {


  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [categoryInput, setCategoryInput] = useState({
    name: '',
    slug: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: '',
    status: '',
  });

  const [error, setError] = useState({});


 

  const handleInput = (e) => {
    e.persist();
    setCategoryInput({...categoryInput, [e.target.name]: e.target.value});
  };


  const resetInputFields = () => {
    setCategoryInput({...categoryInput,
      name: '',
      slug: '',
      meta_title: '',
      meta_keyword: '',
      meta_description: '',
      status: '',
    });
  }


  const createCategory = async(e) => {
    e.preventDefault();
    setBtnLoading(true);

    const data = {
      name: categoryInput.name,
      slug: categoryInput.slug,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_description: categoryInput.meta_description,
      status: categoryInput.status,
    };

    try{
      const response = await axiosApiClient.post(`/create-blog-category`, data);
      const { message, status, errors } = response.data;
      if(status === 200){
        resetInputFields();
        navigate('/admin/blog-category');
        toast.success(message, {
          theme: 'dark',
        })
      }else{
        setError(errors);
      }

    }catch(error){
      console.error("Unexpected Error in response:", error);
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
            Add New Blog Category
        </h1>
        <span>
            <Link to="/admin/blog-category" className="admin-small-btn text-sm">Back</Link>
        </span>
      </div>
      <p className="text-color">Add a new Blog Category for your Blog..!</p>

      <div className="">
        <div className="mt-10 card-color p-6 w-full xl:w-[1000px] shadow-shadow-1 rounded-lg border-1 border-black">

          <form onSubmit={createCategory}>

            <div className='mt-12 flex flex-col gap-8 lg:grid grid-cols-2'>

              <label className='flex flex-col' htmlFor="project name">
                <span className='font-medium mb-1 text-color'>Name</span>
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
                  {error.name}
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
                  value={categoryInput.meta_title}
                />
                <span className="text-coral-red">
                  {error.meta_title}
                </span>
              </label>

              <label className='flex flex-col' htmlFor="meta_keyword">
                <span className='font-medium mb-1 text-color'>Meta Keyword</span>
                <input 
                  type="text" 
                  name='meta_keyword'
                  className='form-label' 
                  required
                  onChange={handleInput}  
                  value={categoryInput.meta_keyword}
                />
                <span className="text-coral-red">
                  {error.meta_keyword}
                </span>
              </label>

              <label className='flex flex-col' htmlFor="status">
                <span className='font-medium mb-1 text-color'>Status</span>
                <select name="status" className='form-label' onChange={handleInput}  value={categoryInput.status}>
                  <option value="">Please Select Status</option>
                  <option value="1">Show</option>
                  <option value="0">Hide</option>
                </select>
                <span className="text-coral-red">
                  {error.status}
                </span>
              </label>


              <label className='flex flex-col' htmlFor="meta_description">
                <span className='font-medium mb-1 text-color'>Meta Description</span>
                <textarea 
                  name="meta_description"
                  className='textarea'
                  onChange={handleInput}  
                  value={categoryInput.meta_description}
                />
                <span className="text-coral-red">
                  {error.meta_description}
                </span>
              </label>

            </div>
            
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
                ): 'Create Category'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  )
}

export default Addblogcategory