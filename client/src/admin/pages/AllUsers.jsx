import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { getUserDataById } from '../../store/admin-auth';

const AllUsers = () => {


  const { admin } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getAllusersForAdmin, setGetAllusersForAdmin] = React.useState([]);

  useEffect(() => {
    const fetchAllUsres = async () => {
      const response = await axios.get("http://localhost:8001/api/auth/allUsers", { withCredentials: true });
      setGetAllusersForAdmin(response.data.data);
    }
    fetchAllUsres();
  }, []);
  
  if (admin?.role !== "super-admin") {
    return (
      <div className='mt-2 px-2'>
        <h1 className='text-center'>You are not authorized to access this page</h1>
      </div>
    )
  }


  const handleEditUser = (id) => {
    dispatch(getUserDataById(id));
    navigate(`/admin/edit-user/${id}`);
  }


  return (

    <div className='mt-2 px-2'>
      <div className='flex flex-col items-center text-center justify-center'>
        <h1>All Usres</h1>
        <h3 className='text-sm text-slate-600'>Here you can handle all users</h3>
      </div>
      <table className='w-full mt-4 border'>
        <thead className='bg-black text-white text-sm'>
          <tr>
            <th className='py-1.5'>Image</th>
            <th className='py-1.5'>First Name</th>
            <th className='py-1.5'>Last Name</th>
            <th className='py-1.5'>Email</th>
            <th className='py-1.5'>Gender</th>
            <th className='py-1.5'>Role</th>
            <th className='py-1.5'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            getAllusersForAdmin?.map((user) => (
              <tr key={user._id} className='text-sm text-center border'>
                <td className='py-1'>
                  {
                    user?.profileImage?.url ? (
                      <img className='w-8 h-8 rounded-full border ml-1' src={user?.profileImage?.url} alt="" />
                    ) : (
                      user.gender === 'men' ? (
                        <img className='w-8 h-8 rounded-full border ml-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-8 h-8 rounded-full border ml-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                      )
                    )
                  }
                </td>
                <td className='py-1'>{user?.firstName}</td>
                <td className='py-1'>{user?.lastName}</td>
                <td className='py-1 text-slate-500'>{user?.email}</td>
                <td className='py-1'>{user?.gender}</td>
                <td className='py-1'>
                  {
                    user?.role === "user" ? (
                      <span className='bg-green-600 text-white w-fit text-sm rounded px-4 py-1'>User</span>
                    ) : user?.role === "admin" ? (
                      <span className='bg-red-600 text-white text-sm rounded w-fit px-2.5 py-1'>Admin</span>
                    ) : (
                      <span className='bg-[#e69500] text-white text-sm rounded w-fit px-2.5 py-1'>Owner</span>
                    )
                  }
                </td>
                <td className='py-1 flex items-center justify-center gap-2 mt-1'>
                  <button className='cursor-pointer' onClick={() => handleEditUser(user._id)}>
                    <FaEdit size={20} className='text-green-600' />
                  </button>
                  <button className='cursor-pointer'>
                    <BsTrash3Fill size={20} className='text-red-500' />
                  </button>
                </td>
              </tr>
            ))
          }
          
        </tbody>
      </table>

    </div>
  )
}

export default AllUsers