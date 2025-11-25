import React from 'react'
import { useParams } from 'react-router-dom';

const EditUser = () => {

  const { id } = useParams();

  return (
    <div>
      <h1>Edit user {id}</h1>
    </div>
  )
}

export default EditUser