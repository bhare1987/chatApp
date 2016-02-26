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
  $target.append(messtmpl(data));
}

function mssgToDom(arr){
  $('.chatContainer section').html('');
  _.each(arr, function(el,i) {
    displayMessage(el, templates.messagetmpl, $('.chatContainer section'));
  });
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


$('.chatContainer').on('mouseenter', ".messagediv", function(){
  if (BrandTricks.config.activeUser === $(this).parent().data('user')){
  $('.delete').addClass('showDelete');
  }
});
$('.chatContainer').on('mouseleave', ".messagediv", function(){
  if (BrandTricks.config.activeUser === $(this).parent().data('user')){
  $('.delete').removeClass('showDelete');
  }
});
