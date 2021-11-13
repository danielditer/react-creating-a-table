import React, { useState, Fragment } from "react";
import nanoid from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [ingredients, setIngredients] = useState(data);
  const [addFormData, setAddFormData] = useState({
    ingredientName: "",
    amount: ""
  });

  const [editFormData, setEditFormData] = useState({
    ingredientName: "",
    amount: ""
  });

  const [editIngredientId, setEditIngredientId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newIngredient = {
      id: nanoid,
      ingredientName: addFormData.ingredientName,
      amount: addFormData.amount
    };

    const newContacts = [...ingredients, newIngredient];
    setIngredients(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editIngredientId,
      ingredientName: editFormData.ingredientName,
      amount: editFormData.amount
    };

    const newContacts = [...ingredients];

    const index = ingredients.findIndex(
      (ingredient) => ingredient.id === editIngredientId
    );

    newContacts[index] = editedContact;

    setIngredients(newContacts);
    setEditIngredientId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditIngredientId(contact.id);

    const formValues = {
      ingredientName: contact.ingredientName,
      amount: contact.amount
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditIngredientId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...ingredients];

    const index = ingredients.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setIngredients(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Ingredient Name</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <Fragment>
                {editIngredientId === ingredient.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    ingredient={ingredient}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add Ingredient</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Please enter the ingredient name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="amount"
          required="required"
          placeholder="Please enter the amount"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
