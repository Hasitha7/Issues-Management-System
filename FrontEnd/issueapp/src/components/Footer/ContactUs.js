import React, { useState, useEffect } from 'react';

const ContactUs = () => {
  const [showForm, setShowForm] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [contactDetails, setContactDetails] = useState({
    phone: '011 222 5648',
    email: 'issue@gmail.com',
    fax: '00 91 26 6160 6861',
    address: '117/2, Katubedda Rd, Moratuwa',
  });

  useEffect(() => {
    // Retrieve details from local storage
    const storedContactDetails = localStorage.getItem('contactDetails');
    if (storedContactDetails) {
      setContactDetails(JSON.parse(storedContactDetails));
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
      localStorage.setItem('contactDetails', JSON.stringify(contactDetails));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCompanyId('');
  };

  const handleFormInputChange = (e) => {
    setContactDetails({
      ...contactDetails,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="small-containercontact">
      <a href='http://localhost:3000/'><button style={{ marginTop: '30px', marginBottom: '18px'}}>Back</button></a>
      <button
        style={{ position: 'absolute', top: '10px', right: '10px'}}
        onClick={() => setShowForm(true)}
      >
        Edit
      </button>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <h1 style={{marginTop: '10px', textAlign: 'center'}}>Contact Us</h1>
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
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                value={contactDetails.phone}
                onChange={handleFormInputChange}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={contactDetails.email}
                onChange={handleFormInputChange}
              />
              <label htmlFor="fax">Fax:</label>
              <input
                type="text"
                id="fax"
                value={contactDetails.fax}
                onChange={handleFormInputChange}
              />
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={contactDetails.address}
                onChange={handleFormInputChange}
              />
              <button style={{ marginRight: '15px'}} type="submit">Submit</button>
              <button type="button" onClick={handleFormCancel}>Cancel</button>
            </div>
          )}
        </form>
      ) : (
        <div style={{ marginTop: '10px', marginBottom: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
          <div style={{ textAlign: 'left' }}>
            <h5 id='phone'>Phone: {contactDetails.phone}</h5>
            <h5 id='email'>Email: {contactDetails.email}</h5>
            <h5 id='fax'>Fax: {contactDetails.fax}</h5>
            <h5 id='address'>Address: {contactDetails.address}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
