
var BrandTricks = {
  init: function() {
    BrandTricks.presentation();
    BrandTricks.events();
  },
  config: {
    url: "http://tiny-tiny.herokuapp.com/collections/BrandTricks",
    msgUrl: BrandTricks.config.url + "/" + "msg/"
    userUrl: BrandTricks.config.url + "/" + "user/"
  },
  presentation: function() {
  },
  events: function(){},
  getMsg: function() {
    $.ajax({
      url: BrandTricks.config.url + "/" + "msg",
      method: 'GET',
      success: function (messages) {
        console.log(messages);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  addMsg: function(messageObj) {
    $.ajax({
      url: BrandTricks.config.msgUrl,
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
      url: BrandTricks.config.userUrl,
      method: 'DELETE',
      success: function (response) {
        myBlog.getPosts();
    });
  },
  getUser: function() {},
  addUser: function() {},

}

$(document).ready(function(){
  BrandTricks.init();
});
