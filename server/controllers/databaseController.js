const db = require('../model/db.js');

const databaseController = {};

// Get all tweets associated with a single stock
databaseController.groupTweetsBySymbol = (req, res, next) => {

const groupTweetsBySymbol = `
  SELECT symbol, COUNT(id) as numTweets FROM tweet
  GROUP BY symbol;
`;

  // Attempt to get all the tweets from the database
  db.query(groupTweetsBySymbol)
  // When Tweets were gotten sucessfully
  .then(results => {
    console.log(results);
    res.locals.tweetsData = results;
    return next();
  })
  // There was an error getting the tweets from the database
  .catch(err => {
    return next('Error getting the database info please try again');
  })
}

// Function to create objects for the charts on the front end
databaseController.prepDataForCharts = (req, res, next) => {

  // Initialize the object with the chart data 
  const chartData = {};
  chartData.dowJones = {};  
  chartData.topFive = []; 
  chartData.fang = {};
  chartData.wholeQuery = res.locals.tweetsData.rows;

  // Companies to look for
  const fangCompanies = ['FB', 'AAPL', 'AMZN', 'NFLX', 'GOOG'];
  const dowJonesCompanies = ['MMM', 'AXP', 'AMGN', 'AAPL', 'BA', 'CAT', 'CVX', 'CSCO', 'KO', 'DOW', 'GS', 'HD', 'HON', 'IBM', 
  'INTC', 'JNJ', 'JPM', 'MCD', 'MSFT', 'MRK', 'NKE', 'PG', 'CRM', 'TRV', 'UNH', 'VZ', 'V', 'WBA', 'WMT', 'DIS'];

  // Sort the tweets and store the top five
  res.locals.tweetsData.rows.sort((stock1, stock2) => stock1.numtweets - stock2.numtweets);
  chartData.topFive = res.locals.tweetsData.rows.slice(-5);
  
  // Traverse Through the Rows Given
  res.locals.tweetsData.rows.forEach( stock => {
    let {symbol, numtweets} = stock;
    
    // Handle Edge case the symbol is not uppercase
    symbol = symbol.toUpperCase();

    // The current stock is a dow jones stock
    if (dowJonesCompanies.includes(symbol)){
      chartData.dowJones[symbol] = numtweets;
    }

    // The current stock is a FAANG stock
    if (fangCompanies.includes(symbol)){
      chartData.fang[symbol] = numtweets
    }
  });

  res.locals.chartData = chartData;
  return next();
}


module.exports = databaseController;