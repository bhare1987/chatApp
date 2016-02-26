var templates = {
 messagetmpl: [
   "<div data-id='<%= _id %>'>",
     "<div class='messagediv'><%= content %></div>",
       "<span><%= username %></span>",
       "<span><%= date %></span>",
     "</div>",
 ].join("")
};
