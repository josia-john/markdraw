function openFromURL() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var path = url.searchParams.get("file");
    
    if (path == null) {
        path = "";
        window.location.replace(window.location.href + "?file=");
    }
    
    var url = "/get/Files/" + path;

    var res;

    $.ajax({async: false, type: "GET", url: url, success: function(data) {
        res = data;
    }});
    return res;
}


function renderExplorer(serverResponse) {
    if (serverResponse["file"] == 0) {
        // console.log(serverResponse["directory"]);
        $("#explorer").html("");
        for (i in serverResponse["directory"]) {
            $("#explorer").append("<p><a href ='" + window.location.href + "/" + serverResponse["directory"][i] + "'>"+serverResponse["directory"][i]+"</a></p>");
        }

    } else {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var path = url.searchParams.get("file");
        if (path.slice(length-3) == ".md")
            window.location.replace(window.location.href.replace(/navigator/, "view"));
        if (path.slice(length-4) == ".svg")
            window.location.replace(window.location.href.replace(/navigator/, "drawing"));
    }
}


renderExplorer(openFromURL());

