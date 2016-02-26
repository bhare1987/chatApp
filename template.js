var templates = {};
 templates.messagetmpl=[
  "<div class='messageContainer' data-id='<%=_id %>' data-user='<%= username %>'>",
     "<span class='usenm'><%= username %></span>",
     "<span class='d8'><%= date %></span>",
     "<% if( obj.username === BrandTricks.config.activeUser) { %>",
       "<span class='delete'>I take that back</span>",
     "<% } %>",
     "<div class='messagediv'><%= content %></div>",
  "</div>",
 ].join("");

  templates.usertmpl= [
    "<li data-id='<%=_id%>'>",
    "<span class='usenm'><%= username %></span>",
    "</li>",
  ].join("");
