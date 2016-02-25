var messages ={
  [        ]
};

function userInput(){
  var contenT = $('input["name=chat"]').val();
  return contenT;
}

function displayMessage(data, str, $target){
  var messtmpl = _.template(str);
  $target.append(messtmpl(data));
};

function getMessage(){
  return messages;
};

function showNewMessage(messagetmpl){
messages.push(messagetmpl)
};

function addGetMssg(){
  $('section').html('');
  _.each(), function (el,i) {
  el.id = _id;
  displayMessage(el, templates.messagetpl, $('section'));
  }
}

$('form').on('submit', function(event){
event.preventDefault();
var NewMessage = userInput()
showNewMessage(NewMessage);
addGetMssg(getMessage());
$('input').val('');
});
