
var BrandTricks = {
  init: function() {
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
    $('.chatContainer').on("click", ".delete", BrandTricks.deleteFromDom);
    $('form').on('submit', BrandTricks.sendMsg);
  },
  getMsg: function() {
    var request = $.ajax({
      url: BrandTricks.config.urlMsg,
      method: 'GET'
    });
    request.done(function(result){
      if (result.length !== BrandTricks.config.messages.length){
        var messages = _.first(result, 75)
        BrandTricks.config.messages = result;
        BrandTricks.mssgToDom(messages);
      }
    })
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
  deleteFromDom: function(){
    var message = $(this).closest('div.messageContainer').data('id');
    var user = $(this).closest('div.messageContainer').data('user');
    if (user === BrandTricks.config.activeUser) {
      BrandTricks.deleteMsg(message);
    }
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
    var request = $.ajax({
      url: BrandTricks.config.urlUser,
      method: 'GET'
    });
    request.done(function(result){
      if (result.length > BrandTricks.config.users.length) {
        BrandTricks.config.users = result;
        BrandTricks.usersToDom(result);
      }
    })
  },
  addUser: function(userObj) {
    $.ajax({
      url: BrandTricks.config.urlUser,
      method: "POST",
      data: userObj,
      success: function(){
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
  },
  refreshUsers: function(){
    BrandTricks.setIntervals.intervalsFunc(true, 'user', 1000, BrandTricks.getUser);
  },
  setActiveUser: function(username){
    return BrandTricks.config.activeUser = username;
  },

  login: function() {
    var userName = $('input[name="username"]').val().trim();
    var password = $('input[name="password"]').val().trim();
    BrandTricks.getUser();
    var userTest = BrandTricks.config.users.filter(function(el){
      return _.isMatch(el, {username: userName});
    });
    if (!userName || !password) {
      return "Invalid credentials";
    } else {
      if (userTest.length === 0) {
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
    BrandTricks.presentation();
    $('.chatContainer section').scrollTop($('.chatContainer section')[0].scrollHeight);
  },
  loginExisting: function(userName, password) {
    BrandTricks.config.users.forEach(function(el){
      if (userName === el.username && password === el.password) {
        $('.login').removeClass('show');
        $('.mainContainer').addClass('show');
        BrandTricks.setActiveUser(userName);
        BrandTricks.presentation();
        $('.chatContainer section').scrollTop($('.chatContainer section')[0].scrollHeight);
      } else {
        console.log("Login failed");
        return "Login failed";
      }
    });
  },
  userInput: function(){
    var content = $('input[name="chat"]').val();
    return {
      content: content,
      username: BrandTricks.config.activeUser,
      date: moment.utc().format('LTS'),
    };
  },
  displayMessage: function(data, str, $target){
    var messtmpl = _.template(str);
    $target.prepend(messtmpl(data));
    //http://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
    var $selector = $('.chatContainer section');
    $selector.scrollTop($selector[0].scrollHeight);
  },
  mssgToDom: function(arr){
    var $selector = $('.chatContainer section');
    $selector.html('');
    _.each(arr, function(el,i) {
      BrandTricks.displayMessage(el, templates.messagetmpl, $selector);
    });
  },
  displayUsers: function(data, str, $target){
    var usertmpl= _.template(str);
    $target.append(usertmpl(data));
  },
  usersToDom: function(arr){
    $('ul').html('');
    _.each(arr, function(el,i) {
      BrandTricks.displayUsers(el, templates.usertmpl, $('ul'));
    });
  },
  sendMsg: function(event) {
    event.preventDefault();
    var NewMessage = BrandTricks.userInput();
    BrandTricks.addMsg(NewMessage);
    BrandTricks.mssgToDom(BrandTricks.config.messages);
    $('input').val('');
  }
};

$(document).ready(function(){
  BrandTricks.init();
});
