var messages =[ ];

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

function getMessage(){
  return messages;
}

function addNewMessage(newMsg){
  messages.push(newMsg);  //*
}

function addGetMssg(arr){
  $('section').html('');
  _.each(arr, function(el,i) {
    displayMessage(el, templates.messagetmpl, $('section'));
  });
  console.log("refreshed!");
}

$('form').on('submit', function(event){
  event.preventDefault();
  BrandTricks.getMsg();
  var NewMessage = userInput();
  BrandTricks.addMsg(NewMessage);
  addGetMssg(BrandTricks.config.messages);
  $('input').val('');
});
