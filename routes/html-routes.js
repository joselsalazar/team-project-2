// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/playlist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/playlist.html"));
  });

  app.get("/usermanager", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/usermanager.html"));
  });

};
