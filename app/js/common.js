
/*!
* Custom scripts
*/
$(function() {
	//===== Mobile navigation =====//
	//Function mobile menu In
	function menuIn() {
		var a = $('.site-header-nav-btn a');
		var n = $('.site-header-nav');

		a.addClass('active');
		n.addClass('menu_on');
		setTimeout (function() {
			n.addClass('menu_visible');
		}, 50);
	}

	//Function mobile menu Out
	function menuOut() {
		var a = $('.site-header-nav-btn a');
		var n = $('.site-header-nav');

		a.removeClass('active');
		n.removeClass('menu_visible');
		setTimeout (function() {
			n.removeClass('menu_on');
		}, 300);
	}

	//Click to activator mobile menu
	$('.site-header-nav-btn a').on('click', function(e) {
		e.preventDefault();

		var n = $(this).closest('.site-header-nav');

		if ( n.hasClass('menu_on') ) {
			menuOut();
		} else {
			menuIn();
		}
	});

	//===== Popup =====//
	//Function popup In
	function popupIn(el) {
		var b = $('body');
		var elem = $(el);
		var padL = window.innerWidth - document.body.clientWidth;

		b.addClass('popup_on');
		b.attr( 'style', 'margin-right: ' + padL + 'px' );
		elem.addClass('active');

		setTimeout (function() {
			elem.addClass('visible');
		}, 50);
	}

	//Function popup Out
	function popupOut(el, timeOut) {
		var b = $('body');
		var elem = $(el);

		elem.removeClass('visible');

		setTimeout (function() {
			b.removeClass('popup_on');
			b.attr( 'style', '' );

			elem.removeClass('active');
		}, timeOut);
	}

	//Function popup Out for All
	function popupOutAll(timeOut) {
		var b = $('body');

		$('.popup').each( function(e) {
			$(this).removeClass('visible');

			setTimeout (function() {
				$(this).removeClass('active');
			}, timeOut);
		});

		setTimeout (function() {
			b.removeClass('popup_on');
			b.attr( 'style', '' );
		}, timeOut);
	}

	//Click to activator for popup
	$('a[data-popup]').on('click', function(e) {
		e.preventDefault();

		var b = $('body');
		var t = $(this).attr('href').replace('#', '');
		var d = $(this).data('popup');

		$('#' + t + ' input[type="hidden"]').val(d);
		$("#" + t + " h2").text(d);

		if ( b.hasClass('popup_on') ) {
			popupOut('#' + t, 600);
		} else {
			popupIn('#' + t);
		}
	});

	//Close popup (click to close button)
	$('.popup-close').on('click', function(e) {
		e.preventDefault();

		var p = $(this).closest('.popup');
		var t = p.attr('id');

		popupOut('#' + t, 600);
	});

	//Close popup (click out of content)
	$('.popup').on('mouseup', function(e) {
		var t = $(this).attr('id');

		if ( $(e.target).closest('.popup-content').length ) {
			return;
		} else {
			popupOut('#' + t, 600);
			e.stopPropagation();
		}
	});

	//===== Scroll to Anchor =====//
	$('a[data-anchor]').on('click',function(){
		e.preventDefault();

		var thisId = $(this).attr('href');
		var elScroll = $(thisId).offset().top;

		$('html, body').animate({
			scrollTop: elScroll
		}, 600);
	});


	//===== Input mask =====//
	$('input[type="tel"]').inputmask({mask: '+7 (999) 999-9999'});

	//===== Yandex map =====//
	if ( document.getElementById('map') ) {
		ymaps.ready(init);

		var coordCenterMyMap = [55.8188775689302, 37.618353999999954],
			zoomSize = 'large';

		function init(){
			var myMap = new ymaps.Map("map", {
				controls: [],
				center: coordCenterMyMap,
				zoom: 16
			});

			var myPlacemark = new ymaps.Placemark([55.8188775689302, 37.618353999999954], {
				hintContent: 'Грузи в газель',
			}, {
				iconLayout: 'default#image',
				iconImageClipRect: [ [0, 0], [45, 60] ],
				iconImageHref: 'images/marker-map.svg',
				iconImageSize: [45, 60],
				iconImageOffset: [-22, -60]
			});

			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable(['scrollZoom']);

			var zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: zoomSize
				}
			});

			myMap.controls.add(zoomControl);
		}
	}

	//===== Press Esc =====//
	$(document).on('keyup', function(e) {
		if (e.keyCode == 27) {
			if ( $('.site-header-nav').hasClass('menu_on') ) {
				menuOut();
			}

			if ( $('body').hasClass('popup_on') ) {
				popupOutAll(600);
			}
		}
	});


	//===== Click out of element =====//
	$(document).on('mouseup', function(e) {
		if ( !$(e.target).closest('.site-header-nav').length ) {
			menuOut();
		}
	});


	//===== Window resize =====//
	$(window).on('resize', function() {
		if ( window.innerWidth >= 768 ) {
			if ( $('.site-header-nav').hasClass('menu_on') ) {
				menuOut();
			}
		}
	})
});
