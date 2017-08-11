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
			var generateRows = 
				`
					<tr>
					  <td>
					    <span class="tooltip" onmouseover="tooltip.pop(this, '#albumart-${albums[i].id}', {position:0, cssClass:'no-padding'})"><img src=${albums[i].albumArt} alt="" class="img-small"></span> 
					    <div style="display:none;">
					        <div id="#albumart-${albums[i].id}">
					            <img src=${albums[i].albumArt} alt='' class='img-large'>
					        </div>
					    </div>
					  </td>
					  <td>${albums[i].artist}</td>
					  <td>${albums[i].album}</td>
					  <td>
					  	<span class="tooltip2" onmouseover="tooltip.pop(this, '#songlisten-${albums[i].id}', {sticky:true, position:0, cssClass:'no-padding'})"><button class="listen btn btn-default"><i class="fa fa-headphones" aria-hidden="true"></i></button></span> 
					    <div style="display:none;">
					        <div id="#songlisten-${albums[i].id}">
					            <audio src="https://p.scdn.co/mp3-preview/658627c1c2fb5f9a89ce556ead028b7cebd297c6?cid=58e29f27ad1449f3a22a6485f5be2b6c" controls>
					        </div>
					    </div>
					  </td>
					  <td><button class="delete btn btn-default" data-id=${albums[i].id}><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
					</tr>	
				`;
			albumInfo.append(generateRows);
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
