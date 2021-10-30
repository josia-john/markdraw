function reactivatePossibilityToDeletePath() {
    $("path").mouseover(function (e) {
        if (e.shiftKey) {
            // console.log(this.getAttribute("index"));
            index = this.getAttribute("index");
            paths.splice(index, 1); 
            updateIMG();
        }
        // alert("hi");
    });
}
reactivatePossibilityToDeletePath();