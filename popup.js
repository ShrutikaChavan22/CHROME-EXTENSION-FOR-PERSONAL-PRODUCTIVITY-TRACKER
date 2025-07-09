import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Popup = () => {
  const [goal, setGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState('');
  const [siteTimes, setSiteTimes] = useState({});

  useEffect(() => {
    chrome.storage.local.get(['goal', 'siteTimes'], (data) => {
      if (data.goal) setSavedGoal(data.goal);
      if (data.siteTimes) setSiteTimes(data.siteTimes);
    });
  }, []);

  const saveGoal = () => {
    chrome.storage.local.set({ goal });
    setSavedGoal(goal);
  };

  useEffect(() => {
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(siteTimes),
        datasets: [{
          label: 'Time (seconds)',
          data: Object.values(siteTimes),
          backgroundColor: '#4CAF50'
        }]
      }
    });
  }, [siteTimes]);

  return (
    <div style={{ padding: 10 }}>
      <h3>Daily Goal</h3>
      <input
        placeholder="e.g. 2 hours productive"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button onClick={saveGoal}>Save Goal</button>
      <p>Current Goal: {savedGoal}</p>
      <canvas id="chart" width="300" height="200"></canvas>
    </div>
  );
};

export default Popup;
