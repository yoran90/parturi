import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserForAdminForChangeRole, superAdminUpdateUserRole } from '../../store/admin-auth';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editUser = useSelector(state => state.adminAuth.editUser);

  const [role, setRole] = useState('');

  // Fetch user when component loads
  useEffect(() => {
    if (id) {
      dispatch(getUserForAdminForChangeRole(id));
    }
  }, [dispatch, id]);

  // Update local state when editUser is loaded
 /*  useEffect(() => {
    if (editUser) {
      setRole(editUser.role);
    }
  }, [editUser]); */

  const handleUpdateRole = () => {
    dispatch(superAdminUpdateUserRole({ id, role }));
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <h1>Edit User Role</h1>
        <p className='text-slate'>Here you can change the role of the user</p>
      </div>

      {editUser && (
        <div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-3.5'>
              <p>👤 Full Name:</p>
              <p>{editUser.firstName} {editUser.lastName}</p>
            </div>
            <div className='flex items-center gap-3.5'>
              <p>📩 Email:</p>
              <p>{editUser.email}</p>
            </div>
            <div className='flex items-center gap-3.5'>
              <p>®️ Current Role:</p>
              <p>{editUser.role}</p>
            </div>
          </div>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleUpdateRole}>Update Role</button>
        </div>
      )}
    </div>
  );
};

export default EditUser;
