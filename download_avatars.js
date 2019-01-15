var request = require('request');
var secret = require('./secrets')
var GITHUB_TOKEN = secret['GITHUB_TOKEN'];
var fs = require('fs');

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
      downloadImageByURL(user.avatar_url, `avatars/${user.login}`)
    })

  }
}


//   getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

  // ...


getRepoContributors('jquery', 'jquery', getAvatarUrl);



  // ..


function downloadImageByURL(url, filePath) {
  fs.existsSync('avatars') || fs.mkdirSync('avatars');
  request.get(url)               // Note 1
        .pipe(fs.createWriteStream(filePath));

       console.log('Download completed')


  // ...
}

 downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg")


// var request = require('request');


// request.get('url')               // Note 1
//        .on('error', function (err) {                                   // Note 2
//          throw err;
//        })
//        .on('response', function (response) {                           // Note 3
//          console.log('Response Status Code: ', response.statusCode);
//        })
//        .on('end', function(){

//        })

//        .pipe(fs.createWriteStream('./download.html'));

//        console.log('Download completed')

//                   // Note 4