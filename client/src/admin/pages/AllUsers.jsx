import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { adminDeleteUserOrAdmin, superAdminUpdateUserRole } from '../../store/admin-auth';
import ConfirmDelete from './ConfirmDelete';

const AllUsers = () => {


  const { admin } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getAllusersForAdmin, setGetAllusersForAdmin] = React.useState([]);
  const [confirmDeleteUser, setConfirmDeleteUser] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);

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

  

  const handleEditUser = async (id) => {
    try {
      await dispatch(superAdminUpdateUserRole(id)).unwrap();
      navigate(`/admin/edit-user/${id}`);
      console.log("user", id);
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }


  const handleDelete = async (id) => {
   setUserToDelete(id);
   setConfirmDeleteUser(true);
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
            <th className='py-1.5 md:block hidden'>Full Name</th>
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
                <td className='py-1 md:block hidden'>{user?.firstName} {user?.lastName}</td>
                <td className='py-1 text-slate-500'>{user?.email}</td>
                <td className='py-1'>{user?.gender}</td>
                <td className='py-1'>
                  {
                    user?.role === "user" ? (
                      <span className='bg-green-600 text-white w-fit text-sm rounded md:px-4 px-2 py-1'>User</span>
                    ) : user?.role === "admin" ? (
                      <span className='bg-red-600 text-white text-sm rounded w-fit md:px-2.5 px-1 py-1'>Admin</span>
                    ) : (
                      <span className='bg-[#e69500] text-white text-sm rounded w-fit md:px-2.5 px-1 py-1'>Owner</span>
                    )
                  }
                </td>
                <td className='py-1 flex items-center justify-center gap-2 mt-1'>
                  <button className='cursor-pointer' onClick={() => handleEditUser(user._id)}>
                    <FaEdit size={20} className='text-green-600' />
                  </button>
                  <button className='cursor-pointer' onClick={() => handleDelete(user._id)}>
                    <BsTrash3Fill size={20} className='text-red-500' />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {
        confirmDeleteUser && (
          <ConfirmDelete 
            closeModel={() => setConfirmDeleteUser(false)} 
            onConfirm={
              async () => {
                try {
                  await dispatch(adminDeleteUserOrAdmin(userToDelete)).unwrap().then(() => {
                    toast.success("User deleted successfully");
                    setConfirmDeleteUser(false);
                    setGetAllusersForAdmin(getAllusersForAdmin.filter((user) => user._id !== userToDelete));
                  });
                } catch (error) {
                  console.log(error);
                  toast.error(error.message);
                }
              }
            }
            headerTitle="ConfirmDelete User Or Admin" 
            headerDescription="Are you sure you want to delete this user or admin?" 
            cacelButton="Cancel"
            confirmButton="Delete"
            warningMessage="Warning if you delete this user or admin, all of their data will be permanently deleted."
          />
        )
      }

    </div>
  )
}

export default AllUsers