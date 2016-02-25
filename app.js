var BrandTricks = {
  init: function() {
    BrandTricks.presentation();
    BrandTricks.events();
  },
  config: {
    url: "http://tiny-tiny.herokuapp.com/collections/BrandTricks",
  },
  presentation: function() {
  },
  events: function(){},
  getMsg: function() {
    $.ajax({
      url: BrandTricks.config.url,
      method: 'GET',
      success: function (messages) {
        console.log(messages);
        myBlog.addAllPostsToDom(blogPosts);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  addMsg: function(messageObj) {},
  deleteMsg: function(messageID) {},
  getUser: function() {},
  addUser: function() {},

}

$(document).ready(function(){
  BrandTricks.init();
});
