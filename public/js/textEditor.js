$(document).ready(function(){

  //event listeners for Main Materialnote
  $(".note-toolbar.btn-toolbar").unbind("click");//clearing materialnote click settings
  //$("#main-materialnote-container div[data-event='bold']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='bold']").click(function(e){
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='bold']").trigger("click");

      if(ToolbarState.bold){
        ToolbarState.bold = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.bold = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
      }
    }
  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='italic']").click(function(){
    console.log("bold italic");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='italic']").trigger("click");

      if(ToolbarState.italic){
        ToolbarState.italic = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.italic = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
      }
    }

  });

  $("#main-materialnote-container div[data-event='insert']").click(function(){
    if($("div[data-event='insert'] > .toolbar-item-icon").html() == "expand_more"){
      OpenInsertTab();
      OpenAllDropZones();
    }
    else{
      CloseInsertTab();
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='underline']").click(function(){
    console.log("bold underline");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='underline']").trigger("click");

      if(ToolbarState.underline){
        ToolbarState.underline = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.underline = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
      }
    }

  });


  $("#main-materialnote-container div[data-event='removeFormat']").click(function(){
    console.log("bold removeFormat");
    $(".interact-draggable div[data-event='removeFormat']").trigger("click");
  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='strikethrough']").click(function(){
    console.log("bold strikethrough");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='strikethrough']").trigger("click");

      if(ToolbarState.strikethrough){
        ToolbarState.strikethrough = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.strikethrough = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
      }
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='superscript']").click(function(){
    console.log("bold superscript");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='superscript']").trigger("click");

      if(ToolbarState.superscript){
        ToolbarState.superscript = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.superscript = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
        ToolbarState.subscript = false;
        $("#main-materialnote-container div[data-event='subscript']").css("background-color",ToolbarBtnDefaultColor);
      }
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='subscript']").click(function(){
    console.log("bold subscript");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='subscript']").trigger("click");

      if(ToolbarState.subscript){
        ToolbarState.subscript = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.subscript = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
        ToolbarState.superscript = false;
        $("#main-materialnote-container div[data-event='superscript']").css("background-color",ToolbarBtnDefaultColor);

      }
    }

  });

  $("#main-materialnote-container div[data-event='fontSize']").click(function(){
    console.log("bold fontSize");
    if(MATERIALNOTEOPEN){
      $("#main-materialnote-container .note-current-fontsize").html($(this).attr("data-value"));
      $(".interact-draggable div[data-event='fontSize'][data-value='" + $(this).attr("data-value") + "']").trigger("click");
    }
  });

  $("#main-materialnote-container div[data-event='fontName']").click(function(){
    console.log("bold fontName");
    if(MATERIALNOTEOPEN){
      $("#main-materialnote-container .note-current-fontname").html($(this).attr("data-value"));
      $(".interact-draggable div[data-event='fontName'][data-value='" + $(this).attr("data-value") + "']").trigger("click");
    }
  });


  $("#main-materialnote-container button[data-event='foreColor']").click(function(){
    console.log("bold foreColor");
    if(MATERIALNOTEOPEN){
      $("#main-materialnote-container .note-recent-color").css("color",$(this).attr("data-value"));
      $(".interact-draggable button[data-value='" + $(this).attr("data-value") + "'][data-event='foreColor']").trigger("click");
    }
  });

  $("#main-materialnote-container button[data-event='backColor']").click(function(){
    console.log("bold backColor");
    if(MATERIALNOTEOPEN){
      $("#main-materialnote-container .note-recent-color").css("background-color",$(this).attr("data-value"));
      $(".interact-draggable button[data-value='" + $(this).attr("data-value") + "'][data-event='backColor']").trigger("click");
    }
  });

  $("#main-materialnote-container div[data-event='fontsize']").click(function(){
    console.log("bold fontSize");
  });

  $("#main-materialnote-container div[data-event='fontname']").click(function(){
    console.log("bold fontName");
  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='insertUnorderedList']").click(function(){
    console.log("bold insertUnorderedList");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='insertUnorderedList']").trigger("click");

      if(ToolbarState.unorderedList){
        ToolbarState.unorderedList = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.unorderedList = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
        ToolbarState.orderedList = false;
        $("#main-materialnote-container div[data-event='insertOrderedList']").css("background-color",ToolbarBtnDefaultColor);
      }
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='insertOrderedList']").click(function(){
    console.log("bold insertOrderedList");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='insertOrderedList']").trigger("click");

      if(ToolbarState.orderedList){
        ToolbarState.orderedList = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.orderedList = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);
        ToolbarState.unorderedList = false;
        $("#main-materialnote-container div[data-event='insertUnorderedList']").css("background-color",ToolbarBtnDefaultColor);
      }
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='justifyLeft']").click(function(){
    console.log("bold justifyLeft");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='justifyLeft']").trigger("click");

      if(ToolbarState.justifyLeft){
        ToolbarState.justifyLeft = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.justifyLeft = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);

        ToolbarState.justifyCenter = false;
        $("#main-materialnote-container div[data-event='justifyCenter']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyRight = false;
        $("#main-materialnote-container div[data-event='justifyRight']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyFull = false;
        $("#main-materialnote-container div[data-event='justifyFull']").css("background-color",ToolbarBtnDefaultColor);
      }
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='justifyCenter']").click(function(){
    console.log("bold justifyCenter");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='justifyCenter']").trigger("click");

      if(ToolbarState.justifyCenter){
        ToolbarState.justifyCenter = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.justifyCenter = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);

        ToolbarState.justifyLeft = false;
        $("#main-materialnote-container div[data-event='justifyLeft']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyRight = false;
        $("#main-materialnote-container div[data-event='justifyRight']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyFull = false;
        $("#main-materialnote-container div[data-event='justifyFull']").css("background-color",ToolbarBtnDefaultColor);
      }
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='justifyRight']").click(function(){
    console.log("bold justifyRight");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='justifyRight']").trigger("click");

      if(ToolbarState.justifyRight){
        ToolbarState.justifyRight = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.justifyRight = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);

        ToolbarState.justifyCenter = false;
        $("#main-materialnote-container div[data-event='justifyCenter']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyLeft = false;
        $("#main-materialnote-container div[data-event='justifyLeft']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyFull = false;
        $("#main-materialnote-container div[data-event='justifyFull']").css("background-color",ToolbarBtnDefaultColor);
      }
    }

  });

  //$("#main-materialnote-container div[data-event='italic']").unbind("click");//clearing materialnote settings
  $("#main-materialnote-container div[data-event='justifyFull']").click(function(){
    console.log("bold justifyFull");
    if(MATERIALNOTEOPEN){
      $(".interact-draggable div[data-event='justifyFull']").trigger("click");

      if(ToolbarState.justifyFull){
        ToolbarState.justifyFull = false;
        $(this).css("background-color",ToolbarBtnDefaultColor);
      }else{
        ToolbarState.justifyFull = true;
        $(this).css("background-color",ToolbarBtnSelectedColor);

        ToolbarState.justifyCenter = false;
        $("#main-materialnote-container div[data-event='justifyCenter']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyRight = false;
        $("#main-materialnote-container div[data-event='justifyRight']").css("background-color",ToolbarBtnDefaultColor);
        ToolbarState.justifyLeft = false;
        $("#main-materialnote-container div[data-event='justifyLeft']").css("background-color",ToolbarBtnDefaultColor);
      }
    }

  });

  $("#main-materialnote-container div[data-event='indent']").click(function(){
    console.log("bold indent");
    $(".interact-draggable div[data-event='indent']").trigger("click");
  });

  $("#main-materialnote-container div[data-event='outdent']").click(function(){
    console.log("bold outdent");
    $(".interact-draggable div[data-event='outdent']").trigger("click");
  });



});

function UpdateMainToolbarState(){
  console.log("UpdateMainToolbarState");
  $("#main-materialnote-container div[data-event='bold']").css("background-color", ToolbarState.bold ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='italic']").css("background-color", ToolbarState.italic ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='underline']").css("background-color", ToolbarState.underline ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='strikethrough']").css("background-color", ToolbarState.strikethrough ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='superscript']").css("background-color", ToolbarState.superscript ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='subscript']").css("background-color", ToolbarState.subscript ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='insertUnorderedList']").css("background-color", ToolbarState.unorderedList ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='insertOrderedList']").css("background-color", ToolbarState.orderedList ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='justifyLeft']").css("background-color", ToolbarState.justifyLeft ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='justifyCenter']").css("background-color", ToolbarState.justifyCenter ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='justifyRight']").css("background-color", ToolbarState.justifyRight ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);
  $("#main-materialnote-container div[data-event='justifyFull']").css("background-color", ToolbarState.justifyFull ? ToolbarBtnSelectedColor : ToolbarBtnDefaultColor);

  $("#main-materialnote-container div[data-event='color']").css("color",ToolbarState.color.foreColor);
  $("#main-materialnote-container div[data-event='color']").css("background-color",ToolbarState.color.backColor);
  $("#main-materialnote-container .note-current-fontsize").html(ToolbarState.fontSize);
  $("#main-materialnote-container .note-current-fontname").html(ToolbarState.fontName);

}

function SetToolbarStateToDefault(){
  ToolbarState = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    superscript: false,
    subscript: false,
    color: {
      foreColor: "rgb(0,0,0)",
      backColor: "rgb(255,255,255)",
    },
    fontSize: 12,
    fontName: "sans-serif",
    unorderedList: false,
    orderedList: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,

  }
}

function GetToolbarState(){
  console.log("GetToolbarState");
  console.log($(".interact-draggable div[data-event='bold']").css("background-color"));
  ToolbarState.bold = ($(".interact-draggable div[data-event='bold']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.italic = ($(".interact-draggable div[data-event='italic']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.underline = ($(".interact-draggable div[data-event='underline']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.strikethrough = ($(".interact-draggable div[data-event='strikethrough']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.superscript = ($(".interact-draggable div[data-event='superscript']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.subscript = ($(".interact-draggable div[data-event='subscript']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.unorderedList = ($(".interact-draggable div[data-event='insertUnorderedList']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.orderedList = ($(".interact-draggable div[data-event='insertOrderedList']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.justifyLeft = ($(".interact-draggable div[data-event='justifyLeft']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.justifyCenter = ($(".interact-draggable div[data-event='justifyCenter']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.justifyRight = ($(".interact-draggable div[data-event='justifyRight']").css("background-color") == "rgb(156, 39, 176)");//returns true or false
  ToolbarState.justifyFull = ($(".interact-draggable div[data-event='justifyFull']").css("background-color") == "rgb(156, 39, 176)");//returns true or false

  //ToolbarState.color.foreColor = $(".interact-draggable div[data-event='color']").css("color");
  //ToolbarState.color.backColor = $(".interact-draggable div[data-event='color']").css("background-color");

  var cssStyle = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode.style;
  if(cssStyle.color != ""){
    ToolbarState.color.foreColor = cssStyle.color;
  }
  else{
    ToolbarState.color.foreColor = "rgb(0,0,0)";
  }

  if(cssStyle.backgroundColor != ""){
    ToolbarState.color.backColor = cssStyle.backgroundColor;
  }
  else{
    ToolbarState.color.backColor = "rgb(255,255,255)";
  }

  ToolbarState.fontSize = $(".interact-draggable .note-current-fontsize").html();
  ToolbarState.fontName = $(".interact-draggable .note-current-fontname").html();

}

function OpenInsertTab(){
  $("#dropdown-for-toolbar-insert").css({display: 'block', left: $("div[data-event='insert'").offset().left - 5});
  $("div[data-event='insert'] > .toolbar-item-icon").html("expand_less");
}

function CloseInsertTab(){
  $("#dropdown-for-toolbar-insert").css({display: 'none'});
  $("div[data-event='insert'] > .toolbar-item-icon").html("expand_more");
}

function OpenAllDropZones(){
  $(".interact-dropzone").css({
    opacity: 1.0,
    height: OpenDropzoneSize,
    cursor: "copy",
    borderColor: "#bdbdbd",
    color: "#bdbdbd"
  });

  $(".interact-dropzone").hover(function(){
    $(this).css({
      borderColor: "#4db6ac",
      color: "#4db6ac"
    });
  },function(){
    $(this).css({
      borderColor: "#bdbdbd",
      color: "#bdbdbd"
    });
  });

  $(".interact-dropzone").click(function(){
    CloseAllDropzones();
  });

  $(".interact-dropzone").html("Click To Insert");
}

function CloseAllDropzones(){
  $(".interact-dropzone").css({
    opacity: 0.0,
    height: 10,
    cursor: "auto",
    borderColor: "#bdbdbd",
    color: "#bdbdbd"
  });

  $(".interact-dropzone").unbind("click");
  $(".interact-dropzone").unbind("hover");
}

function PutBoundaryOnBlockHeaderMaterialNote(el){
  if(el.children().html().length > MaxValueOfCharsForBlockHeader){
    el.children().html(el.children().html().substring(0,MaxValueOfCharsForBlockHeader));
    setCaretToPos(el.children().get(0), MaxValueOfCharsForBlockHeader - 1);
  }
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}
