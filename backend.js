/*	  
 *	Websnap Custom Tabs Wordpress Plugin
 *	Author				: Rodrigo Hernando
 *	URI						: https://github.com/rhernandog/wordpress-tab-plugin-html
 *	Version				: 1.0.0
 *	License				: MIT
 *	File Type			: Backend HTML & CSS test Javascript file
 *	Dependencies	: jQuery 1.12.3
 */


(function($){$(function(){

	// variables
	var tabIdList, tabIdElements, activeElement, tabIdLinks, selectedLink, tabContentWrap, tabContentContainer, currentContainer, activeLinkDisplay, currentActiveLink, configLeftColumn, $window, screenWidth;

	// list id elements & links
	tabIdList = $("#tab-id-list");
	tabIdElements = $(".tab-id-element");
	activeElement = $(".tab-id-element.is-active");
	tabIdLinks = $(".tab-id-link");
	selectedLink = $(".tab-id-link[aria-selected='true']");

	// tab content
	tabContentWrap = $("#tab-content-wrap");
	tabContentContainer = $(".tab-content-container");
	currentContainer = $(".tab-content-container.is-active");

	// active link element display for small screens
	currentActiveLink = $("#current-active-link");
	activeLinkDisplay = $("#active-link-display");

	// get the screen width to know if the active link display should be hidden or not
	$window = $(window);
	screenWidth = $window.width();

	// config left column for the acitve link display click
	configLeftColumn = $("#config-left-column");

	// set the initial state of the active link display for small screens
	if( screenWidth < 1024 ) {
		activeLinkDisplay.attr("aria-hidden", false);
	}

	// set the screen  width when resizing
	$window.on('resize', function(){

		// set the screen width
		screenWidth = $window.width();

		// correct the scroll position of the left column, in case it has been scrolled down
		if( screenWidth < 1024 && configLeftColumn.scrollTop() > 0 ) {

			// set the scroll to 0
			configLeftColumn.css({'max-height':'none', 'height':'48px', 'overflow-y':'hidden'}).scrollTop(0);

		} else if( screenWidth < 1024 ){

			configLeftColumn.css({'max-height':'none', 'height':'48px', 'overflow-y':'hidden'});

		} else if ( screenWidth >= 1024 ) {

			configLeftColumn.css({'max-height':'none', 'height':'350px', 'overflow-y':'auto'});

		}// scroll conditional end

	});// window resize end

	// set the initial value of the current active link
	currentActiveLink.html(selectedLink.html());

	// when clicking the current active link in small screens, animate the height
	// of the left column to show the tabs links and hide the active link display
	currentActiveLink.on('click', function(e){

		// hide the active link display
		activeLinkDisplay.css({'opacity':0, 'visibility':'hidden'}).attr("aria-hidden", true);

		// change the height of the left column
		configLeftColumn.css({'max-height':'350px', 'height':'auto', 'overflow-y':'auto'});

		// change the styles of the ids list
		tabIdList.css('opacity',1);

	});// active link click end

	// tab links click event
	tabIdLinks.on('click', function(e){

		e.preventDefault();

		// variables
		var self, $self, parent, targetId, targetTab;

		$self = $(e.target);
		parent = $self.parent();
		targetId = $self.attr("href");
		targetTab = $("#"+targetId);

		// check the screen width, if it's small screen reset the left column height,
		// and reset the of the active link display
		if( screenWidth < 1024 ) {

			// active link styles
			activeLinkDisplay.css({'opacity':1, 'visibility':'visible'}).attr("aria-hidden", false);

			// left column styles & the scroll value
			configLeftColumn.css({'max-height':'none', 'height':'48px', 'overflow-y':'hidden'}).scrollTop(0);

		}// screen width conditional end

		// toggle the link selected attr
		changeLinkSelected($self);

		// toggle the active class
		toggleClass(parent);

		// toggle the visible target
		toggleTargetClass(targetTab);

		// change the text of the active link
		currentActiveLink.html($self.html());

	});// tab links click end

	// function to change the aria selected attr
	// @param : the jquery instance of the <a> tag being clicked, this changes the aria-selected attr
	function changeLinkSelected(link){

		// toggle the selected attr of the current selected element
		selectedLink.attr("aria-selected", false);

		// toggle the selected attr of the clicked link
		link.attr("aria-selected", true);

		// set the current selected element to the clicked link
		selectedLink = link;

	}// change selected end

	// function to remove the active class from the link parent
	// @param : the link parent
	function toggleClass(element){

		// remove class from active element
		activeElement.removeClass("is-active");

		// add the class to the target element
		element.addClass("is-active");

		// set the current active element
		activeElement = element;

	}// toggle class end

	// function to toggle the acitve class of the target containers
	function toggleTargetClass(target){

		// remove class toggle hidden attr
		currentContainer.removeClass("is-active").attr("aria-hidden", true);

		// add class toggle hidden attr on target
		target.addClass("is-active").attr("aria-hidden", false);

		// set the current active container
		currentContainer = target;

	}// toggle target class end


});}(jQuery));