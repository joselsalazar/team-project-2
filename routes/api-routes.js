var db = require("../models");
var cors = require("cors");

module.exports = function(app) {
	app.options('*', cors());
	app.get("/api/albums", cors(), function(req, res) {
		db.Album.findAll({}).then(function(dbAlbum) {
			res.json(dbAlbum);
		})
	});

	app.post("/api/albums", cors(), function(req, res) {
		db.Album.create({
			title: req.body.title,
			artist: req.body.artist
		}).then(function(dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.delete("/api/albums/:id", cors(), function(req, res) {
		db.Album.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbAlbum) {
			res.json(dbAlbum);
		});
	});

	app.put("/api/albums", cors(), function(req, res) {
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