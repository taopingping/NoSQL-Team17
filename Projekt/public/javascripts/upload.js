/* $('button[name="file"]').on('click', function(evt) {
  var files = $('input[type=file]').prop('files');
  var filename = $('input[type=file]').val().split('\\').pop();
  var ext = filename.split('.').pop();
  evt.preventDefault();
  var formData = new FormData();
  for(var i = 0; i < files.length; i++) {
    var file = files[i];
    formData.append('files[]', file, file.name);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/upload', true);
  xhr.onload = function() {
    if(xhr.status === 200) {
      // Successful post
    }
    else{
      alert('An error occured');
    }
  };
  xhr.send(formData);
});*/
