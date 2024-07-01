import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosApiClient from '../../../axios';
import { toast } from 'react-toastify';

const AddCategory = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoryInput, setCategoryInput] = useState({
    name: '',
    slug: '',
    status: '',
    erroList: [],
  });


  const handleInput = (e) => {
    e.persist();
    setCategoryInput({...categoryInput, [e.target.name]: e.target.value});
  };


  const resetInputFields = () => {
    setCategoryInput({...categoryInput,
      name: '',
      slug: '',
      status: '',
      erroList: [],
    });
  }


  const createCategory = async(e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: categoryInput.name,
      slug: categoryInput.slug,
      status: categoryInput.status,
    };

    try{
      const response = await axiosApiClient.post(`/create-category`, data);
      const { message, status, errors } = response.data;
      if(status === 200){
        resetInputFields();
        navigate('/admin/category');
        toast.success(message, {
          theme: 'dark',
        })
      }else{
        setCategoryInput({...categoryInput, erroList: errors })
      }

    }catch(error){
      console.error("Unexpected Error in response:", error);
      toast.error("An unexpected error occurred.", {
        theme: "dark",
      });
    }finally{
      setLoading(false);
    }
  }

  return (
    <section className="xl:px-[280px] mt-16 px-1 mb-8 xl:ml-20">
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-bold mb-4 uppercase text-coral-red">
            Create New category
        </h1>
        <span>
            <Link to="/admin/category" className="admin-small-btn text-sm">Back</Link>
        </span>
      </div>
      <p className="text-color">Create a New Category for all of your Amazing Projects..!</p>

      <div className="">
          <div className="mt-10 card-color p-6 xl:p-10 w-full shadow-shadow-1 rounded-lg border-1 border-black">

            <form onSubmit={createCategory} className='mt-12 flex flex-col gap-8'>

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
                  {categoryInput.erroList.name}
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
                  {categoryInput.erroList.slug}
                </span>
              </label>

              <label className='flex flex-col' htmlFor="status">
                <span className='font-medium mb-1 text-color'>Status</span>
                <select name="status" className='form-label' onChange={handleInput}  value={categoryInput.status}>
                  <option value="">Please Select Status</option>
                  <option value="1">ON</option>
                  <option value="0">OFF</option>
                </select>
                <span className="text-coral-red">
                  {categoryInput.erroList.status}
                </span>
              </label>

              <div className='mt-10 md:flex justify-center'>
                <button type="submit" disabled={loading} className='my-8 w-full lg:w-[400px] md:w-[400px] rounded-lg cursor-pointer h-16 card-color shadow-shadow-1 text-coral-red tracking-wider bg-gradient-to-r from-neutral-900 hover:transitioning'>
                  {loading ? 'Creating...': 'Create Category'}
                </button>
              </div>
             
            </form>

          </div>
      </div>

    </section>
  )
}

export default AddCategory