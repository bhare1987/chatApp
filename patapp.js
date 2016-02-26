var messages =[ ];

function userInput(){
  var content = $('input[name="chat"]').val();
  return {
    content: content,
    username: "PATRICK",
    date: moment.utc().format('LTS'),
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
  messages.push(newMsg);  //*
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
  var NewMessage = userInput();
  addNewMessage(NewMessage); //*
  addGetMssg(getMessage());
  $('input').val('');
});
