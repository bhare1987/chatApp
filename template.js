var templates = {};
 templates.messagetmpl=[
   "<div class='messageContainer' data-id='<%=_id %>' data-user='<%= username %>'>",
     "<span class='usenm'><%= username %></span>",
     "<span class='d8'><%= date %></span>",
     "<div class='messagediv'><%= content %><span class='delete'>X</span></div>",
    "</div>",
 ].join("");

  templates.usertmpl= [
    "<li data-id='<%=_id%>'>",
    "<span class='usenm'><%= username %></span>",
    "</li>",
  ].join("");
