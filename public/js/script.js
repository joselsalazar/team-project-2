$(document).ready(function() {
	var newTerm = $("input.search-term");
	var newArtist = $("input.search-artist");
	var albumInfo = $("#album-info");

	$(document).on("submit", "#album-search", addAlbums);
	$(document).on("click", "button.delete", deleteAlbum);

	var albums = [];

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
			var albumQuery = `${albums[i].album} - ${albums[i].artist}`;
			console.log(albumQuery);

			albumInfo.append(
				`
					<tr>
					  <td>
					    <span class="tooltip" onmouseover="tooltip.pop(this, '#uniqueid-album-art', {position:0, cssClass:'no-padding'})"><img src=${albums[i].albumArt} alt="" class="img-small"></span> 
					    <div style="display:none;">
					        <div id="uniqueid-album-art">
					            <img src=${albums[i].albumArt} alt='' class='img-large'>
					        </div>
					    </div>
					  </td>
					  <td>${albums[i].artist}</td>
					  <td>${albums[i].album}</td>
					  <td>
					    	<audio src=${albums[i].listen} controls>  
					  </td>
					  <td><button class="delete btn btn-default" data-id=${albums[i].id}><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
					</tr>	
				`
			);
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
	$('#example').DataTable();
});
