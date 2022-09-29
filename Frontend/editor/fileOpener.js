function openFromURL() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var path = url.searchParams.get("file");
    
    var url = "/get/Files/" + path;
    $.get(url, function(data) {
        var text = data["file"];
        $("#editor").html(renderFromMdToHtml(text));
    });
}

openFromURL();
setTimeout(function(){$("#editor").html(rerenderHtml($('#editor').html()));}, 100);


function saveFile() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var path = url.searchParams.get("file");

    if (path == null) {
        alert("no file specified");
    }
    
    var url = "/save/Files/" + path;
    $.post( url, { "file": convertHtmlToMd($('#editor').html()) } )
    .done(function( data ) {
        if (data == 200) {
            var dt = new Date();
            var time = dt.getHours().toString().padStart(2, '0') + ":" + dt.getMinutes().toString().padStart(2, '0') + ":" + dt.getSeconds().toString().padStart(2, '0');
            $("#lastSaved").html(time);
        } else {
            alert("couldn't save...");
        }
    });
}


$("#save").click(
    function() {
        saveFile();
    }
);