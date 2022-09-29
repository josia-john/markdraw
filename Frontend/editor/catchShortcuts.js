window.addEventListener("keydown", function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (e.metaKey){
        if (e.keyCode == 83) {
            e.preventDefault()
            saveFile();
        }
        if (e.keyCode == 77) {
            e.preventDefault()
            refreshMath();
        }
      }
      document.getElementById('keydown').innerHTML += '<kbd>' + char + '</kbd>'
    }
  })