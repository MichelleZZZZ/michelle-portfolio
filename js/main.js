$(function(){

	$ham = $('header .hamburger'),
	$sideBar = $('main .sidebar'),
	$projectSideBar = $('main #project-sidebar'),
	$homeProject = $('#hopestreet-project'),
	navOpen = false,
	$aboutMe = $('main .about-me'),
	$landing = $('.wrapper .landing-part'),
	$scrollDown = $('.scroll-down'),
	$project = $('.project-page main .project'),
	$homeHeader = $('#home-header'),
	$deviceScreen = $('.model .device-animation'),
	duration = 400;

	// Phone hamburger menue
	function toggleNav(){

		if(navOpen){
			// close the nav
			$sideBar.removeClass('open');
			$ham.removeClass('open');

		}else{
			$sideBar.addClass('open');
			$ham.addClass('open');
		}

		navOpen = !navOpen;
	}

	$ham.click(toggleNav);


	//  Home sidebar waypoint

	$homeProject.waypoint(function(direction){

		if(direction==="down"){
			var sideBar = new TimelineMax();

			sideBar.add( TweenMax.to($projectSideBar .addClass('open-nav')) );
			sideBar.add( TweenMax.to($homeHeader.addClass('open-header'),{delay: 5}) );
			

		}else{
			$landing.velocity('scroll', {duration: duration})
			$projectSideBar.removeClass('open-nav');
			$homeHeader.removeClass('open-header');

		}

	},{
		offset: '20%'
	});
		
	// Landing waypoint

	function scrollDown(){
		$homeProject.velocity('scroll', {duration: duration});
	}

	var $landingPart = $('.landing-part');

		$landingPart.waypoint(function(direction){

			if(direction==="down"){
				scrollDown();
			}
		},{
			offset: '-1%'
		});
	
	$scrollDown.click(function(){
		scrollDown();

	});

	// Landing part animation
	MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");

	var $kiwi = $('#kiwi'),
		$myName = $('#name-2'),
		$myself = $('#myself-2'),
		$bird = $('#bird'),
		$designer = $('#designer-2'),
		tl = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});

		tl.to( $kiwi, 2, { morphSVG: { shape: $myName},ease: Back.easeInOut})
		tl.to( $kiwi, 2, {morphSVG: {shape: $bird },ease: Back.easeInOut});
		tl.to( $kiwi, 2, {morphSVG: {shape: $myself },ease: Back.easeInOut});
		tl.to( $kiwi, 2, {morphSVG: {shape: $designer },ease: Back.easeInOut});


	//Bubbles animation
	var $bubble1 = $('svg #Ellipse-1'),
		$bubble2 = $('svg #Ellipse-2'),
		$bubble3 = $('svg #Ellipse-3'),
		$bubble4 = $('svg #Ellipse-4'),
		$bubble5 = $('svg #Ellipse-5'),
		$bubble6 = $('svg #Ellipse-6'),
		$bubble7 = $('svg #Ellipse-7'),
		$bubble8 = $('svg #Ellipse-8'),
		$bubble9 = $('svg #Ellipse-9'),
		$bubble10 = $('svg #Ellipse-10'),
		bubble1 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble2 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble3 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble4 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble5 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble6 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble7 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble8 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble9 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});
		bubble10 = new TimelineMax({repeat: -1,yoyo: true,repeatDelay: 0.5, delay: 1});

		bubble1.to($bubble1, 3, {x: 20, y: -30, opacity: 0.27});
		bubble1.to($bubble1, 2.5, {x: 10, y: -25, opacity: 0.09});
		bubble1.to($bubble1, 2.5, {x: -10, y: -17,opacity: 0.05});

		bubble2.to($bubble2, 1.7, {x: -20, y: -25, opacity: 0.08});
		bubble2.to($bubble2, 3.2, {x: -10, y: 5, opacity: 0.35})
		bubble2.to($bubble2, 2, {x: 12, y: 15,opacity: 0.12});

		bubble3.to($bubble3, 2, {x: 35, y: 23,opacity: 0.12});
		bubble3.to($bubble3, 3, {x: 25, y: -15, opacity: 0.09});
		bubble3.to($bubble3, 2.2, {x: 12, y: 5, opacity: 0.27});

		bubble4.to($bubble4, 1.3, {x: 16, y: 20, opacity: 0.35});
		bubble4.to($bubble4, 1.6, {x: -12, y: 7,opacity: 0.05});
		bubble4.to($bubble4, 2, {x: -20, y: 6, opacity: 0.22});

		bubble5.to($bubble5, 3, {x: -20, y: 13, opacity: 0.06});
		bubble5.to($bubble5, 3.6, {x: -40, y: -9, opacity: 0.2});
		bubble5.to($bubble5, 4, {x: -20, y: 9,opacity: 0.12});

		bubble6.to($bubble6, 2.8, {x: 20, y: -10,opacity: 0.06});
		bubble6.to($bubble6, 3.3, {x: 5, y: -15, opacity: 0.27});
		bubble6.to($bubble6, 2.1, {x: -15, y: -16, opacity: 0.12});

		bubble7.to($bubble7, 3.5, {x: -33, y: -34, opacity: 0.22});
		bubble7.to($bubble7, 2.7, {x: -60, y: -20,opacity: 0.05});
		bubble7.to($bubble7, 3.1, {x: -10, y: 5, opacity: 0.18});

		bubble8.to($bubble8, 6, {x: 60, y: -30, opacity: 0.12});
		bubble8.to($bubble8, 2.8, {x: 40, y: -60, opacity: 0.27});
		bubble8.to($bubble8, 4, {x: -10, y: -25,opacity: 0.09});

		bubble9.to($bubble9, 3.6, {x: -35, y: 23,opacity: 0.15});
		bubble9.to($bubble9, 4.2, {x: -42, y: -33, opacity: 0.22});
		bubble9.to($bubble9, 2.5, {x: -10, y: -15, opacity: 0.4});

		bubble10.to($bubble10, 3, {x:-30, y: -15, opacity: 0.27});
		bubble10.to($bubble10, 4.2, {x: -50, y: 5});
		bubble10.to($bubble10, 3, {x: -30, y: -21});


	//landing texts

	var title = new TimelineMax({repeat: -1, repeatDelay: .7});
		title.to('.texts h1', .7, {opacity: 0.7});
		title.to('.texts h1', .7, {opacity: 1});


	// Down button
	var $downBtn = $('.scroll-down .down-btn');
		downButton = new TimelineMax({repeat: -1,repeatDelay: 1.5, delay: 1});
		downButton.to($downBtn, 0.5, {x:0, y: '-=20'});
		downButton.to($downBtn, 0.5, {x:0, y: 0});
		downButton.to($downBtn, 0.5, {x:0, y: '-=20'});
		downButton.to($downBtn, 0.5, {x:0, y: 0});


	// contact form
	var $contactForm = $('.contact-form');

	$contactForm.formValidation();

	// Waypoints device animation-1
	var $devices = $('.devices'),
		$projectInfo = $('.project-info');

	$devices.waypoint(function(direction){
		if(direction==="down"){
			$deviceScreen.css({'background-position': '0px 80%'});
						
		}else{
			$deviceScreen.css({'background-position': '0px 100%'});
		}

	},{
			offset: '60%'
		
	});
	// Waypoints device animation-2
	$devices.waypoint(function(direction){
		if(direction==="down"){
			$deviceScreen.css({'background-position': '0px 60%'});
						
		}else{
			$deviceScreen.css({'background-position': '0px 80%'});
		}

	},{
			offset: '50%'
		
	});

	// Waypoints device animation-3
	$devices.waypoint(function(direction){
		if(direction==="down"){
			$deviceScreen.css({'background-position': '0px 40%'});
						
		}else{
			$deviceScreen.css({'background-position': '0px 60%'});
		}

	},{
			offset: '40%'
		
	});
	// Waypoints device animation-4
	$devices.waypoint(function(direction){
		if(direction==="down"){
			$deviceScreen.css({'background-position': '0px 20%'});
						
		}else{
			$deviceScreen.css({'background-position': '0px 40%'});
		}

	},{
			offset: '20%'
		
	});

	$devices.waypoint(function(direction){
		if(direction==="down"){
			$deviceScreen.css({'background-position': '0px 5%'});
						
		}else{
			$deviceScreen.css({'background-position': '0px 20%'});
		}

	},{
			offset: '-20%'
		
	});

	// Waypoints device animation-3
	$projectInfo.waypoint(function(direction){

		if(direction==="down"){
			$deviceScreen.css({'background-position': '0px 40%'});
						
		}else{

			$deviceScreen.css({'background-position': '0px 60%'});
		}

	},{
			offset: '40%'
		
	});

	// Sketch slider

	var $body = $('body'),
		$thumbs = $('.sketch-pics img'),
		$modal,
		currentIndex = -1,
		numImages = $thumbs.length,
		lastIndex = numImages - 1;

	function createModal(){
		var $modal = $('<div>', {class: 'modal'}),
			$container = $('<div>', {class: 'modal-container'}),
			$img = $('<img>', {alt: ""}),
			$next = $('<div>', {class: 'next'}),
			$prev = $('<div>', {class: 'prev'});
			// $close = $('<i>', {class: "fa fa-times close"});
			$modal.append($container.append($img, $next, $prev));
		return $modal;
	}

	function addModal(){
		$body.append($modal);
	}

	function removeModal(){
		$modal.detach();
	}

	function loadModalImage(imageURL){
		$modal.find('img').attr('src', imageURL);
	}

	//initialize
	$modal = createModal();

	$thumbs.click(function(){
		var imgSrc = $(this).data('img');
		currentIndex = $thumbs.index(this);
		loadModalImage(imgSrc);
		addModal();
	});

	$modal.click(function(e){
		if(e.currentTarget === e.target){
			removeModal();
		}
	});

	// $modal.find('.close').click(function(){
	// 	removeModal();
	// });

	$modal.find('.next').click(function(){
		if(currentIndex < lastIndex){
			currentIndex++;
		}else{
			currentIndex = 0;
		}
		var imgSrc = $thumbs.eq(currentIndex).data('img');
		loadModalImage(imgSrc);
	});

	$modal.find('.prev').click(function(){
		if(currentIndex > 0){
			currentIndex--;
		}else{
			currentIndex = lastIndex;
		}
		var imgSrc = $thumbs.eq(currentIndex).data('img');
		loadModalImage(imgSrc);
	}); 


	

});