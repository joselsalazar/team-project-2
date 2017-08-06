$(document).ready(function() {
	var newAlbum = $("input.search-bar");
	var albumInfo = $("#album-info");
	var Spotify = require('node-spotify-api');

	var albums = [];

	function spotifySearch(album) {
		var spotify = new Spotify({
		  id: "35563073063e418aa3673cc30523cc50",
		  secret: "f568229cd07c483d99097e09d419310e"
		});

		spotify.search({ type: 'track', query: album }, function(err, data) {
			if(data == null) {
			  	console.log("Didn't work mate...");
			} else {
				var rowsAdded = [];
				rowsAdded.push(
					`<div class="artist-block">
						<div>${data.tracks.items[0].artists[0].name}</div>
						<div>${data.tracks.items[0].album.name}</div>
					</div>`
				);
				albumInfo.append(rowsAdded);
			}
		});
	}

	// Get Album Info
	function getAlbumInfo() {
		$.get("/api/albums", function(data) {
			albums = data;
			displayData();
		});
	}

	// Display Info From Database
	function displayData() {
		albumInfo.empty();
		for (var i = 0; i < albums.length; i++) {
			spotifySearch(albums[i].title);
		}
	}

	// Add Album Info
	function addAlbums() {
		console.log("Add New Albums!");
	}

	getAlbumInfo();
});