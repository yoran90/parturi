import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserForAdminForChangeRole, superAdminUpdateUserRole } from '../../store/admin-auth';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, editUser, editUserLoading, loading } = useSelector(state => state.adminAuth);
  const [role, setRole] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  // Redirect non-super-admins immediately
  useEffect(() => {
    if (admin && admin.role !== "super-admin") {
      toast.error("Only super-admin can edit roles");
      navigate("/admin/allusers");
    }
  }, [admin, navigate]);

  // Fetch user only once
  useEffect(() => {
    if (!hasFetched && id && admin?.role === "super-admin") {
      dispatch(getUserForAdminForChangeRole(id));
      setHasFetched(true);
    }
    // Only depend on id and hasFetched to avoid infinite loops
  }, [id, hasFetched, dispatch, admin?.role]);

  // Set local role state when user data is fetched
  useEffect(() => {
    if (editUser && editUser.role) {
      setRole(editUser.role);
    }
  }, [editUser]);

  const handleUpdateRole = async () => {
    if (!["user", "admin"].includes(role)) return toast.error("Invalid role selected");
    if (role === editUser.role) return toast.info("No changes made");

    try {
      await dispatch(superAdminUpdateUserRole({ id, role })).unwrap();
      toast.success("User role updated successfully");
      navigate("/admin/allusers");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  if (editUserLoading) return <p className='text-center'>Loading user data...</p>;
  if (!editUser) return <p>No user data found</p>;

  return (
    <div className='mt-4 px-3'>
      <div className='flex flex-col items-center justify-center'>
        <h1>Edit User Role</h1>
        <p className='text-sm'>Here you can change the role of the user</p>
      </div>

      <div className='mt-4 flex flex-col gap-1.5 bg-white px-4 py-7 rounded shadow border border-slate-200'>
        <div className='flex items-center gap-2.5'>
          <strong className='flex-1 text-slate-700'>Full Name: </strong>
          <p className='flex-5 text-red-700'>{editUser.firstName}  {editUser.lastName}</p>
        </div>
        <div className='flex items-center gap-2.5'>
        <strong className='flex-1 text-slate-700'>Email:</strong>
        <p className='flex-5 text-red-700'>{editUser.email}</p> 
        </div>

        <div className='flex items-center gap-2.5'>
          <strong className='flex-1 text-slate-700'>Current Role:</strong>
          <p className='flex-5 text-red-700'>{editUser.role}</p>
        </div>

        <select value={role} onChange={(e) => setRole(e.target.value)} className='mt-4 p-1 rounded mb-4 border'>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button 
          onClick={handleUpdateRole} 
          className=' py-1.5 bg-red-600 text-white rounded'
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Role'}
        </button>
      </div>
    </div>
  );
};

export default EditUser;
