$( document ).ready(function() {

  //summernote
  //$(".summernote").summernote();
  //JS that uses Materialize Library

  function InitMaterializeComponents(){
    $('.tabs').tabs();
    $("#docx-tab").focus();

    $('.dropdown-trigger').dropdown();

    $('#menu-action-btn').floatingActionButton({direction: 'bottom', hoverEnabled: false});

    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: false
    });

    $('.chips').chips();
    $('.chips-autocomplete').chips({
      placeholder: 'Group Name',
      secondaryPlaceholder: '+Group',
    });
    $('.chips-autocomplete').chips({
      autocompleteOptions: {
        data: {
          'Apple': null,
          'Microsoft': null,
          'Google': null
        },
        limit: Infinity,
        minLength: 1
      }
    });
    $('#input-group-name').autocomplete({
      data: {
        "Group 1": null,
        "Another Group Name": null,
        "Special Group Name": 'https://placehold.it/250x250'
      },
    });
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.datepicker').datepicker();
    $('.tooltipped-menu-options').tooltip({
      html: "<p id='test-test'>Create IdeaSpace</p>"
    });
    $('.tooltipped').tooltip({
      enterDelay: 1000,
      html: "<p id='tooltip-create-ideaspace'>Create IdeaSpace</p>"
    });
  }

  function InitEventListeners() {
    $(".idea-space-row")
    .mouseover(function(){
      $(this).css("background-color", "#fafafa");
    })
    .mouseout(function(){
      $(this).css("background-color", "#ffffff");
    });

    $(".btn-collapsible-group").click(function(i) {
      var triggerNumber = (($(this).attr('class').split(' ')[1]).split('-'))[3];
      var wrapper = $("#wrapper-collapsible-group-" + triggerNumber);
      var list = $("#list-collapsible-group-" + triggerNumber);
      var dividerLine = $("#divider-line-group-names-" + triggerNumber);

      wrapper.height(list.outerHeight(true));

      if(wrapper.hasClass('open')) {
        wrapper.removeClass('open');
        wrapper.height(0);
        dividerLine.width('0%');
        console.log(wrapper.height());
      } else {
        wrapper.addClass('open');
        dividerLine.width('90%');
        wrapper.height(list.outerHeight(true));
        console.log(wrapper.height());
      }

    });

    $("#btn-filter-annotations").click(function(i) {
      ToggleFilterOptions();
    });

    $("#btn-update-filters").click(function(i) {
      ToggleFilterOptions();
    });


    $('#docx-tab').click(function(){
      $('#btn-export-as').html('Export DOCX');
    });
    $('#pdf-tab').click(function(){
      $('#btn-export-as').html('Export PDF');
      $('#docx-tab').css('background-color','transparent');
    });
    $('#html-tab').click(function(){
      $('#btn-export-as').html('Export HTML');
      $('#docx-tab').css('background-color','transparent');
    });
    $('#json-tab').click(function(){
      $('#btn-export-as').html('Export JSON');
      $('#docx-tab').css('background-color','transparent');
    });



    $(".outline-card-trigger").click(function(){
      $("#outline-holder-view-opener").css("display","none");
      $("#outline-view-progess-bar").css("display","block");
      $("#outline-view-progess-bar").css("opacity","1.0");
      $("#open-outline-view-container").css("display","block");
      $("#open-outline-view-container").css("opacity","0.0");
      setTimeout(function(){
        $("#open-outline-view-container").animate({
          opacity: 1.0
        }, 1000);
        $("#outline-view-progess-bar").animate({
          opacity: 0.0
        }, 1000, function(){
          $("#outline-view-progess-bar").css("display","none");
        });
      }, 1000);
      OpenOutline($(this));
    });

    $("#back-to-outlines").click(function(){
      $("#outline-holder-view-opener").css("display","block");
      $("#outline-holder-view-opener").css("opacity","0.0");
      //$("#outline-view-progess-bar").css("display","block");
      $("#open-outline-view-container").css("display","none");
      $("#outline-holder-view-opener").animate({
        opacity: 1.0
      }, 2000);
    });

    $(".idea-space-row").click(function(){
      $("#idea-space-container-col").animate({
        opacity: 0.0
      }, 1000);
      $("#idea-space-opener-container-col").animate({
        left: 0
      }, 1000);
    });

    $("#btn-return-to-idea-spaces").click(function(){
      $("#idea-space-container-col").animate({
        opacity: 1.0
      }, 1000);
      $("#idea-space-opener-container-col").animate({
        left: ($("#idea-space-container-col").width()) + 40
      }, 1000);
    });

    $("#btn-rename-idea-space").click(function(){
      $("#idea-space-title").attr("contenteditable","true");
      placeCaretAtEnd($('#idea-space-title').get(0));
      IDEASPACETITLEFOCUSED = true;
    });

    $(document).on('keypress',function(e) {
      if(IDEASPACETITLEFOCUSED){
        if(e.which == 13) {
            $("#idea-space-title").attr("contenteditable","false");
            document.getSelection().removeAllRanges();
            IDEASPACETITLEFOCUSED = false;
        }
      }

    });


  $("#paper-outline-container").scroll(function(){
    $("#paper-outline-container-contextmenu").css({top: "-200px", left:"-200px"});
  });

  $("#paper-outline-container").bind("contextmenu", function(event) {
      event.preventDefault();
      console.log(event.target.className);
      console.log(event.target.id);
      $("#paper-outline-container-contextmenu").css('display','block');
      $("#paper-outline-container-contextmenu").css({top: event.pageY + "px", left: event.pageX + "px"});
  }).bind("click", function(event) {
      $("#paper-outline-container-contextmenu").css('display','none');
      $("#paper-outline-container-contextmenu").css({top: "-200px", left:"-200px"});
  });

  $("#paper-outline-container-contextmenu").click(function(){
    $("#paper-outline-container-contextmenu").css({top: "-200px", left:"-200px"});
  });


    $(".interact-dropzone")
    .on("dragenter", function(){
      window.alert('hi');
      $(this).animate({
        opacity: 1.0
      }, 250);
    })
    .on("dragover", function(){

    })
    .on("dragleave", function(){
      $(this).animate({
        opacity: 0.0
      }, 500);
    })
    .on("drop", function(event){

    });

  /*
    $(".interact-dropzone").hover(function(){
      $(this).html("Create New Block");
      $(this).css('border-radius','15px');
    },function(){
      $(this).html('');
      $(this).css('border-radius','5px');
    });
  */


    $("#btn-overview").click(function(){

      //uncollapse all card contents that are collapsed
      $(".collapsed-card-content").each(function(i){
        $(this).trigger("click");
      });

      //$(".block-note").css('display','none');
      $(".block-note").css('height','20px');

      $(".btn-collapse-block").css('display','none');
      $(this).addClass('active');
      $("#btn-write").removeClass('active');

    });

    $("#btn-write").click(function(){
      //$(".block-note").css('display','block');
      $(".block-note").css('height','100%');

      $(".btn-collapse-block").css('display','block');
      $(this).addClass('active');
      $("#btn-overview").removeClass('active');
    });


    $(".btn-collapse-block").hover(function(){
      $(this).css('color', '#4db6ac');
      console.log("btn-collapse-block hover!");
    },function(){
      $(this).css('color', 'black');
      console.log("btn-collapse-block hover out!");
    });


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


    //if a block note is clicked on that means the user wants to edit the text
    $(".block-note").click(function(){
      console.log($(this).attr("id"));
    });

    $( "#paper-outline-container" ).mousedown(function(event) {
      MOUSEDOWN = true;

    });

    $( "#paper-outline-container" ).mouseup(function(event) {
      MOUSEDOWN = false;
    });

    $( "#paper-outline-container" ).mousemove(function(event) {
        NewMouseMove = true;
        if(MOUSEDOWN){
          //AutoScroll(event);
        }

    });


    $(".btn-collapse-block").click(function(){
      $(this).css('transform','rotate(180deg)');
      var extraPadding = 30;
      var p = $(this).parent().parent().parent(".card-content");
      var pParent = p.parent();
      if(pParent.hasClass('block-card-level-1')){
        var collapsedHeight = 70;
      }
      else{
        var collapsedHeight = 50;
      }
      if($(this).hasClass('collapsed-card-content')){
        $(this).css('transform','rotate(180deg)');
        //the header is collapsed and user wants to open the header
        $(this).removeClass('collapsed-card-content');
        p.css("height","100%");
        var h = p.height();
        p.height(collapsedHeight);
        //if($(this).parent(".card-content").parent(".card-content"))
        p.animate({ height: h + extraPadding }, 1000,
        function(){
          p.css("height","100%");
        });

      }
      else{
        $(this).css('transform','rotate(0deg)');
        p.animate({ height: collapsedHeight }, 2000);
        $(this).addClass("collapsed-card-content");
      }

    });

    $("#annotation-results-ul > li").click(function(){
      if(!$(this).hasClass("active")){
        if($(this).attr("id") == "chevron-left-pagination"){
          console.log("left chevron clicked");
          //clicking on prev page button
          if(!($(this).hasClass("disabled"))){
            //if the button is not disabled then do something, otherwise don't do anything
            $("#filter-pagination-" + CURRENTPAGENUMBER).removeClass('active');
            CURRENTPAGENUMBER += -1;//move back on page
            $("#filter-pagination-" + CURRENTPAGENUMBER).addClass('active');

            //because we paginated left we need to make sure that right chevron works now
            $("#chevron-right-pagination").removeClass("disabled");
            //$("#chevron-right-pagination").addClass("wave-effect");

            if(CURRENTPAGENUMBER == 1){
              //if page number is one then you can't paginate left anymore
              $("#chevron-left-pagination").addClass("disabled");
            }

          }
        }
        else if($(this).attr("id") == "chevron-right-pagination"){
          console.log("right chevron clicked");
          //clicking onf next page button
          if(!($(this).hasClass("disabled"))){
            //if the button is not disabled then do something, otherwise don't do anything
            $("#filter-pagination-" + CURRENTPAGENUMBER).removeClass('active');
            CURRENTPAGENUMBER += 1;//move back on page
            $("#filter-pagination-" + CURRENTPAGENUMBER).addClass('active');

            //because we paginated right we need to make sure that left chevron works now
            $("#chevron-left-pagination").removeClass("disabled");

            if(CURRENTPAGENUMBER == LASTPAGENUMBER){
              console.log("disabled right chevron");
              //if page number is equal to last page number than we cannot paginate right anymore so we must disable the button
              $("#chevron-right-pagination").addClass("disabled");
            }

          }
        }
        else{
          var cpn = CURRENTPAGENUMBER;
          var npn = parseInt($(this).attr('id').split('-')[2]);//grabbing page number of paginatoin fitler that was clicked;
          CURRENTPAGENUMBER = npn;
          //if the pagination number is not active then go to the page otherwise do nothing
          var ChangePagination = function(el, cpn, npn){
            //passing the jquery element that was clicked on
            $("#filter-pagination-" + cpn).removeClass('active');
            //$("#filter-pagination-" + cpn).addClass('waves-effect');
            $("#filter-pagination-" + npn).addClass('active');

            //disabling chevrons based on what the next page number is
            if(npn == LASTPAGENUMBER){
              $("#chevron-right-pagination").addClass("disabled");
              $("#chevron-left-pagination").removeClass("disabled");
            }
            else if(npn == 1){
              $("#chevron-left-pagination").addClass("disabled");
              $("#chevron-right-pagination").removeClass("disabled");
            }
            /*
            //find the last page that was active and remove the class so that the current page that is selected is the only button selected
            $("#annotation-results-ul > li").each(function(){
              if($(this).hasClass("active")){
                $(this).removeClass("active");
                $(this).addClass("waves-effect");
              }
            });
            el.addClass("active");//make the button selected
            */
          }
          //give the database time to query then set the pagination to active and the current one to not actice
          ChangePagination($(this),cpn,npn);
        }


      }

      //paging throuhg carousel slider
      $('.carousel.carousel-slider').carousel('set',CURRENTPAGENUMBER-1);



    });
  }

  function InitIntroJSRelatedEventListeners(){
    $("#btn-settings-help").click(function(){
      introJs().start();
    });
  }

  function SettingCSSWithJavascript(){
    $("#slide-out-nav-bar").width($("#idea-space-col-container").width() + 20);

    $("#outline-container").height($(window).height() - $("#my-nav-wrapper").height() - 70);
    $("#outline-holder").height($(window).height() * 0.72);
    console.log("-" + $("#outline-container").css("height"));
    $("#idea-space-opener-container-col").css("margin-top", ((-1 * ($("#outline-container").height())) + 22) + "px");
    $("#idea-space-opener-container-col").css("left", ($("#idea-space-container-col").width()) + 40);
    $("#idea-space-name-container").height($(window).height() - $("#my-nav-wrapper").height() - $("#idea-space-header-container").height() - 100);

    //for export html design concept
    var myjson = {
        "glossary": {
            "title": "example glossary",
        "GlossDiv": {
                "title": "S",
          "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
              "SortAs": "SGML",
              "GlossTerm": "Standard Generalized Markup Language",
              "Acronym": "SGML",
              "Abbrev": "ISO 8879:1986",
              "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                "GlossSeeAlso": ["GML", "XML"]
                        },
              "GlossSee": "markup"
                    }
                }
            }
        }
    };

    $("#pre-tag-json").html(JSON.stringify(myjson,undefined,4));
  }

  function InitInteractJsEventListeners(){
    $(".interact-draggable").each(function(){
      console.log($(this)[0].id);
      InitBlockIdPosition($(this)[0].id);
    });


    interact('.interact-draggable').draggable({
      listeners: {
        start (event) {
          console.log("started drag");
          DraggingBlock = true;//the user is dragging a block currently
          CreateAbsoluteCopy(event.target.id, event);
          StyleDraggingBlock(event.target.id);

        },
        move (event) {

          UpdateBlockIdPosition(event);// takes in the event and updates position of block based on the move event
          CheckDropzones(event);//uses the event and tries to see if the block that is being dragged is near any dropzone
          CheckAutoScroll(event);//scroll if the cursor is near the edge of the outline box
        },

        end (event){
          TryToDropBlock(event);//this function tries to drop the block into a an open dropzone if there is no open dropzone it send the block back to its original position
          UnstyleDraggingBlock(event.target.id);

          //updating any hovering or clicking events to include the new elements we added to the dom
          ApplyStandardStylingToNewBlockCard();
          DraggingBlock = false;// the user is done dragging the block
        }
      }
    });
  }

  //initializing all code 
  InitMaterializeComponents();
  InitEventListeners();
  InitIntroJSRelatedEventListeners();
  SettingCSSWithJavascript();
  InitInteractJsEventListeners();

});
