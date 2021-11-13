import React from "react";

const ReadOnlyRow = ({ ingredient, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{ingredient.ingredientName}</td>
      <td>{ingredient.amount}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, ingredient)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(ingredient.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
