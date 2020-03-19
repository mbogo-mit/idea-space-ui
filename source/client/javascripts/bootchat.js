// We wait for window to load as $() is undefined before then.
window.onload = function() {
  /**
   * Here we connect to the server.
   * Notice that I’m not specifying any URL when I call io(), 
   * since defaults connect to the host that serves the page.
   */
  var socket = io();
  /**
   * Setup handler for when socket recieves 'message' event.
   */
  socket.on('message', function(data){
    if (data){
      var div = $('<div>');
      div.addClass('thumbnail');
      div.css('margin','0px');
      div.text(data);
      $('#messages').append(div);
      // Scroll to recent message
      var scroll = $('#msgarea');
      var height = scroll[0].scrollHeight;
      scroll.scrollTop(height);
    } else {
      console.log('no msg data could be found');
    };
  });
  /**
   * Set submit function for our input form
   */
  $('#messageform').submit(function(){
    var message = $('#m').val();
    // Ensure message exists
    if (!!message){
      // Now we emit the message
      socket.emit('send-msg', message);
    };
    // Reset value of input area
    $('#m').val('');
    // Return
    return false;
  });
  /**
   * End bootchat.js
   */
};