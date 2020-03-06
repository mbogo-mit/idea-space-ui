$( document ).ready(function() {

  //summernote
  //$(".summernote").summernote();
  //JS that uses Materialize Library

  $("#unique-block-id-34").click(function(e){
    CreateAbsoluteCopy("#unique-block-id-34", e);
  });

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
  $('.tooltipped').tooltip({
    enterDelay: 1000,
    html: "<p id='tooltip-create-ideaspace'>Create IdeaSpace</p>"
  });
  //styling tooltip
  console.log($("#tooltip-create-ideaspace").parent());
  //$('.sidenav').sidenav({edge: 'right'});
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



  //INTERACTJS Event Listeners-------------------------------------------------------------------------------------------

  $(".interact-draggable").each(function(){
    console.log($(this)[0].id);
    InitBlockIdPosition($(this)[0].id);
  });
  //console.log(blockIdPositions);


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


  $("#annotation-results-ul > li").click(function(){
    $('.carousel.carousel-slider').carousel('next');
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
          $("#chevron-right-pagination").addClass("wave-effect");

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
          $("#filter-pagination-" + cpn).addClass('waves-effect');
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
        setTimeout(ChangePagination,300,$(this),cpn, npn);
      }
    }
  });




});
