// Importing twitter-node-client and a corresponding config file
var Twitter = require('twitter-node-client').Twitter
var config = require('./config.js')

// Initializing a Twitter API client
var twitter = new Twitter(config.twitter)
