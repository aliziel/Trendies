module.exports.users = `
 CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   email_address VARCHAR(40) NOT NULL UNIQUE,
   user_name VARCHAR(20) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL
 );
`;

module.exports.tweet = `
 CREATE TABLE tweet (
   id VARCHAR(25) PRIMARY KEY,
   created_at VARCHAR(25) NOT NULL,
   symbol VARCHAR(7) NOT NULL,
   author_id VARCHAR(25),
   lang  VARCHAR(15),
   retweet_count INT,
   reply_count INT,
   like_count INT,
   quote_count INT,
   text VARCHAR(280)
 );
`;

// id SERIAL PRIMARY KEY,
module.exports.lastUpdated = `
  CREATE TABLE lastUpdated (
    date_time VARCHAR(24)
  )
`;
