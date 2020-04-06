//Interact Js
//These variables keep track of information that is important for the drag and drop functionalities that are being code into the program
var StandardDropzoneSize = 10;
var OpenDropzoneSize = 30;
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

//For Idea Space Title functionality
IDEASPACETITLEFOCUSED = false;

COLORSCHEMELEVEL1 = '#9c27b0';

var IDEASPACESOPEN = true;

//for dynamic shifting background and forth for the left and right panel views
var LeftPanelExpanded = true;

var DropdownSettingOpen = false;

var BlockCardsHoveredOn = [];//holds all the blockcards that are currently being hovered on
var LastMaterialNoteEdited;//holds the last material note edited which will help with the BlockCardsHoverOn array reset function

var Toolbar = [
    // [groupName, [list of button]]
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['color', ['color']],
    ['fontsize', ['fontsize', 'fontname']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']]
  ];


var SaveBtnHtml = '<button id="save-materialnote" class="btn-small btn-primary color-scheme-level-1" type="button">Save</button>';


var AnnotationAlreadyExists = false;

var SpecificElementClicked = false;

var BtnGroupHtml;

/*
<div class="note-style btn-group">
  <div class="waves-effect waves-light btn" data-event="bold" tabindex="-1" data-name="bold" data-tooltip="Bold (⌘+B)" data-position="bottom">
    <i class="material-icons">arrow_back</i>
  </div>
  <div class="waves-effect waves-light btn" data-event="italic" tabindex="-1" data-name="Insert" data-tooltip="Insert Section/Note" data-position="bottom">
    <span>Insert</span><i class="material-icons">expand_more</i>
  </div>
  <div class="waves-effect waves-light btn" data-event="underline" tabindex="-1" data-name="Save" data-tooltip="Underline (⌘+U)" data-position="bottom">
    <span>Save</span><i class="material-icons">save</i>
  </div>
</div>
*/

var MaxValueOfCharsForText = 50;
var MaxValueOfCharsForAnnotation = 50;

var MaxValueOfCharsForBlockHeader = 40;

var UpdateInterval = null;
var UpdateIntervalSet = false;
var ToolbarBtnSelectedColor = "#00695c";
var ToolbarBtnDefaultColor = "#212121";
var ToolbarState = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  superscript: false,
  subscript: false,
  color: {
    foreColor: "rgb(0,0,0)",//$(".interact-draggable div[data-event='color']").css("color")
    backColor: "rgb(255,255,255)",//$(".interact-draggable div[data-event='color']").css("background-color")
  },
  fontSize: 12, //$(".interact-draggable .note-current-fontsize").html()
  fontName: "sans-serif", // $(".interact-draggable .note-current-fontname").html()
  unorderedList: false,
  orderedList: false,
  justifyLeft: false,
  justifyCenter: false,
  justifyRight: false,
  justifyFull: false,

}
