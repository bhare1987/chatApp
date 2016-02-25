var templates = {
 messagetmpl: [
   "<div data-id='<%= id %>'>",
     "<div class='messagediv'><%= content %></div>",
       "<span><%= username %></span>",
       "<span><%= date %></span>",
     "</div>",
 ].join("")
};
