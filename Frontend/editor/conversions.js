function convertHtmlToMd(html) {
    md = html;

    md = md.replace(/<span.*?\<\/span>/gm, "");   // remove all spans (rendered math)

    md = md.replace(/<script.*?>(.*?)<\/script>/gm, "");

    md = $.trim(md);                            // remove ugly spaces
    md = md.replace(/&nbsp;/gm, " ");           // make &nbsp; to normal space
    // md = md.replace(/ /gm, "&nbsp;");           // make normal space to &nbsp;
    md = md.replace(/<\/p><p.*?>/gm, "\n");     // add \n after each paragraph
    md = md.replace(/<[^>]*>/gm, "");           // remove html tags

    return md;
}


function renderFromMdToHtml(text) {
    text = text.replace(/\`.+?\`/gm, "");
    text = text.replace(/\$(.*?)\$( `.*?`)*/gm, "&#36;$1&#36;<br>\`$1\`");

    text = text.replace(/ $/gm, "&nbsp;");                                                                  // make spaces to &nbsp; so spaces can be put at the end of a line

    text = text.replace(/(\*\*)(?=\S)([^\r]*?\S)\1/g, "<strong>&#42;&#42;$2&#42;&#42;</strong>");   // bold

    text = text.replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>&#42;$2&#42;</em>");                             // italic

    text = text.replace(/(\+)(?=\S)([^\r]*?\S)\1/g, "<u>+$2+</u>");                                         // underline


    text = text.replace(/([^!]|^)\[(.+?)\]\((.+?)\)/gm, "$1[$2](<a href='$3'>$3</a>)");                       // link
    // text = text.replace(/!\[(.+?)\]\((.+?)\)/gm, "![$1](<a href='$2'>$2</a>)<br/><img style = 'max-width:50vw;max-height:50vh;' src='$2' alt='$1'>");                       // link
    text = text.replace(/!\[(.+?)\]\((.+?)\)/gm, function(wholeMatch, m1, m2) {
        if (/127.0.0.1:23215/.test(wholeMatch)) {

            return "![" + m1 + "](<a href='" + m2 + "'>" + m2 + "</a>)<br/><iframe class='whiteboard' src='" + m2 + "?hideMenu=true'></iframe>";
        }

        var url_string = window.location.href;
        var url = new URL(url_string);
        var path = url.searchParams.get("file");
        
        if (path == null) {
            path = "";
            window.location.replace(window.location.href + "?file=");
        }
        
        var url = "/Files/" + path;

        url = url.replace(/(?:.(?!\/))+$/gm, "");
        url = "/" + url + "/" + m2;
        url = url.replace(/\/+/gm, "/");

        return "![" + m1 + "](<a href='" + url + "'>" + m2 + "</a>)<br/><img src='" + url + "' alt='" + m1 + "'>";
    });                       // link


    text = text.replace(/(\n?)(\#{1,6})[ \t]+(.+)/gm,                                                       // headers with #
        function (wholeMatch, m0, m1, m2) {
            var h_level = m1.length;
            if (m0.length)
                return "</p><p class='h" + h_level + "'>" + m1 + " " + m2;
            else
                return "<p class='h" + h_level + "'>" + m1 + " " + m2;
        }
    );


    if (text.substr(0, 2) != "<p") text = "<p>" + text;                                                     // set start of string to open a <p>

    text = text.replace(/\n/gm, "</p><p>");                                                                 // a \n closes the current <p> and opens the next

    text = text + "</p>";                                                                                   // set end of string to close a <p>

    text = text.replace(/<p><\/p>/g, "<p><br></p>");                                                        // <p></p> are just empty lines. Add <br> to make them visible

    text = text.replace(/-&gt;/, "➔");

    console.log(text);

    return text;
}


function rerenderHtml(html) {
    return renderFromMdToHtml(convertHtmlToMd(html));
}


