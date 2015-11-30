function pressSearchKey()    {
  var needle = $('input[name=srch-term]').val();

  //search(needle);
  $.ajax({
    url: "http://localhost:1337/"+needle,
    type: 'GET',
    success: function (resp) {
          $("#search").text("Suchanfrage: " + needle);
          $("#search").attr("class","well well-sm");
          var source   = $("#result-template").html();
          var template = Handlebars.compile(source);
          var context = {result: resp};
          $("#result").empty();
          $("#result").append(template(context));
    },
    error: function(e) {
        alert('Error: '+e);
    }
  });
}

$('input[name=srch-term]').keyup(function(event){
    if(event.keyCode == 13 || event.which == 13){
        pressSearchKey();
    }
});
