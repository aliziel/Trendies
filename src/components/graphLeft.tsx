import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';



/* const options:any = {
  scales: {
    ticks: {
        beginAtZero: true,
        backdropColor:'rgba(255, 99, 132, 0.3)'
    },
  },
}; */

const GraphLeft = () => {
  const [chartData, setChartData] = useState <any | undefined> ({
    labels: ['MMM', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CVX', 'CSCO', 'KO', 'DOW', 'GS', 'HD', 'HON', 'IBM', 
    'INTC', 'JNJ', 'JPM', 'MCD', 'MSFT', 'MRK', 'NKE', 'PG', 'CRM', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS'],
    datasets: [
      {
        label: 'Trending',
        data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
    maintainAspectRatio: false,  
  })

  // useEffect runs when component gets mounted
  useEffect(() => {
    fetch('http://localhost:8080/tweets')
      .then(res => res.json())
      .then(res => {
        const dowsFromResponse = res.dowJones;
        
        const labels = ['MMM', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CVX', 'CSCO', 'KO', 'DOW', 'GS', 'HD', 'HON', 'IBM', 
        'INTC', 'JNJ', 'JPM', 'MCD', 'MSFT', 'MRK', 'NKE', 'PG', 'CRM', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS'];

        const newValues = chartData.datasets[0].data.slice();
        const oldValues = chartData.datasets[0].data;

        // const copyData = [...data];
        // const copyData = data.slice();
        for (let i = 0; i < labels.length; i++){
          if (dowsFromResponse[labels[i]]){
            newValues[i] = Number(dowsFromResponse[ labels[i] ]);
          }
        }

        setChartData({
          labels: ['MMM', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CVX', 'CSCO', 'KO', 'DOW', 'GS', 'HD', 'HON', 'IBM', 
          'INTC', 'JNJ', 'JPM', 'MCD', 'MSFT', 'MRK', 'NKE', 'PG', 'CRM', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS'],
          datasets: [
            {
              label: 'Trending',
              data:  newValues,
              backgroundColor: 'rgba(255, 99, 132, 0.3)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
            },
          ],
          maintainAspectRatio: false,  
        });
      })
      .catch(console.error);
  },[]);

  console.log('chartData', chartData);
      return (
  <>
    <div className='header'>
      <h1 className='title'>DOW JONES</h1>
    </div>
    <Radar data={chartData} /* options={options} */ type={undefined} height={300}/>
  </>
  )
};

export default GraphLeft;