function ShowHiddenTextAndAnnotation(cardID){
  console.log("Show Hidden Text and Annotation");
  $("#" + cardID + " .text-to-hide").css("display","inline");
  $("#" + cardID + " .show-more-text").css("display","none");
  $("#" + cardID + " .show-less-text").css("display","inline");
}

function HideHiddenTextAndAnnotation(cardID){
  console.log("Hide Hidden Text and Annotation");
  $("#" + cardID + " .text-to-hide").css("display","none");
  $("#" + cardID + " .show-more-text").css("display","inline");
  $("#" + cardID + " .show-less-text").css("display","none");
}

function TruncateTextAndAddSeeMoreLink(maxChars, text, cardID, annotation){
  /*annotation is a true or false value that allows the function to figure out
  if we need to inject this html into the text part of an annotation card or the
  annotation part of an annotation card*/
  var containerClass = " .card-annotated-text";
  if(annotation){
    containerClass = " .card-annotation";
  }
  var a = text.split(" ");
  var textToShow = a[0];
  var textToHide = "";
  var total = a[0].length;
  //taking the first element out because we have stored it into the textShow variable and we have gotten the text length with the 'total' variable
  a.splice(0,1);
  while(total < maxChars && a.length > 0){
    textToShow += " " + a[0];
    total += (a[0].length + 1);//added one to account for the space that was deleted when the string was split into an array
    a.splice(0,1);//taking the first element out because we have stored it into the textShow variable
  }

  //after the while loop has run the textToShow varaible will be filled with text and the 'a' array will only have the text to hide
  textToHide = " " + a.join(" ");

  //next thing we need to do is to figure out where we need to inject these pieces of text and do it
  var el1 = $("#" + cardID + containerClass + " .text-to-show");//gets the element that we are going to inject the text to show
  var el2 = $("#" + cardID + containerClass +  " .text-to-hide");//gets the element that we are going to inject the text to hide
  //if textToHide = 1 then there is no reason to have a show more button if there is not to show

  el1.html(textToShow);

  if(textToHide.length == 1){//there is only a space in this so there is not reason to have a show more button
    el2.html("");
    $("#" + cardID + containerClass +  " .show-more-text").remove();
    $("#" + cardID + containerClass +  " .show-less-text").remove();//we dont need a show less if we are not going to show more
  }
  else{
    el2.html(textToHide);
  }

}

function InjectButtonsIntoToolbar(){
  $(".note-toolbar").prepend(BtnGroupHtml);
}

function ShouldWeCloseSlaveMaterialNote(event){
  console.log("ShouldWeCloseSlaveMaterialNote");
  var el = $(".interact-draggable .note-editor");
  if(el.length != 0){

    if($(event.target).parents('.note-editor').length == 0){

      $(".my-slave-materialnote").destroy();
      MATERIALNOTEOPEN = false;
      //onced destroyed we need to put a double click event listener on it just incase if the user wants to continue editing that piece of text later
      $(".my-slave-materialnote").dblclick(function(){
        if(!MATERIALNOTEOPEN){//dont open another material note if there is one already open
          MATERIALNOTEOPEN = true;
          $(this).materialnote({
            focus: true,
            toolbar: Toolbar
          });

          /*
          $(".block-header-container .note-editable").input(function(){
            PutBoundaryOnBlockHeaderMaterialNote($(this));
          });
          */
          
        }
      });

      //once we destroy the materialnote the main materialnote should have no styling because no materialnote is selected
      SetToolbarStateToDefault();
      UpdateMainToolbarState();

    }
    else if($(event.target).parents('.note-toolbar.btn-toolbar').length != 0){
      //pass
    }
    else{
      //otherwise the user is selecting text or clicking on text so we need to update our main toolbar to match the toolbar of the slave materialnote

      //give the editor time to change the values of the slave materialnote so that the main one has something to react too
      setTimeout(function(){
        GetToolbarState();
        UpdateMainToolbarState();
      }, 250);


    }
  }
}

function ShouldWeCloseDropdownSettings(event){
  console.log(event.target.id);
  if(!(event.target.id == "link-to-settings" || event.target.id == "link-to-settings-icon")){//user wasn't clicking the button to open the dropdown

    if($("#dropdown-settings").css("display") == "block"){//dropdown settings is open so we need to close it
      $("#link-to-settings").trigger("click");
    }
  }
}

function ShouldWeCloseFilterAnnotationsDropDown(event){

  if(event.target.id != "btn-open-annotations-filters"){//user wasn't clicking the button to open the dropdown

    if($("#filter-annotation-icon").html() != "expand_more"){//filter annotations dropdown is open

      if($(event.target).parents("#annotations-filter-options").length == 0){
        /*
        we need to close the Filter Annotations Dropdown because the thing that was
        clicked is not part of the dropdown so the user is trying to do something else
        and this dropdown is still open taking up important real estate
        */

        $("#btn-open-annotations-filters").trigger("click");
      }
    }
  }




}

function UnstyleAnnotationAlreadyExistsBox(id){
  var el = $("#" + id + " .annotation-already-exist-in-ideaspace-box");
  el.animate({opacity: 0.0},500,function(){
    //when animation done
    el.css("display","none");
  });

}

function AnnotationAlreadyExistsInAnnotation(id){
  if($("#" + id).hasClass("annotation-already-exists-in-ideaspace")){
    AnnotationAlreadyExists = true;
    var el = $("#" + id + " .annotation-already-exist-in-ideaspace-box");
    el.css("display","inline-grid");
    el.animate({opacity: 1.0},500);
    return true;
  }
  else{
    AnnotationAlreadyExists = false;
    return false;
  }
}

function MaterialNoteClicked(el){
  if(!MATERIALNOTEOPEN){//if users hasn't already started to edit other text they can edit this specific piece of text
    console.log("open materializeNote up");
    el.materialnote({
      focus: true,
    });
    MATERIALNOTEOPEN = true;
    //after we open the material note we need to inject the save button into the material note toolbar
    console.log("injected save btn");
    $(".note-toolbar").append(SaveBtnHtml);

    LastMaterialNoteEdited = el;

    //adding eventlisteners to the new element that was created and injected into the toolbar
    $('#save-materialnote').click(function(){

      $('.my-materialnote-containers').destroy();
      MATERIALNOTEOPEN = false;
      //we have to add the click event listener back to the block-note
      $('.my-materialnote-containers').click(function(){
        MaterialNoteClicked($(this));
      });

      //after the materialnote is destoryed and everything goes back to normal mainy times the block hovering is messed up
      //so i am going to reset the array that controls that
      setTimeout(function(){
        ResetBlockCardsHoverOnArray();
      },500);
    });

    $("#save-materialnote").hover(function(){
      $(this).removeClass("lighten-1");
      $(this).addClass("lighten-2");
    },function(){
      $(this).addClass("lighten-1");
      $(this).removeClass("lighten-2");
    });

  }
}


function ResetBlockCardsHoverOnArray(){
  //this takes that last materialnote hovered on and it makes it the last element in the BlockCardsHoverOn array and all elements before the direct parents of that element
  BlockCardsHoverOn = [];
  LastMaterialNoteEdited.parents(".block-card").each(function(i){
    //if it is the first element than it should be hovered everything after that is its parents who shouldn't be hovered on
    if(i == 0){
      $(this).addClass("z-depth-2");
      $(this).removeClass("z-depth-0");
    }
    else{
      $(this).addClass("z-depth-0");
      $(this).removeClass("z-depth-2");
    }
    BlockCardsHoverOn.splice(0,0,$(this));
  });

  console.log("reset block card done!");

}

function BlockCardHoveredOn(el){
  console.log("Block Card Hovered In");
  if(BlockCardsHoveredOn.length > 0){
    BlockCardsHoveredOn[BlockCardsHoveredOn.length - 1].addClass("z-depth-0");
    BlockCardsHoveredOn[BlockCardsHoveredOn.length - 1].removeClass("z-depth-1");
  }

/*
  for(var i = 0; i < BlockCardsHoveredOn.length; i++){
    BlockCardsHoveredOn[i].addClass("z-depth-0");
    BlockCardsHoveredOn[i].removeClass("z-depth-2");
  }
*/

  //var uniqueID = el.parent().parent().parent().attr("id");
  el.addClass("z-depth-1");
  el.removeClass("z-depth-0");

  BlockCardsHoveredOn.push(el);

}

function BlockCardHoveredOut(){
  console.log("Block Card Hovered OUt");
  BlockCardsHoveredOn[BlockCardsHoveredOn.length - 1].addClass("z-depth-0");
  BlockCardsHoveredOn[BlockCardsHoveredOn.length - 1].removeClass("z-depth-1");
  BlockCardsHoveredOn.pop();//take the last element out

  if(BlockCardsHoveredOn.length > 0){
    //adding the hovering to the latest element in the array
    BlockCardsHoveredOn[BlockCardsHoveredOn.length - 1].addClass("z-depth-1");
    BlockCardsHoveredOn[BlockCardsHoveredOn.length - 1].removeClass("z-depth-0");
  }

}

function AddAdditionalFilterForAnnotations(){
  var html = '<div class="chip meta-data-chips"><div class="annotation-meta-data"><i class="left material-icons meta-data-tag-icons">assignment</i><span>Document Name</span><i class="close material-icons meta-data-tag-icons">cancel</i></div></div>';
  $("#chip-filter-container-for-annotations").append(html);
}

function UpdateFiltersForAnnotations(){

}

function UpdateFiltersForIdeaSpace(){
  $("#annotation-results-info").html("Updating Filters and Fetching Annotations...");
  $("#updating-filter-loader-container").css("display","block");
  $("#ideaspace-annotation-results-container").css("display","none");
}

function LeftContainerHovered(){
  LeftPanelExpanded = true;

  BtnFaceLeft();

  $("#left-container").css("width","67%");
  $("#right-container").css("width","33%");
  $("#right-container").css("left","67%");

  $(".annotation-card-container").each(function(){
    if(!$(this).hasClass("annotation-card-expanded")){
      $(this).removeClass("m12");
      $(this).addClass("m6");
    }
  });

  //making filter options proper size
  $("#text-filter-status").removeClass("m12");
  $("#text-filter-status").addClass("m7");

  $("#btn-open-annotations-filters-container").removeClass("m12");
  $("#btn-open-annotations-filters-container").addClass("m5");

  $(".outline-card-trigger").each(function(){
    $(this).parent().removeClass('m12');
    $(this).parent().addClass('m4');
  });
}


function RightContainerHovered(){
  if(!IDEASPACESOPEN){

    LeftPanelExpanded = false;

    BtnFaceRight();

    $("#left-container").css("width","33%");
    $("#right-container").css("width","67%");
    $("#right-container").css("left","33%");

    $(".annotation-card-container").each(function(){
      $(this).removeClass("m6");
      $(this).addClass("m12");
    });

    //making filter options proper size
    $("#text-filter-status").removeClass("m7");
    $("#text-filter-status").addClass("m12");

    $("#btn-open-annotations-filters-container").removeClass("m5");
    $("#btn-open-annotations-filters-container").addClass("m12");

    $(".outline-card-trigger").each(function(){
      $(this).parent().removeClass('m4');
      $(this).parent().addClass('m12');
    });
  }
}

function BtnFaceRight(){
  $('#btn-change-size-of-container').removeClass('facing-left');
  $('#btn-change-size-of-container').addClass('facing-right');
  $('#btn-change-size-of-container').css('transform','rotate(270deg)');
}

function BtnFaceLeft(){
  $('#btn-change-size-of-container').removeClass('facing-right');
  $('#btn-change-size-of-container').addClass('facing-left');
  $('#btn-change-size-of-container').css('transform','rotate(90deg)');
}

function CreateNewIdeaSpace(n = 'Idea Space Name', d = 'This is a quick description of the idea space and its content.'){
  var uniqueID = 'newly-made-ideaspace' + ID();
  var start = '<div class="row my-row"><div class="col m12"><div id="' +  uniqueID + '" class="card white hoverable choose-idea-space choose-idea-space-type-1"><div class="card-content black-text"><div class="card-content-time">Updated Now</div>';
  var name = '<div><span class="card-title">' + n + '</span></div>';
  var description = '<div class="card-description">' + d + '</div>';
  var end = '<div class="drag-annotation-box valign-wrapper"><div class="drag-annotation-text center">Drop Annotation Here</div></div><div class="drag-annotation-meta-data"><span class="new badge" data-badge-caption="Annotations">0</span></div></div></div></div></div>';
  var html = start + name + description + end;

  $(html).insertAfter("#create-new-idea-space-box");
  var h = $("#" + uniqueID).height();
  $("#" + uniqueID).height(0);
  $("#" + uniqueID).animate({height: h}, 1000);
  CloseNewIdeaSpaceBox();
}

function OpenNewIdeaSpaceBox(){
  $("#create-new-idea-space-card").css('display','block');
  $("#create-new-idea-space-card").height('auto');
  var h = $("#create-new-idea-space-card").height();
  $("#create-new-idea-space-card").height(0);
  $("#create-new-idea-space-card").animate({ height: h }, 1000);
  $("#add-new-idea-space").addClass("disabled");

}

function CloseNewIdeaSpaceBox(){
  $("#create-new-idea-space-card").animate({ height: 0 }, 1000
  ,function(){
    $(this).css('display','none');
  });
  $("#add-new-idea-space").removeClass("disabled");
}


var edit = function() {
  $('.click2edit').materialnote({
    focus: true,

  });
};

var save = function() {
  var markup = $('.click2edit').materialnote({
    focus: false,

  });
  console.log('click');
  var h = $(".click2edit").next().children('.note-editable').height();
  $('.click2edit').destroy();
  $('.click2edit').height(h);
  //$(".click2edit").modal("hide");
};

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }

    window.setTimeout(function() {
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(el);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
    }, 1);
}

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '-' + Math.random().toString(36).substr(2, 9);
};


function InitBlockIdPosition(id){
  console.log("InitBlockIdPosition");
  blockIdPositions.push({
    id: id,
    position: {top: 0, left: 0}//initializing position returns object {top: value, left: value}
  });
}



function UpdateBlockIdPosition(event){//updates the position by adding the value x and y to the x and y position of the object
  console.log("UpdateBlockPosition");
  var aid = 'absolute-copy-' + event.target.id;
  for(var i = 0; i < blockIdPositions.length; i++){
    if(blockIdPositions[i].id === event.target.id){//if this specific id is the one being dragged

      blockIdPositions[i].position.left += event.dx;
      blockIdPositions[i].position.top += event.dy;
      document.getElementById(aid).style.transform =
      `translate(${blockIdPositions[i].position.left}px, ${blockIdPositions[i].position.top}px)`;
      break;
    }
  }
}

function ResetBlockIdPosition(event){// sets the position of the block back to 0,0
  console.log("ResetBlockIdPosition");
  for(var i = 0; i < blockIdPositions.length; i++){
    if(blockIdPositions[i].id === event.target.id){//if this specific id is the one being dragged
      blockIdPositions[i].position.left = 0;
      blockIdPositions[i].position.top = 0;
      document.getElementById(blockIdPositions[i].id).style.transform =
        `translate(${blockIdPositions[i].position.left}px, ${blockIdPositions[i].position.top}px)`;
      break;
    }
  }
}

function CheckDropzones(event){
  //checks if there are any dropzones that are being hovered over and that can accept the block
  console.log("CheckDropzones");

  if(CurrentDropZone.id != null){
    //see if the mouse is still inside the current dropzone. if it is not then set the current dropzone to an empty dropzone
    if(event.pageX >= CurrentDropZone.offset.left && event.pageX <= CurrentDropZone.offset.left + CurrentDropZone.w && event.pageY >= CurrentDropZone.offset.top && event.pageY <= CurrentDropZone.offset.top + CurrentDropZone.h){
      //pass
      //means that the object being dragged is still in the dropzone
    }
    else{
      UpdateSizeOfDropzone(CurrentDropZone.id, StandardDropzoneSize);//setting the dropzone back to normal size
      SetNewDropZone(event);

    }
  }
  else{//go through all the dropzones and see if the mouse is in the range of any of the dropzones
    SetNewDropZone(event);
  }

}

function CheckIdeaSpacesDropzones(event){
  $(".drag-annotation-box").each(function(){
    var p = $(this).offset();
    console.log(p);
    var dh = $(this).height();
    var dw = $(this).width();
    if(event.pageX >= p.left && event.pageX <= p.left + dw && event.pageY >= p.top && event.pageY <= p.top + dh){
      //$(this).children().html("Drop Annotation Here");
      ReadyAnnotationDropBox($(this));
    }
    else{
      //setting dropzone back to normal because user is not hovering over it
      //$(this).css("background-color","white");
      DefaultAnnotationDropBox($(this));
    }
  });
}

function ClearDropZone(){
  console.log("ClearDropZone");
  CurrentDropZone = {//set CurrentDropzone values to null untill we find a dropzone that is being hovered over
    id: null,
    offset: null,
    w: null,
    h: null
  };
}

function SetNewDropZone(event){
  console.log("SetNewDropZone");
  ClearDropZone();
  $(".interact-dropzone").each(function(){
    if(!($.contains(document.getElementById(event.target.id), document.getElementById($(this).attr("id"))))
      && !($("#" + event.target.id).prev().attr("id") == $(this).attr("id")) && !($("#" + event.target.id).next().attr("id") == $(this).attr("id"))){
      //if statement checks dropzone is inside the object that is being dragged  and if the dropzone is the element right before
      //or after the element being dragged if it is not then we can try to set a new drop zone
      var DropZone = {//structure of an empty dropzone
        id: $(this).attr("id"),
        offset: $(this).offset(),
        w: $(this).width(),
        h: $(this).height()
      };

      if(event.pageX >= DropZone.offset.left && event.pageX <= DropZone.offset.left + DropZone.w && event.pageY >= DropZone.offset.top && event.pageY <= DropZone.offset.top + DropZone.h){
        //mouse is in range of dropzone
        CurrentDropZone.id = DropZone.id;
        CurrentDropZone.offset = DropZone.offset;
        CurrentDropZone.w = DropZone.w;
        CurrentDropZone.h = OpenDropzoneSize;

        UpdateSizeOfDropzone(CurrentDropZone.id, OpenDropzoneSize);//increase the size of the dropzone to be the an open size of a dropzone
        //UpdateSizeOfDropzone(CurrentDropZone.id, $("#" + event.target.id).height());//increase the size of the dropzone to be the size of the thing being dragged into the dropzone
      }
    }
  });
}

function UpdateSizeOfDropzone(id, height){//updates the height of a specific dropzone based on id to a speicifc height passed in as a param
  // if the user hovers ove the dropzone with their mouse and they are dragging a block the dropzone with a specific id of "id" will increase its height to "height"
  console.log("UpdateSizeOfDropzone");
  $("#" + id).css("height", height);//make the height of the dropzone the height of the block that is selecting the dropzone
  //Then Set the height of the CurrentDropzone Object to the new height
  //$("#" + id).css("margin-bottom", -height + 10);//the default height of dropzone =
  //CurrentDropZone.h = height;
  if(height == OpenDropzoneSize){
    $("#" + id).css("opacity", 1.0);
  }
  else{
    $("#" + id).css("opacity", 0.0);
  }
}

function TryToDropBlock(event){
  console.log("TryToDropBlock");
  //takes the event and checks if there is an open dropzone that the target can be appended to and appends the target to the part in the outline
  //if there is no dropzone available it will reset the block position
  var aid = 'absolute-copy-' + event.target.id;
  if(CurrentDropZone.id != null){
    var ClassList = $("#" + event.target.id).attr('class');
    //takes in a string of classes and returns the string of classes without the specified string in the second parameter
    ClassList = TakeClassOutOfString(ClassList, 'annotation-card-container');

    //var ClassList = 'interact-draggable';
    /*if($("#" + aid).hasClass("idea-space-annotation") || $("#" + aid).hasClass("outline-annotation")){
      ClassList += ' outline-annotation';
    }*/
    if($("#" + event.target.id).hasClass("annotation-card-container")){//the remove functionality is slightly different if it is an annotation because an annotation doesn't have a dropzone below it
      var newElementID = event.target.id + ID();
      InitBlockIdPosition(newElementID);//because the ID has changed we need a new position object to keep track of its absolute copy location
      //functionality is slightly different for annotation card and regular blocks
      //but once an annotation card is dragged in it acts as a regular block and that is why we "TakeClassOutOfString" to make sure it acts as a normal block
    }else{
      var newElementID = event.target.id
    }



    var BlockHTML = "<div id='" + newElementID + "' class='" + ClassList + "'>" + $("#" + event.target.id).html() + "</div>";
    BlockHTML += "<div id='unique-inner-dropzone-id" + ID() + "' class='interact-dropzone'></div>"//create a new dropzone under the block that was inserted
    //need to remove the dropzone after the element that has been inserted elsewhere in the outline
    if($("#" + event.target.id).hasClass("annotation-card-container")){//the remove functionality is slightly different if it is an annotation because an annotation doesn't have a dropzone below it
      //$("#" + event.target.id).remove();//delete real block
    }else{
      $("#" + event.target.id).next().remove();
      $("#" + event.target.id).remove();
    }
    $("#" + aid).remove();//delete absolute copy block


    $(BlockHTML).insertAfter("#" + CurrentDropZone.id);
    //set the dropzone back to a normal size and clear the current dropzone object because the block has been dropped
    UpdateSizeOfDropzone(CurrentDropZone.id, StandardDropzoneSize);
    ClearDropZone();




  }
  else{
    //just delete absolute copy and everything goes back to normal
    $("#" + aid).remove();
    ResetBlockIdPosition(event);

    //There is one last case where the user was dragging this annotation into an Idea Space so we need to check that case
    TryToDropAnnotationIntoIdeaSpace();
  }

  $("#" + aid).remove();
  ResetBlockIdPosition(event);//maing the position back to (0,0) so it can be dragged normally after it is inserted

}

function TryToDropAnnotationIntoIdeaSpace(){
  $(".drag-annotation-box").each(function(){
    console.log($(this).css("background-color"));
    if($(this).hasClass("ready-to-recieve-annotation")){
      //that means that the user was trying to drop the annotation in this idea space
      AnimateDropingAnnotationIntoIdeaSpace($(this));
    }
  });
}

function DefaultAnnotationDropBox(el){
  el.css("border","3px dashed  #bdbdbd");
  el.children().css("color","#bdbdbd");
  el.children().html("Drop Annotation Here");
  el.removeClass("ready-to-recieve-annotation");
}

function ReadyAnnotationDropBox(el){
  el.children().css("color","#4db6ac");
  el.css("border","3px dashed #4db6ac");
  el.addClass("ready-to-recieve-annotation");
}

function RecievedAnnotationDropBox(el){
  el.children().css("color","#64b5f6");
  el.children().html("Annotation Added<i class='material-icons' style='position:relative;top:5px;'>check</i>");
  el.css("border","3px dashed #64b5f6");
}

function AnimateDropingAnnotationIntoIdeaSpace(el){
  RecievedAnnotationDropBox(el)
  setTimeout(function(el){
    DefaultAnnotationDropBox(el);
  },2000,el);

}

function StyleDraggingBlock(id){
  console.log("StyleDraggingBlock");
  var aid = "absolute-copy-" + id;
  $("#" + aid).css("opacity",0.5);
  $("#" + aid).css("z-index",100);
  if(!($("#" + id).hasClass("annotation-card-container"))){
    //if it is not an annotation then we want the real card not be visible while the absolute copy is being dragged around
    $("#" + id).css("opacity",0);
  }
}

function UnstyleDraggingBlock(id){
  console.log("UnstyleDraggingBlock");
  var aid = "absolute-copy-" + id;
  $("#" + aid).css("opacity",1.0);
  $("#" + aid).css("z-index",1);

  if(!($("#" + id).hasClass("annotation-card-container"))){
    //if it is not an annotation then we want the real card to be visible again because it was not visible as the aboslute copy was being dragged around
    $("#" + id).css("opacity",1.0);
  }

}

function CheckAutoScroll(event){
  console.log("CheckAutoScroll");
  var element = document.getElementById('paper-outline-container');
  var topPos = element.getBoundingClientRect().top + window.scrollY;
  var leftPos = element.getBoundingClientRect().left + window.scrollX;
  if(event.pageY <= topPos + AutoScrollingPadding && $("#paper-outline-container").scrollTop() > 0){
    //cursor is to close to the top of the page outline so we need to scroll up
    SCROLLDOWN = false;
    if(SCROLLUP != true){
      SCROLLUP = true;
      AutoScroll();
    }


  }
  else if(event.pageY >= topPos + $("#paper-outline-container").height() - AutoScrollingPadding){
    //cursor is to close to the top of the page outline so we need to scroll up
    SCROLLUP = false;
    if(SCROLLDOWN != true){
      SCROLLDOWN = true;
      AutoScroll();
    }
  }
  else{
    SCROLLDOWN = false;
    SCROLLUP = false;
  }

}

function AutoScroll(){
  console.log("AutoScroll");
  if(SCROLLUP){
    var scrollValue = $("#paper-outline-container").scrollTop();
    scrollValue += -SCROLLSPEED;
    if(scrollValue < 0){
      scrollValue = 0;
    }
    $("#paper-outline-container").scrollTop(scrollValue);

    setTimeout(AutoScroll, SCROLLDELAY);
  }

  if(SCROLLDOWN){
    var scrollValue = $("#paper-outline-container").scrollTop();
    var paperOutlineScrollHeight = document.getElementById('paper-outline-container').scrollHeight;
    scrollValue += SCROLLSPEED;
    if(scrollValue > paperOutlineScrollHeight){
      scrollValue = paperOutlineScrollHeight;
    }
    $("#paper-outline-container").scrollTop(scrollValue);
    setTimeout(AutoScroll, SCROLLDELAY);
  }

}

function CreateAbsoluteCopy(id,e){
  //e stands for event (mouse click)
  var h = $("#" + id).height();
  var w = $("#" + id).width()+20;
  var offset = $("#" + id).offset();
  var aid = 'absolute-copy-' + id;
  var html = "<div id='" + aid + "' style='height: " + h + "px; width: " + w + "px; z-index:10; position:absolute; top: 0px; left:0px;' class='annotation-card-container interact-draggable'>" + $("#" + id).html() + "</div>";
  //var html = "<div id='" + aid + "' style='z-index:10; position:absolute; top: 0px; left:0px;' class='annotation-card-container interact-draggable'>" + $("#" + id).html() + "</div>"
  $("body").append(html);
  $("#" + aid).css("top",-1 * $("#" + aid).offset().top + offset.top);
  $("#" + aid).css("left", offset.left - 10);

}

function ApplyStandardStylingToNewBlockCard(){

  //unbinding existing event listeners
  $(".block-card").unbind("hover");
  $(".btn-collapse-block").unbind("hover");
  $(".btn-collapse-block").unbind("click");
  $('.my-materialnote-containers').unbind("click");

  //next putting new event listeners that include the new elements with these
  //specific class names that have been created due to the moving and making of a new block

  //block card hover
  //make sure that when user hovers on a card it only lifts that card visually
  $(".block-card").hover(function(){
    BlockCardHoveredOn($(this));
  },function(){
    BlockCardHoveredOut();
  });


  /*
  $(".block-card").hover(function(){//hover in
    //clear any block that may have this styling
    //$(".block-card").addClass("z-depth-0");
    $(this).removeClass("z-depth-2");
    //add the styling to this specific block
    $(this).addClass("z-depth-2");
    $(this).removeClass("z-depth-0");
    //making the collapse btn visible if the user wants to collapse card
    $("#" + $(this).parent().parent().parent().attr('id') + " .btn-collapse-block").each(function(index){
      if(index == 0){
        $(this).css('visibility','visible');
      }
    });
    //$("#" + $(this).parent().parent().parent().attr('id') + " .btn-collapse-block").css('visibility','visible');
    //$(this).find('.btn-collapse-block').css('visibility','visible');
  },function(){//hover out
    //remove style for specific block
    $(this).addClass("z-depth-0");
    $(this).removeClass("z-depth-2");
    $("#" + $(this).parent().parent().parent().attr('id') + " .btn-collapse-block").each(function(index){
      if(index == 0){
        $(this).css('visibility','hidden');
      }
    });


  });
  */

  //btn collapse hover
  $(".btn-collapse-block").hover(function(){
    $(this).css('color', '#4db6ac');
    console.log("btn-collapse-block hover!");
  },function(){
    $(this).css('color', 'black');
    console.log("btn-collapse-block hover out!");
  });

  //click event for btn-collapse-block
  $(".btn-collapse-block").click(function(){
    $(this).css('transform','rotate(180deg)');
    var collapsedHeight = 50;
    var extraPadding = 30;
    var p = $(this).parent().parent().parent(".card-content");
    if($(this).hasClass('collapsed-card-content')){
      $(this).css('transform','rotate(180deg)');
      //the header is collapsed and user wants to open the header
      $(this).removeClass('collapsed-card-content');
      p.css("height","100%");
      var h = p.height();
      p.height(collapsedHeight);
      //if($(this).parent(".card-content").parent(".card-content"))
      p.animate({ height: h + extraPadding }, 1000);

    }
    else{
      $(this).css('transform','rotate(0deg)');
      p.animate({ height: collapsedHeight }, 2000);
      $(this).addClass("collapsed-card-content");
    }

  });


  $('.my-materialnote-containers').click(function(){
    MaterialNoteClicked($(this));
  });

}

//takes in a string of classes and returns the string of classes without the specified string in the second parameter
function TakeClassOutOfString(cl, s){
  //cl: stands for class list, s: stands for string
  var a = cl.split(" ");
  for(var i = 0; i < a.length; i++){
    if(a[i] == s){
      a.splice(i,1);//take the value at i out of the string of classes
      break;
    }
  }
  return a.join(" ");
}

function ToggleFilterOptions(){
    var wrapper = $("#wrapper-collapsible-filters");
    var list = $("#list-collapsible-filters");

    if(wrapper.hasClass('open')) {
      wrapper.height(list.outerHeight(true));

      wrapper.removeClass('open');
      $( "#wrapper-collapsible-filters" ).animate({
        height: 0
      }, 200, function(){
        //callback when fitler is all closed up we want to show the annotation results
        $("#annotation-results-information-section").css("display","block");
        $("#annotation-results-information-section").animate({opacity: 1.0},1000);
      });
      console.log(wrapper.height());
    } else {
      //show the results with the new filtering based on what the user has put in the filtering options
      $("#annotation-results-information-section").animate({opacity: 0},500,function(){
        $("#annotation-results-information-section").css("display","none");//clear so it doesnt mess with any other css on the page when the filter is open
        //callback function when animation is finished
        //when annotatino resutls is hidden we need to show the filtering options

        wrapper.addClass('open');
        $( "#wrapper-collapsible-filters" ).animate({
          height: list.outerHeight(true) + 10
        },
        {
          duration: 500,
          specialEasing: {
            height: "linear"
          },
        complete: function() {
          // Animation complete.
          $("#wrapper-collapsible-filters").height('auto');
        }
        });
        console.log(wrapper.height());

      });

    }
}


function OpenOutline(elmnt) {
  console.log("OpenOutline");
  /*
  takes in jquery element and checks the id of the element and uses the data to communicate with the server and query
  the database for the outline.
  */
}
