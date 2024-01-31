import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TablePie = ({ selectedRegion }) => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/issue')
      .then(response => setIssues(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const filteredIssues = selectedRegion
    ? issues.filter(issue => issue.state === selectedRegion)
    : issues;

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>State</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue, i) => (
              <tr key={issue.id}>
                <td>{issue.issueid}</td>
                <td>{issue.title}</td>
                <td>{issue.description}</td>
                <td>{issue.typeofissue}</td>
                <td>{issue.state} </td>
                <td>{issue.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No Issues</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePie;
