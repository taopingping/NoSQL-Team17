function pressSearchKey()    {
  var needle = $('input[name=srch-term]').val();

  //search(needle);
  $.ajax({
    url: "http://localhost:1337/"+needle,
    type: 'GET',
    success: function (resp) {
          $("#searchText").text("Suchanfrage: " + needle);
          $("#resultText").text("Ergebnis: " + resp);
          $("#searchText").attr("class","well well-sm");
          $("#resultText").attr("class","well well-sm");
    },
    error: function(e) {
        alert('Error: '+e);
    }
  });
}
