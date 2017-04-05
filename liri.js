//import twitterKeys from file key.js
var fp = require("./keys.js");
//include the request npm package
var request = require("request");
//include spotify npm package
var spotify = require("spotify");
//fs node package for reading and writing files.
var fs = require("fs");
//require twiter
var Twitter = require('twitter');


var keyList = fp.twitterKeys;
//instantiating twitter obj

var client = new Twitter({
	consumer_key: keyList.consumer_key,
	consumer_secret: keyList.consumer_secret,
	access_token_key: keyList.access_token_key,
	access_token_secret: keyList.access_token_secret
});

var nodeArgs = process.argv;
var caseType = process.argv[2];

//higher order functions to grab movie name including space (+ symbol for query with omdbapi)
nameOfMovie = process.argv.slice(3).join('+');
nameOfSong = process.argv.slice(3);

//switch case used to identify cli from user.
switch (caseType) {
	case "my-tweets":
		readBackTweets();
		break;
	case "spotify-this-song":
		spotifyReq(nameOfSong);
		break;
	case "movie-this":
		movieReq(nameOfMovie);
		break;
	case "do-what-it-says":
		readFs();
		break;	
	default:
		console.log("blank - default");
}
function readBackTweets() {
	var params = {screen_name: 'KhoiNgu39459148'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log("=============================================================================================");
	    for(var i = 0; i < tweets.length; i++) {
	    	console.log((parseInt(i) + 1) + "." + tweets[i].text);
	    }
	    console.log("=============================================================================================");
	  }
	});
}

//funciton to read file for spotify request
function readFs() {
	var dataArr = [];
	//file system to read and call back with content frome file.
	fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
		  	throw error ("error!!!!");
		} 
		//splice out the song name and pass to spotifyReq() method.
		dataArr = data.split(",");
		spotifyReq(dataArr[1].slice(1, 19));
	});
}
//function to call back with spotify request. 
function spotifyReq(songName) {
	spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	console.log("=============================================================================================");
    console.log("Artists: " + data.tracks.items[0].album.artists[0].name);
    console.log("Name: " + songName); 
    console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
    console.log("Album: " + data.tracks.items[0].name);
    console.log("=============================================================================================");
});
}
//function to achieve call back from omdb api.
function movieReq (movieName) {
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {
	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {
	  	//view the reponse and data structure for information about the movie.
	    console.log(JSON.stringify(response, null, 2));
	    console.log ("=============================================================================================");
	    console.log("Movie Title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Released);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Metascore);
	    console.log("Rotten Tomatoes URL: " + JSON.parse(body).Source);
	    console.log ("=============================================================================================");
	  }
	});
}