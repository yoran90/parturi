import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import axios from 'axios';
import useHeaderPages from '../../hooks/useHeaderPages';





const HeaderPagesName = () => {


  

  const [loadingForButton, setLoadingForButton] = React.useState(false);
  const [pages, setPages] = React.useState([{ name: '', path: '' }]);

  
  const [loading, setLoading] = React.useState(false);

  const { getHeaderPages } = useHeaderPages();

  useEffect(() => {
    if (getHeaderPages.length > 0) {
      setPages(getHeaderPages.map((page) => ({
        id: page._id,
        name: page.name || '',
        path: page.path || '',
        component: page.component || '',
        content: page.content || '',
      })));
    }
  }, [getHeaderPages]);
    

  const addAnother = () => {
    setPages([...pages, { name: '', path: '' }]);
  }

  const handlePagesChange = (index, field, value) => {
    const newPages = [...pages];
    newPages[index][field] = value;
    setPages(newPages);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForButton(true);

    try {
      for (const page of pages) {
        if (!page?.name?.trim() || !page?.path?.trim()) continue;

        if (page.id) {
          await axios.put(`http://localhost:8001/api/headerPages/updateHeaderPage/${page.id}`, {
            name: page.name.trim(),
            path: page.path.trim(),
          });
        } else {
          await axios.post('http://localhost:8001/api/headerPages/addHeaderPage', {
            name: page.name.trim(),
            path: page.path.trim(),
          });
        }
      }
      toast.success("Pages saved successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoadingForButton(false);
    }
  };

 


  return (
    <div className='md:px-4 px-2 h-[93vh] w-full overflow-y-scroll scrollbarStyle pb-12 scrollbarstyle'>
      {/* form */}
      <form onSubmit={handleSubmit} className='md:py-12 md:px-4 p-2 flex flex-col gap-4.5 mt-4 bg-white shadow border border-slate-200 rounded'>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='text-red-600'>Add Header Pages</h3>
          <p className='text-sm text-red-700'>Here you can add your header pages name as you want.</p>
        </div>

        {pages.map((page, index) => (
          <div key={index} className='flex flex-col text-sm gap-4 bg-white px-4 py-8 border border-slate-200 rounded shadow'>
            <div className='flex flex-col gap-1.5'>
              <label>Page Name</label>
              <input
                type='text'
                value={page.name}
                onChange={(e) => handlePagesChange(index, 'name', e.target.value)}
                className='border border-slate-300 p-1.5 px-3 rounded'
                placeholder='Enter page name'
              />
              <small className='text-red-600'>You can add page name like [ (Home, About Us) etc... ]</small>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label>Page Path (URL)</label>
              <input
                type='text'
                value={page.path}
                onChange={(e) => handlePagesChange(index, 'path', e.target.value)}
                className='border border-slate-300 p-1.5 px-3 rounded'
                placeholder='Enter page path'
              />
              <small className='text-red-500'>You can add page path URL here.</small>
            </div>
          </div>
        ))}
        <div className='flex flex-col gap-0.5'>
          <button type='button' onClick={addAnother} className="bg-red-600 hover:bg-red-700 w-fit cursor-pointer text-white mt-4 px-10 py-1.5 text-sm rounded">
            Add Another
          </button>
          <small className='text-slate-500'>You can add many header pages name as you want</small>
        </div>
        
        <div className='flex justify-end mt-6'>
          <button className='bg-red-600 text-white py-1.5 px-14 rounded-full text-sm cursor-pointer hover:bg-red-500 flex items-center gap-2'>
            {
              loadingForButton ? <div className='flex items-center justify-center gap-2'>
                <p>Adding</p>
                <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
              </div>  
              : 'Add pages name'

            }
          </button>
        </div>
      </form>

    </div>
  )
}

export default HeaderPagesName