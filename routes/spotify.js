var db = require("../models");
var Spotify = require('node-spotify-api');

module.exports = function(app) { 
	function spotifySearch(song) {
		var spotify = new Spotify({
		  id: "35563073063e418aa3673cc30523cc50",
		  secret: "f568229cd07c483d99097e09d419310e"
		});

		spotify.search({ type: 'track', query: song }, function(err, data) {
			if(data == null) {
			  	wrong();
			} else {
				console.log('\n' + "=================================");
			 	console.log("Artist: " + data.tracks.items[0].artists[0].name);
			 	console.log("Song: " + data.tracks.items[0].name);
			 	if (data.tracks.items[0].preview_url == null) {
			 		console.log("Track URL not available")
			 	} else {
			 		console.log("Listen to it here: " + data.tracks.items[0].preview_url);
			 	}
				console.log("Album: " + data.tracks.items[0].album.name);
				console.log("=================================" + '\n');
			}
		});
	}
}