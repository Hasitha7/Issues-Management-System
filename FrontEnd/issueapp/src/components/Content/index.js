import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import Footer from '../Footer/Footer';
import ContactUs from '../Footer/ContactUs';
import AboutUs from '../Footer/AboutUs';
import FAQ from '../Footer/FAQ';
import PieChart from './PieChart';
import HistoryTable from './HistoryTable';

const Content = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/issue');
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (issueid) => {
    const [issue] = issues.filter((issue) => issue.issueid === issueid);
    setSelectedIssue(issue);
    setIsEditing(true);
  };

  const handleDelete = async (issueid) => {
    try {
      const response = await axios.get(`http://localhost:8080/issue/${issueid}`);
      const issueTitle = response.data.title;

      const confirmResult = await Swal.fire({
        icon: 'warning',
        title: `Are you sure you want to delete "${issueTitle}"?`,
        text: 'You will not be able to revert this.',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (confirmResult.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/issue/${issueid}`);

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: `${issueTitle} has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          const updatedIssues = issues.filter((issue) => issue.issueid !== issueid);
          setIssues(updatedIssues);

          // Reload the page after deleting an issue
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error('Error deleting issue:', error);

          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete issue. Please try again.',
            showConfirmButton: true,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching issue details:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch issue details. Please try again.',
        showConfirmButton: true,
      });
    }
  };

  const handleFormChange = (form) => {
    setActiveForm(form);
  };

  const handleHistory = (issueId) => {
    const selected = issues.find((issue) => issue.issueid === issueId);
    setSelectedIssue(selected);
    setShowHistory(true);
  };

  const handleBack = () => {
    setShowHistory(false);
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && !activeForm && !showHistory && (
        <>
          <Header setIsAdding={setIsAdding} />
          <Table
            issues={issues}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleHistory={handleHistory}
          />
          <PieChart />
          <Footer handleFormChange={handleFormChange} />
        </>
      )}
      {showHistory && (
        <HistoryTable issues={issues} selectedIssue={selectedIssue} handleBack={handleBack} />
      )}
      {activeForm === 'faq' && <FAQ handleFormChange={handleFormChange} />}
      {activeForm === 'contact' && <ContactUs handleFormChange={handleFormChange} />}
      {activeForm === 'about' && <AboutUs handleFormChange={handleFormChange} />}
      {isAdding && <Add setIssues={setIssues} setIsAdding={setIsAdding} />}
      {isEditing && <Edit issues={issues} selectedIssue={selectedIssue} setIssues={setIssues} setIsEditing={setIsEditing} />}
    </div>
  );
};

export default Content;
