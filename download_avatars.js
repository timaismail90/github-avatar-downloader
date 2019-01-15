var request = require('request');
var secret = require('./secrets')
var GITHUB_TOKEN = secret['GITHUB_TOKEN'];

console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization':'token '+GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, res, body);
  });
}

function getAvatarUrl(err, res, body){
  if(!err){
    var data = JSON.parse(body);
    var avatarUrl = data[0].avatar_url;
    data.forEach(function(user){
      console.log(user.avatar_url);
    })

  }
}


//   getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

  // ...


getRepoContributors('jquery', 'jquery', getAvatarUrl);



// ar request = require('request');

