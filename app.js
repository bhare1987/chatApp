
var BrandTricks = {
  init: function() {
    BrandTricks.presentation();
    BrandTricks.events();
  },
  config: {
    urlMsg: "http://tiny-tiny.herokuapp.com/collections/BrandTricks",
    urlUser: "http://tiny-tiny.herokuapp.com/collections/BrandTricksUsers",
    activeUser: "",
  },
  presentation: function() {
  },
  events: function(){
    $('button[name="login"]').on("click", BrandTricks.login);

  },
  getMsg: function() {
    var result = [];
    $.ajax({
      url: BrandTricks.config.urlMsg,
      method: 'GET',
      success: function (messages) {
        result.push(messages);
      },
      error: function (err) {
        console.log(err);
      }
    });
    return result;
  },
  addMsg: function(messageObj) {
    $.ajax({
      url: BrandTricks.config.urlMsg,
      method: "POST",
      data: messageObj,
      success: function(messages){
        BrandTricks.getMsg();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  deleteMsg: function(messageID) {
    $.ajax({
      url: BrandTricks.config.urlMsg + "/" + messageID,
      method: 'DELETE',
      success: function (response) {
        BrandTricks.getMsg();
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  getUser: function() {
    var result = [];
    $.ajax({
      url: BrandTricks.config.urlUser,
      method: 'GET',
      success: function (users) {
        result.push(users);
      },
      error: function(err) {
        console.log(err);
      }
    });
    return result
  },
  addUser: function(userObj) {
    $.ajax({
      url: BrandTricks.config.urlUser,
      method: "POST",
      data: userObj,
      success: function(messages){
        BrandTricks.getUser();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  deleteUser: function(userID) {
    $.ajax({
      url: BrandTricks.config.urlUser + "/" + userID,
      method: 'DELETE',
      success: function (response) {
        // BrandTricks.getUser();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  setIntervals: {
    messageInterval: undefined,
    userInterval: undefined,
    intervalsFunc: function(flag, type, interval, callback) {
    if (type.toLowerCase() === "user") {
      if (flag === true) {
        BrandTricks.setIntervals.userInterval = setInterval(callback, interval);
      } else if (flag === false) {
        clearInterval(BrandTricks.setIntervals.userInterval);
      }
    } else if (type.toLowerCase() === "message") {
        if (flag === true) {
          BrandTricks.setIntervals.messageInterval = setInterval(callback, interval);
        } else if (flag === false) {
          clearInterval(BrandTricks.setIntervals.messageInterval);
        }
      }
    }
  },
  setActiveUser: function(username){
    return BrandTricks.config.activeUser = username;
  },
  login: function() {
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    var users = BrandTricks.getUser();
    console.log(users);
    if (!username || !password) {
      console.log("invalid credentials")
      return "Invalid credentials"
    } else {
      var userTest = _.findWhere(users, {username: username});
      console.log(userTest);
      if (typeof userTest === "undefined") {
        BrandTricks.addUser({
          username: username,
          password: password
        });
        $('.login').removeClass('show');
        $('.mainContainer').addClass('show');
        BrandTricks.setActiveUser(username);
      } else {
      users.forEach(function(el){
        if (username === el.username && password === el.password) {
          $('.login').removeClass('show');
          $('.mainContainer').addClass('show');
          BrandTricks.setActiveUser(username);
        } else {
          return "Login failed"
          }
        });
      }
    }
  }
}

$(document).ready(function(){
  BrandTricks.init();
});
