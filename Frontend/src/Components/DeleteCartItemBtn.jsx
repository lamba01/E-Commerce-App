import React from 'react';
import "../Styles/DeleteCartBtn.css"
import {AiOutlineCloseCircle } from 'react-icons/ai'

function DeleteCartItemButton({ cartItemId, product_id,  onDelete }) {
  const handleDelete = () => {
    // Trigger the delete action
    onDelete(cartItemId, product_id);
  };

  return (
    <div onClick={handleDelete} className='s'> <AiOutlineCloseCircle size={'1.5em'}/></div>
  );
}

export default DeleteCartItemButton;
