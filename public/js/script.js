$(document).ready(function() {
	var newTerm = $("input.search-term");
	var newArtist = $("input.search-artist");
	var albumInfo = $("#album-info");
	var Spotify = require('node-spotify-api');

	$(document).on("submit", "#album-search", addAlbums);

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
						<img src=${data.tracks.items[0].album.images[2].url}>
						<div>${data.tracks.items[0].artists[0].name}</div>
						<div>${data.tracks.items[0].album.name}</div>
						<div><a href=${data.tracks.items[0].album.external_urls.spotify} target="_blank">Play it Here!</a></div>
					</div>
					<hr>`
				);
				albumInfo.append(rowsAdded);
				console.log(data);
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
			var albumQuery = `${albums[i].title} - ${albums[i].artist}`;
			spotifySearch(albumQuery);
		}
	}

	// Add Album Info
	function addAlbums(event) {
		event.preventDefault();
		var album = {
			title: newTerm.val().trim(),
			artist: newArtist.val().trim()
		};

		$.post("/api/albums", album, getAlbumInfo);
		newTerm.val("");
		newArtist.val("");
	}

	getAlbumInfo();
});
