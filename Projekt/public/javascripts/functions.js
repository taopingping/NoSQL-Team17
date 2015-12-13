// load all files whhen index page is called
getAllFiles();

// control file uploads
$('#uploadForm').submit(function() {
   $("#status").empty().text("File is uploading...");
   $.ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
      },
      success: function(response) {
        console.log(response);
        $("#status").empty().text(response);
      }
  });
  return false;
});

// handle enter key presses
$('input[name=srch-term]').keyup(function(event){
    if(event.keyCode == 13 || event.which == 13){
        pressSearchKey();
    }
});

// load all files
function getAllFiles() {
  $.ajax({
    url: "http://localhost:1337/1",
    type: 'GET',
    success: function (resp) {
          var source   = $("#result-template").html();
          var template = Handlebars.compile(source);
          $("#result").html(template(resp));
    },
    error: function(e) {
        alert('Error: '+JSON.stringify(e));
    }
  });
}

// handle a user's search
function pressSearchKey()    {
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
        alert('Error: '+e.text);
    }
  });
}
