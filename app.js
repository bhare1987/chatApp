function messageToPage(DataFromPost, templateStr, $target) {
    var tmpl = _.template(templateStr);
    $target.append(tmpl(DataFromPost));      
};
