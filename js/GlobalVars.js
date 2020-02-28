//Interact Js
//These variables keep track of information that is important for the drag and drop functionalities that are being code into the program
var StandardDropzoneSize = 10;
var OpenDropzoneSize = 15;
var AutoScrollingPadding = 20;
var MOUSEDOWN = false;
var NewMouseMove = false;
var DraggingBlock = false;// keeps track of if a user is dragging a block
var CurrentDropZone = {//structure of an empty dropzone
  id: null,
  offset: null,
  w: null,
  h: null
};//object holding the id of the dropzone and the range of the dropzone
var blockIdPositions = [];
