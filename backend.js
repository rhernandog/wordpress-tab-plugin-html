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
	var tabIdList, tabIdElements, activeElement, tabIdLinks, selectedLink, tabContentWrap, tabContentContainer, currentContainer;

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

	// tab links click event
	tabIdLinks.on('click', function(e){

		e.preventDefault();

		// variables
		var self, $self, parent, targetId, targetTab;

		$self = $(e.target);
		parent = $self.parent();
		targetId = $self.attr("href");
		targetTab = $("#"+targetId);

		// toggle the link selected attr
		changeLinkSelected($self);

		// toggle the active class
		toggleClass(parent);

		// toggle the visible target
		toggleTargetClass(targetTab);

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