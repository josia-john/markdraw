function update(html) {

    if (html == "") $("#editor").html("<p><br></p>");
    
    else {
        storeCaret();

        $("#editor").html(rerenderHtml(html));
        
        // $("#editor").html(html.replace(/<script.*?>(.*?)<\/script>/gm, ""));
        restoreCaret();
    }
}
