var db = require("../models");

module.exports = function(app) {
	app.get("/api/albums", function(req, res) {
		db.Album.findAll({}).then(function(dbAlbum) {
			res.json(dbAlbum);
		})
	});

	app.post("/api/albums", function(req, res) {
		db.Album.create({
			title: req.body.title,
			artist: req.body.artist
		}).then(function(dbAlbum) {
			res.json(dbAlbum);
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