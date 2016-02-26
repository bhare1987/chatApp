var templates = {
 messagetmpl: [
   "<div data-id='<%= id %>'>",
     "<span class='usenm'><%= username %></span>",
     "<span class='d8'><%= date %></span>",
     "<div class='triange'></div>",
     "<div class='messagediv'><%= content %>",
     "</div>",
     "</div>",
 ].join("")
};
