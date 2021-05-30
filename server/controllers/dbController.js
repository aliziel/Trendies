/* eslint-disable no-undef */
const db = require("../model/db");
const tweet = require("../api/tweet");
require("dotenv").config();
const dbController = {};

dbController.loop = () => {
  console.log(new Date().toLocaleString());
  dbController.query("stocks trending");
};

dbController.query = async (query) => {
  // invokes api call with 'stock'
  const result = await tweet(query);

  // outputs query and result
  console.log("query: ", query, "\t", new Date().toLocaleString());
  // console.log("dbController.query result length", result.length);
  dbController.insert(result);
};

dbController.insert = async (array) => {
  let createNewTweet = "";
  array.forEach((el) => {
    const {
      symbol,
      created_at,
      lang,
      id,
      author_id,
      retweet_count,
      reply_count,
      like_count,
      quote_count,
      text,
    } = el;
    createNewTweet += `
    INSERT INTO tweet(symbol, created_at, lang, id, author_id, retweet_count, reply_count, like_count, quote_count, text)
    VALUES ('${symbol}', '${created_at}', '${lang}', '${id}', '${author_id}', '${retweet_count}', '${reply_count}', '${like_count}', '${quote_count}', '${text}');
    `;
  });
  db.connect().then(client => {
    client.query(createNewTweet).then(response => {
      client.release();
    }).catch(error => {
      client.release();
      console.log(error);
    })}).catch(console.error);
};

module.exports = dbController;
