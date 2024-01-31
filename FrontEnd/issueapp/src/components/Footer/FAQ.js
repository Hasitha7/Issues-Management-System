import React, { useState, useEffect } from 'react';

const FAQ = () => {
  const [showForm, setShowForm] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [faqDetails, setFaqDetails] = useState({
    q1: 'What is React',
    a1: 'React is JavaScript Library',
    q2:'What is Springboot?',
    a2:'Springboot is a backend framework',
    g3:'How to delete a table from mysql?',
    a3:'We can use drop command for that'
  });

  useEffect(() => {
    // Retrieve details from local storage
    const storedFaqDetails = localStorage.getItem('faqDetails');
    if (storedFaqDetails) {
      setFaqDetails(JSON.parse(storedFaqDetails));
    }
  }, []);

  const handleCompanyIdChange = (e) => {
    setCompanyId(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (companyId === '909') {
      setShowForm(false); // Hide the form on successful submission
      // Store updated details in local storage
      localStorage.setItem('faqDetails', JSON.stringify(faqDetails));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCompanyId('');
  };

  const handleFormInputChange = (e) => {
    setFaqDetails({
      ...faqDetails,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="small-containerabout">
      <a href='http://localhost:3000/'><button style={{ marginTop: '30px', marginBottom: '18px'}}>Back</button></a>
      <button
        style={{ position: 'absolute', top: '10px', right: '10px'}}
        onClick={() => setShowForm(true)}
      >
        Edit
      </button>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <h1 style={{marginTop: '10px', textAlign: 'center'}}>FAQ</h1>
          <label htmlFor="companyId">Company ID:</label>
          <input
            type="text"
            id="companyId"
            value={companyId}
            onChange={handleCompanyIdChange}
            required
          />
          {companyId === '909' && (
            <div>
              <label htmlFor="q1">Q1:</label>
              <input
                type="text"
                id="q1"
                value={faqDetails.q1}
                onChange={handleFormInputChange}
              />
              <label htmlFor="a1">A1:</label>
              <input
                type="text"
                id="a1"
                value={faqDetails.a1}
                onChange={handleFormInputChange}
              />
              <label htmlFor="q2">Q2:</label>
              <input
                type="text"
                id="q2"
                value={faqDetails.q2}
                onChange={handleFormInputChange}
              />
              <label htmlFor="a2">A2:</label>
              <input
                type="text"
                id="a2"
                value={faqDetails.a2}
                onChange={handleFormInputChange}
              />
              <label htmlFor="q3">Q3:</label>
              <input
                type="text"
                id="q3"
                value={faqDetails.q3}
                onChange={handleFormInputChange}
              />
              <label htmlFor="a1">A3:</label>
              <input
                type="text"
                id="a3"
                value={faqDetails.a3}
                onChange={handleFormInputChange}
              />
              <button style={{ marginRight: '15px'}} type="submit">Submit</button>
              <button type="button" onClick={handleFormCancel}>Cancel</button>
            </div>
          )}
        </form>
      ) : (
        <div style={{ 
          marginTop: '10px',
          marginBottom: '18px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1 style={{ textAlign: 'center' }}>FAQ</h1>
          <div style={{ textAlign: 'left' }}>
            <h5 id='q1'>Q1: {faqDetails.q1}</h5>
            <p id='a1'>A1: {faqDetails.a1}</p>
            <h5 id='q2'>Q2: {faqDetails.q2}</h5>
            <p id='a2'>A2: {faqDetails.a2}</p>
            <h5 id='q3'>Q3: {faqDetails.q3}</h5>
            <p id='a3'>A3: {faqDetails.a3}</p>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default FAQ;
