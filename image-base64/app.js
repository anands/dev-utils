(function() {

    function readFile() {
      if (this.files && this.files[0]) {
        var FR= new FileReader();
        FR.onload = function(e) {
          document.getElementById("img").src       = e.target.result;
          document.getElementById("b64").value = e.target.result;
        };       
        FR.readAsDataURL( this.files[0] );
      }
    }

    document.getElementById("inp").addEventListener("change", readFile, false);    

})();
