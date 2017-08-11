$(document).ready(function() {
  var nameInput = $("#user-name");
  var authorList = $("tbody");
  var authorContainer = $(".user-container");
  var userBank = $("#user-bank");

  $(document).on("submit", "#user-form", handleAuthorFormSubmit);

  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    if (!nameInput.val().trim().trim()) {
      return;
    }
    
    insertUser({
      name: nameInput
        .val()
        .trim()
    });
  }

  function insertUser(userData) {
    $.post("/api/users", userData)
      .then(getUsers);
  }

  function getUsers() {
    $.get("/api/users", function(data) {
      for (var i = 0; i < data.length; i++) {
        userBank.append(`<div>${data[i].name}</div>`);
      }
      
      nameInput.val("");
    });
  }
 });

