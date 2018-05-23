$(document).ready(function(){
  $('.bank_id').change(function(){
    var selectedBankId = $('#bank_id option:selected').val();

    var url = 'http://46.4.196.90/eSave/lib/esave_server.py?bank_id=' + selectedBankId;
    console.log(url);
    $.getJSON( url, function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
  })
});
