import React from 'react';

function DeleteCartItemButton({ cartItemId, onDelete }) {
  const handleDelete = () => {
    // Trigger the delete action
    onDelete(cartItemId);
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteCartItemButton;
