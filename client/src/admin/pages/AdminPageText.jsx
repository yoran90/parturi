import React from 'react'

const AdminPageText = () => {
  return (
    <div className='flex flex-col gap-3.5 items-center justify-center w-full h-screen -mt-32 px-8 text-center'>
      <h3 className='text-lg font-semibold text-red-600'>Welcome to Admin Pannel</h3>
      <p className='text-red-600'>Please select an option from the sidebar to get started with your admin panel.</p>
      <p className='text-sm text-red-600'>
        This admin panel allows you to manage all aspects of your application efficiently. 
        You can add, edit, or remove products, manage media content like images and videos, 
        and monitor user activity. Use the sidebar to navigate through different sections, 
        view reports, and customize settings to optimize performance. 
        Remember to save your changes frequently, and if you encounter any issues, refer 
        to the documentation or contact support for assistance.
      </p>
    </div>
  )
}

export default AdminPageText