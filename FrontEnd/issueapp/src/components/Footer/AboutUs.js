import React, { useState, useEffect } from 'react';

const AboutUs = () => {
  const [showForm, setShowForm] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [aboutDetails, setAboutDetails] = useState({
    mission: 'Our mission is to empower individuals and businesses through innovative solutions that enhance their lives and drive sustainable success. We are committed to delivering exceptional products and services that exceed customer expectations, foster long-term relationships, and contribute positively to the communities we serve. Guided by our core values of integrity, collaboration, and continuous improvement, we strive to be a beacon of excellence in our industry. Our relentless pursuit of innovation fuels our desire to create cutting edge technologies and transformative experiences that shape the future.',
    vision: 'Our vision is to empower individuals and businesses through innovative solutions that enhance their lives and drive sustainable success. We are committed to delivering exceptional products and services that exceed customer expectations, foster long-term relationships, and contribute positively to the communities we serve. Guided by our core values of integrity, collaboration, and continuous improvement, we strive to be a beacon of excellence in our industry. Our relentless pursuit of innovation fuels our desire to create cutting edge technologies and transformative experiences that shape the future.',
  });

  useEffect(() => {
    // Retrieve details from local storage
    const storedAboutDetails = localStorage.getItem('aboutDetails');
    if (storedAboutDetails) {
      setAboutDetails(JSON.parse(storedAboutDetails));
    }
  }, []);

  const handleCompanyIdChange = (e) => {
    setCompanyId(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //Validation
    if (companyId === '909') {
      setShowForm(false); // Hide the form on successful submission
      // Store updated details in local storage
      localStorage.setItem('aboutDetails', JSON.stringify(aboutDetails));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCompanyId('');
  };

  const handleFormInputChange = (e) => {
    setAboutDetails({
      ...aboutDetails,
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
          <h1 style={{marginTop: '10px', textAlign: 'center'}}>About Us</h1>
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
              <label htmlFor="mission">Mission:</label>
              <input
                type="text"
                id="mission"
                value={aboutDetails.mission}
                onChange={handleFormInputChange}
              />
              <label htmlFor="vision">Vision:</label>
              <input
                type="text"
                id="vision"
                value={aboutDetails.vision}
                onChange={handleFormInputChange}
              />
              <button style={{ marginRight: '15px'}} type="submit">Submit</button>
              <button type="button" onClick={handleFormCancel}>Cancel</button>
            </div>
          )}
        </form>
      ) : (
        <div style={{ marginTop: '10px', marginBottom: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
          <h1>About Us</h1>
          <h5>Mission</h5>
          <p id='mission'>{aboutDetails.mission}</p>
          <h5>Vision</h5>
          <p id='vision'>{aboutDetails.vision}</p>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
