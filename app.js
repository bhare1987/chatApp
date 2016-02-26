
var BrandTricks = {
  init: function() {
    BrandTricks.presentation();
    BrandTricks.events();
  },
  config: {
    urlMsg: "http://tiny-tiny.herokuapp.com/collections/BrandTricks",
    urlUser: "http://tiny-tiny.herokuapp.com/collections/BrandTricksUsers",
    activeUser: "",
    users: [],
    messages: []
  },
  presentation: function() {
    BrandTricks.getUser();
    BrandTricks.getMsg();
    BrandTricks.refreshMsgs();
    BrandTricks.refreshUsers();
  },
  events: function(){
    $('button[name="login"]').on("click", BrandTricks.login);

  },
  getMsg: function() {
    $.ajax({
      url: BrandTricks.config.urlMsg,
      method: 'GET',
      success: function (messages) {
        BrandTricks.config.messages = messages;
      },
      error: function (err) {
        console.log(err);
      }
    });
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
    $.ajax({
      url: BrandTricks.config.urlUser,
      method: 'GET',
      success: function (users) {
        BrandTricks.config.users = users;
      },
      error: function(err) {
        console.log(err);
      }
    });
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
        BrandTricks.getUser();
      },
      error: function(err) {
        console.log(err);
      }
    });
  },
  setIntervals: {
    messageInterval: undefined,
    messageRefreshInterval: undefined,
    userInterval: undefined,
    userRefreshInterval: undefined,
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
    } else if (type.toLowerCase() === "msgrefresh") {
        if (flag === true) {
          BrandTricks.setIntervals.messageRefreshInterval = setInterval(callback, interval);
        } else if (flag === false) {
          clearInterval(BrandTricks.setIntervals.messageRefreshInterval);
        }
    } else if (type.toLowerCase() === "userrefresh") {
        if (flag === true) {
          BrandTricks.setIntervals.userRefreshInterval = setInterval(callback, interval);
        } else if (flag === false) {
          clearInterval(BrandTricks.setIntervals.userRefreshInterval);
        }
      }
    }
  },
  refreshMsgs: function(){
    BrandTricks.setIntervals.intervalsFunc(true, 'message', 1000, BrandTricks.getMsg);
    BrandTricks.setIntervals.intervalsFunc(true, 'msgrefresh', 1000, function(){mssgToDom(BrandTricks.config.messages)});
  },
  refreshUsers: function(){
    BrandTricks.setIntervals.intervalsFunc(true, 'user', 1000, BrandTricks.getUser);
    BrandTricks.setIntervals.intervalsFunc(true, 'userrefresh', 5000, function(){usersToDom(BrandTricks.config.users)});
  },
  setActiveUser: function(username){
    return BrandTricks.config.activeUser = username;
  },

  login: function() {
    var userName = $('input[name="username"]').val().trim();
    var password = $('input[name="password"]').val().trim();
    BrandTricks.getUser();
    var userTest;
    BrandTricks.config.users.forEach(function(el){
      return userTest = _.isMatch(el, {username: userName})
      console.log(userTest);
    });
    if (!userName || !password) {
      return "Invalid credentials";
    } else {
      if (!userTest) {
        BrandTricks.loginNew(userName, password);
      } else {
        BrandTricks.loginExisting(userName, password);
      }
    }
  },
  loginNew: function(userName, password) {
    BrandTricks.addUser({
      username: userName,
      password: password
    });
    $('.login').removeClass('show');
    $('.mainContainer').addClass('show');
    BrandTricks.setActiveUser(userName);
  },
  loginExisting: function(userName, password) {
    BrandTricks.config.users.forEach(function(el){
      if (userName === el.username && password === el.password) {
        $('.login').removeClass('show');
        $('.mainContainer').addClass('show');
        BrandTricks.setActiveUser(userName);
      } else {
        return "Login failed";
      }
    });
  }
};

$(document).ready(function(){
  BrandTricks.init();
});
