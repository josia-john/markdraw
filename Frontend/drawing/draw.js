var mouseDown = 0;
document.onmousedown = function() { 
  ++mouseDown;
}
document.onmouseup = function() {
  --mouseDown;
}



var url_string = window.location.href;
var url = new URL(url_string);
var path = url.searchParams.get("file");

if (path == null) {
    alert("no file specified");
}

var width = url.searchParams.get("width");
if (width == null) {
    width="400px";
}
var height = url.searchParams.get("height");
if (height == null) {
    height="400px";
}

$("#img").html('<svg xmlns="http://www.w3.org/2000/svg" height="' + height + '" width="' + width + '"></svg>');


var paths = [];

onmousedown = function(e) {
    paths.push([]);
}

onmousemove = function(e){
    if (mouseDown) {
        // console.log(JSON.stringify(paths));
        var x = e.pageX - $('#img').offset().left;
        var y = e.pageY - $('#img').offset().top;
        paths[paths.length-1].push([x, y]);
        updateIMG();
    }
}

function updateIMG() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" height="' + height + '" width="' + width + '">'
    
    for (i = 0; i < paths.length; i++) {
        var path = '<path index="' + i + '" stroke-width="' + $("#stroke-width").val() +'" stroke="' + $("#stroke-color").val() + '" fill="none" d="';
        console.log(path);
        for (j = 0; j < paths[i].length-1; j++) {
            if (j == 0) {
                path = path + "M" + paths[i][j][0] + " " + paths[i][j][1] + " ";
            }
            else {
                path = path + "L" + paths[i][j][0] + " " + paths[i][j][1] + " ";
            }
        }
        path = path + '"/>'
        svg += path;
    }
    
    svg = svg + '</svg>'

    $("#img").html(svg);
    reactivatePossibilityToDeletePath();
    return svg;
}

function saveIMG() {
    var url = "/save/Files/" + path;
    $.post( url, { "file": updateIMG() } )
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
    
    res["file"].match(/<path.*?>/g).forEach((element) => {
        paths.push([])
        try {
            element.match(/[ML]([0-9\.]*) ([0-9\.]*) ?/g).forEach((element2) => {
                finalMatch = /[ML]([0-9\.]*) ([0-9\.]*) ?/g.exec(element2);
                paths[paths.length-1].push([finalMatch[1], finalMatch[2]]);
            });
        }
        catch {
            // console.log("empty path");
        }
    });



    updateIMG();
}


$("#save").click(function() {
    saveIMG();
});


openFromURL();
