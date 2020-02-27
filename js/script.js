$( document ).ready(function() {

  //summernote
  //$(".summernote").summernote();
  //JS that uses Materialize Library
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
  $('.tooltipped').tooltip({
    enterDelay: 1000,
    html: "<p id='tooltip-create-ideaspace'>Create IdeaSpace</p>"
  });
  //styling tooltip
  console.log($("#tooltip-create-ideaspace").parent());
  $('.sidenav').sidenav({edge: 'right'});
  $("#slide-out-nav-bar").width($("#idea-space-col-container").width() + 20);

  $("#outline-container").height($(window).height() - $("#my-nav-wrapper").height() - 70);
  $("#outline-holder").height($(window).height() * 0.72);
  console.log("-" + $("#outline-container").css("height"));
  $("#idea-space-opener-container-col").css("margin-top", ((-1 * ($("#outline-container").height())) + 22) + "px");
  $("#idea-space-opener-container-col").css("left", ($("#idea-space-container-col").width()) + 40);
  $("#idea-space-name-container").height($(window).height() - $("#my-nav-wrapper").height() - $("#idea-space-header-container").height() - 100);
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

  });

  $(".outline-card-trigger").click(function(){
    $("#outline-holder-view-opener").css("display","none");
    $("#outline-view-progess-bar").css("display","block");
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

  $(".interact-dropzone")
  .on("dragenter", function(){
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

  $(".block-card").hover(function(){//hover in
    //clear any block that may have this styling
    $(".block-card").addClass("z-depth-0");
    $(this).removeClass("z-depth-2");
    //add the styling to this specific block
    $(this).addClass("z-depth-2");
    $(this).removeClass("z-depth-0");
  },function(){//hover out
    //remove style for specific block
    $(this).addClass("z-depth-0");
    $(this).removeClass("z-depth-2");
  });


  //if a block note is clicked on that means the user wants to edit the text
  $(".block-note").click(function(){
    console.log($(this).attr("id"));
  });



  //INTERACTJS Event Listeners-------------------------------------------------------------------------------------------

  $(".interact-draggable").each(function(){
    //console.log($(this)[0].id);
    InitBlockIdPosition($(this)[0].id);
  });
  //console.log(blockIdPositions);


  interact('.interact-draggable').draggable({
    listeners: {
      start (event) {
        console.log("started drag");
        DraggingBlock = true;//the user is dragging a block currently
        StyleDraggingBlock(event.target.id);
      },
      move (event) {

        UpdateBlockIdPosition(event);// takes in the event and updates position of block based on the move event
        CheckDropzones(event);//uses the event and tries to see if the block that is being dragged is near any dropzone
        AutoScroll(event);//scroll if the cursor is near the edge of the outline box
      },

      end (event){
        TryToDropBlock(event);//this function tries to drop the block into a an open dropzone if there is no open dropzone it send the block back to its original position
        UnstyleDraggingBlock(event.target.id);
        DraggingBlock = false;// the user is done dragging the block
      }
    }
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

  $(".block-header").click(function(){
    console.log($(this).parent(".card-content").height());
    if($(this).hasClass('collapsed-card-content')){
      //the header is collapsed and user wants to open the header
      $(this).removeClass('collapsed-card-content');
      $(this).parent(".card-content").css("height","100%");
      var h = $(this).parent(".card-content").height();
      $(this).parent(".card-content").height($(this).next().position().top);
      //if($(this).parent(".card-content").parent(".card-content"))
      $(this).parent(".card-content").animate({ height: h + 50 }, 1000);

    }
    else{
      $(this).next().position().top
      $(this).parent(".card-content").animate({ height: $(this).next().position().top }, 2000);
      $(this).addClass("collapsed-card-content");
    }
  });

  $("#annotation-results-ul > li").click(function(){
    if(!$(this).hasClass("active")){
      if($(this).hasClass("chevron-left-pagination")){
        //clicking on prev page button
        if(!($(this).hasClass("disabled"))){
          //if the button is not disabled then do something, otherwise don't do anything
          var currentPageNumber = null;
          $("#annotation-results-ul > li").each(function(index){
            //index 0 = left chevron
            //index 1 = page 1, index 2 = page 2,... etc
            if(currentPageNumber != null){
              //we found the current page number
              $(this).addClass("active");
            }
            if($(this).hasClass("active")){
              currentPageNumber = index;//grabbing the current page number
            }
          });
          currentPageNumber += -1; //moving back one page
          if(currentPageNumber > 1){
            $(this).removeClass("disabled");//you can use the left chevron because you are at a page greater than 1
          }
          else if(currentPageNumber == 1){
            $(this).addClass("disabled");//you can't use the left chevron because you are at page 1
          }
        }
      }
      else if($(this).hasClass("chevron-right-pagination")){
        //clicking onf next page button
        if(!($(this).hasClass("disabled"))){
          //if the button is not disabled then do something, otherwise don't do anything
          var currentPageNumber = null;
          var lastPageNumber = null;
          $("#annotation-results-ul > li").each(function(index){
            //index 0 = left chevron
            //index 1 = page 1, index 2 = page 2,... etc
            if($(this).hasClass("active")){
              currentPageNumber = index;//grabbing the current page number
            }
            lastPageNumber = index - 1;//grabbing the last page number, subtracting 1 because the last li is the right chevron
          });
          currentPageNumber += 1; //moving forward one page number
          if(currentPageNumber < lastPageNumber){
            $(this).removeClass("disabled");//you can use the right chevron because you are at a page number less than the last page number
          }
          else if(currentPageNumber == lastPageNumber){
            $(this).addClass("disabled");//you can't use the right chevron because you are at the last page
          }
        }
      }
      else{
        //if the pagination number is not active then go to the page otherwise do nothing
        var ChangePagination = function(el){
          //passing the jquery element that was clicked on

          //find the last page that was active and remove the class so that the current page that is selected is the only button selected
          $("#annotation-results-ul > li").each(function(){
            if($(this).hasClass("active")){
              $(this).removeClass("active");
              $(this).addClass("waves-effect");
            }
          });
          el.addClass("active");//make the button selected
        }
        //give the database time to query then set the pagination to active and the current one to not actice
        setTimeout(ChangePagination,300,$(this));
      }
    }
  });




});
