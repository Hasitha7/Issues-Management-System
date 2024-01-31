import React from 'react';

const Table = ({ issues, handleEdit, handleDelete, handleHistory, showHistory }) => {

  return (
    <div className="contain-table">
      {!showHistory ? (
        <table className="striped-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>State</th>
              <th>Timestamp</th>
              <th colSpan={3} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.length > 0 ? (
              issues.map((issue, i) => (
                <tr key={issue.id}>
                  <td>{issue.issueid}</td>
                  <td>{issue.title}</td>
                  <td>{issue.description}</td>
                  <td>{issue.typeofissue}</td>
                  <td>{issue.state} </td>
                  <td>{issue.timestamp}</td>
                  <td className="text-right">
                    <button
                      onClick={() => handleEdit(issue.issueid)}
                      className="button muted-button"
                    >
                      Update
                    </button>
                  </td>
                  <td className="text-left">
                    <button
                      onClick={() => handleHistory(issue.issueid)}
                      className="button muted-button"
                    >
                      History
                    </button>
                  </td>
                  <td className="text-left">
                    <button
                      onClick={() => handleDelete(issue.issueid)}
                      className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Issues</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Table;
