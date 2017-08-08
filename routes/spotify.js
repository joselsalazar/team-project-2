var db = require("../models");
var Spotify = require('node-spotify-api');
var $ = require('jQuery');

$.get("/api/albums", function(req, res) {
	db.Album.findAll({}).then(function(dbAlbum) {
		console.log(dbAlbum);
	})
});
