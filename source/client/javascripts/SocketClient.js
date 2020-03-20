$( document ).ready(function() {
  var socket = io();

  //event listeners to send data to server and query database



  /*
    Intent: user wants to open up this specific idea space
    Description: function grabs the id of the '.idea-space-name' object and sends this data to the server
  */
  $(".idea-space-name").click(function(){
    var SocketEvent = "Open Idea Space";
    var Data = {
      id: $(this).attr("id")
    };

    console.log(SocketEvent);
    console.log(Data);
    socket.emit(SocketEvent, Data);
  });

  /*
    Intent: user wants to open up this specific outline
    Description: function grabs the id of the '.outline-card-trigger' object and sends this data to the server
  */
  $(".outline-card-trigger").click(function(){
    var SocketEvent = "Open Outline";
    var Data = {
      id: $(this).attr("id")
    };
    console.log(SocketEvent);
    console.log(Data);

    socket.emit(SocketEvent, Data);
  });

  /*
    Intent: user wants to create a new outline with the specifications they passed into the form
    Description: function grabs the data from the form and puts it into an object and send to server
  */
  $("#modal-btn-create-new-outline").click(function(){
    var SocketEvent = "Create New Outline";
    var Data = {
      name: $("#input-outline-name").val(),
      group: $("#input-group-name").val()
    };

    console.log(SocketEvent);
    console.log(Data);

    socket.emit(SocketEvent, Data);
  });

  /*
    Intent: user wants to update the filters that filter annotation cards
    Description: function grabs all the values that have been checked in the dropdown form and puts them into a data object
  */
  $("#btn-update-filters").click(function(){
    var SocketEvent = "Update Filters";
    var Data = {
      //NOT FINISHED-------------------------------------------------------------
    };

    console.log(SocketEvent);
    console.log(Data);

    socket.emit(SocketEvent, Data);
  });





});
