// Importing twitter-node-client and a corresponding config file
var Twitter = require('twitter-node-client').Twitter
var config = require('./config.js')

// Initializing a Twitter API client
var twitter = new Twitter(config.twitter)

function post(status) {
  // Creating a tweet
  var tweet = {
    status: status
  }
  // Posting the tweet
  twitter.postTweet(tweet, console.log, console.log)
}

// Creating a tweet search query
var query = {
  'q': 'nyuadhack -filter:retweets -filter:replies',
  'result\_type': 'recent',
  'count': 100
}
// Searching for tweets matching the query
twitter.getSearch(query, console.log, console.log)
