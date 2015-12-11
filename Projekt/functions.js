$(document).ready(function() {
   $('#uploadForm').submit(function() {
   $("#status").empty().text("File is uploading...");
   $(this).ajaxSubmit({
          error: function(xhr) {
              status('Error: ' + xhr.status);
          },
          success: function(response) {
              console.log(response);
              $("#status").empty().text(response);
          });
          return false;
    });

    $('input[name=srch-term]').keyup(function(event){
        if(event.keyCode == 13 || event.which == 13){
            alert("abcd");
            pressSearchKey();
        }
    });
});


function pressSearchKey()    {
  alert("Search");
  var needle = $('input[name=srch-term]').val();
  $.ajax({
    url: "http://localhost:1337/"+needle,
    type: 'GET',
    success: function (resp) {
          $("#search").text("Suchanfrage: " + needle);
          $("#search").attr("class","well well-sm");
          var source   = $("#result-template").html();
          var template = Handlebars.compile(source);
          $("#result").html(template(resp));
    },
    error: function(e) {
        alert('Error: '+e);
    }
  });
}
