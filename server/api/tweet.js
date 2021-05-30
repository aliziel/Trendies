/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
const express = require("express");
const dotenv = require("dotenv");
const needle = require("needle");
const app = express();

const symbols = require(__dirname + "/../../symbols.js");

dotenv.config();

const bearerToken = process.env.BEARER_TOKEN;
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

// Query Twitter via developer API
const getTweets = async (query) => {
  try {
    // parameters for search query
    const params = {
      query: `${query} -is:retweet `,
      "tweet.fields":
      "author_id,created_at,entities,lang,public_metrics,context_annotations",
      "max_results": 10
    };

    /* 
    CHECK BEFORE PULL -> QUERYING TWITTER
    NEEDLE, TWITTER URL, BEARER TOKEN 
    
    using example.js instead of querying
    */
    const res = {};
    res.body = require(__dirname + "/../../example.js");

    if (res.body.data) {
      let processedData;
      try {
        processedData = await processData(res.body.data);
      } catch (error) {
        console.log({error: error});
      }
      return processedData;
    }
  } catch (error) {
    throw new Error("Unsuccessful Request");
  }
};

// Eliminate redundant tweet returns
const removeDuplicates = (array) => {
  const uniq = new Set(array.map((e) => JSON.stringify(e)));
  const result = Array.from(uniq).map((e) => JSON.parse(e));
  return result;
};


// analyze and process twitter data to prep for database insertion
const processData = async (twitterData) => {
  try {
    const data = [];
    for (let i = 0; i < twitterData.length; i += 1) {
      if (twitterData[i].entities) {
        const cashtags = twitterData[i].entities.cashtags;
        if (cashtags) {
          cashtags.forEach((el, idx) => {
            if (symbols.includes(el.tag)) {
              const {
                created_at,
                lang,
                id,
                text,
                author_id,
                public_metrics: {
                  retweet_count,
                  reply_count,
                  like_count,
                  quote_count,
                },
              } = twitterData[i];
              const object = Object.assign(
                {},
                {
                  created_at,
                  lang,
                  author_id,
                  retweet_count,
                  reply_count,
                  like_count,
                  quote_count,
                }
              );
              object.id = id + '_' + idx;
              object.symbol = el.tag;
              object.text = text.replace(/(\r\n|\n|\r)/gm, "");
              data.push(object);
            }
          });
        }
      }
    }
    const removed = removeDuplicates(data);
    return removed;
  } catch (error) {
    console.log({error: error});
  }
};

// Retrieve polished data for storage
const getTweetAnalysis = async (query) => {
  try {
    const twitterData = await getTweets(query);
    return twitterData;
  } catch (error) {
    console.log({error: error});
  }
};

module.exports = getTweetAnalysis;
