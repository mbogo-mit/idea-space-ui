//Interact Js
//These variables keep track of information that is important for the drag and drop functionalities that are being code into the program
var StandardDropzoneSize = 10;
var OpenDropzoneSize = 20;
var AutoScrollingPadding = 20;
var SCROLLUP = false;//if auto scrolling needs to turn on and scroll the outline up
var SCROLLDOWN = false;//if auto scrolling needs to turn on and scroll the outline up
var SCROLLSPEED = 2;
var SCROLLDELAY = 20;
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

//global variables that are set when the query for annotations is made and pagination is in effect
var CURRENTPAGENUMBER = 1;
var LASTPAGENUMBER = 7;
var MATERIALNOTEOPEN = false;
