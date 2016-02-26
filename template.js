var templates = {
 messagetmpl: [
   "<div data-id='<%=_id %>'>",
     "<span class='usenm'><%= username %></span>",
     "<span class='d8'><%= date %></span>",
     "<div class='messagediv'><%= content %>",
     "</div>",
 ].join("")
};
