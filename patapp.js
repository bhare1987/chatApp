function userInput(){
  var content = $('input[name="chat"]').val();
  return {
    content: content,
    username: BrandTricks.config.activeUser,
    date: moment.utc().format('LTS'),
  };
}

function displayMessage(data, str, $target){
  var messtmpl = _.template(str);
  $target.prepend(messtmpl(data));
}

function mssgToDom(arr){
  var $selector = $('.chatContainer section');
  $selector.html('');
  _.each(arr, function(el,i) {
    displayMessage(el, templates.messagetmpl, $('.chatContainer section'));
  });
  //http://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
  $selector.scrollTop($selector[0].scrollHeight);
}

$('form').on('submit', function(event){
  event.preventDefault();
  BrandTricks.getMsg();
  var NewMessage = userInput();
  BrandTricks.addMsg(NewMessage);
  mssgToDom(BrandTricks.config.messages);
  $('input').val('');
});


function displayUsers(data, str, $target){
  var usertmpl= _.template(str);
  $target.append(usertmpl(data));
}

function usersToDom(arr){
  $('ul').html('');
  _.each(arr, function(el,i) {
    displayUsers(el, templates.usertmpl, $('ul'));
  });
}
