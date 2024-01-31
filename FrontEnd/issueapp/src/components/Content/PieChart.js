import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import TablePie from './TablePie';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ onBackButtonClick }) => {
  const [chartData, setChartData] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    // Fetch data from the Spring Boot backend
    axios.get('http://localhost:8080/issue')
      .then((response) => {
        const dataFromBackend = response.data;

        // Count occurrences of each state
        const stateCounts = dataFromBackend.reduce((counts, issue) => {
          counts[issue.state] = (counts[issue.state] || 0) + 1;
          return counts;
        }, {});

        // Process data for Pie Chart
        const processedData = {
          labels: Object.keys(stateCounts),
          datasets: [
            {
              label: 'Issues',
              data: Object.values(stateCounts),
              backgroundColor: ['red', 'aqua', 'purple', 'lightgreen'],
            },
          ],
        };

        // Update component state with processed data
        setChartData(processedData);
      })
      .catch((error) => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);

  const options = {
    onClick: (event, elements) => {
      if (elements[0]) {
        const clickedRegion = chartData.labels[elements[0].index];
        setSelectedRegion(clickedRegion);
      }
    },
  };

  return (
    <div>
      {selectedRegion ? (
        <div>
          {/* Render TablePie component with selected region */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Issues for {selectedRegion} State</h2>
            <TablePie selectedRegion={selectedRegion} />
            <button onClick={() => setSelectedRegion(null)}>Back to Pie Chart</button>
        </div>
        </div>
      ) : (
        <div style={{ padding: '10px', width: '600px', margin: 'auto', textAlign: 'center', maxWidth: '100%' }}>
          {chartData ? (
            <Pie data={chartData} options={options}></Pie>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PieChart;
