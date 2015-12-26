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
        resp.forEach(function(resultItem) {
          t.row.add( [
              resultItem.id,
              '<a href=/uploads/'+resultItem.doc+'>'+resultItem.doc+'</a>',
              resultItem.count,
              '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'
          ] ).draw( false );
        });
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
    url: "http://localhost:1337/files",
    type: 'GET',
    success: function (resp) {
      $('#data tbody').html();
      resp.forEach(function(resultItem) {
        t.row.add( [
            resultItem.id,
            '<a href=/uploads/'+resultItem.doc+'>'+resultItem.doc+'</a>',
            resultItem.count,
            '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'
        ] ).draw( false );
      });
    },
    error: function(xhr) {
      status('Error: ' + xhr.status);
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
          t.row.remove();
          resp.forEach(function(resultItem) {
            t.row.add( [
                resultItem.id,
                '<a href=/uploads/'+resultItem.doc+'>'+resultItem.doc+'</a>',
                resultItem.count,
                '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>'
            ] ).draw( false );
          });
    },
    error: function(e) {
        status('Error: '+e.text);
    }
  });
}

// show path of upload
function showPathOfUpload() {
    document.getElementById("uploadFile").value = document.getElementById("uploadBtn").value;
}
