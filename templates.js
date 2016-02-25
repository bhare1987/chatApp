var templates = {
  messagetmpl: [
    "<div data-id='<%= _id %>'>",
      "<p><%= content %></p>",
      "<span><%= name %></span>",
      "<span><%= date %></span>",
      "</div>",
  ].join("")

  asidetmpl: [
   "<li><%= name %></li>",
  ]
};
