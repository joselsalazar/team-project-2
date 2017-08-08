$(document).ready(function() {
	var newTerm = $("input.search-term");
	var newArtist = $("input.search-artist");
	var albumInfo = $("#album-info");
	var Spotify = require('node-spotify-api');

	$(document).on("submit", "#album-search", addAlbums);
	$(document).on("click", "button.delete", deleteAlbum);

	var albums = [];

	function spotifySearch(album, id) {
		var spotify = new Spotify({
		  id: "58e29f27ad1449f3a22a6485f5be2b6c",
		  secret: "4008a3414e834ec48495c1186c149c6e"
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
						<button class="delete btn-danger" data-id=${id}>Remove</button>
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
			spotifySearch(albumQuery, albums[i].id);
		}
	}

	function deleteAlbum(event) {
		event.stopPropagation();
		var id = $(this).attr("data-id");
		$.ajax({
			method: "DELETE",
			url: "/api/albums/" + id
		}).done(getAlbumInfo);
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
