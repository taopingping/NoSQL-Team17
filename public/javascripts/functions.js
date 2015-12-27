var t = $('#data').DataTable();

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
    url: "http://localhost:1337/",
    type: 'GET',
    success: function (resp) {
      console.log("resp ___ " + JSON.stringify(resp));
      var i = 1;
      resp.forEach(function(resultItem) {
        t.row.add( [
            i++,
            '<a href=/uploads/'+resultItem._source.name+'>'+resultItem._source.name+'</a>',
            resultItem._score,
            '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'
        ] ).draw( false );
      });
    },
    error: function(e) {
      console.log('Error: '+JSON.stringify(e));
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
        console.log("resp ___ " + JSON.stringify(resp));
        $("#search").text("Suchanfrage: " + needle);
        $("#search").attr("class","well well-sm");
        //t.row.remove();
        var i = 1;
        resp.forEach(function(resultItem) {
          t.row.add( [
              i++,
              '<a href=/uploads/'+resultItem._source.name+'>'+resultItem._source.name+'</a>',
              resultItem._score,
              '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'
          ] ).draw( false );
        });
    },
    error: function(e) {
        alert('Error: '+e.text);
    }
  });
}

// show path of upload
function showPathOfUpload() {
    document.getElementById("uploadFile").value = document.getElementById("uploadBtn").value;
}
