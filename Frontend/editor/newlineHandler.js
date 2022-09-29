$('body').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        event.preventDefault();

        var selection = window.getSelection();
        var node = selection.focusNode;
        var offset = selection.focusOffset;

        var index = getIndexOfNodeInNodelist(node);

        var first = "";     // find the part before
        var second = "";    // and after the caret

        var beforeCut = 1;
        var offsetRecreated = 0;
        var indexRecreated = [index[0], 0];
        var htmlCaret = String(document.getElementById("editor").childNodes[indexRecreated[0]].innerHTML);
        htmlCaret = htmlCaret.replace(/&nbsp;/g, " ");

        var doIt = 0;
        for (i = 0; i<htmlCaret.length; i++) {
            if (JSON.stringify(indexRecreated) == JSON.stringify(index)) beforeCut=0;
            if (htmlCaret[i] == "<") {
                if (htmlCaret[i+1] == "/") {
                    indexRecreated.pop();
                    while (htmlCaret[i] != ">") {
                        i++;
                    }
                    if (htmlCaret[i+1] != "<") {
                        indexRecreated[indexRecreated.length-1]++;
                    }
                } else {
                    if (doIt) indexRecreated[indexRecreated.length-1]++;
                    indexRecreated.push(0);
                    while (htmlCaret[i] != ">") {
                        i++;
                    }
                    doIt = 0;
                }
            } else {
                if (beforeCut || offset > offsetRecreated) {first += htmlCaret[i]; if (beforeCut==0) offsetRecreated++;}
                else second += htmlCaret[i];
                doIt = 1;
            }
        }


        first = "<p>" + first + "</p>";                     // package the first / second part
        second = "<p>" + second + "</p>";
        if (first == "<p></p>") first = "<p><br></p>"
        if (second == "<p></p>") second = "<p><br></p>"


        var paragraph = node;                               // get paragraph
        while (paragraph.parentNode.id != "editor") {
            paragraph = paragraph.parentNode;
        }

        
        paragraph.innerHTML = first;                        // shorten the old paragraph and
        $(second).insertAfter(paragraph);                   // add the new paragraph


        var range = document.createRange();                 // Move cursor to new line
        var sel = window.getSelection();

        range.setStart(paragraph.nextSibling.childNodes[0], 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
});