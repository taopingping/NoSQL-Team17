function uploadFile() {
  var file = $('input[type=file]').prop('files');
  var filename = $('input[type=file]').val().split('\\').pop();
  var ext = filename.split('.').pop();
  alert("Upload key presed, File = " + filename + " and extension = " + ext);
}
