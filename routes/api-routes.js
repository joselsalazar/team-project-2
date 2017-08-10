var db = require("../models");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
	id: "58e29f27ad1449f3a22a6485f5be2b6c",
	secret: "4008a3414e834ec48495c1186c149c6e"
});

module.exports = function(app) {
	app.get("/api/albums", function(req, res) {
		db.Album.findAll({}).then(function(dbAlbum) {
			res.json(dbAlbum);
		})
	});

	app.post("/api/albums", function(req, res) {
		var nextPass;
		spotify.search({ type: 'track', query: req.body.title + " " +req.body.artist }).then(function(passOn){
			res.json(passOn);
			nextPass = passOn.tracks.items[0];
		}).done(function(req, res) {
			db.Album.create({
				albumArt: nextPass.album.images[0].url,
				artist: nextPass.artists[0].name,
				album: nextPass.album.name,
				listen: nextPass.preview_url
			});
		});
	});
	
	app.delete("/api/albums/:id", function(req, res) {
		db.Album.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.put("/api/albums", function(req, res) {
		db.Album.update({
			title: req.body.title,
			artist: req.body.artist
		}, {
			where: {
				id: req.body.id
			}
		}).then(function(dbAlbum) {
			res.json(dbAlbum);
		});
	});
};