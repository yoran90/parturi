import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserForAdminForChangeRole, superAdminUpdateUserRole } from '../../store/admin-auth';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, editUser, loading } = useSelector(state => state.adminAuth);
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

  if (loading) return <p>Loading user data...</p>;
  if (!editUser) return <p>No user data found</p>;

  return (
    <div className='p-4'>
      <h1>Edit User Role</h1>
      <p>Here you can change the role of the user</p>

      <div className='mt-4'>
        <p>Full Name: {editUser.firstName} {editUser.lastName}</p>
        <p>Email: {editUser.email}</p>
        <p>Current Role: {editUser.role}</p>

        <select value={role} onChange={(e) => setRole(e.target.value)} className='mt-2 p-1 border'>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button 
          onClick={handleUpdateRole} 
          className='ml-2 p-1 bg-blue-600 text-white rounded'
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Role'}
        </button>
      </div>
    </div>
  );
};

export default EditUser;
