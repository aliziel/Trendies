import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

let data:any = {
  labels: ['Facebook', 'Amazon', 'Apple', 'Netflix', 'Google'],
  datasets: [
    {
      label: 'Count',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
  maintainAspectRatio: false
};

const options:any = {
  
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Trending...',
    },
  },
};

const GraphRight = () => {
  const [FAANGState, setFAANGState] = useState <any | undefined> ({
      'FB': 1,
      'AMZN': 2,
      'AAPL': 3,
      'NFLX': 0,
      'GOOG': 0
  });

  useEffect(() => {
    fetch('http://localhost:8080/tweets')
      .then(res => (res.json()))
      .then(res => setFAANGState({
        ...FAANGState,
        ...res.fang
      }))
      .then(() => console.log('!!!FAANG', FAANGState))
      .catch(err => console.log('Error Happened'));
      // .then(res => {settingState(res.dowJones)).catch(console.error)
  }, []);
  
  // Ingesting the fetched data into our charts
  // Doing this by reassihning the data property with what is now in our state
  data.datasets[0].data =  
    [FAANGState['FB'], FAANGState['AMZN'], FAANGState['AAPL'], FAANGState['NFLX'], FAANGState['GOOG']];

  return (
  <>
    <div className='header'>
      <h1 className='title'>FAANG</h1>
    </div>
    <Bar data={data} options={options} type={undefined} height={300}/>
  </>
  )  
};

export default GraphRight;