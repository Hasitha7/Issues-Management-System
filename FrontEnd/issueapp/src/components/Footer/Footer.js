import React from 'react';

const Footer = ({ handleFormChange }) => {
  return (
    <footer style={{ 
      display: 'flex', 
      padding: '20px',
      marginTop:'40px',
      marginLeft:'760px'
    }}>
      <button style={{ marginRight: '25px'}} onClick={() => handleFormChange('contact')}>Contact Us</button>
      <button style={{ marginRight: '25px'}} onClick={() => handleFormChange('about')}>About Us</button>
      <button onClick={() => handleFormChange('faq')}>FAQ</button>
    </footer>
  );
};

export default Footer;
