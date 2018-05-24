$(document).ready(function(){

  $('.bank_id').change(function(){
    $(document).find('#data-json').remove();

    var selectedBankId = $('#bank_id option:selected').val();
    // var url = 'http://46.4.196.90/eSave/lib/esave_server.py?bank_id=' + selectedBankId + '?callback=?';
    var url = 'http://46.4.196.90/eSave/lib/esave_server.py?bank_id=' + selectedBankId;

    console.log(url);

    function addScript(src) {
      var elem = document.createElement("script");
      elem.setAttribute('id', 'data-json');
      elem.src = src;
      document.head.appendChild(elem);
    }

    addScript(url);
    var output = document.querySelector('output');
    output.innerHTML = '<p>'+url+'</p>'

  });
});
