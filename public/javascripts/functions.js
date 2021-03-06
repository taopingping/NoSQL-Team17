var t = $('#data').DataTable();

// control file uploads
$('#uploadForm').submit(function() {
   $("#status").empty().text("File is uploading...");
});

// handle enter key presses
$('input[name=srch-term]').keyup(function(event){
    if(event.keyCode == 13 || event.which == 13){
        pressSearchKey();
    }
});

// handle a user's search
function pressSearchKey()    {
  var needle = $('input[name=srch-term]').val();
  if(needle.length != 0){
    $.ajax({
      url: "http://localhost:1337/"+needle,
      type: 'GET',
      success: function (resp) {
          $("#search").text("Suchanfrage: " + needle);
          $("#search").attr("class","well well-sm");
          // draw a new table with response data
          t.clear();
          for(var i = 0; i < resp.length; i++) {
            t.row.add( [
                i+1,
                '<a href=/uploads/'+resp[i]._source.name+'>'+resp[i]._source.name+'</a>',
                resp[i]._score
            ] );
          }
          t.draw( false );
      },
      error: function(e) {
        console.log(JSON.stringify(e));
      }
    });
  }
}

// show path of upload
function showPathOfUpload() {
    document.getElementById("uploadFile").value = document.getElementById("uploadBtn").value;
}
