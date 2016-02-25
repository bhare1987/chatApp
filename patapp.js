var messages =[ ];

function userInput(){
  var content = $('input[name="chat"]').val();
  return {
    content: content,
    username: "test user name",
    date: moment.utc().format("dddd, MMMM, Do YYYY, h:mm:ss a"),
  };
}

function displayMessage(data, str, $target){
  var messtmpl = _.template(str);
  $target.append(messtmpl(data));
}

function getMessage(){
  return messages;
}

function addNewMessage(newMsg){
  messages.push(newMsg);
}

function addGetMssg(arr){
  $('section').html('');
  _.each(arr, function(el,i) {
    el.id = i;
    displayMessage(el, templates.messagetmpl, $('section'));
  });
}

$('form').on('submit', function(event){
  event.preventDefault();
  var NewMessage = userInput()
  addNewMessage(NewMessage);
  addGetMssg(getMessage());
  $('input').val('');
});
