$( document ).ready(function() {

  //summernote
  //$(".summernote").summernote();

  $("#main-materialnote").materialnote({
    focus: true,
    toolbar: Toolbar
  });

  BtnGroupHtml = $("#InjectableBtn").html();

  InjectButtonsIntoToolbar();

  //$(".note-editable").css("display","none");

  //JS that uses Materialize Library

  function InitContextJs(){
    /*context.init({
      fadeSpeed: 100,
      filter: function($obj){},
      above: true,
      preventDoubleContext: true,
      compress: false
    });*/

    context.init({preventDoubleContext: false});

    context.settings({compress: true});


    context.attach('html', [
  		{header: 'Compressed Menu'},
  		{text: 'Back', href: '#'},
  		{text: 'Reload', href: '#'},
  		{divider: true},
  		{text: 'Save As', href: '#'},
  		{text: 'Print', href: '#'},
  		{text: 'View Page Source', href: '#'},
  		{text: 'View Page Info', href: '#'},
  		{divider: true},
  		{text: 'Inspect Element', href: '#'},
  		{divider: true},
  		{text: 'Disable This Menu', action: function(e){
  			e.preventDefault();
  			context.destroy('html');
  			alert('html contextual menu destroyed!');
  		}},
  		{text: 'Donate?', action: function(e){
  			e.preventDefault();
  			$('#donate').submit();
  		}}
  	]);
  }

  function InitMaterializeComponents(){
    $('.tabs').tabs();
    $("#docx-tab").focus();

    //$('.dropdown-trigger').dropdown();
    //$('.dropdown-content').unbind('click');

    $('select').formSelect();

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

    $('.chips-autocomplete-share-idea-space').chips({
      placeholder: 'Enter a Group',
      secondaryPlaceholder: '+Group',
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

    $('.collapsible').collapsible();

    $("#input-start-date-for-annoations").datepicker({
      onOpen: function(){
        $("#btn-change-size-of-container").css("z-index","1");
      },
      onClose: function(){
        $("#btn-change-size-of-container").css("z-index","3");
      }
    });
    $("#input-start-date-for-idea-space").datepicker({
      onOpen: function(){
        $("#btn-change-size-of-container").css("z-index","1");
      },
      onClose: function(){
        $("#btn-change-size-of-container").css("z-index","3");
      },
    });
    $("#input-end-date-for-annoations").datepicker({
      onOpen: function(){
        $("#btn-change-size-of-container").css("z-index","1");
      },
      onClose: function(){
        $("#btn-change-size-of-container").css("z-index","3");
      },
    });
    $("#input-end-date-for-idea-space").datepicker({
      onOpen: function(){
        $("#btn-change-size-of-container").css("z-index","1");
      },
      onClose: function(){
        $("#btn-change-size-of-container").css("z-index","3");
      },
    });

    $('.modal').modal();
    //$('.datepicker').datepicker();
    $('.tooltipped-menu-options').tooltip({
      html: "<p id='test-test'>Create IdeaSpace</p>"
    });
    $('.tooltipped').tooltip({
      enterDelay: 1000,
      html: "<p id='tooltip-create-ideaspace'>Create IdeaSpace</p>"
    });



    //end of InitMaterializeComponents-----------------------------
  }

  function InitEventListeners() {

    /*
    $(document).mousemove(function(event){
      var o = $("#right-container").offset();
      if(event.pageY >= o.top){
        if(event.pageX >= o.left){
          //user is in right container
          RightContainerHovered();
        }
        else{
          //user is in left container
          LeftContainerHovered();
        }
      }
    });
    */


    $(".show-more-text, .show-less-text").click(function(){
      $("i[card-id='" + $(this).attr("card-id") + "']").trigger("click");
    });


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

    $("#link-to-settings").click(function(){
      if(DropdownSettingOpen){
        $("#dropdown-settings").css("display","none");
        $(this).css("background-color","#2f2fa2");
        DropdownSettingOpen = false;
      }else{
        $("#dropdown-settings").css("display","block");
        $(this).css("background-color","#242582");
        DropdownSettingOpen = true;

      }


    });

    $(".btn-load-more-annotations").click(function(){
      $(this).parent().next().css('visibility','visible');
    });

    $(".input-filter-checkbox-for-annotations").click(function(){
      if($(this).prop("checked")){
        AddAdditionalFilterForAnnotations();
        //making the text dark blue because the filter is selected
        $(this).next().css("color","#242582");
        //console.log($(this).next());
      }
      else{
        //making the text grey because the filter is not selected
        $(this).next().css("color","#9e9e9e");
      }

      UpdateFiltersForAnnotations();

    });
    $(".input-filter-checkbox-for-idea-space").click(function(){
      if($(this).prop("checked")){
        //making the text dark blue because the filter is selected
        $(this).next().css("color","#242582");
      }
      else{
        //making the text grey because the filter is not selected
        $(this).next().css("color","#9e9e9e");
      }

      UpdateFiltersForIdeaSpace();
    });

    $(".annotation-more-information-icon").click(function(){
      //check if the annotation is expand more or less
      var p = $('#' + $(this).attr('card-id'));
      if(p.hasClass("annotation-card-expanded")){
        //the user wants to collapse annotation
        $(this).html("expand_more");
        p.removeClass("annotation-card-expanded");

        /*
        if(LeftPanelExpanded){

          p.addClass("m6");
          p.removeClass("m12");
        }
        else{
          p.removeClass("m6");
          p.addClass("m12");
        }
        */


        p.find('.annotation-extra-info').animate({height: 0}, 500);

        //if the user is trying to close the annotation then we also need to hide the text that needs to be hidden in the unexpanded view
        HideHiddenTextAndAnnotation($(this).attr('card-id'));

      }
      else{
        $(this).html("expand_less");

        /*
        if(LeftPanelExpanded){
          p.removeClass("m6");
          p.addClass("m12");
        }
        else{
          p.removeClass("m6");
          p.addClass("m12");
        }
        */

        p.addClass("annotation-card-expanded");


        var el = p.find('.annotation-extra-info');
        el.height("100%");
        var h = el.height();
        el.height(0);
        el.animate({height: h}, 500);

        //if the user is trying to open the annotation then they should be able to see the hidden text in the text and annotation
        ShowHiddenTextAndAnnotation($(this).attr('card-id'));

      }

      $(".annotation-grouping-body").css("height","100%");

    });

    $("#input-idea-space-name").on("input", function(){
      var maxCharacters = 50;
      var str = $(this).val();
      var charLeft = maxCharacters - str.length;
      if(charLeft > 0){
        $("#characters-left-badge-name").html(charLeft);
        $("#characters-left-badge-name").removeClass("red");
      }
      else {
        $("#characters-left-badge-name").html("0");
        $("#input-idea-space-name").val(str.substring(0,maxCharacters));
        $("#characters-left-badge-name").addClass("red");
      }
    });

    $("#input-idea-space-description").on("input", function(){
      var maxCharacters = 100;
        var str = $(this).val();
        var charLeft = maxCharacters - str.length;
        if(charLeft > 0){
          $("#characters-left-badge-description").html(charLeft);
          $("#characters-left-badge-description").removeClass("red");
        }
        else {
          $("#characters-left-badge-description").html("0");
          $("#input-idea-space-description").val(str.substring(0,maxCharacters));
          $("#characters-left-badge-description").addClass("red");
        }
    });

    $("#add-new-idea-space").click(function(){
      OpenNewIdeaSpaceBox();
    });

    $("#btn-cancel-new-idea-space").click(function(){
      CloseNewIdeaSpaceBox();
    });

    $("#btn-create-new-idea-space").click(function(){
      CreateNewIdeaSpace('Idea Space Name', 'This is a quick description of the idea space and its content.');
    });

    $("#btn-open-annotations-filters").click(function(){

      if($("#filter-annotation-icon").html() == "expand_more"){
        $("#filter-annotation-icon").html("expand_less");
        $("#annotations-filter-options > ul").height("auto");
        var h = $("#annotations-filter-options > ul").height();
        $("#annotations-filter-options > ul").height(0);
        $("#annotations-filter-options > ul").animate({height: h}, 500,function(){
          $("#annotations-filter-options > ul").height('auto');
        });
      }
      else{
        $("#filter-annotation-icon").html("expand_more");
        $("#annotations-filter-options > ul").animate({height: 0}, 500);
      }

    });

    $("#btn-open-annotations-filters-for-ideaspace").click(function(){

      if($("#filter-annotation-icon-for-ideaspace").html() == "expand_more"){
        $("#filter-annotation-icon-for-ideaspace").html("expand_less");
        $("#annotations-filter-options-for-ideaspace").height("100%");
        var h = $("#annotations-filter-options-for-ideaspace").height();
        $("#annotations-filter-options-for-ideaspace").height(0);
        $("#annotations-filter-options-for-ideaspace").animate({
          height: h
        },500, function(){
          $("#annotations-filter-options-for-ideaspace").height('auto');
        });

      }
      else{
        $("#filter-annotation-icon-for-ideaspace").html("expand_more");
        $("#annotations-filter-options-for-ideaspace").animate({
          height: 0
        },500);
      }

    });

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
        //console.log(wrapper.height());
      } else {
        wrapper.addClass('open');
        dividerLine.width('90%');
        wrapper.height(list.outerHeight(true));
        //console.log(wrapper.height());
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



    /*$(".outline-card-trigger").click(function(){
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
    });*/

    $(".outline-card-trigger").click(function(){
      $("#outlines-view-1").css("display","none");
      $("#outlines-view-2").css("display","block");
    });

    $("#back-to-outlines").click(function(){
      $("#outlines-view-1").css("display","block");
      $("#outlines-view-2").css("display","none");
    });

    $("#back-to-outlines").hover(function(){
      $(this).css("background-color","rgba(0,0,0,0.1)");
    },function(){
      $(this).css("background-color","transparent");
    });

    /*$("#back-to-outlines").click(function(){
      $("#outline-holder-view-opener").css("display","block");
      $("#outline-holder-view-opener").css("opacity","0.0");
      //$("#outline-view-progess-bar").css("display","block");
      $("#open-outline-view-container").css("display","none");
      $("#outline-holder-view-opener").animate({
        opacity: 1.0
      }, 2000);
    });*/

    $(".idea-space-row").click(function(){
      $("#idea-space-container-col").animate({
        opacity: 0.0
      }, 1000);
      $("#idea-space-opener-container-col").animate({
        left: 0
      }, 1000);
    });


  $("#paper-outline-container").scroll(function(){
    $("#paper-outline-container-contextmenu").css({top: "-200px", left:"-200px"});
  });

/*
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
*/

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
      $(this).css('color', "ToolbarBtnSelectedColor");
      console.log("btn-collapse-block hover!");
    },function(){
      $(this).css('color', "#2f2fa2");
      console.log("btn-collapse-block hover out!");
    });

    //make sure that when user hovers on a card it only lifts that card visually
    $(".block-card").hover(function(){
      BlockCardHoveredOn($(this));

      $("#" + $(this).parent().parent().parent().attr('id') + " .btn-collapse-block").each(function(index){
        if(index == 0){
          $(this).css('visibility','visible');
        }
      });
    },function(){
      BlockCardHoveredOut();
      $("#" + $(this).parent().parent().parent().attr('id') + " .btn-collapse-block").each(function(index){
        if(index == 0){
          $(this).css('visibility','hidden');
        }
      });
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
          //console.log("left chevron clicked");
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
          //console.log("right chevron clicked");
          //clicking onf next page button
          if(!($(this).hasClass("disabled"))){
            //if the button is not disabled then do something, otherwise don't do anything
            $("#filter-pagination-" + CURRENTPAGENUMBER).removeClass('active');
            CURRENTPAGENUMBER += 1;//move back on page
            $("#filter-pagination-" + CURRENTPAGENUMBER).addClass('active');

            //because we paginated right we need to make sure that left chevron works now
            $("#chevron-left-pagination").removeClass("disabled");

            if(CURRENTPAGENUMBER == LASTPAGENUMBER){
              //console.log("disabled right chevron");
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

    $('.my-materialnote-containers').click(function(){
      MaterialNoteClicked($(this));
    });



    $("#btn-share-idea-space").click(function(){
      $("#idea-space-opener-container").css("display","none");
      $("#idea-space-share-container").css("display","block");
      //making the correct elements inside the delete view viewable
      $("#update-share-idea-space-confirmation").css("display","block");
      $("#update-share-idea-space-div").css("display","none");
    });

    $("#btn-share-idea-space-confirmation").click(function(){
      $("#update-share-idea-space-confirmation").css("display","none");
      $("#update-share-idea-space-div").css("display","block");
      setTimeout(function(){
        $("#btn-dont-share-idea-space-confirmation").trigger("click");
      });
    });

    $("#btn-rename-idea-space").click(function(){
      $("#idea-space-opener-container").css("display","none");
      $("#idea-space-rename-container").css("display","block");
      //making the correct elements inside the delete view viewable
      $("#rename-idea-space-confirmation").css("display","block");
      $("#rename-idea-space-div").css("display","none");
    });

    $("#btn-rename-idea-space-confirmation").click(function(){
      $("#rename-idea-space-confirmation").css("display","none");
      $("#rename-idea-space-div").css("display","block");
      setTimeout(function(){
        $("#btn-dont-rename-idea-space-confirmation").trigger("click");
      },3000);
    });

    $("#btn-delete-idea-space").click(function(){
      $("#idea-space-opener-container").css("display","none");
      $("#idea-space-delete-container").css("display","block");
      //making the correct elements inside the delete view viewable
      $("#delete-idea-space-confirmation").css("display","block");
      $("#delete-idea-space-div").css("display","none");
    });

    $("#btn-delete-idea-space-confirmation").click(function(){
      $("#delete-idea-space-confirmation").css("display","none");
      $("#delete-idea-space-div").css("display","block");
      setTimeout(function(){
        $("#btn-return-to-idea-spaces").trigger("click");
        setTimeout(function(){
          $("#btn-dont-delete-idea-space-confirmation").trigger("click");
        },3000);

      }, 3000);

    });

    $("#btn-dont-delete-idea-space-confirmation").click(function(){
      $("#idea-space-opener-container").css("display","block");
      $("#idea-space-delete-container").css("display","none");
    });

    $("#btn-dont-share-idea-space-confirmation").click(function(){
      $("#idea-space-opener-container").css("display","block");
      $("#idea-space-share-container").css("display","none");
    });

    $("#btn-dont-rename-idea-space-confirmation").click(function(){
      $("#idea-space-opener-container").css("display","block");
      $("#idea-space-rename-container").css("display","none");
    });

    $(".annotation-grouping-header").click(function(){
      //$(".annotation-grouping-body").height($(".annotation-grouping-body").height());
      if($(this).children().children().html() == "expand_more"){
        //$(this).next().css("transition","none");
        $(this).next().css("height","auto");
        var h = $(this).next().height();
        $(this).next().css("height","0px");
        $(this).next().animate({
          height: h + "px"
        }, 1000, function() {
          // Animation complete.
          $(this).css("height","100%");
        });
        $(this).children().children().html("expand_less");
      }
      else{
        //$(this).next().css("transition","all 1s");
        $(this).next().animate({
          height: "0px"
        },1000);

        $(this).children().children().html("expand_more");
      }
    });

    $(".annotation-grouping-header").hover(function(){
      $(this).css('background-color','#5151c4');
    },function(){
      $(this).css('background-color','#2f2fa2');
    });

    $(".outline-grouping-header").click(function(){
      //$(".outline-grouping-body").height($(".outline-grouping-body").height());
      if($(this).children().children().html() == "expand_more"){
        $(this).next().css("transition","none");
        $(this).next().css("height","100%");
        var h = $(this).next().height();
        //console.log(h);
        $(this).next().css("height","0px");
        $(this).next().animate({
          height: h + "px"
        }, 1000, function() {
          // Animation complete.
          $(this).css("height","auto");
        });
        //$(this).next().css("transition","all 1s");
        //$(this).next().css("height", h + "px");
        $(this).children().children().html("expand_less");
      }
      else{
        $(this).next().animate({
          height: "0px"
        },1000);
        $(this).children().children().html("expand_more");
      }
    });

    $(".outline-grouping-header").hover(function(){
      $(this).css('background-color','#5151c4');
    },function(){
      $(this).css('background-color','#242582');
    });




    //Last event in this function ----------------------------

    $(document).on('click', 'html', function (event) {

      ShouldWeCloseDropdownSettings(event);
      ShouldWeCloseFilterAnnotationsDropDown(event);
      ShouldWeCloseSlaveMaterialNote(event);

		});

    //end of InitEventListeners--------------------------------
  }

  function InitIntroJSRelatedEventListeners(){
    $("#btn-settings-help").click(function(){
      introJs().start();
    });

    //end of InitIntroJSRelatedEventListeners--------------------------------
  }

  function SettingCSSWithJavascript(){

    $("#main-materialnote-container .note-style.btn-group").each(function(i){
      if(i == 0){
        $(this).css("display","block");
      }
    });

    $(".block-note").attr("contenteditable","false");

    $("#my-container").height(window.innerHeight - $("#my-container").offset().top - 30)

    $("#paper-outline-container").height(window.innerHeight - $("#paper-outline-container").offset().top - 170);

    $(".annotation-card-container").each(function(){
      $(this).find('.annotation-more-information-icon').attr('card-id',$(this).attr('id'));
    });

    $(".new-outline-badge").hover(function(){
      $(this).css("background-color","#00796b");
    },function(){
      $(this).css("background-color","teal");
    });

    //$(".annotation-grouping-body").height($(".annotation-grouping-body").height());
    //$(".outline-grouping-body").height($(".outline-grouping-body").height());


    $("#btn-change-size-of-container").click(function(){

      if($(this).hasClass('facing-left')){
        RightContainerHovered();
      }
      else{
        LeftContainerHovered();
      }
    });

    /*
    //Setting the dynamic movement of the left and right panel
    $("#right-container").hover(function(){
      RightContainerHovered();
    });

    $("#left-container").hover(function(){
      LeftContainerHovered();
    });

    */

    $("#link-to-outlines").click(function(){
      $("#outlines").css("opacity","1.0");
      $("#outlines").css("z-index","3");
      $("#annotations").css("z-index","2");
      $("#annotations").css("opacity","0.0");
      $(this).parent().addClass('active');
      $("#link-to-annotations").parent().removeClass('active');
    });

    $("#link-to-annotations").click(function(){
      $("#outlines").css("z-index","2");
      $("#annotations").css("z-index","3");
      $("#outline-container").css("opacity","0.0");
      $("#annotations").css("opacity","1.0");
      $(this).parent().addClass('active');
      $("#link-to-outlines").parent().removeClass('active');
    });

    $(".choose-idea-space").click(function(){
      IDEASPACESOPEN = false;
      LeftPanelExpanded = false;

      $("#btn-change-size-of-container .material-icons").css("color","#424242");

      $("#ideaspaces").css("opacity","0.0");
      $("#ideaspace").css("opacity","1.0");
      $("#ideaspace").css("z-index","2");
      $("#ideaspaces").css("z-index","1");
      $("#left-container").css("width","33%");
      $("#right-container").css("width","67%");
      $("#right-container").css("left","33%");

      /*
      $(".annotation-card-container").each(function(){
        $(this).removeClass("m6");
        $(this).addClass("m12");
      });
      */

      //making filter options proper size
      $("#text-filter-status").removeClass("m7");
      $("#text-filter-status").addClass("m12");

      $("#btn-open-annotations-filters-container").removeClass("m5");
      $("#btn-open-annotations-filters-container").addClass("m12");

      $(".outline-card-trigger").each(function(){
        $(this).parent().removeClass('m4');
        $(this).parent().addClass('m12');
      });

      //make the btn face the correct direction which is it should face right
      BtnFaceRight();


    });
    $("#btn-return-to-idea-spaces").click(function(){
      IDEASPACESOPEN = true;
      LeftPanelExpanded = true;

      $("#btn-change-size-of-container .material-icons").css("color","#e0e0e0")

      $("#ideaspace").css("opacity","0.0");
      $("#ideaspaces").css("opacity","1.0");
      $("#ideaspace").css("z-index","1");
      $("#ideaspaces").css("z-index","2");
      $("#left-container").css("width","67%");
      $("#right-container").css("width","33%");
      $("#right-container").css("left","67%");

      /*
      $(".annotation-card-container").each(function(){
        $(this).removeClass("m12");
        $(this).addClass("m6");
      });
      */

      //making filter options proper size
      $("#text-filter-status").removeClass("m12");
      $("#text-filter-status").addClass("m7");

      $("#btn-open-annotations-filters-container").removeClass("m12");
      $("#btn-open-annotations-filters-container").addClass("m5");

      $(".outline-card-trigger").each(function(){
        $(this).parent().removeClass('m12');
        $(this).parent().addClass('m4');
      });

    });

    $("#btn-update-filters-for-annotations").hover(function(){
      $(this).css("background-color","#1de9b6");
    },function(){
      $(this).css("background-color","#f5f5f5");
    });

    $("#btn-update-filters-for-annotations").click(function(){
      $("#annotations-filter-options").css("display","none");
      $("#filter-annotation-icon").html("expand_more");

      $("#text-filter-status").html("<span class='new badge right' data-badge-caption='Results'>32</span><span class='right'>Custom Filter Applied</span>");

    });

    //$(".color-scheme-level-1").addClass('purple');
    //$(".color-scheme-level-1").addClass('lighten-1');

    $("#slide-out-nav-bar").width($("#idea-space-col-container").width() + 20);

    //$("#outline-container").height($(window).height() - $("#my-nav-wrapper").height() - 70);
    $("#outline-holder").height($("#outline-container").height() * 1);
    //console.log("-" + $("#outline-container").css("height"));
    //$("#idea-space-opener-container-col").css("margin-top", ((-1 * ($("#outline-container").height())) + 22) + "px");
    //$("#idea-space-opener-container-col").css("left", ($("#idea-space-container-col").width()) + 40);
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

    $("#annotation-carousel").height($(document).height() - $("#annotation-carousel").offset().top - 50);


    //end of SettingCSSWithJavascript--------------------------------
  }

  function InitInteractJsEventListeners(){
    $(".interact-draggable").each(function(){
      //console.log($(this)[0].id);
      InitBlockIdPosition($(this)[0].id);
    });


    interact('.interact-draggable').draggable({
      listeners: {
        start (event) {

          if(!AnnotationAlreadyExistsInAnnotation(event.target.id)){
            if(!MATERIALNOTEOPEN){//to make sure the user is not just trying to select some text in the material note box rather than actually dragging the whole block
              console.log("started drag");
              DraggingBlock = true;//the user is dragging a block currently
              CreateAbsoluteCopy(event.target.id, event);
              StyleDraggingBlock(event.target.id);
            }
          }




        },
        move (event) {

          if(DraggingBlock){
            UpdateBlockIdPosition(event);// takes in the event and updates position of block based on the move event
            CheckDropzones(event);//uses the event and tries to see if the block that is being dragged is near any dropzone
            //CheckAutoScroll(event);//scroll if the cursor is near the edge of the outline box
            CheckIdeaSpacesDropzones(event);
          }
          else{
            //pass
          }


        },

        end (event){
          if(DraggingBlock){
            TryToDropBlock(event);//this function tries to drop the block into a an open dropzone if there is no open dropzone it send the block back to its original position
            UnstyleDraggingBlock(event.target.id);

            //updating any hovering or clicking events to include the new elements we added to the dom
            ApplyStandardStylingToNewBlockCard();
          }
          else{
            if(AnnotationAlreadyExists){
              AnnotationAlreadyExists = false;
              UnstyleAnnotationAlreadyExistsBox(event.target.id);
            }
          }
          DraggingBlock = false;// the user is done dragging the block
        }
      }
    });



    //end of InitInteractJsEventListeners--------------------------------
  }

  //initializing all code
  InitMaterializeComponents();
  InitEventListeners();
  InitIntroJSRelatedEventListeners();
  SettingCSSWithJavascript();
  InitInteractJsEventListeners();
  //InitContextJs();

});
