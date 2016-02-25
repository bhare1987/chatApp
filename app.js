function messageToPage(Data, tmplStr, $target) {
    var tmpl = _.template(tmplStr);
    $target.append(tmpl(Data));
};
