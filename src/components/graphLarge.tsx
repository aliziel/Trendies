import React, { useState, useEffect } from 'react';
import '../App.css';
import { Bar } from 'react-chartjs-2';



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
      text: 'What\'s Trending...',
    },
  },
};

const GraphLarge = () => {
  const [chartData, setChartData] = useState <any | undefined> ({
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Impressions',
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
  });
  // let data:any = {
    
  
  useEffect(() => {
    fetch('http://localhost:8080/tweets')
      .then(res => (res.json()))
      .then(res => {
        console.log(res.topFive);
        // Update the labels array dynamically
          // chartData.labels = 
          // [topState[4].['symbol'], topState[3]['symbol'], topState[2]['symbol'], topState[1]['symbol'], topState[0]['symbol']];
          // e.g. ['STAF', 'ETON', ... ]

          // chartData.datasets[0].data =  
          // [topState[4]['numtweets'], topState[3]['numtweets'], topState[2]['numtweets'], topState[1]['numtweets'], topState[0]['numtweets']]
          // [1, 3, 5, 10, 30]

          const labelsArray: any[] = [];
          const numTweetsArray: any[] = [];

          res.topFive.forEach( (twitterObject: { numtweets: any; symbol: any; }) => {
            const {numtweets, symbol} = twitterObject;
            labelsArray.push(symbol);
            numTweetsArray.push(numtweets);
          })
        console.log('labelsArray:', labelsArray)
        console.log('numTweetsArray:', numTweetsArray)
        setChartData({
          // labels: res.topFive.reverse()
          labels: labelsArray,
          datasets: [
            {
              label: 'Impressions',
              data: numTweetsArray,
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
        });
      })
      .catch(console.error);
  }, []);
  
  // Ingesting the fetched data into our charts
  // Doing this by reassihning the data property with what is now in our state
  // console.log('!'.repeat(37),data.labels);

  return (
  <>
    <div className='header'>
      <h1 className='title'>TOP 5</h1>
    </div>
    <Bar data={chartData} options={options} type={undefined} height={300}/>
  </>
  )  
};

export default GraphLarge;





















// // const rand = () => Math.round(Math.random() * 20 - 10);

// const data:any = {
//   datasets: [
//     {
//       label: 'Data0',
//       data: [
//         12,15,11,10
//       ],
//       backgroundColor: 'rgba(55, 199, 132, 1)',
//     },
//     {
//       label: 'Data1',
//       data: [
//         22,25,21,20
//       ],
//       backgroundColor: 'rgba(55, 99, 232, 1)',
//     },
//     {
//       label: 'Data2',
//       data: [
//         7,3,6,8
//       ],
//       backgroundColor: 'rgba(85, 199, 2, 1)',
//     },
//     {
//       label: 'Data3',
//       data: [
//         2,5,1,8
//       ],
//       backgroundColor: 'rgba(255, 99, 132, 1)',
//     },
//   ],
//   labels: [-45, -30, -15, 0],
//   maintainAspectRatio: false
// };

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//     scales: {
//         x: {
//             type: 'time',
//             time: {
//                 unit: 'hour'
//             },
//             ticks: {
//               reverse: true
//             },
//         }
//     }
//   },
// };

// const GraphLarge = () => {

//   const [trendState, setTrendState] = useState <any | undefined> ({
//     trendData0 : {
//       '45': 1, 
//       '30': 10,
//       '15': 5,
//       '0': 34,
//       'symbol' : 'AAAA'
//     },
//     trendData1 : {
//       '45': 4, 
//       '30': 5,
//       '15': 7,
//       '0': 24,
//       'symbol' : 'BBBB'
//     },
//     trendData2 : {
//       '45': 11, 
//       '30': 9,
//       '15': 13,
//       '0': 22,
//       'symbol' : 'DDDD'
//     },
//     trendData3 : {
//       '45': 7, 
//       '30': 17,
//       '15': 15,
//       '0': 19,
//       'symbol' : 'GGGG'
//     }
//   });

//   // Updating state with the top trending tickers by fetching from tweets api

//   // useEffect(() => {
//   //   fetch('http://localhost:8080/tweets')
//   //     .then(res => setTrendState(res.locals.chartData.topFive)
//   //     )
//   // },[])

//   // Updating labels with correct Trending Ticker Symbol
//   // Ingesting the fetched data into our charts
//   // Doing this by reassigning the data property with what is now in our state

//   data.datasets[0].label = trendState.trendData0['symbol'];
//   data.datasets[0].data =  
//     [trendState.trendData0['45'], trendState.trendData0['30'], trendState.trendData0['15'], trendState.trendData0['0']];

//   data.datasets[1].label = trendState.trendData1['symbol'];
//   data.datasets[1].data =  
//     [trendState.trendData1['45'], trendState.trendData1['30'], trendState.trendData1['15'], trendState.trendData1['0']];

//   data.datasets[2].label = trendState.trendData2['symbol'];
//   data.datasets[2].data =  
//     [trendState.trendData2['45'], trendState.trendData2['30'], trendState.trendData2['15'], trendState.trendData2['0']];

//   data.datasets[3].label = trendState.trendData3['symbol'];
//   data.datasets[3].data =  
//     [trendState.trendData3['45'], trendState.trendData3['30'], trendState.trendData3['15'], trendState.trendData3['0']];



//   return (
//   <>
//     <div className='header'>
//       <h1 className='title'>TIMELINE (RECENT?)</h1>
//     </div>
//     <Scatter data={data} /* options={options} */ type={undefined} height={300} />
//   </>
//   );
// }

// export default GraphLarge;