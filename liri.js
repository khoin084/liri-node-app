//import twitterKeys from file key.js
var fp = require("./keys.js");
//include the request npm package
var request = require("request");
//include spotify npm package
var spotify = require("spotify");
//fs node package for reading and writing files.
var fs = require("fs");

var keyList = fp.twitterKeys;
console.log(keyList);

var nodeArgs = process.argv;
var caseType = process.argv[2];

//higher order functions to grab movie name including space (+ symbol for query with omdbapi)
nameOfMovie = process.argv.slice(3).join('+');
nameOfSong = process.argv.slice(3);

switch (caseType) {
	case "my-tweets":
		console.log("tweets");
		break;
	case "spotify-this-song":
		console.log("spotify-this-song");
		spotifyReq(nameOfSong);
		break;
	case "movie-this":
		movieReq(nameOfMovie);
		break;
	case "do-what-it-says":
		console.log("do-what-it-says");
		readFs();
		break;	
	default:
		console.log("blank");
}

function readFs() () {
	fs.readFile("bank.txt", "utf8", function(error, data) {
		if(error) {
		  	throw error ("error!!!!");
		} 
		console.log(data);

		});
}

function spotifyReq(songName) {
	spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(JSON.parse(data).tracks.items.name); 
});
}

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