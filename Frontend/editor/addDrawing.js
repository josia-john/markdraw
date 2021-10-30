$("#addDrawing").click(function() {
    var filename = prompt("filename");
    var width = prompt("width");
    var height = prompt("height");


    var url_string = window.location.href;
    var url = new URL(url_string);
    var path = url.searchParams.get("file");

    if (path == null) {
        alert("no file specified");
    }
    
    path = path.replace(/(?:.(?!\/))+$/gm, "");

    path = path + "media/" + filename

    window.open(location.origin + "/frontend/drawing/index.html?file=" + path + "&width=" + width + "&height=" + height);
});