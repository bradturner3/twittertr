// Importing twitter-node-client and a corresponding config file
var Twitter = require('twitter-node-client').Twitter
var config = require('./config.js')

// Initializing a Twitter API client
var twitter = new Twitter(config.twitter)

// Initializing a hacky Twitter client
var hackTwitter = new Twitter(config.twitter)
hackTwitter.baseUrl = 'https://twitter.com/i'

var last

function post(status) {
  // Creating a tweet
  var tweet = {
    status: status
  }
  // Posting the tweet
  twitter.postTweet(tweet, console.log, console.log)
}

function search(successCallback) {
  // Adding last ID filter
  var lastFilter = last ? (' since\_id:' + last) : ''
  // Creating a tweet search query
  var query = {
    'q': '#nyuadhack -filter:retweets -filter:replies' + lastFilter,
    'result\_type': 'recent',
    'count': 100
  }
  // Searching for tweets matching the query
  twitter.getSearch(query, console.log, successCallback)
}

function translate(successCallback, id) {
  // Creating a translation query
  var query = {
    dest: 'ar',
    id: id
  }
  // Translating a tweet
  hackTwitter.getCustomApiCall('/translations/show.json', query, console.log, successCallback)
}

// Parsing search response
function parseSearch(data) {
  return JSON.parse(data).statuses.map(function(status) {
    return status.id_str
  })
}

// Parsing translate response
function parseTranslate(data) {
  return JSON.parse(data).text.replace(/ [#|@]/g, ' ')
}

function run() {
  // Reposting translated tweets matching nyuadhack query
  search(function(data) {
    var ids = parseSearch(data)
    last = ids[0] || last
    ids.forEach(translate.bind(null, function(data) {
      var status = parseTranslate(data)
      'Could not translate Tweet' !== status && post(status)
    }))
  })
}

// Run the bot every minute
run()
setInterval(run, 60 * 1000)
