import React from 'react';

const HistoryTable = ({ issues, selectedIssue, handleBack }) => {
  return (
    <div className="contain-table">
      <button onClick={handleBack} style={{ marginTop: '30px', marginBottom: '18px' }}>
        Back
      </button>
      <h1 style={{ textAlign: 'center' }}>Update History of {selectedIssue.title}</h1>
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
          {selectedIssue ? (
            <tr key={selectedIssue.id}>
              <td>{selectedIssue.issueid}</td>
              <td>{selectedIssue.title}</td>
              <td>{selectedIssue.description}</td>
              <td>{selectedIssue.typeofissue}</td>
              <td>{selectedIssue.state} </td>
              <td>{selectedIssue.timestamp}</td>
            </tr>
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

export default HistoryTable;
