import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Edit = ({ setIssues, selectedIssue, setIsEditing }) => {
  const {
    issueid: initialIssueid,
    title: initialTitle,
    description: initialDescription,
    typeofissue: initialTypeofissue,
    state: initialState,
  } = selectedIssue;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [state, setState] = useState(initialState);
  const [issueid, setIssueid] = useState(initialIssueid);
  const [typeofissue, setTypeofissue] = useState(initialTypeofissue);

  // Define options based on initialState
  const stateOptions = {
    Open: ['Open','In Progress'],
    'In Progress': ['In Progress', 'Waiting on Client', 'Resolved'],
    'Waiting on Client': ['Waiting on Client', 'In Progress', 'Resolved'],
    Resolved: ['Resolved'],
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!title || !description || !state) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedIssue = {
      issueid,
      title,
      description,
      typeofissue,
      state,
    };

    try {
      // Make a PUT request to update the issue on the Spring Boot backend
      console.log('Sending PUT request with payload:', updatedIssue);

      const response = await axios.put(
        `http://localhost:8080/issue/${issueid}`,
        updatedIssue
      );

      // Update the state with the edited issue
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.Issueid === issueid ? response.data : issue
        )
      );

      // Close the form
      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${title} has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000); // Adjust the delay time
    } catch (error) {
      console.error('Error updating issue:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update issue. Please try again.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleEdit}>
        <h1>Edit Issue</h1>
        <label htmlFor="issueid">ID</label>
        <input
          id="issueid"
          type="integer"
          name="issueid"
          value={issueid}
          readOnly
          onChange={(e) => setIssueid(e.target.value)}
        />
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          readOnly
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          readOnly
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="typeofissue">Type</label>
        <input
          id="typeofissue"
          type="text"
          name="typeofissue"
          value={typeofissue}
          readOnly
          onChange={(e) => setTypeofissue(e.target.value)}
        />
        <label htmlFor="state">State</label>
        <select
          id="state"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {stateOptions[initialState].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
