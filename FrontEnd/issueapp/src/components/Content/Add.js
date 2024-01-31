import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Add = ({ setIssues, setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [typeofissue, setTypeofissue] = useState('');
  const [state, setState] = useState('Open');

  const handleAdd = async (e) => {
    e.preventDefault();


    if (!title || !description || !typeofissue || !state) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      // Make a POST request to the Spring Boot backend
      const response = await axios.post('http://localhost:8080/issue', {
        title,
        description,
        typeofissue,
        state,
      });

      // Update the state with the newly added issue
      setIssues((prevIssues) => [...prevIssues, response.data]);

      // Close the form
      setIsAdding(false);

      Swal.fire({
        icon: 'success',
        title: 'Added',
        text: `${title} has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error adding issue:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add issue. Please try again.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Issue</h1>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={typeofissue}
          onChange={(e) => setTypeofissue(e.target.value)}
        >
          <option value="Blank"></option>
          <option value="Bug">Bug</option>
          <option value="Improvement">Improvement</option>
          <option value="Question">Question</option>
        </select>
        <label htmlFor="state">State</label>
        <input
          id="state"
          type="text"
          name="state"
          value={state}
          readOnly
          onChange={(e) => setState(e.target.value)}
        />

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
