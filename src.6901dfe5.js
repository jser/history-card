// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/reveal.js/js/reveal.js":[function(require,module,exports) {
var define;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * reveal.js
 * http://revealjs.com
 * MIT licensed
 *
 * Copyright (C) 2018 Hakim El Hattab, http://hakim.se
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function () {
			root.Reveal = factory();
			return root.Reveal;
		});
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		// Node. Does not work with strict CommonJS.
		module.exports = factory();
	} else {
		// Browser globals.
		root.Reveal = factory();
	}
})(this, function () {

	'use strict';

	var Reveal;

	// The reveal.js version
	var VERSION = '3.7.0';

	var SLIDES_SELECTOR = '.slides section',
	    HORIZONTAL_SLIDES_SELECTOR = '.slides>section',
	    VERTICAL_SLIDES_SELECTOR = '.slides>section.present>section',
	    HOME_SLIDE_SELECTOR = '.slides>section:first-of-type',
	    UA = navigator.userAgent,


	// Configuration defaults, can be overridden at initialization time
	config = {

		// The "normal" size of the presentation, aspect ratio will be preserved
		// when the presentation is scaled to fit different resolutions
		width: 960,
		height: 700,

		// Factor of the display size that should remain empty around the content
		margin: 0.04,

		// Bounds for smallest/largest possible scale to apply to content
		minScale: 0.2,
		maxScale: 2.0,

		// Display presentation control arrows
		controls: true,

		// Help the user learn the controls by providing hints, for example by
		// bouncing the down arrow when they first encounter a vertical slide
		controlsTutorial: true,

		// Determines where controls appear, "edges" or "bottom-right"
		controlsLayout: 'bottom-right',

		// Visibility rule for backwards navigation arrows; "faded", "hidden"
		// or "visible"
		controlsBackArrows: 'faded',

		// Display a presentation progress bar
		progress: true,

		// Display the page number of the current slide
		slideNumber: false,

		// Use 1 based indexing for # links to match slide number (default is zero
		// based)
		hashOneBasedIndex: false,

		// Determine which displays to show the slide number on
		showSlideNumber: 'all',

		// Push each slide change to the browser history
		history: false,

		// Enable keyboard shortcuts for navigation
		keyboard: true,

		// Optional function that blocks keyboard events when retuning false
		keyboardCondition: null,

		// Enable the slide overview mode
		overview: true,

		// Disables the default reveal.js slide layout so that you can use
		// custom CSS layout
		disableLayout: false,

		// Vertical centering of slides
		center: true,

		// Enables touch navigation on devices with touch input
		touch: true,

		// Loop the presentation
		loop: false,

		// Change the presentation direction to be RTL
		rtl: false,

		// Randomizes the order of slides each time the presentation loads
		shuffle: false,

		// Turns fragments on and off globally
		fragments: true,

		// Flags whether to include the current fragment in the URL,
		// so that reloading brings you to the same fragment position
		fragmentInURL: false,

		// Flags if the presentation is running in an embedded mode,
		// i.e. contained within a limited portion of the screen
		embedded: false,

		// Flags if we should show a help overlay when the question-mark
		// key is pressed
		help: true,

		// Flags if it should be possible to pause the presentation (blackout)
		pause: true,

		// Flags if speaker notes should be visible to all viewers
		showNotes: false,

		// Global override for autolaying embedded media (video/audio/iframe)
		// - null:   Media will only autoplay if data-autoplay is present
		// - true:   All media will autoplay, regardless of individual setting
		// - false:  No media will autoplay, regardless of individual setting
		autoPlayMedia: null,

		// Controls automatic progression to the next slide
		// - 0:      Auto-sliding only happens if the data-autoslide HTML attribute
		//           is present on the current slide or fragment
		// - 1+:     All slides will progress automatically at the given interval
		// - false:  No auto-sliding, even if data-autoslide is present
		autoSlide: 0,

		// Stop auto-sliding after user input
		autoSlideStoppable: true,

		// Use this method for navigation when auto-sliding (defaults to navigateNext)
		autoSlideMethod: null,

		// Specify the average time in seconds that you think you will spend
		// presenting each slide. This is used to show a pacing timer in the
		// speaker view
		defaultTiming: null,

		// Enable slide navigation via mouse wheel
		mouseWheel: false,

		// Apply a 3D roll to links on hover
		rollingLinks: false,

		// Hides the address bar on mobile devices
		hideAddressBar: true,

		// Opens links in an iframe preview overlay
		// Add `data-preview-link` and `data-preview-link="false"` to customise each link
		// individually
		previewLinks: false,

		// Exposes the reveal.js API through window.postMessage
		postMessage: true,

		// Dispatches all reveal.js events to the parent window through postMessage
		postMessageEvents: false,

		// Focuses body when page changes visibility to ensure keyboard shortcuts work
		focusBodyOnPageVisibilityChange: true,

		// Transition style
		transition: 'slide', // none/fade/slide/convex/concave/zoom

		// Transition speed
		transitionSpeed: 'default', // default/fast/slow

		// Transition style for full page slide backgrounds
		backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

		// Parallax background image
		parallaxBackgroundImage: '', // CSS syntax, e.g. "a.jpg"

		// Parallax background size
		parallaxBackgroundSize: '', // CSS syntax, e.g. "3000px 2000px"

		// Parallax background repeat
		parallaxBackgroundRepeat: '', // repeat/repeat-x/repeat-y/no-repeat/initial/inherit

		// Parallax background position
		parallaxBackgroundPosition: '', // CSS syntax, e.g. "top left"

		// Amount of pixels to move the parallax background per slide step
		parallaxBackgroundHorizontal: null,
		parallaxBackgroundVertical: null,

		// The maximum number of pages a single slide can expand onto when printing
		// to PDF, unlimited by default
		pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,

		// Prints each fragment on a separate slide
		pdfSeparateFragments: true,

		// Offset used to reduce the height of content within exported PDF pages.
		// This exists to account for environment differences based on how you
		// print to PDF. CLI printing options, like phantomjs and wkpdf, can end
		// on precisely the total height of the document whereas in-browser
		// printing has to end one pixel before.
		pdfPageHeightOffset: -1,

		// Number of slides away from the current that are visible
		viewDistance: 3,

		// The display mode that will be used to show slides
		display: 'block',

		// Script dependencies to load
		dependencies: []

	},


	// Flags if Reveal.initialize() has been called
	initialized = false,


	// Flags if reveal.js is loaded (has dispatched the 'ready' event)
	loaded = false,


	// Flags if the overview mode is currently active
	overview = false,


	// Holds the dimensions of our overview slides, including margins
	overviewSlideWidth = null,
	    overviewSlideHeight = null,


	// The horizontal and vertical index of the currently active slide
	indexh,
	    indexv,


	// The previous and current slide HTML elements
	previousSlide,
	    currentSlide,
	    previousBackground,


	// Remember which directions that the user has navigated towards
	hasNavigatedRight = false,
	    hasNavigatedDown = false,


	// Slides may hold a data-state attribute which we pick up and apply
	// as a class to the body. This list contains the combined state of
	// all current slides.
	state = [],


	// The current scale of the presentation (see width/height config)
	scale = 1,


	// CSS transform that is currently applied to the slides container,
	// split into two groups
	slidesTransform = { layout: '', overview: '' },


	// Cached references to DOM elements
	dom = {},


	// Features supported by the browser, see #checkCapabilities()
	features = {},


	// Client is a mobile device, see #checkCapabilities()
	isMobileDevice,


	// Client is a desktop Chrome, see #checkCapabilities()
	isChrome,


	// Throttles mouse wheel navigation
	lastMouseWheelStep = 0,


	// Delays updates to the URL due to a Chrome thumbnailer bug
	writeURLTimeout = 0,


	// Flags if the interaction event listeners are bound
	eventsAreBound = false,


	// The current auto-slide duration
	autoSlide = 0,


	// Auto slide properties
	autoSlidePlayer,
	    autoSlideTimeout = 0,
	    autoSlideStartTime = -1,
	    autoSlidePaused = false,


	// Holds information about the currently ongoing touch input
	touch = {
		startX: 0,
		startY: 0,
		startSpan: 0,
		startCount: 0,
		captured: false,
		threshold: 40
	},


	// Holds information about the keyboard shortcuts
	keyboardShortcuts = {
		'N  ,  SPACE': 'Next slide',
		'P': 'Previous slide',
		'&#8592;  ,  H': 'Navigate left',
		'&#8594;  ,  L': 'Navigate right',
		'&#8593;  ,  K': 'Navigate up',
		'&#8595;  ,  J': 'Navigate down',
		'Home': 'First slide',
		'End': 'Last slide',
		'B  ,  .': 'Pause',
		'F': 'Fullscreen',
		'ESC, O': 'Slide overview'
	},


	// Holds custom key code mappings
	registeredKeyBindings = {};

	/**
  * Starts up the presentation if the client is capable.
  */
	function initialize(options) {

		// Make sure we only initialize once
		if (initialized === true) return;

		initialized = true;

		checkCapabilities();

		if (!features.transforms2d && !features.transforms3d) {
			document.body.setAttribute('class', 'no-transforms');

			// Since JS won't be running any further, we load all lazy
			// loading elements upfront
			var images = toArray(document.getElementsByTagName('img')),
			    iframes = toArray(document.getElementsByTagName('iframe'));

			var lazyLoadable = images.concat(iframes);

			for (var i = 0, len = lazyLoadable.length; i < len; i++) {
				var element = lazyLoadable[i];
				if (element.getAttribute('data-src')) {
					element.setAttribute('src', element.getAttribute('data-src'));
					element.removeAttribute('data-src');
				}
			}

			// If the browser doesn't support core features we won't be
			// using JavaScript to control the presentation
			return;
		}

		// Cache references to key DOM elements
		dom.wrapper = document.querySelector('.reveal');
		dom.slides = document.querySelector('.reveal .slides');

		// Force a layout when the whole page, incl fonts, has loaded
		window.addEventListener('load', layout, false);

		var query = Reveal.getQueryHash();

		// Do not accept new dependencies via query config to avoid
		// the potential of malicious script injection
		if (typeof query['dependencies'] !== 'undefined') delete query['dependencies'];

		// Copy options over to our config object
		extend(config, options);
		extend(config, query);

		// Hide the address bar in mobile browsers
		hideAddressBar();

		// Loads the dependencies and continues to #start() once done
		load();
	}

	/**
  * Inspect the client to see what it's capable of, this
  * should only happens once per runtime.
  */
	function checkCapabilities() {

		isMobileDevice = /(iphone|ipod|ipad|android)/gi.test(UA);
		isChrome = /chrome/i.test(UA) && !/edge/i.test(UA);

		var testElement = document.createElement('div');

		features.transforms3d = 'WebkitPerspective' in testElement.style || 'MozPerspective' in testElement.style || 'msPerspective' in testElement.style || 'OPerspective' in testElement.style || 'perspective' in testElement.style;

		features.transforms2d = 'WebkitTransform' in testElement.style || 'MozTransform' in testElement.style || 'msTransform' in testElement.style || 'OTransform' in testElement.style || 'transform' in testElement.style;

		features.requestAnimationFrameMethod = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
		features.requestAnimationFrame = typeof features.requestAnimationFrameMethod === 'function';

		features.canvas = !!document.createElement('canvas').getContext;

		// Transitions in the overview are disabled in desktop and
		// Safari due to lag
		features.overviewTransitions = !/Version\/[\d\.]+.*Safari/.test(UA);

		// Flags if we should use zoom instead of transform to scale
		// up slides. Zoom produces crisper results but has a lot of
		// xbrowser quirks so we only use it in whitelsited browsers.
		features.zoom = 'zoom' in testElement.style && !isMobileDevice && (isChrome || /Version\/[\d\.]+.*Safari/.test(UA));
	}

	/**
  * Loads the dependencies of reveal.js. Dependencies are
  * defined via the configuration option 'dependencies'
  * and will be loaded prior to starting/binding reveal.js.
  * Some dependencies may have an 'async' flag, if so they
  * will load after reveal.js has been started up.
  */
	function load() {

		var scripts = [],
		    scriptsAsync = [],
		    scriptsToPreload = 0;

		// Called once synchronous scripts finish loading
		function proceed() {
			if (scriptsAsync.length) {
				// Load asynchronous scripts
				head.js.apply(null, scriptsAsync);
			}

			start();
		}

		function loadScript(s) {
			head.ready(s.src.match(/([\w\d_\-]*)\.?js(\?[\w\d.=&]*)?$|[^\\\/]*$/i)[0], function () {
				// Extension may contain callback functions
				if (typeof s.callback === 'function') {
					s.callback.apply(this);
				}

				if (--scriptsToPreload === 0) {
					proceed();
				}
			});
		}

		for (var i = 0, len = config.dependencies.length; i < len; i++) {
			var s = config.dependencies[i];

			// Load if there's no condition or the condition is truthy
			if (!s.condition || s.condition()) {
				if (s.async) {
					scriptsAsync.push(s.src);
				} else {
					scripts.push(s.src);
				}

				loadScript(s);
			}
		}

		if (scripts.length) {
			scriptsToPreload = scripts.length;

			// Load synchronous scripts
			head.js.apply(null, scripts);
		} else {
			proceed();
		}
	}

	/**
  * Starts up reveal.js by binding input events and navigating
  * to the current URL deeplink if there is one.
  */
	function start() {

		loaded = true;

		// Make sure we've got all the DOM elements we need
		setupDOM();

		// Listen to messages posted to this window
		setupPostMessage();

		// Prevent the slides from being scrolled out of view
		setupScrollPrevention();

		// Resets all vertical slides so that only the first is visible
		resetVerticalSlides();

		// Updates the presentation to match the current configuration values
		configure();

		// Read the initial hash
		readURL();

		// Update all backgrounds
		updateBackground(true);

		// Notify listeners that the presentation is ready but use a 1ms
		// timeout to ensure it's not fired synchronously after #initialize()
		setTimeout(function () {
			// Enable transitions now that we're loaded
			dom.slides.classList.remove('no-transition');

			dom.wrapper.classList.add('ready');

			dispatchEvent('ready', {
				'indexh': indexh,
				'indexv': indexv,
				'currentSlide': currentSlide
			});
		}, 1);

		// Special setup and config is required when printing to PDF
		if (isPrintingPDF()) {
			removeEventListeners();

			// The document needs to have loaded for the PDF layout
			// measurements to be accurate
			if (document.readyState === 'complete') {
				setupPDF();
			} else {
				window.addEventListener('load', setupPDF);
			}
		}
	}

	/**
  * Finds and stores references to DOM elements which are
  * required by the presentation. If a required element is
  * not found, it is created.
  */
	function setupDOM() {

		// Prevent transitions while we're loading
		dom.slides.classList.add('no-transition');

		if (isMobileDevice) {
			dom.wrapper.classList.add('no-hover');
		} else {
			dom.wrapper.classList.remove('no-hover');
		}

		if (/iphone/gi.test(UA)) {
			dom.wrapper.classList.add('ua-iphone');
		} else {
			dom.wrapper.classList.remove('ua-iphone');
		}

		// Background element
		dom.background = createSingletonNode(dom.wrapper, 'div', 'backgrounds', null);

		// Progress bar
		dom.progress = createSingletonNode(dom.wrapper, 'div', 'progress', '<span></span>');
		dom.progressbar = dom.progress.querySelector('span');

		// Arrow controls
		dom.controls = createSingletonNode(dom.wrapper, 'aside', 'controls', '<button class="navigate-left" aria-label="previous slide"><div class="controls-arrow"></div></button>' + '<button class="navigate-right" aria-label="next slide"><div class="controls-arrow"></div></button>' + '<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>' + '<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>');

		// Slide number
		dom.slideNumber = createSingletonNode(dom.wrapper, 'div', 'slide-number', '');

		// Element containing notes that are visible to the audience
		dom.speakerNotes = createSingletonNode(dom.wrapper, 'div', 'speaker-notes', null);
		dom.speakerNotes.setAttribute('data-prevent-swipe', '');
		dom.speakerNotes.setAttribute('tabindex', '0');

		// Overlay graphic which is displayed during the paused mode
		dom.pauseOverlay = createSingletonNode(dom.wrapper, 'div', 'pause-overlay', '<button class="resume-button">Resume presentation</button>');
		dom.resumeButton = dom.pauseOverlay.querySelector('.resume-button');

		dom.wrapper.setAttribute('role', 'application');

		// There can be multiple instances of controls throughout the page
		dom.controlsLeft = toArray(document.querySelectorAll('.navigate-left'));
		dom.controlsRight = toArray(document.querySelectorAll('.navigate-right'));
		dom.controlsUp = toArray(document.querySelectorAll('.navigate-up'));
		dom.controlsDown = toArray(document.querySelectorAll('.navigate-down'));
		dom.controlsPrev = toArray(document.querySelectorAll('.navigate-prev'));
		dom.controlsNext = toArray(document.querySelectorAll('.navigate-next'));

		// The right and down arrows in the standard reveal.js controls
		dom.controlsRightArrow = dom.controls.querySelector('.navigate-right');
		dom.controlsDownArrow = dom.controls.querySelector('.navigate-down');

		dom.statusDiv = createStatusDiv();
	}

	/**
  * Creates a hidden div with role aria-live to announce the
  * current slide content. Hide the div off-screen to make it
  * available only to Assistive Technologies.
  *
  * @return {HTMLElement}
  */
	function createStatusDiv() {

		var statusDiv = document.getElementById('aria-status-div');
		if (!statusDiv) {
			statusDiv = document.createElement('div');
			statusDiv.style.position = 'absolute';
			statusDiv.style.height = '1px';
			statusDiv.style.width = '1px';
			statusDiv.style.overflow = 'hidden';
			statusDiv.style.clip = 'rect( 1px, 1px, 1px, 1px )';
			statusDiv.setAttribute('id', 'aria-status-div');
			statusDiv.setAttribute('aria-live', 'polite');
			statusDiv.setAttribute('aria-atomic', 'true');
			dom.wrapper.appendChild(statusDiv);
		}
		return statusDiv;
	}

	/**
  * Converts the given HTML element into a string of text
  * that can be announced to a screen reader. Hidden
  * elements are excluded.
  */
	function getStatusText(node) {

		var text = '';

		// Text node
		if (node.nodeType === 3) {
			text += node.textContent;
		}
		// Element node
		else if (node.nodeType === 1) {

				var isAriaHidden = node.getAttribute('aria-hidden');
				var isDisplayHidden = window.getComputedStyle(node)['display'] === 'none';
				if (isAriaHidden !== 'true' && !isDisplayHidden) {

					toArray(node.childNodes).forEach(function (child) {
						text += getStatusText(child);
					});
				}
			}

		return text;
	}

	/**
  * Configures the presentation for printing to a static
  * PDF.
  */
	function setupPDF() {

		var slideSize = getComputedSlideSize(window.innerWidth, window.innerHeight);

		// Dimensions of the PDF pages
		var pageWidth = Math.floor(slideSize.width * (1 + config.margin)),
		    pageHeight = Math.floor(slideSize.height * (1 + config.margin));

		// Dimensions of slides within the pages
		var slideWidth = slideSize.width,
		    slideHeight = slideSize.height;

		// Let the browser know what page size we want to print
		injectStyleSheet('@page{size:' + pageWidth + 'px ' + pageHeight + 'px; margin: 0px;}');

		// Limit the size of certain elements to the dimensions of the slide
		injectStyleSheet('.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: ' + slideWidth + 'px; max-height:' + slideHeight + 'px}');

		document.body.classList.add('print-pdf');
		document.body.style.width = pageWidth + 'px';
		document.body.style.height = pageHeight + 'px';

		// Make sure stretch elements fit on slide
		layoutSlideContents(slideWidth, slideHeight);

		// Add each slide's index as attributes on itself, we need these
		// indices to generate slide numbers below
		toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).forEach(function (hslide, h) {
			hslide.setAttribute('data-index-h', h);

			if (hslide.classList.contains('stack')) {
				toArray(hslide.querySelectorAll('section')).forEach(function (vslide, v) {
					vslide.setAttribute('data-index-h', h);
					vslide.setAttribute('data-index-v', v);
				});
			}
		});

		// Slide and slide background layout
		toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR)).forEach(function (slide) {

			// Vertical stacks are not centred since their section
			// children will be
			if (slide.classList.contains('stack') === false) {
				// Center the slide inside of the page, giving the slide some margin
				var left = (pageWidth - slideWidth) / 2,
				    top = (pageHeight - slideHeight) / 2;

				var contentHeight = slide.scrollHeight;
				var numberOfPages = Math.max(Math.ceil(contentHeight / pageHeight), 1);

				// Adhere to configured pages per slide limit
				numberOfPages = Math.min(numberOfPages, config.pdfMaxPagesPerSlide);

				// Center slides vertically
				if (numberOfPages === 1 && config.center || slide.classList.contains('center')) {
					top = Math.max((pageHeight - contentHeight) / 2, 0);
				}

				// Wrap the slide in a page element and hide its overflow
				// so that no page ever flows onto another
				var page = document.createElement('div');
				page.className = 'pdf-page';
				page.style.height = (pageHeight + config.pdfPageHeightOffset) * numberOfPages + 'px';
				slide.parentNode.insertBefore(page, slide);
				page.appendChild(slide);

				// Position the slide inside of the page
				slide.style.left = left + 'px';
				slide.style.top = top + 'px';
				slide.style.width = slideWidth + 'px';

				if (slide.slideBackgroundElement) {
					page.insertBefore(slide.slideBackgroundElement, slide);
				}

				// Inject notes if `showNotes` is enabled
				if (config.showNotes) {

					// Are there notes for this slide?
					var notes = getSlideNotes(slide);
					if (notes) {

						var notesSpacing = 8;
						var notesLayout = typeof config.showNotes === 'string' ? config.showNotes : 'inline';
						var notesElement = document.createElement('div');
						notesElement.classList.add('speaker-notes');
						notesElement.classList.add('speaker-notes-pdf');
						notesElement.setAttribute('data-layout', notesLayout);
						notesElement.innerHTML = notes;

						if (notesLayout === 'separate-page') {
							page.parentNode.insertBefore(notesElement, page.nextSibling);
						} else {
							notesElement.style.left = notesSpacing + 'px';
							notesElement.style.bottom = notesSpacing + 'px';
							notesElement.style.width = pageWidth - notesSpacing * 2 + 'px';
							page.appendChild(notesElement);
						}
					}
				}

				// Inject slide numbers if `slideNumbers` are enabled
				if (config.slideNumber && /all|print/i.test(config.showSlideNumber)) {
					var slideNumberH = parseInt(slide.getAttribute('data-index-h'), 10) + 1,
					    slideNumberV = parseInt(slide.getAttribute('data-index-v'), 10) + 1;

					var numberElement = document.createElement('div');
					numberElement.classList.add('slide-number');
					numberElement.classList.add('slide-number-pdf');
					numberElement.innerHTML = formatSlideNumber(slideNumberH, '.', slideNumberV);
					page.appendChild(numberElement);
				}

				// Copy page and show fragments one after another
				if (config.pdfSeparateFragments) {

					// Each fragment 'group' is an array containing one or more
					// fragments. Multiple fragments that appear at the same time
					// are part of the same group.
					var fragmentGroups = sortFragments(page.querySelectorAll('.fragment'), true);

					var previousFragmentStep;
					var previousPage;

					fragmentGroups.forEach(function (fragments) {

						// Remove 'current-fragment' from the previous group
						if (previousFragmentStep) {
							previousFragmentStep.forEach(function (fragment) {
								fragment.classList.remove('current-fragment');
							});
						}

						// Show the fragments for the current index
						fragments.forEach(function (fragment) {
							fragment.classList.add('visible', 'current-fragment');
						});

						// Create a separate page for the current fragment state
						var clonedPage = page.cloneNode(true);
						page.parentNode.insertBefore(clonedPage, (previousPage || page).nextSibling);

						previousFragmentStep = fragments;
						previousPage = clonedPage;
					});

					// Reset the first/original page so that all fragments are hidden
					fragmentGroups.forEach(function (fragments) {
						fragments.forEach(function (fragment) {
							fragment.classList.remove('visible', 'current-fragment');
						});
					});
				}
				// Show all fragments
				else {
						toArray(page.querySelectorAll('.fragment:not(.fade-out)')).forEach(function (fragment) {
							fragment.classList.add('visible');
						});
					}
			}
		});

		// Notify subscribers that the PDF layout is good to go
		dispatchEvent('pdf-ready');
	}

	/**
  * This is an unfortunate necessity. Some actions – such as
  * an input field being focused in an iframe or using the
  * keyboard to expand text selection beyond the bounds of
  * a slide – can trigger our content to be pushed out of view.
  * This scrolling can not be prevented by hiding overflow in
  * CSS (we already do) so we have to resort to repeatedly
  * checking if the slides have been offset :(
  */
	function setupScrollPrevention() {

		setInterval(function () {
			if (dom.wrapper.scrollTop !== 0 || dom.wrapper.scrollLeft !== 0) {
				dom.wrapper.scrollTop = 0;
				dom.wrapper.scrollLeft = 0;
			}
		}, 1000);
	}

	/**
  * Creates an HTML element and returns a reference to it.
  * If the element already exists the existing instance will
  * be returned.
  *
  * @param {HTMLElement} container
  * @param {string} tagname
  * @param {string} classname
  * @param {string} innerHTML
  *
  * @return {HTMLElement}
  */
	function createSingletonNode(container, tagname, classname, innerHTML) {

		// Find all nodes matching the description
		var nodes = container.querySelectorAll('.' + classname);

		// Check all matches to find one which is a direct child of
		// the specified container
		for (var i = 0; i < nodes.length; i++) {
			var testNode = nodes[i];
			if (testNode.parentNode === container) {
				return testNode;
			}
		}

		// If no node was found, create it now
		var node = document.createElement(tagname);
		node.className = classname;
		if (typeof innerHTML === 'string') {
			node.innerHTML = innerHTML;
		}
		container.appendChild(node);

		return node;
	}

	/**
  * Creates the slide background elements and appends them
  * to the background container. One element is created per
  * slide no matter if the given slide has visible background.
  */
	function createBackgrounds() {

		var printMode = isPrintingPDF();

		// Clear prior backgrounds
		dom.background.innerHTML = '';
		dom.background.classList.add('no-transition');

		// Iterate over all horizontal slides
		toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).forEach(function (slideh) {

			var backgroundStack = createBackground(slideh, dom.background);

			// Iterate over all vertical slides
			toArray(slideh.querySelectorAll('section')).forEach(function (slidev) {

				createBackground(slidev, backgroundStack);

				backgroundStack.classList.add('stack');
			});
		});

		// Add parallax background if specified
		if (config.parallaxBackgroundImage) {

			dom.background.style.backgroundImage = 'url("' + config.parallaxBackgroundImage + '")';
			dom.background.style.backgroundSize = config.parallaxBackgroundSize;
			dom.background.style.backgroundRepeat = config.parallaxBackgroundRepeat;
			dom.background.style.backgroundPosition = config.parallaxBackgroundPosition;

			// Make sure the below properties are set on the element - these properties are
			// needed for proper transitions to be set on the element via CSS. To remove
			// annoying background slide-in effect when the presentation starts, apply
			// these properties after short time delay
			setTimeout(function () {
				dom.wrapper.classList.add('has-parallax-background');
			}, 1);
		} else {

			dom.background.style.backgroundImage = '';
			dom.wrapper.classList.remove('has-parallax-background');
		}
	}

	/**
  * Creates a background for the given slide.
  *
  * @param {HTMLElement} slide
  * @param {HTMLElement} container The element that the background
  * should be appended to
  * @return {HTMLElement} New background div
  */
	function createBackground(slide, container) {

		// Main slide background element
		var element = document.createElement('div');
		element.className = 'slide-background ' + slide.className.replace(/present|past|future/, '');

		// Inner background element that wraps images/videos/iframes
		var contentElement = document.createElement('div');
		contentElement.className = 'slide-background-content';

		element.appendChild(contentElement);
		container.appendChild(element);

		slide.slideBackgroundElement = element;
		slide.slideBackgroundContentElement = contentElement;

		// Syncs the background to reflect all current background settings
		syncBackground(slide);

		return element;
	}

	/**
  * Renders all of the visual properties of a slide background
  * based on the various background attributes.
  *
  * @param {HTMLElement} slide
  */
	function syncBackground(slide) {

		var element = slide.slideBackgroundElement,
		    contentElement = slide.slideBackgroundContentElement;

		// Reset the prior background state in case this is not the
		// initial sync
		slide.classList.remove('has-dark-background');
		slide.classList.remove('has-light-background');

		element.removeAttribute('data-loaded');
		element.removeAttribute('data-background-hash');
		element.removeAttribute('data-background-size');
		element.removeAttribute('data-background-transition');
		element.style.backgroundColor = '';

		contentElement.style.backgroundSize = '';
		contentElement.style.backgroundRepeat = '';
		contentElement.style.backgroundPosition = '';
		contentElement.style.backgroundImage = '';
		contentElement.style.opacity = '';
		contentElement.innerHTML = '';

		var data = {
			background: slide.getAttribute('data-background'),
			backgroundSize: slide.getAttribute('data-background-size'),
			backgroundImage: slide.getAttribute('data-background-image'),
			backgroundVideo: slide.getAttribute('data-background-video'),
			backgroundIframe: slide.getAttribute('data-background-iframe'),
			backgroundColor: slide.getAttribute('data-background-color'),
			backgroundRepeat: slide.getAttribute('data-background-repeat'),
			backgroundPosition: slide.getAttribute('data-background-position'),
			backgroundTransition: slide.getAttribute('data-background-transition'),
			backgroundOpacity: slide.getAttribute('data-background-opacity')
		};

		if (data.background) {
			// Auto-wrap image urls in url(...)
			if (/^(http|file|\/\/)/gi.test(data.background) || /\.(svg|png|jpg|jpeg|gif|bmp)([?#\s]|$)/gi.test(data.background)) {
				slide.setAttribute('data-background-image', data.background);
			} else {
				element.style.background = data.background;
			}
		}

		// Create a hash for this combination of background settings.
		// This is used to determine when two slide backgrounds are
		// the same.
		if (data.background || data.backgroundColor || data.backgroundImage || data.backgroundVideo || data.backgroundIframe) {
			element.setAttribute('data-background-hash', data.background + data.backgroundSize + data.backgroundImage + data.backgroundVideo + data.backgroundIframe + data.backgroundColor + data.backgroundRepeat + data.backgroundPosition + data.backgroundTransition + data.backgroundOpacity);
		}

		// Additional and optional background properties
		if (data.backgroundSize) element.setAttribute('data-background-size', data.backgroundSize);
		if (data.backgroundColor) element.style.backgroundColor = data.backgroundColor;
		if (data.backgroundTransition) element.setAttribute('data-background-transition', data.backgroundTransition);

		// Background image options are set on the content wrapper
		if (data.backgroundSize) contentElement.style.backgroundSize = data.backgroundSize;
		if (data.backgroundRepeat) contentElement.style.backgroundRepeat = data.backgroundRepeat;
		if (data.backgroundPosition) contentElement.style.backgroundPosition = data.backgroundPosition;
		if (data.backgroundOpacity) contentElement.style.opacity = data.backgroundOpacity;

		// If this slide has a background color, add a class that
		// signals if it is light or dark. If the slide has no background
		// color, no class will be set
		var computedBackgroundStyle = window.getComputedStyle(element);
		if (computedBackgroundStyle && computedBackgroundStyle.backgroundColor) {
			var rgb = colorToRgb(computedBackgroundStyle.backgroundColor);

			// Ignore fully transparent backgrounds. Some browsers return
			// rgba(0,0,0,0) when reading the computed background color of
			// an element with no background
			if (rgb && rgb.a !== 0) {
				if (colorBrightness(computedBackgroundStyle.backgroundColor) < 128) {
					slide.classList.add('has-dark-background');
				} else {
					slide.classList.add('has-light-background');
				}
			}
		}
	}

	/**
  * Registers a listener to postMessage events, this makes it
  * possible to call all reveal.js API methods from another
  * window. For example:
  *
  * revealWindow.postMessage( JSON.stringify({
  *   method: 'slide',
  *   args: [ 2 ]
  * }), '*' );
  */
	function setupPostMessage() {

		if (config.postMessage) {
			window.addEventListener('message', function (event) {
				var data = event.data;

				// Make sure we're dealing with JSON
				if (typeof data === 'string' && data.charAt(0) === '{' && data.charAt(data.length - 1) === '}') {
					data = JSON.parse(data);

					// Check if the requested method can be found
					if (data.method && typeof Reveal[data.method] === 'function') {
						Reveal[data.method].apply(Reveal, data.args);
					}
				}
			}, false);
		}
	}

	/**
  * Applies the configuration settings from the config
  * object. May be called multiple times.
  *
  * @param {object} options
  */
	function configure(options) {

		var oldTransition = config.transition;

		// New config options may be passed when this method
		// is invoked through the API after initialization
		if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') extend(config, options);

		// Abort if reveal.js hasn't finished loading, config
		// changes will be applied automatically once loading
		// finishes
		if (loaded === false) return;

		var numberOfSlides = dom.wrapper.querySelectorAll(SLIDES_SELECTOR).length;

		// Remove the previously configured transition class
		dom.wrapper.classList.remove(oldTransition);

		// Force linear transition based on browser capabilities
		if (features.transforms3d === false) config.transition = 'linear';

		dom.wrapper.classList.add(config.transition);

		dom.wrapper.setAttribute('data-transition-speed', config.transitionSpeed);
		dom.wrapper.setAttribute('data-background-transition', config.backgroundTransition);

		dom.controls.style.display = config.controls ? 'block' : 'none';
		dom.progress.style.display = config.progress ? 'block' : 'none';

		dom.controls.setAttribute('data-controls-layout', config.controlsLayout);
		dom.controls.setAttribute('data-controls-back-arrows', config.controlsBackArrows);

		if (config.shuffle) {
			shuffle();
		}

		if (config.rtl) {
			dom.wrapper.classList.add('rtl');
		} else {
			dom.wrapper.classList.remove('rtl');
		}

		if (config.center) {
			dom.wrapper.classList.add('center');
		} else {
			dom.wrapper.classList.remove('center');
		}

		// Exit the paused mode if it was configured off
		if (config.pause === false) {
			resume();
		}

		if (config.showNotes) {
			dom.speakerNotes.setAttribute('data-layout', typeof config.showNotes === 'string' ? config.showNotes : 'inline');
		}

		if (config.mouseWheel) {
			document.addEventListener('DOMMouseScroll', onDocumentMouseScroll, false); // FF
			document.addEventListener('mousewheel', onDocumentMouseScroll, false);
		} else {
			document.removeEventListener('DOMMouseScroll', onDocumentMouseScroll, false); // FF
			document.removeEventListener('mousewheel', onDocumentMouseScroll, false);
		}

		// Rolling 3D links
		if (config.rollingLinks) {
			enableRollingLinks();
		} else {
			disableRollingLinks();
		}

		// Iframe link previews
		if (config.previewLinks) {
			enablePreviewLinks();
			disablePreviewLinks('[data-preview-link=false]');
		} else {
			disablePreviewLinks();
			enablePreviewLinks('[data-preview-link]:not([data-preview-link=false])');
		}

		// Remove existing auto-slide controls
		if (autoSlidePlayer) {
			autoSlidePlayer.destroy();
			autoSlidePlayer = null;
		}

		// Generate auto-slide controls if needed
		if (numberOfSlides > 1 && config.autoSlide && config.autoSlideStoppable && features.canvas && features.requestAnimationFrame) {
			autoSlidePlayer = new Playback(dom.wrapper, function () {
				return Math.min(Math.max((Date.now() - autoSlideStartTime) / autoSlide, 0), 1);
			});

			autoSlidePlayer.on('click', onAutoSlidePlayerClick);
			autoSlidePaused = false;
		}

		// When fragments are turned off they should be visible
		if (config.fragments === false) {
			toArray(dom.slides.querySelectorAll('.fragment')).forEach(function (element) {
				element.classList.add('visible');
				element.classList.remove('current-fragment');
			});
		}

		// Slide numbers
		var slideNumberDisplay = 'none';
		if (config.slideNumber && !isPrintingPDF()) {
			if (config.showSlideNumber === 'all') {
				slideNumberDisplay = 'block';
			} else if (config.showSlideNumber === 'speaker' && isSpeakerNotes()) {
				slideNumberDisplay = 'block';
			}
		}

		dom.slideNumber.style.display = slideNumberDisplay;

		sync();
	}

	/**
  * Binds all event listeners.
  */
	function addEventListeners() {

		eventsAreBound = true;

		window.addEventListener('hashchange', onWindowHashChange, false);
		window.addEventListener('resize', onWindowResize, false);

		if (config.touch) {
			if ('onpointerdown' in window) {
				// Use W3C pointer events
				dom.wrapper.addEventListener('pointerdown', onPointerDown, false);
				dom.wrapper.addEventListener('pointermove', onPointerMove, false);
				dom.wrapper.addEventListener('pointerup', onPointerUp, false);
			} else if (window.navigator.msPointerEnabled) {
				// IE 10 uses prefixed version of pointer events
				dom.wrapper.addEventListener('MSPointerDown', onPointerDown, false);
				dom.wrapper.addEventListener('MSPointerMove', onPointerMove, false);
				dom.wrapper.addEventListener('MSPointerUp', onPointerUp, false);
			} else {
				// Fall back to touch events
				dom.wrapper.addEventListener('touchstart', onTouchStart, false);
				dom.wrapper.addEventListener('touchmove', onTouchMove, false);
				dom.wrapper.addEventListener('touchend', onTouchEnd, false);
			}
		}

		if (config.keyboard) {
			document.addEventListener('keydown', onDocumentKeyDown, false);
			document.addEventListener('keypress', onDocumentKeyPress, false);
		}

		if (config.progress && dom.progress) {
			dom.progress.addEventListener('click', onProgressClicked, false);
		}

		dom.resumeButton.addEventListener('click', resume, false);

		if (config.focusBodyOnPageVisibilityChange) {
			var visibilityChange;

			if ('hidden' in document) {
				visibilityChange = 'visibilitychange';
			} else if ('msHidden' in document) {
				visibilityChange = 'msvisibilitychange';
			} else if ('webkitHidden' in document) {
				visibilityChange = 'webkitvisibilitychange';
			}

			if (visibilityChange) {
				document.addEventListener(visibilityChange, onPageVisibilityChange, false);
			}
		}

		// Listen to both touch and click events, in case the device
		// supports both
		var pointerEvents = ['touchstart', 'click'];

		// Only support touch for Android, fixes double navigations in
		// stock browser
		if (UA.match(/android/gi)) {
			pointerEvents = ['touchstart'];
		}

		pointerEvents.forEach(function (eventName) {
			dom.controlsLeft.forEach(function (el) {
				el.addEventListener(eventName, onNavigateLeftClicked, false);
			});
			dom.controlsRight.forEach(function (el) {
				el.addEventListener(eventName, onNavigateRightClicked, false);
			});
			dom.controlsUp.forEach(function (el) {
				el.addEventListener(eventName, onNavigateUpClicked, false);
			});
			dom.controlsDown.forEach(function (el) {
				el.addEventListener(eventName, onNavigateDownClicked, false);
			});
			dom.controlsPrev.forEach(function (el) {
				el.addEventListener(eventName, onNavigatePrevClicked, false);
			});
			dom.controlsNext.forEach(function (el) {
				el.addEventListener(eventName, onNavigateNextClicked, false);
			});
		});
	}

	/**
  * Unbinds all event listeners.
  */
	function removeEventListeners() {

		eventsAreBound = false;

		document.removeEventListener('keydown', onDocumentKeyDown, false);
		document.removeEventListener('keypress', onDocumentKeyPress, false);
		window.removeEventListener('hashchange', onWindowHashChange, false);
		window.removeEventListener('resize', onWindowResize, false);

		dom.wrapper.removeEventListener('pointerdown', onPointerDown, false);
		dom.wrapper.removeEventListener('pointermove', onPointerMove, false);
		dom.wrapper.removeEventListener('pointerup', onPointerUp, false);

		dom.wrapper.removeEventListener('MSPointerDown', onPointerDown, false);
		dom.wrapper.removeEventListener('MSPointerMove', onPointerMove, false);
		dom.wrapper.removeEventListener('MSPointerUp', onPointerUp, false);

		dom.wrapper.removeEventListener('touchstart', onTouchStart, false);
		dom.wrapper.removeEventListener('touchmove', onTouchMove, false);
		dom.wrapper.removeEventListener('touchend', onTouchEnd, false);

		dom.resumeButton.removeEventListener('click', resume, false);

		if (config.progress && dom.progress) {
			dom.progress.removeEventListener('click', onProgressClicked, false);
		}

		['touchstart', 'click'].forEach(function (eventName) {
			dom.controlsLeft.forEach(function (el) {
				el.removeEventListener(eventName, onNavigateLeftClicked, false);
			});
			dom.controlsRight.forEach(function (el) {
				el.removeEventListener(eventName, onNavigateRightClicked, false);
			});
			dom.controlsUp.forEach(function (el) {
				el.removeEventListener(eventName, onNavigateUpClicked, false);
			});
			dom.controlsDown.forEach(function (el) {
				el.removeEventListener(eventName, onNavigateDownClicked, false);
			});
			dom.controlsPrev.forEach(function (el) {
				el.removeEventListener(eventName, onNavigatePrevClicked, false);
			});
			dom.controlsNext.forEach(function (el) {
				el.removeEventListener(eventName, onNavigateNextClicked, false);
			});
		});
	}

	/**
  * Add a custom key binding with optional description to
  * be added to the help screen.
  */
	function addKeyBinding(binding, callback) {

		if ((typeof binding === 'undefined' ? 'undefined' : _typeof(binding)) === 'object' && binding.keyCode) {
			registeredKeyBindings[binding.keyCode] = {
				callback: callback,
				key: binding.key,
				description: binding.description
			};
		} else {
			registeredKeyBindings[binding] = {
				callback: callback,
				key: null,
				description: null
			};
		}
	}

	/**
  * Removes the specified custom key binding.
  */
	function removeKeyBinding(keyCode) {

		delete registeredKeyBindings[keyCode];
	}

	/**
  * Extend object a with the properties of object b.
  * If there's a conflict, object b takes precedence.
  *
  * @param {object} a
  * @param {object} b
  */
	function extend(a, b) {

		for (var i in b) {
			a[i] = b[i];
		}

		return a;
	}

	/**
  * Converts the target object to an array.
  *
  * @param {object} o
  * @return {object[]}
  */
	function toArray(o) {

		return Array.prototype.slice.call(o);
	}

	/**
  * Utility for deserializing a value.
  *
  * @param {*} value
  * @return {*}
  */
	function deserialize(value) {

		if (typeof value === 'string') {
			if (value === 'null') return null;else if (value === 'true') return true;else if (value === 'false') return false;else if (value.match(/^-?[\d\.]+$/)) return parseFloat(value);
		}

		return value;
	}

	/**
  * Measures the distance in pixels between point a
  * and point b.
  *
  * @param {object} a point with x/y properties
  * @param {object} b point with x/y properties
  *
  * @return {number}
  */
	function distanceBetween(a, b) {

		var dx = a.x - b.x,
		    dy = a.y - b.y;

		return Math.sqrt(dx * dx + dy * dy);
	}

	/**
  * Applies a CSS transform to the target element.
  *
  * @param {HTMLElement} element
  * @param {string} transform
  */
	function transformElement(element, transform) {

		element.style.WebkitTransform = transform;
		element.style.MozTransform = transform;
		element.style.msTransform = transform;
		element.style.transform = transform;
	}

	/**
  * Applies CSS transforms to the slides container. The container
  * is transformed from two separate sources: layout and the overview
  * mode.
  *
  * @param {object} transforms
  */
	function transformSlides(transforms) {

		// Pick up new transforms from arguments
		if (typeof transforms.layout === 'string') slidesTransform.layout = transforms.layout;
		if (typeof transforms.overview === 'string') slidesTransform.overview = transforms.overview;

		// Apply the transforms to the slides container
		if (slidesTransform.layout) {
			transformElement(dom.slides, slidesTransform.layout + ' ' + slidesTransform.overview);
		} else {
			transformElement(dom.slides, slidesTransform.overview);
		}
	}

	/**
  * Injects the given CSS styles into the DOM.
  *
  * @param {string} value
  */
	function injectStyleSheet(value) {

		var tag = document.createElement('style');
		tag.type = 'text/css';
		if (tag.styleSheet) {
			tag.styleSheet.cssText = value;
		} else {
			tag.appendChild(document.createTextNode(value));
		}
		document.getElementsByTagName('head')[0].appendChild(tag);
	}

	/**
  * Find the closest parent that matches the given
  * selector.
  *
  * @param {HTMLElement} target The child element
  * @param {String} selector The CSS selector to match
  * the parents against
  *
  * @return {HTMLElement} The matched parent or null
  * if no matching parent was found
  */
	function closestParent(target, selector) {

		var parent = target.parentNode;

		while (parent) {

			// There's some overhead doing this each time, we don't
			// want to rewrite the element prototype but should still
			// be enough to feature detect once at startup...
			var matchesMethod = parent.matches || parent.matchesSelector || parent.msMatchesSelector;

			// If we find a match, we're all set
			if (matchesMethod && matchesMethod.call(parent, selector)) {
				return parent;
			}

			// Keep searching
			parent = parent.parentNode;
		}

		return null;
	}

	/**
  * Converts various color input formats to an {r:0,g:0,b:0} object.
  *
  * @param {string} color The string representation of a color
  * @example
  * colorToRgb('#000');
  * @example
  * colorToRgb('#000000');
  * @example
  * colorToRgb('rgb(0,0,0)');
  * @example
  * colorToRgb('rgba(0,0,0)');
  *
  * @return {{r: number, g: number, b: number, [a]: number}|null}
  */
	function colorToRgb(color) {

		var hex3 = color.match(/^#([0-9a-f]{3})$/i);
		if (hex3 && hex3[1]) {
			hex3 = hex3[1];
			return {
				r: parseInt(hex3.charAt(0), 16) * 0x11,
				g: parseInt(hex3.charAt(1), 16) * 0x11,
				b: parseInt(hex3.charAt(2), 16) * 0x11
			};
		}

		var hex6 = color.match(/^#([0-9a-f]{6})$/i);
		if (hex6 && hex6[1]) {
			hex6 = hex6[1];
			return {
				r: parseInt(hex6.substr(0, 2), 16),
				g: parseInt(hex6.substr(2, 2), 16),
				b: parseInt(hex6.substr(4, 2), 16)
			};
		}

		var rgb = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
		if (rgb) {
			return {
				r: parseInt(rgb[1], 10),
				g: parseInt(rgb[2], 10),
				b: parseInt(rgb[3], 10)
			};
		}

		var rgba = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);
		if (rgba) {
			return {
				r: parseInt(rgba[1], 10),
				g: parseInt(rgba[2], 10),
				b: parseInt(rgba[3], 10),
				a: parseFloat(rgba[4])
			};
		}

		return null;
	}

	/**
  * Calculates brightness on a scale of 0-255.
  *
  * @param {string} color See colorToRgb for supported formats.
  * @see {@link colorToRgb}
  */
	function colorBrightness(color) {

		if (typeof color === 'string') color = colorToRgb(color);

		if (color) {
			return (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
		}

		return null;
	}

	/**
  * Returns the remaining height within the parent of the
  * target element.
  *
  * remaining height = [ configured parent height ] - [ current parent height ]
  *
  * @param {HTMLElement} element
  * @param {number} [height]
  */
	function getRemainingHeight(element, height) {

		height = height || 0;

		if (element) {
			var newHeight,
			    oldHeight = element.style.height;

			// Change the .stretch element height to 0 in order find the height of all
			// the other elements
			element.style.height = '0px';
			newHeight = height - element.parentNode.offsetHeight;

			// Restore the old height, just in case
			element.style.height = oldHeight + 'px';

			return newHeight;
		}

		return height;
	}

	/**
  * Checks if this instance is being used to print a PDF.
  */
	function isPrintingPDF() {

		return (/print-pdf/gi.test(window.location.search)
		);
	}

	/**
  * Check if this instance is being used to print a PDF with fragments.
  */
	function isPrintingPDFFragments() {

		return (/print-pdf-fragments/gi.test(window.location.search)
		);
	}

	/**
  * Hides the address bar if we're on a mobile device.
  */
	function hideAddressBar() {

		if (config.hideAddressBar && isMobileDevice) {
			// Events that should trigger the address bar to hide
			window.addEventListener('load', removeAddressBar, false);
			window.addEventListener('orientationchange', removeAddressBar, false);
		}
	}

	/**
  * Causes the address bar to hide on mobile devices,
  * more vertical space ftw.
  */
	function removeAddressBar() {

		setTimeout(function () {
			window.scrollTo(0, 1);
		}, 10);
	}

	/**
  * Dispatches an event of the specified type from the
  * reveal DOM element.
  */
	function dispatchEvent(type, args) {

		var event = document.createEvent('HTMLEvents', 1, 2);
		event.initEvent(type, true, true);
		extend(event, args);
		dom.wrapper.dispatchEvent(event);

		// If we're in an iframe, post each reveal.js event to the
		// parent window. Used by the notes plugin
		if (config.postMessageEvents && window.parent !== window.self) {
			window.parent.postMessage(JSON.stringify({ namespace: 'reveal', eventName: type, state: getState() }), '*');
		}
	}

	/**
  * Wrap all links in 3D goodness.
  */
	function enableRollingLinks() {

		if (features.transforms3d && !('msPerspective' in document.body.style)) {
			var anchors = dom.wrapper.querySelectorAll(SLIDES_SELECTOR + ' a');

			for (var i = 0, len = anchors.length; i < len; i++) {
				var anchor = anchors[i];

				if (anchor.textContent && !anchor.querySelector('*') && (!anchor.className || !anchor.classList.contains(anchor, 'roll'))) {
					var span = document.createElement('span');
					span.setAttribute('data-title', anchor.text);
					span.innerHTML = anchor.innerHTML;

					anchor.classList.add('roll');
					anchor.innerHTML = '';
					anchor.appendChild(span);
				}
			}
		}
	}

	/**
  * Unwrap all 3D links.
  */
	function disableRollingLinks() {

		var anchors = dom.wrapper.querySelectorAll(SLIDES_SELECTOR + ' a.roll');

		for (var i = 0, len = anchors.length; i < len; i++) {
			var anchor = anchors[i];
			var span = anchor.querySelector('span');

			if (span) {
				anchor.classList.remove('roll');
				anchor.innerHTML = span.innerHTML;
			}
		}
	}

	/**
  * Bind preview frame links.
  *
  * @param {string} [selector=a] - selector for anchors
  */
	function enablePreviewLinks(selector) {

		var anchors = toArray(document.querySelectorAll(selector ? selector : 'a'));

		anchors.forEach(function (element) {
			if (/^(http|www)/gi.test(element.getAttribute('href'))) {
				element.addEventListener('click', onPreviewLinkClicked, false);
			}
		});
	}

	/**
  * Unbind preview frame links.
  */
	function disablePreviewLinks(selector) {

		var anchors = toArray(document.querySelectorAll(selector ? selector : 'a'));

		anchors.forEach(function (element) {
			if (/^(http|www)/gi.test(element.getAttribute('href'))) {
				element.removeEventListener('click', onPreviewLinkClicked, false);
			}
		});
	}

	/**
  * Opens a preview window for the target URL.
  *
  * @param {string} url - url for preview iframe src
  */
	function showPreview(url) {

		closeOverlay();

		dom.overlay = document.createElement('div');
		dom.overlay.classList.add('overlay');
		dom.overlay.classList.add('overlay-preview');
		dom.wrapper.appendChild(dom.overlay);

		dom.overlay.innerHTML = ['<header>', '<a class="close" href="#"><span class="icon"></span></a>', '<a class="external" href="' + url + '" target="_blank"><span class="icon"></span></a>', '</header>', '<div class="spinner"></div>', '<div class="viewport">', '<iframe src="' + url + '"></iframe>', '<small class="viewport-inner">', '<span class="x-frame-error">Unable to load iframe. This is likely due to the site\'s policy (x-frame-options).</span>', '</small>', '</div>'].join('');

		dom.overlay.querySelector('iframe').addEventListener('load', function (event) {
			dom.overlay.classList.add('loaded');
		}, false);

		dom.overlay.querySelector('.close').addEventListener('click', function (event) {
			closeOverlay();
			event.preventDefault();
		}, false);

		dom.overlay.querySelector('.external').addEventListener('click', function (event) {
			closeOverlay();
		}, false);

		setTimeout(function () {
			dom.overlay.classList.add('visible');
		}, 1);
	}

	/**
  * Open or close help overlay window.
  *
  * @param {Boolean} [override] Flag which overrides the
  * toggle logic and forcibly sets the desired state. True means
  * help is open, false means it's closed.
  */
	function toggleHelp(override) {

		if (typeof override === 'boolean') {
			override ? showHelp() : closeOverlay();
		} else {
			if (dom.overlay) {
				closeOverlay();
			} else {
				showHelp();
			}
		}
	}

	/**
  * Opens an overlay window with help material.
  */
	function showHelp() {

		if (config.help) {

			closeOverlay();

			dom.overlay = document.createElement('div');
			dom.overlay.classList.add('overlay');
			dom.overlay.classList.add('overlay-help');
			dom.wrapper.appendChild(dom.overlay);

			var html = '<p class="title">Keyboard Shortcuts</p><br/>';

			html += '<table><th>KEY</th><th>ACTION</th>';
			for (var key in keyboardShortcuts) {
				html += '<tr><td>' + key + '</td><td>' + keyboardShortcuts[key] + '</td></tr>';
			}

			// Add custom key bindings that have associated descriptions
			for (var binding in registeredKeyBindings) {
				if (registeredKeyBindings[binding].key && registeredKeyBindings[binding].description) {
					html += '<tr><td>' + registeredKeyBindings[binding].key + '</td><td>' + registeredKeyBindings[binding].description + '</td></tr>';
				}
			}

			html += '</table>';

			dom.overlay.innerHTML = ['<header>', '<a class="close" href="#"><span class="icon"></span></a>', '</header>', '<div class="viewport">', '<div class="viewport-inner">' + html + '</div>', '</div>'].join('');

			dom.overlay.querySelector('.close').addEventListener('click', function (event) {
				closeOverlay();
				event.preventDefault();
			}, false);

			setTimeout(function () {
				dom.overlay.classList.add('visible');
			}, 1);
		}
	}

	/**
  * Closes any currently open overlay.
  */
	function closeOverlay() {

		if (dom.overlay) {
			dom.overlay.parentNode.removeChild(dom.overlay);
			dom.overlay = null;
		}
	}

	/**
  * Applies JavaScript-controlled layout rules to the
  * presentation.
  */
	function layout() {

		if (dom.wrapper && !isPrintingPDF()) {

			if (!config.disableLayout) {

				var size = getComputedSlideSize();

				// Layout the contents of the slides
				layoutSlideContents(config.width, config.height);

				dom.slides.style.width = size.width + 'px';
				dom.slides.style.height = size.height + 'px';

				// Determine scale of content to fit within available space
				scale = Math.min(size.presentationWidth / size.width, size.presentationHeight / size.height);

				// Respect max/min scale settings
				scale = Math.max(scale, config.minScale);
				scale = Math.min(scale, config.maxScale);

				// Don't apply any scaling styles if scale is 1
				if (scale === 1) {
					dom.slides.style.zoom = '';
					dom.slides.style.left = '';
					dom.slides.style.top = '';
					dom.slides.style.bottom = '';
					dom.slides.style.right = '';
					transformSlides({ layout: '' });
				} else {
					// Prefer zoom for scaling up so that content remains crisp.
					// Don't use zoom to scale down since that can lead to shifts
					// in text layout/line breaks.
					if (scale > 1 && features.zoom) {
						dom.slides.style.zoom = scale;
						dom.slides.style.left = '';
						dom.slides.style.top = '';
						dom.slides.style.bottom = '';
						dom.slides.style.right = '';
						transformSlides({ layout: '' });
					}
					// Apply scale transform as a fallback
					else {
							dom.slides.style.zoom = '';
							dom.slides.style.left = '50%';
							dom.slides.style.top = '50%';
							dom.slides.style.bottom = 'auto';
							dom.slides.style.right = 'auto';
							transformSlides({ layout: 'translate(-50%, -50%) scale(' + scale + ')' });
						}
				}

				// Select all slides, vertical and horizontal
				var slides = toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR));

				for (var i = 0, len = slides.length; i < len; i++) {
					var slide = slides[i];

					// Don't bother updating invisible slides
					if (slide.style.display === 'none') {
						continue;
					}

					if (config.center || slide.classList.contains('center')) {
						// Vertical stacks are not centred since their section
						// children will be
						if (slide.classList.contains('stack')) {
							slide.style.top = 0;
						} else {
							slide.style.top = Math.max((size.height - slide.scrollHeight) / 2, 0) + 'px';
						}
					} else {
						slide.style.top = '';
					}
				}
			}

			updateProgress();
			updateParallax();

			if (isOverview()) {
				updateOverview();
			}
		}
	}

	/**
  * Applies layout logic to the contents of all slides in
  * the presentation.
  *
  * @param {string|number} width
  * @param {string|number} height
  */
	function layoutSlideContents(width, height) {

		// Handle sizing of elements with the 'stretch' class
		toArray(dom.slides.querySelectorAll('section > .stretch')).forEach(function (element) {

			// Determine how much vertical space we can use
			var remainingHeight = getRemainingHeight(element, height);

			// Consider the aspect ratio of media elements
			if (/(img|video)/gi.test(element.nodeName)) {
				var nw = element.naturalWidth || element.videoWidth,
				    nh = element.naturalHeight || element.videoHeight;

				var es = Math.min(width / nw, remainingHeight / nh);

				element.style.width = nw * es + 'px';
				element.style.height = nh * es + 'px';
			} else {
				element.style.width = width + 'px';
				element.style.height = remainingHeight + 'px';
			}
		});
	}

	/**
  * Calculates the computed pixel size of our slides. These
  * values are based on the width and height configuration
  * options.
  *
  * @param {number} [presentationWidth=dom.wrapper.offsetWidth]
  * @param {number} [presentationHeight=dom.wrapper.offsetHeight]
  */
	function getComputedSlideSize(presentationWidth, presentationHeight) {

		var size = {
			// Slide size
			width: config.width,
			height: config.height,

			// Presentation size
			presentationWidth: presentationWidth || dom.wrapper.offsetWidth,
			presentationHeight: presentationHeight || dom.wrapper.offsetHeight
		};

		// Reduce available space by margin
		size.presentationWidth -= size.presentationWidth * config.margin;
		size.presentationHeight -= size.presentationHeight * config.margin;

		// Slide width may be a percentage of available width
		if (typeof size.width === 'string' && /%$/.test(size.width)) {
			size.width = parseInt(size.width, 10) / 100 * size.presentationWidth;
		}

		// Slide height may be a percentage of available height
		if (typeof size.height === 'string' && /%$/.test(size.height)) {
			size.height = parseInt(size.height, 10) / 100 * size.presentationHeight;
		}

		return size;
	}

	/**
  * Stores the vertical index of a stack so that the same
  * vertical slide can be selected when navigating to and
  * from the stack.
  *
  * @param {HTMLElement} stack The vertical stack element
  * @param {string|number} [v=0] Index to memorize
  */
	function setPreviousVerticalIndex(stack, v) {

		if ((typeof stack === 'undefined' ? 'undefined' : _typeof(stack)) === 'object' && typeof stack.setAttribute === 'function') {
			stack.setAttribute('data-previous-indexv', v || 0);
		}
	}

	/**
  * Retrieves the vertical index which was stored using
  * #setPreviousVerticalIndex() or 0 if no previous index
  * exists.
  *
  * @param {HTMLElement} stack The vertical stack element
  */
	function getPreviousVerticalIndex(stack) {

		if ((typeof stack === 'undefined' ? 'undefined' : _typeof(stack)) === 'object' && typeof stack.setAttribute === 'function' && stack.classList.contains('stack')) {
			// Prefer manually defined start-indexv
			var attributeName = stack.hasAttribute('data-start-indexv') ? 'data-start-indexv' : 'data-previous-indexv';

			return parseInt(stack.getAttribute(attributeName) || 0, 10);
		}

		return 0;
	}

	/**
  * Displays the overview of slides (quick nav) by scaling
  * down and arranging all slide elements.
  */
	function activateOverview() {

		// Only proceed if enabled in config
		if (config.overview && !isOverview()) {

			overview = true;

			dom.wrapper.classList.add('overview');
			dom.wrapper.classList.remove('overview-deactivating');

			if (features.overviewTransitions) {
				setTimeout(function () {
					dom.wrapper.classList.add('overview-animated');
				}, 1);
			}

			// Don't auto-slide while in overview mode
			cancelAutoSlide();

			// Move the backgrounds element into the slide container to
			// that the same scaling is applied
			dom.slides.appendChild(dom.background);

			// Clicking on an overview slide navigates to it
			toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR)).forEach(function (slide) {
				if (!slide.classList.contains('stack')) {
					slide.addEventListener('click', onOverviewSlideClicked, true);
				}
			});

			// Calculate slide sizes
			var margin = 70;
			var slideSize = getComputedSlideSize();
			overviewSlideWidth = slideSize.width + margin;
			overviewSlideHeight = slideSize.height + margin;

			// Reverse in RTL mode
			if (config.rtl) {
				overviewSlideWidth = -overviewSlideWidth;
			}

			updateSlidesVisibility();
			layoutOverview();
			updateOverview();

			layout();

			// Notify observers of the overview showing
			dispatchEvent('overviewshown', {
				'indexh': indexh,
				'indexv': indexv,
				'currentSlide': currentSlide
			});
		}
	}

	/**
  * Uses CSS transforms to position all slides in a grid for
  * display inside of the overview mode.
  */
	function layoutOverview() {

		// Layout slides
		toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).forEach(function (hslide, h) {
			hslide.setAttribute('data-index-h', h);
			transformElement(hslide, 'translate3d(' + h * overviewSlideWidth + 'px, 0, 0)');

			if (hslide.classList.contains('stack')) {

				toArray(hslide.querySelectorAll('section')).forEach(function (vslide, v) {
					vslide.setAttribute('data-index-h', h);
					vslide.setAttribute('data-index-v', v);

					transformElement(vslide, 'translate3d(0, ' + v * overviewSlideHeight + 'px, 0)');
				});
			}
		});

		// Layout slide backgrounds
		toArray(dom.background.childNodes).forEach(function (hbackground, h) {
			transformElement(hbackground, 'translate3d(' + h * overviewSlideWidth + 'px, 0, 0)');

			toArray(hbackground.querySelectorAll('.slide-background')).forEach(function (vbackground, v) {
				transformElement(vbackground, 'translate3d(0, ' + v * overviewSlideHeight + 'px, 0)');
			});
		});
	}

	/**
  * Moves the overview viewport to the current slides.
  * Called each time the current slide changes.
  */
	function updateOverview() {

		var vmin = Math.min(window.innerWidth, window.innerHeight);
		var scale = Math.max(vmin / 5, 150) / vmin;

		transformSlides({
			overview: ['scale(' + scale + ')', 'translateX(' + -indexh * overviewSlideWidth + 'px)', 'translateY(' + -indexv * overviewSlideHeight + 'px)'].join(' ')
		});
	}

	/**
  * Exits the slide overview and enters the currently
  * active slide.
  */
	function deactivateOverview() {

		// Only proceed if enabled in config
		if (config.overview) {

			overview = false;

			dom.wrapper.classList.remove('overview');
			dom.wrapper.classList.remove('overview-animated');

			// Temporarily add a class so that transitions can do different things
			// depending on whether they are exiting/entering overview, or just
			// moving from slide to slide
			dom.wrapper.classList.add('overview-deactivating');

			setTimeout(function () {
				dom.wrapper.classList.remove('overview-deactivating');
			}, 1);

			// Move the background element back out
			dom.wrapper.appendChild(dom.background);

			// Clean up changes made to slides
			toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR)).forEach(function (slide) {
				transformElement(slide, '');

				slide.removeEventListener('click', onOverviewSlideClicked, true);
			});

			// Clean up changes made to backgrounds
			toArray(dom.background.querySelectorAll('.slide-background')).forEach(function (background) {
				transformElement(background, '');
			});

			transformSlides({ overview: '' });

			slide(indexh, indexv);

			layout();

			cueAutoSlide();

			// Notify observers of the overview hiding
			dispatchEvent('overviewhidden', {
				'indexh': indexh,
				'indexv': indexv,
				'currentSlide': currentSlide
			});
		}
	}

	/**
  * Toggles the slide overview mode on and off.
  *
  * @param {Boolean} [override] Flag which overrides the
  * toggle logic and forcibly sets the desired state. True means
  * overview is open, false means it's closed.
  */
	function toggleOverview(override) {

		if (typeof override === 'boolean') {
			override ? activateOverview() : deactivateOverview();
		} else {
			isOverview() ? deactivateOverview() : activateOverview();
		}
	}

	/**
  * Checks if the overview is currently active.
  *
  * @return {Boolean} true if the overview is active,
  * false otherwise
  */
	function isOverview() {

		return overview;
	}

	/**
  * Return a hash URL that will resolve to the current slide location.
  */
	function locationHash() {

		var url = '/';

		// Attempt to create a named link based on the slide's ID
		var id = currentSlide ? currentSlide.getAttribute('id') : null;
		if (id) {
			id = encodeURIComponent(id);
		}

		var indexf;
		if (config.fragmentInURL) {
			indexf = getIndices().f;
		}

		// If the current slide has an ID, use that as a named link,
		// but we don't support named links with a fragment index
		if (typeof id === 'string' && id.length && indexf === undefined) {
			url = '/' + id;
		}
		// Otherwise use the /h/v index
		else {
				var hashIndexBase = config.hashOneBasedIndex ? 1 : 0;
				if (indexh > 0 || indexv > 0 || indexf !== undefined) url += indexh + hashIndexBase;
				if (indexv > 0 || indexf !== undefined) url += '/' + (indexv + hashIndexBase);
				if (indexf !== undefined) url += '/' + indexf;
			}

		return url;
	}

	/**
  * Checks if the current or specified slide is vertical
  * (nested within another slide).
  *
  * @param {HTMLElement} [slide=currentSlide] The slide to check
  * orientation of
  * @return {Boolean}
  */
	function isVerticalSlide(slide) {

		// Prefer slide argument, otherwise use current slide
		slide = slide ? slide : currentSlide;

		return slide && slide.parentNode && !!slide.parentNode.nodeName.match(/section/i);
	}

	/**
  * Handling the fullscreen functionality via the fullscreen API
  *
  * @see http://fullscreen.spec.whatwg.org/
  * @see https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
  */
	function enterFullscreen() {

		var element = document.documentElement;

		// Check which implementation is available
		var requestMethod = element.requestFullscreen || element.webkitRequestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

		if (requestMethod) {
			requestMethod.apply(element);
		}
	}

	/**
  * Enters the paused mode which fades everything on screen to
  * black.
  */
	function pause() {

		if (config.pause) {
			var wasPaused = dom.wrapper.classList.contains('paused');

			cancelAutoSlide();
			dom.wrapper.classList.add('paused');

			if (wasPaused === false) {
				dispatchEvent('paused');
			}
		}
	}

	/**
  * Exits from the paused mode.
  */
	function resume() {

		var wasPaused = dom.wrapper.classList.contains('paused');
		dom.wrapper.classList.remove('paused');

		cueAutoSlide();

		if (wasPaused) {
			dispatchEvent('resumed');
		}
	}

	/**
  * Toggles the paused mode on and off.
  */
	function togglePause(override) {

		if (typeof override === 'boolean') {
			override ? pause() : resume();
		} else {
			isPaused() ? resume() : pause();
		}
	}

	/**
  * Checks if we are currently in the paused mode.
  *
  * @return {Boolean}
  */
	function isPaused() {

		return dom.wrapper.classList.contains('paused');
	}

	/**
  * Toggles the auto slide mode on and off.
  *
  * @param {Boolean} [override] Flag which sets the desired state.
  * True means autoplay starts, false means it stops.
  */

	function toggleAutoSlide(override) {

		if (typeof override === 'boolean') {
			override ? resumeAutoSlide() : pauseAutoSlide();
		} else {
			autoSlidePaused ? resumeAutoSlide() : pauseAutoSlide();
		}
	}

	/**
  * Checks if the auto slide mode is currently on.
  *
  * @return {Boolean}
  */
	function isAutoSliding() {

		return !!(autoSlide && !autoSlidePaused);
	}

	/**
  * Steps from the current point in the presentation to the
  * slide which matches the specified horizontal and vertical
  * indices.
  *
  * @param {number} [h=indexh] Horizontal index of the target slide
  * @param {number} [v=indexv] Vertical index of the target slide
  * @param {number} [f] Index of a fragment within the
  * target slide to activate
  * @param {number} [o] Origin for use in multimaster environments
  */
	function slide(h, v, f, o) {

		// Remember where we were at before
		previousSlide = currentSlide;

		// Query all horizontal slides in the deck
		var horizontalSlides = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR);

		// Abort if there are no slides
		if (horizontalSlides.length === 0) return;

		// If no vertical index is specified and the upcoming slide is a
		// stack, resume at its previous vertical index
		if (v === undefined && !isOverview()) {
			v = getPreviousVerticalIndex(horizontalSlides[h]);
		}

		// If we were on a vertical stack, remember what vertical index
		// it was on so we can resume at the same position when returning
		if (previousSlide && previousSlide.parentNode && previousSlide.parentNode.classList.contains('stack')) {
			setPreviousVerticalIndex(previousSlide.parentNode, indexv);
		}

		// Remember the state before this slide
		var stateBefore = state.concat();

		// Reset the state array
		state.length = 0;

		var indexhBefore = indexh || 0,
		    indexvBefore = indexv || 0;

		// Activate and transition to the new slide
		indexh = updateSlides(HORIZONTAL_SLIDES_SELECTOR, h === undefined ? indexh : h);
		indexv = updateSlides(VERTICAL_SLIDES_SELECTOR, v === undefined ? indexv : v);

		// Update the visibility of slides now that the indices have changed
		updateSlidesVisibility();

		layout();

		// Apply the new state
		stateLoop: for (var i = 0, len = state.length; i < len; i++) {
			// Check if this state existed on the previous slide. If it
			// did, we will avoid adding it repeatedly
			for (var j = 0; j < stateBefore.length; j++) {
				if (stateBefore[j] === state[i]) {
					stateBefore.splice(j, 1);
					continue stateLoop;
				}
			}

			document.documentElement.classList.add(state[i]);

			// Dispatch custom event matching the state's name
			dispatchEvent(state[i]);
		}

		// Clean up the remains of the previous state
		while (stateBefore.length) {
			document.documentElement.classList.remove(stateBefore.pop());
		}

		// Update the overview if it's currently active
		if (isOverview()) {
			updateOverview();
		}

		// Find the current horizontal slide and any possible vertical slides
		// within it
		var currentHorizontalSlide = horizontalSlides[indexh],
		    currentVerticalSlides = currentHorizontalSlide.querySelectorAll('section');

		// Store references to the previous and current slides
		currentSlide = currentVerticalSlides[indexv] || currentHorizontalSlide;

		// Show fragment, if specified
		if (typeof f !== 'undefined') {
			navigateFragment(f);
		}

		// Dispatch an event if the slide changed
		var slideChanged = indexh !== indexhBefore || indexv !== indexvBefore;
		if (!slideChanged) {
			// Ensure that the previous slide is never the same as the current
			previousSlide = null;
		}

		// Solves an edge case where the previous slide maintains the
		// 'present' class when navigating between adjacent vertical
		// stacks
		if (previousSlide && previousSlide !== currentSlide) {
			previousSlide.classList.remove('present');
			previousSlide.setAttribute('aria-hidden', 'true');

			// Reset all slides upon navigate to home
			// Issue: #285
			if (dom.wrapper.querySelector(HOME_SLIDE_SELECTOR).classList.contains('present')) {
				// Launch async task
				setTimeout(function () {
					var slides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR + '.stack')),
					    i;
					for (i in slides) {
						if (slides[i]) {
							// Reset stack
							setPreviousVerticalIndex(slides[i], 0);
						}
					}
				}, 0);
			}
		}

		if (slideChanged) {
			dispatchEvent('slidechanged', {
				'indexh': indexh,
				'indexv': indexv,
				'previousSlide': previousSlide,
				'currentSlide': currentSlide,
				'origin': o
			});
		}

		// Handle embedded content
		if (slideChanged || !previousSlide) {
			stopEmbeddedContent(previousSlide);
			startEmbeddedContent(currentSlide);
		}

		// Announce the current slide contents, for screen readers
		dom.statusDiv.textContent = getStatusText(currentSlide);

		updateControls();
		updateProgress();
		updateBackground();
		updateParallax();
		updateSlideNumber();
		updateNotes();

		// Update the URL hash
		writeURL();

		cueAutoSlide();
	}

	/**
  * Syncs the presentation with the current DOM. Useful
  * when new slides or control elements are added or when
  * the configuration has changed.
  */
	function sync() {

		// Subscribe to input
		removeEventListeners();
		addEventListeners();

		// Force a layout to make sure the current config is accounted for
		layout();

		// Reflect the current autoSlide value
		autoSlide = config.autoSlide;

		// Start auto-sliding if it's enabled
		cueAutoSlide();

		// Re-create the slide backgrounds
		createBackgrounds();

		// Write the current hash to the URL
		writeURL();

		sortAllFragments();

		updateControls();
		updateProgress();
		updateSlideNumber();
		updateSlidesVisibility();
		updateBackground(true);
		updateNotesVisibility();
		updateNotes();

		formatEmbeddedContent();

		// Start or stop embedded content depending on global config
		if (config.autoPlayMedia === false) {
			stopEmbeddedContent(currentSlide, { unloadIframes: false });
		} else {
			startEmbeddedContent(currentSlide);
		}

		if (isOverview()) {
			layoutOverview();
		}
	}

	/**
  * Updates reveal.js to keep in sync with new slide attributes. For
  * example, if you add a new `data-background-image` you can call
  * this to have reveal.js render the new background image.
  *
  * Similar to #sync() but more efficient when you only need to
  * refresh a specific slide.
  *
  * @param {HTMLElement} slide
  */
	function syncSlide(slide) {

		syncBackground(slide);
		syncFragments(slide);

		updateBackground();
		updateNotes();

		loadSlide(slide);
	}

	/**
  * Formats the fragments on the given slide so that they have
  * valid indices. Call this if fragments are changed in the DOM
  * after reveal.js has already initialized.
  *
  * @param {HTMLElement} slide
  */
	function syncFragments(slide) {

		sortFragments(slide.querySelectorAll('.fragment'));
	}

	/**
  * Resets all vertical slides so that only the first
  * is visible.
  */
	function resetVerticalSlides() {

		var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));
		horizontalSlides.forEach(function (horizontalSlide) {

			var verticalSlides = toArray(horizontalSlide.querySelectorAll('section'));
			verticalSlides.forEach(function (verticalSlide, y) {

				if (y > 0) {
					verticalSlide.classList.remove('present');
					verticalSlide.classList.remove('past');
					verticalSlide.classList.add('future');
					verticalSlide.setAttribute('aria-hidden', 'true');
				}
			});
		});
	}

	/**
  * Sorts and formats all of fragments in the
  * presentation.
  */
	function sortAllFragments() {

		var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));
		horizontalSlides.forEach(function (horizontalSlide) {

			var verticalSlides = toArray(horizontalSlide.querySelectorAll('section'));
			verticalSlides.forEach(function (verticalSlide, y) {

				sortFragments(verticalSlide.querySelectorAll('.fragment'));
			});

			if (verticalSlides.length === 0) sortFragments(horizontalSlide.querySelectorAll('.fragment'));
		});
	}

	/**
  * Randomly shuffles all slides in the deck.
  */
	function shuffle() {

		var slides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));

		slides.forEach(function (slide) {

			// Insert this slide next to another random slide. This may
			// cause the slide to insert before itself but that's fine.
			dom.slides.insertBefore(slide, slides[Math.floor(Math.random() * slides.length)]);
		});
	}

	/**
  * Updates one dimension of slides by showing the slide
  * with the specified index.
  *
  * @param {string} selector A CSS selector that will fetch
  * the group of slides we are working with
  * @param {number} index The index of the slide that should be
  * shown
  *
  * @return {number} The index of the slide that is now shown,
  * might differ from the passed in index if it was out of
  * bounds.
  */
	function updateSlides(selector, index) {

		// Select all slides and convert the NodeList result to
		// an array
		var slides = toArray(dom.wrapper.querySelectorAll(selector)),
		    slidesLength = slides.length;

		var printMode = isPrintingPDF();

		if (slidesLength) {

			// Should the index loop?
			if (config.loop) {
				index %= slidesLength;

				if (index < 0) {
					index = slidesLength + index;
				}
			}

			// Enforce max and minimum index bounds
			index = Math.max(Math.min(index, slidesLength - 1), 0);

			for (var i = 0; i < slidesLength; i++) {
				var element = slides[i];

				var reverse = config.rtl && !isVerticalSlide(element);

				element.classList.remove('past');
				element.classList.remove('present');
				element.classList.remove('future');

				// http://www.w3.org/html/wg/drafts/html/master/editing.html#the-hidden-attribute
				element.setAttribute('hidden', '');
				element.setAttribute('aria-hidden', 'true');

				// If this element contains vertical slides
				if (element.querySelector('section')) {
					element.classList.add('stack');
				}

				// If we're printing static slides, all slides are "present"
				if (printMode) {
					element.classList.add('present');
					continue;
				}

				if (i < index) {
					// Any element previous to index is given the 'past' class
					element.classList.add(reverse ? 'future' : 'past');

					if (config.fragments) {
						var pastFragments = toArray(element.querySelectorAll('.fragment'));

						// Show all fragments on prior slides
						while (pastFragments.length) {
							var pastFragment = pastFragments.pop();
							pastFragment.classList.add('visible');
							pastFragment.classList.remove('current-fragment');
						}
					}
				} else if (i > index) {
					// Any element subsequent to index is given the 'future' class
					element.classList.add(reverse ? 'past' : 'future');

					if (config.fragments) {
						var futureFragments = toArray(element.querySelectorAll('.fragment.visible'));

						// No fragments in future slides should be visible ahead of time
						while (futureFragments.length) {
							var futureFragment = futureFragments.pop();
							futureFragment.classList.remove('visible');
							futureFragment.classList.remove('current-fragment');
						}
					}
				}
			}

			// Mark the current slide as present
			slides[index].classList.add('present');
			slides[index].removeAttribute('hidden');
			slides[index].removeAttribute('aria-hidden');

			// If this slide has a state associated with it, add it
			// onto the current state of the deck
			var slideState = slides[index].getAttribute('data-state');
			if (slideState) {
				state = state.concat(slideState.split(' '));
			}
		} else {
			// Since there are no slides we can't be anywhere beyond the
			// zeroth index
			index = 0;
		}

		return index;
	}

	/**
  * Optimization method; hide all slides that are far away
  * from the present slide.
  */
	function updateSlidesVisibility() {

		// Select all slides and convert the NodeList result to
		// an array
		var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)),
		    horizontalSlidesLength = horizontalSlides.length,
		    distanceX,
		    distanceY;

		if (horizontalSlidesLength && typeof indexh !== 'undefined') {

			// The number of steps away from the present slide that will
			// be visible
			var viewDistance = isOverview() ? 10 : config.viewDistance;

			// Limit view distance on weaker devices
			if (isMobileDevice) {
				viewDistance = isOverview() ? 6 : 2;
			}

			// All slides need to be visible when exporting to PDF
			if (isPrintingPDF()) {
				viewDistance = Number.MAX_VALUE;
			}

			for (var x = 0; x < horizontalSlidesLength; x++) {
				var horizontalSlide = horizontalSlides[x];

				var verticalSlides = toArray(horizontalSlide.querySelectorAll('section')),
				    verticalSlidesLength = verticalSlides.length;

				// Determine how far away this slide is from the present
				distanceX = Math.abs((indexh || 0) - x) || 0;

				// If the presentation is looped, distance should measure
				// 1 between the first and last slides
				if (config.loop) {
					distanceX = Math.abs(((indexh || 0) - x) % (horizontalSlidesLength - viewDistance)) || 0;
				}

				// Show the horizontal slide if it's within the view distance
				if (distanceX < viewDistance) {
					loadSlide(horizontalSlide);
				} else {
					unloadSlide(horizontalSlide);
				}

				if (verticalSlidesLength) {

					var oy = getPreviousVerticalIndex(horizontalSlide);

					for (var y = 0; y < verticalSlidesLength; y++) {
						var verticalSlide = verticalSlides[y];

						distanceY = x === (indexh || 0) ? Math.abs((indexv || 0) - y) : Math.abs(y - oy);

						if (distanceX + distanceY < viewDistance) {
							loadSlide(verticalSlide);
						} else {
							unloadSlide(verticalSlide);
						}
					}
				}
			}

			// Flag if there are ANY vertical slides, anywhere in the deck
			if (dom.wrapper.querySelectorAll('.slides>section>section').length) {
				dom.wrapper.classList.add('has-vertical-slides');
			} else {
				dom.wrapper.classList.remove('has-vertical-slides');
			}

			// Flag if there are ANY horizontal slides, anywhere in the deck
			if (dom.wrapper.querySelectorAll('.slides>section').length > 1) {
				dom.wrapper.classList.add('has-horizontal-slides');
			} else {
				dom.wrapper.classList.remove('has-horizontal-slides');
			}
		}
	}

	/**
  * Pick up notes from the current slide and display them
  * to the viewer.
  *
  * @see {@link config.showNotes}
  */
	function updateNotes() {

		if (config.showNotes && dom.speakerNotes && currentSlide && !isPrintingPDF()) {

			dom.speakerNotes.innerHTML = getSlideNotes() || '<span class="notes-placeholder">No notes on this slide.</span>';
		}
	}

	/**
  * Updates the visibility of the speaker notes sidebar that
  * is used to share annotated slides. The notes sidebar is
  * only visible if showNotes is true and there are notes on
  * one or more slides in the deck.
  */
	function updateNotesVisibility() {

		if (config.showNotes && hasNotes()) {
			dom.wrapper.classList.add('show-notes');
		} else {
			dom.wrapper.classList.remove('show-notes');
		}
	}

	/**
  * Checks if there are speaker notes for ANY slide in the
  * presentation.
  */
	function hasNotes() {

		return dom.slides.querySelectorAll('[data-notes], aside.notes').length > 0;
	}

	/**
  * Updates the progress bar to reflect the current slide.
  */
	function updateProgress() {

		// Update progress if enabled
		if (config.progress && dom.progressbar) {

			dom.progressbar.style.width = getProgress() * dom.wrapper.offsetWidth + 'px';
		}
	}

	/**
  * Updates the slide number div to reflect the current slide.
  *
  * The following slide number formats are available:
  *  "h.v":	horizontal . vertical slide number (default)
  *  "h/v":	horizontal / vertical slide number
  *    "c":	flattened slide number
  *  "c/t":	flattened slide number / total slides
  */
	function updateSlideNumber() {

		// Update slide number if enabled
		if (config.slideNumber && dom.slideNumber) {

			var value = [];
			var format = 'h.v';

			// Check if a custom number format is available
			if (typeof config.slideNumber === 'string') {
				format = config.slideNumber;
			}

			// If there are ONLY vertical slides in this deck, always use
			// a flattened slide number
			if (!/c/.test(format) && dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR).length === 1) {
				format = 'c';
			}

			switch (format) {
				case 'c':
					value.push(getSlidePastCount() + 1);
					break;
				case 'c/t':
					value.push(getSlidePastCount() + 1, '/', getTotalSlides());
					break;
				case 'h/v':
					value.push(indexh + 1);
					if (isVerticalSlide()) value.push('/', indexv + 1);
					break;
				default:
					value.push(indexh + 1);
					if (isVerticalSlide()) value.push('.', indexv + 1);
			}

			dom.slideNumber.innerHTML = formatSlideNumber(value[0], value[1], value[2]);
		}
	}

	/**
  * Applies HTML formatting to a slide number before it's
  * written to the DOM.
  *
  * @param {number} a Current slide
  * @param {string} delimiter Character to separate slide numbers
  * @param {(number|*)} b Total slides
  * @return {string} HTML string fragment
  */
	function formatSlideNumber(a, delimiter, b) {

		var url = '#' + locationHash();
		if (typeof b === 'number' && !isNaN(b)) {
			return '<a href="' + url + '">' + '<span class="slide-number-a">' + a + '</span>' + '<span class="slide-number-delimiter">' + delimiter + '</span>' + '<span class="slide-number-b">' + b + '</span>' + '</a>';
		} else {
			return '<a href="' + url + '">' + '<span class="slide-number-a">' + a + '</span>' + '</a>';
		}
	}

	/**
  * Updates the state of all control/navigation arrows.
  */
	function updateControls() {

		var routes = availableRoutes();
		var fragments = availableFragments();

		// Remove the 'enabled' class from all directions
		dom.controlsLeft.concat(dom.controlsRight).concat(dom.controlsUp).concat(dom.controlsDown).concat(dom.controlsPrev).concat(dom.controlsNext).forEach(function (node) {
			node.classList.remove('enabled');
			node.classList.remove('fragmented');

			// Set 'disabled' attribute on all directions
			node.setAttribute('disabled', 'disabled');
		});

		// Add the 'enabled' class to the available routes; remove 'disabled' attribute to enable buttons
		if (routes.left) dom.controlsLeft.forEach(function (el) {
			el.classList.add('enabled');el.removeAttribute('disabled');
		});
		if (routes.right) dom.controlsRight.forEach(function (el) {
			el.classList.add('enabled');el.removeAttribute('disabled');
		});
		if (routes.up) dom.controlsUp.forEach(function (el) {
			el.classList.add('enabled');el.removeAttribute('disabled');
		});
		if (routes.down) dom.controlsDown.forEach(function (el) {
			el.classList.add('enabled');el.removeAttribute('disabled');
		});

		// Prev/next buttons
		if (routes.left || routes.up) dom.controlsPrev.forEach(function (el) {
			el.classList.add('enabled');el.removeAttribute('disabled');
		});
		if (routes.right || routes.down) dom.controlsNext.forEach(function (el) {
			el.classList.add('enabled');el.removeAttribute('disabled');
		});

		// Highlight fragment directions
		if (currentSlide) {

			// Always apply fragment decorator to prev/next buttons
			if (fragments.prev) dom.controlsPrev.forEach(function (el) {
				el.classList.add('fragmented', 'enabled');el.removeAttribute('disabled');
			});
			if (fragments.next) dom.controlsNext.forEach(function (el) {
				el.classList.add('fragmented', 'enabled');el.removeAttribute('disabled');
			});

			// Apply fragment decorators to directional buttons based on
			// what slide axis they are in
			if (isVerticalSlide(currentSlide)) {
				if (fragments.prev) dom.controlsUp.forEach(function (el) {
					el.classList.add('fragmented', 'enabled');el.removeAttribute('disabled');
				});
				if (fragments.next) dom.controlsDown.forEach(function (el) {
					el.classList.add('fragmented', 'enabled');el.removeAttribute('disabled');
				});
			} else {
				if (fragments.prev) dom.controlsLeft.forEach(function (el) {
					el.classList.add('fragmented', 'enabled');el.removeAttribute('disabled');
				});
				if (fragments.next) dom.controlsRight.forEach(function (el) {
					el.classList.add('fragmented', 'enabled');el.removeAttribute('disabled');
				});
			}
		}

		if (config.controlsTutorial) {

			// Highlight control arrows with an animation to ensure
			// that the viewer knows how to navigate
			if (!hasNavigatedDown && routes.down) {
				dom.controlsDownArrow.classList.add('highlight');
			} else {
				dom.controlsDownArrow.classList.remove('highlight');

				if (!hasNavigatedRight && routes.right && indexv === 0) {
					dom.controlsRightArrow.classList.add('highlight');
				} else {
					dom.controlsRightArrow.classList.remove('highlight');
				}
			}
		}
	}

	/**
  * Updates the background elements to reflect the current
  * slide.
  *
  * @param {boolean} includeAll If true, the backgrounds of
  * all vertical slides (not just the present) will be updated.
  */
	function updateBackground(includeAll) {

		var currentBackground = null;

		// Reverse past/future classes when in RTL mode
		var horizontalPast = config.rtl ? 'future' : 'past',
		    horizontalFuture = config.rtl ? 'past' : 'future';

		// Update the classes of all backgrounds to match the
		// states of their slides (past/present/future)
		toArray(dom.background.childNodes).forEach(function (backgroundh, h) {

			backgroundh.classList.remove('past');
			backgroundh.classList.remove('present');
			backgroundh.classList.remove('future');

			if (h < indexh) {
				backgroundh.classList.add(horizontalPast);
			} else if (h > indexh) {
				backgroundh.classList.add(horizontalFuture);
			} else {
				backgroundh.classList.add('present');

				// Store a reference to the current background element
				currentBackground = backgroundh;
			}

			if (includeAll || h === indexh) {
				toArray(backgroundh.querySelectorAll('.slide-background')).forEach(function (backgroundv, v) {

					backgroundv.classList.remove('past');
					backgroundv.classList.remove('present');
					backgroundv.classList.remove('future');

					if (v < indexv) {
						backgroundv.classList.add('past');
					} else if (v > indexv) {
						backgroundv.classList.add('future');
					} else {
						backgroundv.classList.add('present');

						// Only if this is the present horizontal and vertical slide
						if (h === indexh) currentBackground = backgroundv;
					}
				});
			}
		});

		// Stop content inside of previous backgrounds
		if (previousBackground) {

			stopEmbeddedContent(previousBackground);
		}

		// Start content in the current background
		if (currentBackground) {

			startEmbeddedContent(currentBackground);

			var currentBackgroundContent = currentBackground.querySelector('.slide-background-content');
			if (currentBackgroundContent) {

				var backgroundImageURL = currentBackgroundContent.style.backgroundImage || '';

				// Restart GIFs (doesn't work in Firefox)
				if (/\.gif/i.test(backgroundImageURL)) {
					currentBackgroundContent.style.backgroundImage = '';
					window.getComputedStyle(currentBackgroundContent).opacity;
					currentBackgroundContent.style.backgroundImage = backgroundImageURL;
				}
			}

			// Don't transition between identical backgrounds. This
			// prevents unwanted flicker.
			var previousBackgroundHash = previousBackground ? previousBackground.getAttribute('data-background-hash') : null;
			var currentBackgroundHash = currentBackground.getAttribute('data-background-hash');
			if (currentBackgroundHash && currentBackgroundHash === previousBackgroundHash && currentBackground !== previousBackground) {
				dom.background.classList.add('no-transition');
			}

			previousBackground = currentBackground;
		}

		// If there's a background brightness flag for this slide,
		// bubble it to the .reveal container
		if (currentSlide) {
			['has-light-background', 'has-dark-background'].forEach(function (classToBubble) {
				if (currentSlide.classList.contains(classToBubble)) {
					dom.wrapper.classList.add(classToBubble);
				} else {
					dom.wrapper.classList.remove(classToBubble);
				}
			});
		}

		// Allow the first background to apply without transition
		setTimeout(function () {
			dom.background.classList.remove('no-transition');
		}, 1);
	}

	/**
  * Updates the position of the parallax background based
  * on the current slide index.
  */
	function updateParallax() {

		if (config.parallaxBackgroundImage) {

			var horizontalSlides = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR),
			    verticalSlides = dom.wrapper.querySelectorAll(VERTICAL_SLIDES_SELECTOR);

			var backgroundSize = dom.background.style.backgroundSize.split(' '),
			    backgroundWidth,
			    backgroundHeight;

			if (backgroundSize.length === 1) {
				backgroundWidth = backgroundHeight = parseInt(backgroundSize[0], 10);
			} else {
				backgroundWidth = parseInt(backgroundSize[0], 10);
				backgroundHeight = parseInt(backgroundSize[1], 10);
			}

			var slideWidth = dom.background.offsetWidth,
			    horizontalSlideCount = horizontalSlides.length,
			    horizontalOffsetMultiplier,
			    horizontalOffset;

			if (typeof config.parallaxBackgroundHorizontal === 'number') {
				horizontalOffsetMultiplier = config.parallaxBackgroundHorizontal;
			} else {
				horizontalOffsetMultiplier = horizontalSlideCount > 1 ? (backgroundWidth - slideWidth) / (horizontalSlideCount - 1) : 0;
			}

			horizontalOffset = horizontalOffsetMultiplier * indexh * -1;

			var slideHeight = dom.background.offsetHeight,
			    verticalSlideCount = verticalSlides.length,
			    verticalOffsetMultiplier,
			    verticalOffset;

			if (typeof config.parallaxBackgroundVertical === 'number') {
				verticalOffsetMultiplier = config.parallaxBackgroundVertical;
			} else {
				verticalOffsetMultiplier = (backgroundHeight - slideHeight) / (verticalSlideCount - 1);
			}

			verticalOffset = verticalSlideCount > 0 ? verticalOffsetMultiplier * indexv : 0;

			dom.background.style.backgroundPosition = horizontalOffset + 'px ' + -verticalOffset + 'px';
		}
	}

	/**
  * Called when the given slide is within the configured view
  * distance. Shows the slide element and loads any content
  * that is set to load lazily (data-src).
  *
  * @param {HTMLElement} slide Slide to show
  */
	function loadSlide(slide, options) {

		options = options || {};

		// Show the slide element
		slide.style.display = config.display;

		// Media elements with data-src attributes
		toArray(slide.querySelectorAll('img[data-src], video[data-src], audio[data-src]')).forEach(function (element) {
			element.setAttribute('src', element.getAttribute('data-src'));
			element.setAttribute('data-lazy-loaded', '');
			element.removeAttribute('data-src');
		});

		// Media elements with <source> children
		toArray(slide.querySelectorAll('video, audio')).forEach(function (media) {
			var sources = 0;

			toArray(media.querySelectorAll('source[data-src]')).forEach(function (source) {
				source.setAttribute('src', source.getAttribute('data-src'));
				source.removeAttribute('data-src');
				source.setAttribute('data-lazy-loaded', '');
				sources += 1;
			});

			// If we rewrote sources for this video/audio element, we need
			// to manually tell it to load from its new origin
			if (sources > 0) {
				media.load();
			}
		});

		// Show the corresponding background element
		var background = slide.slideBackgroundElement;
		if (background) {
			background.style.display = 'block';

			var backgroundContent = slide.slideBackgroundContentElement;

			// If the background contains media, load it
			if (background.hasAttribute('data-loaded') === false) {
				background.setAttribute('data-loaded', 'true');

				var backgroundImage = slide.getAttribute('data-background-image'),
				    backgroundVideo = slide.getAttribute('data-background-video'),
				    backgroundVideoLoop = slide.hasAttribute('data-background-video-loop'),
				    backgroundVideoMuted = slide.hasAttribute('data-background-video-muted'),
				    backgroundIframe = slide.getAttribute('data-background-iframe');

				// Images
				if (backgroundImage) {
					backgroundContent.style.backgroundImage = 'url(' + encodeURI(backgroundImage) + ')';
				}
				// Videos
				else if (backgroundVideo && !isSpeakerNotes()) {
						var video = document.createElement('video');

						if (backgroundVideoLoop) {
							video.setAttribute('loop', '');
						}

						if (backgroundVideoMuted) {
							video.muted = true;
						}

						// Inline video playback works (at least in Mobile Safari) as
						// long as the video is muted and the `playsinline` attribute is
						// present
						if (isMobileDevice) {
							video.muted = true;
							video.autoplay = true;
							video.setAttribute('playsinline', '');
						}

						// Support comma separated lists of video sources
						backgroundVideo.split(',').forEach(function (source) {
							video.innerHTML += '<source src="' + source + '">';
						});

						backgroundContent.appendChild(video);
					}
					// Iframes
					else if (backgroundIframe && options.excludeIframes !== true) {
							var iframe = document.createElement('iframe');
							iframe.setAttribute('allowfullscreen', '');
							iframe.setAttribute('mozallowfullscreen', '');
							iframe.setAttribute('webkitallowfullscreen', '');

							// Only load autoplaying content when the slide is shown to
							// avoid having it play in the background
							if (/autoplay=(1|true|yes)/gi.test(backgroundIframe)) {
								iframe.setAttribute('data-src', backgroundIframe);
							} else {
								iframe.setAttribute('src', backgroundIframe);
							}

							iframe.style.width = '100%';
							iframe.style.height = '100%';
							iframe.style.maxHeight = '100%';
							iframe.style.maxWidth = '100%';

							backgroundContent.appendChild(iframe);
						}
			}
		}
	}

	/**
  * Unloads and hides the given slide. This is called when the
  * slide is moved outside of the configured view distance.
  *
  * @param {HTMLElement} slide
  */
	function unloadSlide(slide) {

		// Hide the slide element
		slide.style.display = 'none';

		// Hide the corresponding background element
		var background = getSlideBackground(slide);
		if (background) {
			background.style.display = 'none';
		}

		// Reset lazy-loaded media elements with src attributes
		toArray(slide.querySelectorAll('video[data-lazy-loaded][src], audio[data-lazy-loaded][src]')).forEach(function (element) {
			element.setAttribute('data-src', element.getAttribute('src'));
			element.removeAttribute('src');
		});

		// Reset lazy-loaded media elements with <source> children
		toArray(slide.querySelectorAll('video[data-lazy-loaded] source[src], audio source[src]')).forEach(function (source) {
			source.setAttribute('data-src', source.getAttribute('src'));
			source.removeAttribute('src');
		});
	}

	/**
  * Determine what available routes there are for navigation.
  *
  * @return {{left: boolean, right: boolean, up: boolean, down: boolean}}
  */
	function availableRoutes() {

		var horizontalSlides = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR),
		    verticalSlides = dom.wrapper.querySelectorAll(VERTICAL_SLIDES_SELECTOR);

		var routes = {
			left: indexh > 0,
			right: indexh < horizontalSlides.length - 1,
			up: indexv > 0,
			down: indexv < verticalSlides.length - 1
		};

		// Looped presentations can always be navigated as long as
		// there are slides available
		if (config.loop) {
			if (horizontalSlides.length > 1) {
				routes.left = true;
				routes.right = true;
			}

			if (verticalSlides.length > 1) {
				routes.up = true;
				routes.down = true;
			}
		}

		// Reverse horizontal controls for rtl
		if (config.rtl) {
			var left = routes.left;
			routes.left = routes.right;
			routes.right = left;
		}

		return routes;
	}

	/**
  * Returns an object describing the available fragment
  * directions.
  *
  * @return {{prev: boolean, next: boolean}}
  */
	function availableFragments() {

		if (currentSlide && config.fragments) {
			var fragments = currentSlide.querySelectorAll('.fragment');
			var hiddenFragments = currentSlide.querySelectorAll('.fragment:not(.visible)');

			return {
				prev: fragments.length - hiddenFragments.length > 0,
				next: !!hiddenFragments.length
			};
		} else {
			return { prev: false, next: false };
		}
	}

	/**
  * Enforces origin-specific format rules for embedded media.
  */
	function formatEmbeddedContent() {

		var _appendParamToIframeSource = function (sourceAttribute, sourceURL, param) {
			toArray(dom.slides.querySelectorAll('iframe[' + sourceAttribute + '*="' + sourceURL + '"]')).forEach(function (el) {
				var src = el.getAttribute(sourceAttribute);
				if (src && src.indexOf(param) === -1) {
					el.setAttribute(sourceAttribute, src + (!/\?/.test(src) ? '?' : '&') + param);
				}
			});
		};

		// YouTube frames must include "?enablejsapi=1"
		_appendParamToIframeSource('src', 'youtube.com/embed/', 'enablejsapi=1');
		_appendParamToIframeSource('data-src', 'youtube.com/embed/', 'enablejsapi=1');

		// Vimeo frames must include "?api=1"
		_appendParamToIframeSource('src', 'player.vimeo.com/', 'api=1');
		_appendParamToIframeSource('data-src', 'player.vimeo.com/', 'api=1');

		// Always show media controls on mobile devices
		if (isMobileDevice) {
			toArray(dom.slides.querySelectorAll('video, audio')).forEach(function (el) {
				el.controls = true;
			});
		}
	}

	/**
  * Start playback of any embedded content inside of
  * the given element.
  *
  * @param {HTMLElement} element
  */
	function startEmbeddedContent(element) {

		if (element && !isSpeakerNotes()) {

			// Restart GIFs
			toArray(element.querySelectorAll('img[src$=".gif"]')).forEach(function (el) {
				// Setting the same unchanged source like this was confirmed
				// to work in Chrome, FF & Safari
				el.setAttribute('src', el.getAttribute('src'));
			});

			// HTML5 media elements
			toArray(element.querySelectorAll('video, audio')).forEach(function (el) {
				if (closestParent(el, '.fragment') && !closestParent(el, '.fragment.visible')) {
					return;
				}

				// Prefer an explicit global autoplay setting
				var autoplay = config.autoPlayMedia;

				// If no global setting is available, fall back on the element's
				// own autoplay setting
				if (typeof autoplay !== 'boolean') {
					autoplay = el.hasAttribute('data-autoplay') || !!closestParent(el, '.slide-background');
				}

				if (autoplay && typeof el.play === 'function') {

					// If the media is ready, start playback
					if (el.readyState > 1) {
						startEmbeddedMedia({ target: el });
					}
					// Mobile devices never fire a loaded event so instead
					// of waiting, we initiate playback
					else if (isMobileDevice) {
							el.play();
						}
						// If the media isn't loaded, wait before playing
						else {
								el.removeEventListener('loadeddata', startEmbeddedMedia); // remove first to avoid dupes
								el.addEventListener('loadeddata', startEmbeddedMedia);
							}
				}
			});

			// Normal iframes
			toArray(element.querySelectorAll('iframe[src]')).forEach(function (el) {
				if (closestParent(el, '.fragment') && !closestParent(el, '.fragment.visible')) {
					return;
				}

				startEmbeddedIframe({ target: el });
			});

			// Lazy loading iframes
			toArray(element.querySelectorAll('iframe[data-src]')).forEach(function (el) {
				if (closestParent(el, '.fragment') && !closestParent(el, '.fragment.visible')) {
					return;
				}

				if (el.getAttribute('src') !== el.getAttribute('data-src')) {
					el.removeEventListener('load', startEmbeddedIframe); // remove first to avoid dupes
					el.addEventListener('load', startEmbeddedIframe);
					el.setAttribute('src', el.getAttribute('data-src'));
				}
			});
		}
	}

	/**
  * Starts playing an embedded video/audio element after
  * it has finished loading.
  *
  * @param {object} event
  */
	function startEmbeddedMedia(event) {

		var isAttachedToDOM = !!closestParent(event.target, 'html'),
		    isVisible = !!closestParent(event.target, '.present');

		if (isAttachedToDOM && isVisible) {
			event.target.currentTime = 0;
			event.target.play();
		}

		event.target.removeEventListener('loadeddata', startEmbeddedMedia);
	}

	/**
  * "Starts" the content of an embedded iframe using the
  * postMessage API.
  *
  * @param {object} event
  */
	function startEmbeddedIframe(event) {

		var iframe = event.target;

		if (iframe && iframe.contentWindow) {

			var isAttachedToDOM = !!closestParent(event.target, 'html'),
			    isVisible = !!closestParent(event.target, '.present');

			if (isAttachedToDOM && isVisible) {

				// Prefer an explicit global autoplay setting
				var autoplay = config.autoPlayMedia;

				// If no global setting is available, fall back on the element's
				// own autoplay setting
				if (typeof autoplay !== 'boolean') {
					autoplay = iframe.hasAttribute('data-autoplay') || !!closestParent(iframe, '.slide-background');
				}

				// YouTube postMessage API
				if (/youtube\.com\/embed\//.test(iframe.getAttribute('src')) && autoplay) {
					iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
				}
				// Vimeo postMessage API
				else if (/player\.vimeo\.com\//.test(iframe.getAttribute('src')) && autoplay) {
						iframe.contentWindow.postMessage('{"method":"play"}', '*');
					}
					// Generic postMessage API
					else {
							iframe.contentWindow.postMessage('slide:start', '*');
						}
			}
		}
	}

	/**
  * Stop playback of any embedded content inside of
  * the targeted slide.
  *
  * @param {HTMLElement} element
  */
	function stopEmbeddedContent(element, options) {

		options = extend({
			// Defaults
			unloadIframes: true
		}, options || {});

		if (element && element.parentNode) {
			// HTML5 media elements
			toArray(element.querySelectorAll('video, audio')).forEach(function (el) {
				if (!el.hasAttribute('data-ignore') && typeof el.pause === 'function') {
					el.setAttribute('data-paused-by-reveal', '');
					el.pause();
				}
			});

			// Generic postMessage API for non-lazy loaded iframes
			toArray(element.querySelectorAll('iframe')).forEach(function (el) {
				if (el.contentWindow) el.contentWindow.postMessage('slide:stop', '*');
				el.removeEventListener('load', startEmbeddedIframe);
			});

			// YouTube postMessage API
			toArray(element.querySelectorAll('iframe[src*="youtube.com/embed/"]')).forEach(function (el) {
				if (!el.hasAttribute('data-ignore') && el.contentWindow && typeof el.contentWindow.postMessage === 'function') {
					el.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
				}
			});

			// Vimeo postMessage API
			toArray(element.querySelectorAll('iframe[src*="player.vimeo.com/"]')).forEach(function (el) {
				if (!el.hasAttribute('data-ignore') && el.contentWindow && typeof el.contentWindow.postMessage === 'function') {
					el.contentWindow.postMessage('{"method":"pause"}', '*');
				}
			});

			if (options.unloadIframes === true) {
				// Unload lazy-loaded iframes
				toArray(element.querySelectorAll('iframe[data-src]')).forEach(function (el) {
					// Only removing the src doesn't actually unload the frame
					// in all browsers (Firefox) so we set it to blank first
					el.setAttribute('src', 'about:blank');
					el.removeAttribute('src');
				});
			}
		}
	}

	/**
  * Returns the number of past slides. This can be used as a global
  * flattened index for slides.
  *
  * @return {number} Past slide count
  */
	function getSlidePastCount() {

		var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));

		// The number of past slides
		var pastCount = 0;

		// Step through all slides and count the past ones
		mainLoop: for (var i = 0; i < horizontalSlides.length; i++) {

			var horizontalSlide = horizontalSlides[i];
			var verticalSlides = toArray(horizontalSlide.querySelectorAll('section'));

			for (var j = 0; j < verticalSlides.length; j++) {

				// Stop as soon as we arrive at the present
				if (verticalSlides[j].classList.contains('present')) {
					break mainLoop;
				}

				pastCount++;
			}

			// Stop as soon as we arrive at the present
			if (horizontalSlide.classList.contains('present')) {
				break;
			}

			// Don't count the wrapping section for vertical slides
			if (horizontalSlide.classList.contains('stack') === false) {
				pastCount++;
			}
		}

		return pastCount;
	}

	/**
  * Returns a value ranging from 0-1 that represents
  * how far into the presentation we have navigated.
  *
  * @return {number}
  */
	function getProgress() {

		// The number of past and total slides
		var totalCount = getTotalSlides();
		var pastCount = getSlidePastCount();

		if (currentSlide) {

			var allFragments = currentSlide.querySelectorAll('.fragment');

			// If there are fragments in the current slide those should be
			// accounted for in the progress.
			if (allFragments.length > 0) {
				var visibleFragments = currentSlide.querySelectorAll('.fragment.visible');

				// This value represents how big a portion of the slide progress
				// that is made up by its fragments (0-1)
				var fragmentWeight = 0.9;

				// Add fragment progress to the past slide count
				pastCount += visibleFragments.length / allFragments.length * fragmentWeight;
			}
		}

		return pastCount / (totalCount - 1);
	}

	/**
  * Checks if this presentation is running inside of the
  * speaker notes window.
  *
  * @return {boolean}
  */
	function isSpeakerNotes() {

		return !!window.location.search.match(/receiver/gi);
	}

	/**
  * Reads the current URL (hash) and navigates accordingly.
  */
	function readURL() {

		var hash = window.location.hash;

		// Attempt to parse the hash as either an index or name
		var bits = hash.slice(2).split('/'),
		    name = hash.replace(/#|\//gi, '');

		// If the first bit is invalid and there is a name we can
		// assume that this is a named link
		if (isNaN(parseInt(bits[0], 10)) && name.length) {
			var element;

			// Ensure the named link is a valid HTML ID attribute
			try {
				element = document.getElementById(decodeURIComponent(name));
			} catch (error) {}

			// Ensure that we're not already on a slide with the same name
			var isSameNameAsCurrentSlide = currentSlide ? currentSlide.getAttribute('id') === name : false;

			if (element && !isSameNameAsCurrentSlide) {
				// Find the position of the named slide and navigate to it
				var indices = Reveal.getIndices(element);
				slide(indices.h, indices.v);
			}
			// If the slide doesn't exist, navigate to the current slide
			else {
					slide(indexh || 0, indexv || 0);
				}
		} else {
			var hashIndexBase = config.hashOneBasedIndex ? 1 : 0;

			// Read the index components of the hash
			var h = parseInt(bits[0], 10) - hashIndexBase || 0,
			    v = parseInt(bits[1], 10) - hashIndexBase || 0,
			    f;

			if (config.fragmentInURL) {
				f = parseInt(bits[2], 10);
				if (isNaN(f)) {
					f = undefined;
				}
			}

			if (h !== indexh || v !== indexv || f !== undefined) {
				slide(h, v, f);
			}
		}
	}

	/**
  * Updates the page URL (hash) to reflect the current
  * state.
  *
  * @param {number} delay The time in ms to wait before
  * writing the hash
  */
	function writeURL(delay) {

		if (config.history) {

			// Make sure there's never more than one timeout running
			clearTimeout(writeURLTimeout);

			// If a delay is specified, timeout this call
			if (typeof delay === 'number') {
				writeURLTimeout = setTimeout(writeURL, delay);
			} else if (currentSlide) {
				window.location.hash = locationHash();
			}
		}
	}
	/**
  * Retrieves the h/v location and fragment of the current,
  * or specified, slide.
  *
  * @param {HTMLElement} [slide] If specified, the returned
  * index will be for this slide rather than the currently
  * active one
  *
  * @return {{h: number, v: number, f: number}}
  */
	function getIndices(slide) {

		// By default, return the current indices
		var h = indexh,
		    v = indexv,
		    f;

		// If a slide is specified, return the indices of that slide
		if (slide) {
			var isVertical = isVerticalSlide(slide);
			var slideh = isVertical ? slide.parentNode : slide;

			// Select all horizontal slides
			var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));

			// Now that we know which the horizontal slide is, get its index
			h = Math.max(horizontalSlides.indexOf(slideh), 0);

			// Assume we're not vertical
			v = undefined;

			// If this is a vertical slide, grab the vertical index
			if (isVertical) {
				v = Math.max(toArray(slide.parentNode.querySelectorAll('section')).indexOf(slide), 0);
			}
		}

		if (!slide && currentSlide) {
			var hasFragments = currentSlide.querySelectorAll('.fragment').length > 0;
			if (hasFragments) {
				var currentFragment = currentSlide.querySelector('.current-fragment');
				if (currentFragment && currentFragment.hasAttribute('data-fragment-index')) {
					f = parseInt(currentFragment.getAttribute('data-fragment-index'), 10);
				} else {
					f = currentSlide.querySelectorAll('.fragment.visible').length - 1;
				}
			}
		}

		return { h: h, v: v, f: f };
	}

	/**
  * Retrieves all slides in this presentation.
  */
	function getSlides() {

		return toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR + ':not(.stack)'));
	}

	/**
  * Retrieves the total number of slides in this presentation.
  *
  * @return {number}
  */
	function getTotalSlides() {

		return getSlides().length;
	}

	/**
  * Returns the slide element matching the specified index.
  *
  * @return {HTMLElement}
  */
	function getSlide(x, y) {

		var horizontalSlide = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)[x];
		var verticalSlides = horizontalSlide && horizontalSlide.querySelectorAll('section');

		if (verticalSlides && verticalSlides.length && typeof y === 'number') {
			return verticalSlides ? verticalSlides[y] : undefined;
		}

		return horizontalSlide;
	}

	/**
  * Returns the background element for the given slide.
  * All slides, even the ones with no background properties
  * defined, have a background element so as long as the
  * index is valid an element will be returned.
  *
  * @param {mixed} x Horizontal background index OR a slide
  * HTML element
  * @param {number} y Vertical background index
  * @return {(HTMLElement[]|*)}
  */
	function getSlideBackground(x, y) {

		var slide = typeof x === 'number' ? getSlide(x, y) : x;
		if (slide) {
			return slide.slideBackgroundElement;
		}

		return undefined;
	}

	/**
  * Retrieves the speaker notes from a slide. Notes can be
  * defined in two ways:
  * 1. As a data-notes attribute on the slide <section>
  * 2. As an <aside class="notes"> inside of the slide
  *
  * @param {HTMLElement} [slide=currentSlide]
  * @return {(string|null)}
  */
	function getSlideNotes(slide) {

		// Default to the current slide
		slide = slide || currentSlide;

		// Notes can be specified via the data-notes attribute...
		if (slide.hasAttribute('data-notes')) {
			return slide.getAttribute('data-notes');
		}

		// ... or using an <aside class="notes"> element
		var notesElement = slide.querySelector('aside.notes');
		if (notesElement) {
			return notesElement.innerHTML;
		}

		return null;
	}

	/**
  * Retrieves the current state of the presentation as
  * an object. This state can then be restored at any
  * time.
  *
  * @return {{indexh: number, indexv: number, indexf: number, paused: boolean, overview: boolean}}
  */
	function getState() {

		var indices = getIndices();

		return {
			indexh: indices.h,
			indexv: indices.v,
			indexf: indices.f,
			paused: isPaused(),
			overview: isOverview()
		};
	}

	/**
  * Restores the presentation to the given state.
  *
  * @param {object} state As generated by getState()
  * @see {@link getState} generates the parameter `state`
  */
	function setState(state) {

		if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) === 'object') {
			slide(deserialize(state.indexh), deserialize(state.indexv), deserialize(state.indexf));

			var pausedFlag = deserialize(state.paused),
			    overviewFlag = deserialize(state.overview);

			if (typeof pausedFlag === 'boolean' && pausedFlag !== isPaused()) {
				togglePause(pausedFlag);
			}

			if (typeof overviewFlag === 'boolean' && overviewFlag !== isOverview()) {
				toggleOverview(overviewFlag);
			}
		}
	}

	/**
  * Return a sorted fragments list, ordered by an increasing
  * "data-fragment-index" attribute.
  *
  * Fragments will be revealed in the order that they are returned by
  * this function, so you can use the index attributes to control the
  * order of fragment appearance.
  *
  * To maintain a sensible default fragment order, fragments are presumed
  * to be passed in document order. This function adds a "fragment-index"
  * attribute to each node if such an attribute is not already present,
  * and sets that attribute to an integer value which is the position of
  * the fragment within the fragments list.
  *
  * @param {object[]|*} fragments
  * @param {boolean} grouped If true the returned array will contain
  * nested arrays for all fragments with the same index
  * @return {object[]} sorted Sorted array of fragments
  */
	function sortFragments(fragments, grouped) {

		fragments = toArray(fragments);

		var ordered = [],
		    unordered = [],
		    sorted = [];

		// Group ordered and unordered elements
		fragments.forEach(function (fragment, i) {
			if (fragment.hasAttribute('data-fragment-index')) {
				var index = parseInt(fragment.getAttribute('data-fragment-index'), 10);

				if (!ordered[index]) {
					ordered[index] = [];
				}

				ordered[index].push(fragment);
			} else {
				unordered.push([fragment]);
			}
		});

		// Append fragments without explicit indices in their
		// DOM order
		ordered = ordered.concat(unordered);

		// Manually count the index up per group to ensure there
		// are no gaps
		var index = 0;

		// Push all fragments in their sorted order to an array,
		// this flattens the groups
		ordered.forEach(function (group) {
			group.forEach(function (fragment) {
				sorted.push(fragment);
				fragment.setAttribute('data-fragment-index', index);
			});

			index++;
		});

		return grouped === true ? ordered : sorted;
	}

	/**
  * Navigate to the specified slide fragment.
  *
  * @param {?number} index The index of the fragment that
  * should be shown, -1 means all are invisible
  * @param {number} offset Integer offset to apply to the
  * fragment index
  *
  * @return {boolean} true if a change was made in any
  * fragments visibility as part of this call
  */
	function navigateFragment(index, offset) {

		if (currentSlide && config.fragments) {

			var fragments = sortFragments(currentSlide.querySelectorAll('.fragment'));
			if (fragments.length) {

				// If no index is specified, find the current
				if (typeof index !== 'number') {
					var lastVisibleFragment = sortFragments(currentSlide.querySelectorAll('.fragment.visible')).pop();

					if (lastVisibleFragment) {
						index = parseInt(lastVisibleFragment.getAttribute('data-fragment-index') || 0, 10);
					} else {
						index = -1;
					}
				}

				// If an offset is specified, apply it to the index
				if (typeof offset === 'number') {
					index += offset;
				}

				var fragmentsShown = [],
				    fragmentsHidden = [];

				toArray(fragments).forEach(function (element, i) {

					if (element.hasAttribute('data-fragment-index')) {
						i = parseInt(element.getAttribute('data-fragment-index'), 10);
					}

					// Visible fragments
					if (i <= index) {
						if (!element.classList.contains('visible')) fragmentsShown.push(element);
						element.classList.add('visible');
						element.classList.remove('current-fragment');

						// Announce the fragments one by one to the Screen Reader
						dom.statusDiv.textContent = getStatusText(element);

						if (i === index) {
							element.classList.add('current-fragment');
							startEmbeddedContent(element);
						}
					}
					// Hidden fragments
					else {
							if (element.classList.contains('visible')) fragmentsHidden.push(element);
							element.classList.remove('visible');
							element.classList.remove('current-fragment');
						}
				});

				if (fragmentsHidden.length) {
					dispatchEvent('fragmenthidden', { fragment: fragmentsHidden[0], fragments: fragmentsHidden });
				}

				if (fragmentsShown.length) {
					dispatchEvent('fragmentshown', { fragment: fragmentsShown[0], fragments: fragmentsShown });
				}

				updateControls();
				updateProgress();
				if (config.fragmentInURL) {
					writeURL();
				}

				return !!(fragmentsShown.length || fragmentsHidden.length);
			}
		}

		return false;
	}

	/**
  * Navigate to the next slide fragment.
  *
  * @return {boolean} true if there was a next fragment,
  * false otherwise
  */
	function nextFragment() {

		return navigateFragment(null, 1);
	}

	/**
  * Navigate to the previous slide fragment.
  *
  * @return {boolean} true if there was a previous fragment,
  * false otherwise
  */
	function previousFragment() {

		return navigateFragment(null, -1);
	}

	/**
  * Cues a new automated slide if enabled in the config.
  */
	function cueAutoSlide() {

		cancelAutoSlide();

		if (currentSlide && config.autoSlide !== false) {

			var fragment = currentSlide.querySelector('.current-fragment');

			// When the slide first appears there is no "current" fragment so
			// we look for a data-autoslide timing on the first fragment
			if (!fragment) fragment = currentSlide.querySelector('.fragment');

			var fragmentAutoSlide = fragment ? fragment.getAttribute('data-autoslide') : null;
			var parentAutoSlide = currentSlide.parentNode ? currentSlide.parentNode.getAttribute('data-autoslide') : null;
			var slideAutoSlide = currentSlide.getAttribute('data-autoslide');

			// Pick value in the following priority order:
			// 1. Current fragment's data-autoslide
			// 2. Current slide's data-autoslide
			// 3. Parent slide's data-autoslide
			// 4. Global autoSlide setting
			if (fragmentAutoSlide) {
				autoSlide = parseInt(fragmentAutoSlide, 10);
			} else if (slideAutoSlide) {
				autoSlide = parseInt(slideAutoSlide, 10);
			} else if (parentAutoSlide) {
				autoSlide = parseInt(parentAutoSlide, 10);
			} else {
				autoSlide = config.autoSlide;
			}

			// If there are media elements with data-autoplay,
			// automatically set the autoSlide duration to the
			// length of that media. Not applicable if the slide
			// is divided up into fragments.
			// playbackRate is accounted for in the duration.
			if (currentSlide.querySelectorAll('.fragment').length === 0) {
				toArray(currentSlide.querySelectorAll('video, audio')).forEach(function (el) {
					if (el.hasAttribute('data-autoplay')) {
						if (autoSlide && el.duration * 1000 / el.playbackRate > autoSlide) {
							autoSlide = el.duration * 1000 / el.playbackRate + 1000;
						}
					}
				});
			}

			// Cue the next auto-slide if:
			// - There is an autoSlide value
			// - Auto-sliding isn't paused by the user
			// - The presentation isn't paused
			// - The overview isn't active
			// - The presentation isn't over
			if (autoSlide && !autoSlidePaused && !isPaused() && !isOverview() && (!Reveal.isLastSlide() || availableFragments().next || config.loop === true)) {
				autoSlideTimeout = setTimeout(function () {
					typeof config.autoSlideMethod === 'function' ? config.autoSlideMethod() : navigateNext();
					cueAutoSlide();
				}, autoSlide);
				autoSlideStartTime = Date.now();
			}

			if (autoSlidePlayer) {
				autoSlidePlayer.setPlaying(autoSlideTimeout !== -1);
			}
		}
	}

	/**
  * Cancels any ongoing request to auto-slide.
  */
	function cancelAutoSlide() {

		clearTimeout(autoSlideTimeout);
		autoSlideTimeout = -1;
	}

	function pauseAutoSlide() {

		if (autoSlide && !autoSlidePaused) {
			autoSlidePaused = true;
			dispatchEvent('autoslidepaused');
			clearTimeout(autoSlideTimeout);

			if (autoSlidePlayer) {
				autoSlidePlayer.setPlaying(false);
			}
		}
	}

	function resumeAutoSlide() {

		if (autoSlide && autoSlidePaused) {
			autoSlidePaused = false;
			dispatchEvent('autoslideresumed');
			cueAutoSlide();
		}
	}

	function navigateLeft() {

		// Reverse for RTL
		if (config.rtl) {
			if ((isOverview() || nextFragment() === false) && availableRoutes().left) {
				slide(indexh + 1);
			}
		}
		// Normal navigation
		else if ((isOverview() || previousFragment() === false) && availableRoutes().left) {
				slide(indexh - 1);
			}
	}

	function navigateRight() {

		hasNavigatedRight = true;

		// Reverse for RTL
		if (config.rtl) {
			if ((isOverview() || previousFragment() === false) && availableRoutes().right) {
				slide(indexh - 1);
			}
		}
		// Normal navigation
		else if ((isOverview() || nextFragment() === false) && availableRoutes().right) {
				slide(indexh + 1);
			}
	}

	function navigateUp() {

		// Prioritize hiding fragments
		if ((isOverview() || previousFragment() === false) && availableRoutes().up) {
			slide(indexh, indexv - 1);
		}
	}

	function navigateDown() {

		hasNavigatedDown = true;

		// Prioritize revealing fragments
		if ((isOverview() || nextFragment() === false) && availableRoutes().down) {
			slide(indexh, indexv + 1);
		}
	}

	/**
  * Navigates backwards, prioritized in the following order:
  * 1) Previous fragment
  * 2) Previous vertical slide
  * 3) Previous horizontal slide
  */
	function navigatePrev() {

		// Prioritize revealing fragments
		if (previousFragment() === false) {
			if (availableRoutes().up) {
				navigateUp();
			} else {
				// Fetch the previous horizontal slide, if there is one
				var previousSlide;

				if (config.rtl) {
					previousSlide = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR + '.future')).pop();
				} else {
					previousSlide = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR + '.past')).pop();
				}

				if (previousSlide) {
					var v = previousSlide.querySelectorAll('section').length - 1 || undefined;
					var h = indexh - 1;
					slide(h, v);
				}
			}
		}
	}

	/**
  * The reverse of #navigatePrev().
  */
	function navigateNext() {

		hasNavigatedRight = true;
		hasNavigatedDown = true;

		// Prioritize revealing fragments
		if (nextFragment() === false) {

			var routes = availableRoutes();

			// When looping is enabled `routes.down` is always available
			// so we need a separate check for when we've reached the
			// end of a stack and should move horizontally
			if (routes.down && routes.right && config.loop && Reveal.isLastVerticalSlide(currentSlide)) {
				routes.down = false;
			}

			if (routes.down) {
				navigateDown();
			} else if (config.rtl) {
				navigateLeft();
			} else {
				navigateRight();
			}
		}
	}

	/**
  * Checks if the target element prevents the triggering of
  * swipe navigation.
  */
	function isSwipePrevented(target) {

		while (target && typeof target.hasAttribute === 'function') {
			if (target.hasAttribute('data-prevent-swipe')) return true;
			target = target.parentNode;
		}

		return false;
	}

	// --------------------------------------------------------------------//
	// ----------------------------- EVENTS -------------------------------//
	// --------------------------------------------------------------------//

	/**
  * Called by all event handlers that are based on user
  * input.
  *
  * @param {object} [event]
  */
	function onUserInput(event) {

		if (config.autoSlideStoppable) {
			pauseAutoSlide();
		}
	}

	/**
  * Handler for the document level 'keypress' event.
  *
  * @param {object} event
  */
	function onDocumentKeyPress(event) {

		// Check if the pressed key is question mark
		if (event.shiftKey && event.charCode === 63) {
			toggleHelp();
		}
	}

	/**
  * Handler for the document level 'keydown' event.
  *
  * @param {object} event
  */
	function onDocumentKeyDown(event) {

		// If there's a condition specified and it returns false,
		// ignore this event
		if (typeof config.keyboardCondition === 'function' && config.keyboardCondition(event) === false) {
			return true;
		}

		// Remember if auto-sliding was paused so we can toggle it
		var autoSlideWasPaused = autoSlidePaused;

		onUserInput(event);

		// Check if there's a focused element that could be using
		// the keyboard
		var activeElementIsCE = document.activeElement && document.activeElement.contentEditable !== 'inherit';
		var activeElementIsInput = document.activeElement && document.activeElement.tagName && /input|textarea/i.test(document.activeElement.tagName);
		var activeElementIsNotes = document.activeElement && document.activeElement.className && /speaker-notes/i.test(document.activeElement.className);

		// Disregard the event if there's a focused element or a
		// keyboard modifier key is present
		if (activeElementIsCE || activeElementIsInput || activeElementIsNotes || event.shiftKey && event.keyCode !== 32 || event.altKey || event.ctrlKey || event.metaKey) return;

		// While paused only allow resume keyboard events; 'b', 'v', '.'
		var resumeKeyCodes = [66, 86, 190, 191];
		var key;

		// Custom key bindings for togglePause should be able to resume
		if (_typeof(config.keyboard) === 'object') {
			for (key in config.keyboard) {
				if (config.keyboard[key] === 'togglePause') {
					resumeKeyCodes.push(parseInt(key, 10));
				}
			}
		}

		if (isPaused() && resumeKeyCodes.indexOf(event.keyCode) === -1) {
			return false;
		}

		var triggered = false;

		// 1. User defined key bindings
		if (_typeof(config.keyboard) === 'object') {

			for (key in config.keyboard) {

				// Check if this binding matches the pressed key
				if (parseInt(key, 10) === event.keyCode) {

					var value = config.keyboard[key];

					// Callback function
					if (typeof value === 'function') {
						value.apply(null, [event]);
					}
					// String shortcuts to reveal.js API
					else if (typeof value === 'string' && typeof Reveal[value] === 'function') {
							Reveal[value].call();
						}

					triggered = true;
				}
			}
		}

		// 2. Registered custom key bindings
		if (triggered === false) {

			for (key in registeredKeyBindings) {

				// Check if this binding matches the pressed key
				if (parseInt(key, 10) === event.keyCode) {

					var action = registeredKeyBindings[key].callback;

					// Callback function
					if (typeof action === 'function') {
						action.apply(null, [event]);
					}
					// String shortcuts to reveal.js API
					else if (typeof action === 'string' && typeof Reveal[action] === 'function') {
							Reveal[action].call();
						}

					triggered = true;
				}
			}
		}

		// 3. System defined key bindings
		if (triggered === false) {

			// Assume true and try to prove false
			triggered = true;

			switch (event.keyCode) {
				// p, page up
				case 80:case 33:
					navigatePrev();break;
				// n, page down
				case 78:case 34:
					navigateNext();break;
				// h, left
				case 72:case 37:
					navigateLeft();break;
				// l, right
				case 76:case 39:
					navigateRight();break;
				// k, up
				case 75:case 38:
					navigateUp();break;
				// j, down
				case 74:case 40:
					navigateDown();break;
				// home
				case 36:
					slide(0);break;
				// end
				case 35:
					slide(Number.MAX_VALUE);break;
				// space
				case 32:
					isOverview() ? deactivateOverview() : event.shiftKey ? navigatePrev() : navigateNext();break;
				// return
				case 13:
					isOverview() ? deactivateOverview() : triggered = false;break;
				// two-spot, semicolon, b, v, period, Logitech presenter tools "black screen" button
				case 58:case 59:case 66:case 86:case 190:case 191:
					togglePause();break;
				// f
				case 70:
					enterFullscreen();break;
				// a
				case 65:
					if (config.autoSlideStoppable) toggleAutoSlide(autoSlideWasPaused);break;
				default:
					triggered = false;
			}
		}

		// If the input resulted in a triggered action we should prevent
		// the browsers default behavior
		if (triggered) {
			event.preventDefault && event.preventDefault();
		}
		// ESC or O key
		else if ((event.keyCode === 27 || event.keyCode === 79) && features.transforms3d) {
				if (dom.overlay) {
					closeOverlay();
				} else {
					toggleOverview();
				}

				event.preventDefault && event.preventDefault();
			}

		// If auto-sliding is enabled we need to cue up
		// another timeout
		cueAutoSlide();
	}

	/**
  * Handler for the 'touchstart' event, enables support for
  * swipe and pinch gestures.
  *
  * @param {object} event
  */
	function onTouchStart(event) {

		if (isSwipePrevented(event.target)) return true;

		touch.startX = event.touches[0].clientX;
		touch.startY = event.touches[0].clientY;
		touch.startCount = event.touches.length;

		// If there's two touches we need to memorize the distance
		// between those two points to detect pinching
		if (event.touches.length === 2 && config.overview) {
			touch.startSpan = distanceBetween({
				x: event.touches[1].clientX,
				y: event.touches[1].clientY
			}, {
				x: touch.startX,
				y: touch.startY
			});
		}
	}

	/**
  * Handler for the 'touchmove' event.
  *
  * @param {object} event
  */
	function onTouchMove(event) {

		if (isSwipePrevented(event.target)) return true;

		// Each touch should only trigger one action
		if (!touch.captured) {
			onUserInput(event);

			var currentX = event.touches[0].clientX;
			var currentY = event.touches[0].clientY;

			// If the touch started with two points and still has
			// two active touches; test for the pinch gesture
			if (event.touches.length === 2 && touch.startCount === 2 && config.overview) {

				// The current distance in pixels between the two touch points
				var currentSpan = distanceBetween({
					x: event.touches[1].clientX,
					y: event.touches[1].clientY
				}, {
					x: touch.startX,
					y: touch.startY
				});

				// If the span is larger than the desire amount we've got
				// ourselves a pinch
				if (Math.abs(touch.startSpan - currentSpan) > touch.threshold) {
					touch.captured = true;

					if (currentSpan < touch.startSpan) {
						activateOverview();
					} else {
						deactivateOverview();
					}
				}

				event.preventDefault();
			}
			// There was only one touch point, look for a swipe
			else if (event.touches.length === 1 && touch.startCount !== 2) {

					var deltaX = currentX - touch.startX,
					    deltaY = currentY - touch.startY;

					if (deltaX > touch.threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
						touch.captured = true;
						navigateLeft();
					} else if (deltaX < -touch.threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
						touch.captured = true;
						navigateRight();
					} else if (deltaY > touch.threshold) {
						touch.captured = true;
						navigateUp();
					} else if (deltaY < -touch.threshold) {
						touch.captured = true;
						navigateDown();
					}

					// If we're embedded, only block touch events if they have
					// triggered an action
					if (config.embedded) {
						if (touch.captured || isVerticalSlide(currentSlide)) {
							event.preventDefault();
						}
					}
					// Not embedded? Block them all to avoid needless tossing
					// around of the viewport in iOS
					else {
							event.preventDefault();
						}
				}
		}
		// There's a bug with swiping on some Android devices unless
		// the default action is always prevented
		else if (UA.match(/android/gi)) {
				event.preventDefault();
			}
	}

	/**
  * Handler for the 'touchend' event.
  *
  * @param {object} event
  */
	function onTouchEnd(event) {

		touch.captured = false;
	}

	/**
  * Convert pointer down to touch start.
  *
  * @param {object} event
  */
	function onPointerDown(event) {

		if (event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch") {
			event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
			onTouchStart(event);
		}
	}

	/**
  * Convert pointer move to touch move.
  *
  * @param {object} event
  */
	function onPointerMove(event) {

		if (event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch") {
			event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
			onTouchMove(event);
		}
	}

	/**
  * Convert pointer up to touch end.
  *
  * @param {object} event
  */
	function onPointerUp(event) {

		if (event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch") {
			event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
			onTouchEnd(event);
		}
	}

	/**
  * Handles mouse wheel scrolling, throttled to avoid skipping
  * multiple slides.
  *
  * @param {object} event
  */
	function onDocumentMouseScroll(event) {

		if (Date.now() - lastMouseWheelStep > 600) {

			lastMouseWheelStep = Date.now();

			var delta = event.detail || -event.wheelDelta;
			if (delta > 0) {
				navigateNext();
			} else if (delta < 0) {
				navigatePrev();
			}
		}
	}

	/**
  * Clicking on the progress bar results in a navigation to the
  * closest approximate horizontal slide using this equation:
  *
  * ( clickX / presentationWidth ) * numberOfSlides
  *
  * @param {object} event
  */
	function onProgressClicked(event) {

		onUserInput(event);

		event.preventDefault();

		var slidesTotal = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).length;
		var slideIndex = Math.floor(event.clientX / dom.wrapper.offsetWidth * slidesTotal);

		if (config.rtl) {
			slideIndex = slidesTotal - slideIndex;
		}

		slide(slideIndex);
	}

	/**
  * Event handler for navigation control buttons.
  */
	function onNavigateLeftClicked(event) {
		event.preventDefault();onUserInput();navigateLeft();
	}
	function onNavigateRightClicked(event) {
		event.preventDefault();onUserInput();navigateRight();
	}
	function onNavigateUpClicked(event) {
		event.preventDefault();onUserInput();navigateUp();
	}
	function onNavigateDownClicked(event) {
		event.preventDefault();onUserInput();navigateDown();
	}
	function onNavigatePrevClicked(event) {
		event.preventDefault();onUserInput();navigatePrev();
	}
	function onNavigateNextClicked(event) {
		event.preventDefault();onUserInput();navigateNext();
	}

	/**
  * Handler for the window level 'hashchange' event.
  *
  * @param {object} [event]
  */
	function onWindowHashChange(event) {

		readURL();
	}

	/**
  * Handler for the window level 'resize' event.
  *
  * @param {object} [event]
  */
	function onWindowResize(event) {

		layout();
	}

	/**
  * Handle for the window level 'visibilitychange' event.
  *
  * @param {object} [event]
  */
	function onPageVisibilityChange(event) {

		var isHidden = document.webkitHidden || document.msHidden || document.hidden;

		// If, after clicking a link or similar and we're coming back,
		// focus the document.body to ensure we can use keyboard shortcuts
		if (isHidden === false && document.activeElement !== document.body) {
			// Not all elements support .blur() - SVGs among them.
			if (typeof document.activeElement.blur === 'function') {
				document.activeElement.blur();
			}
			document.body.focus();
		}
	}

	/**
  * Invoked when a slide is and we're in the overview.
  *
  * @param {object} event
  */
	function onOverviewSlideClicked(event) {

		// TODO There's a bug here where the event listeners are not
		// removed after deactivating the overview.
		if (eventsAreBound && isOverview()) {
			event.preventDefault();

			var element = event.target;

			while (element && !element.nodeName.match(/section/gi)) {
				element = element.parentNode;
			}

			if (element && !element.classList.contains('disabled')) {

				deactivateOverview();

				if (element.nodeName.match(/section/gi)) {
					var h = parseInt(element.getAttribute('data-index-h'), 10),
					    v = parseInt(element.getAttribute('data-index-v'), 10);

					slide(h, v);
				}
			}
		}
	}

	/**
  * Handles clicks on links that are set to preview in the
  * iframe overlay.
  *
  * @param {object} event
  */
	function onPreviewLinkClicked(event) {

		if (event.currentTarget && event.currentTarget.hasAttribute('href')) {
			var url = event.currentTarget.getAttribute('href');
			if (url) {
				showPreview(url);
				event.preventDefault();
			}
		}
	}

	/**
  * Handles click on the auto-sliding controls element.
  *
  * @param {object} [event]
  */
	function onAutoSlidePlayerClick(event) {

		// Replay
		if (Reveal.isLastSlide() && config.loop === false) {
			slide(0, 0);
			resumeAutoSlide();
		}
		// Resume
		else if (autoSlidePaused) {
				resumeAutoSlide();
			}
			// Pause
			else {
					pauseAutoSlide();
				}
	}

	// --------------------------------------------------------------------//
	// ------------------------ PLAYBACK COMPONENT ------------------------//
	// --------------------------------------------------------------------//


	/**
  * Constructor for the playback component, which displays
  * play/pause/progress controls.
  *
  * @param {HTMLElement} container The component will append
  * itself to this
  * @param {function} progressCheck A method which will be
  * called frequently to get the current progress on a range
  * of 0-1
  */
	function Playback(container, progressCheck) {

		// Cosmetics
		this.diameter = 100;
		this.diameter2 = this.diameter / 2;
		this.thickness = 6;

		// Flags if we are currently playing
		this.playing = false;

		// Current progress on a 0-1 range
		this.progress = 0;

		// Used to loop the animation smoothly
		this.progressOffset = 1;

		this.container = container;
		this.progressCheck = progressCheck;

		this.canvas = document.createElement('canvas');
		this.canvas.className = 'playback';
		this.canvas.width = this.diameter;
		this.canvas.height = this.diameter;
		this.canvas.style.width = this.diameter2 + 'px';
		this.canvas.style.height = this.diameter2 + 'px';
		this.context = this.canvas.getContext('2d');

		this.container.appendChild(this.canvas);

		this.render();
	}

	/**
  * @param value
  */
	Playback.prototype.setPlaying = function (value) {

		var wasPlaying = this.playing;

		this.playing = value;

		// Start repainting if we weren't already
		if (!wasPlaying && this.playing) {
			this.animate();
		} else {
			this.render();
		}
	};

	Playback.prototype.animate = function () {

		var progressBefore = this.progress;

		this.progress = this.progressCheck();

		// When we loop, offset the progress so that it eases
		// smoothly rather than immediately resetting
		if (progressBefore > 0.8 && this.progress < 0.2) {
			this.progressOffset = this.progress;
		}

		this.render();

		if (this.playing) {
			features.requestAnimationFrameMethod.call(window, this.animate.bind(this));
		}
	};

	/**
  * Renders the current progress and playback state.
  */
	Playback.prototype.render = function () {

		var progress = this.playing ? this.progress : 0,
		    radius = this.diameter2 - this.thickness,
		    x = this.diameter2,
		    y = this.diameter2,
		    iconSize = 28;

		// Ease towards 1
		this.progressOffset += (1 - this.progressOffset) * 0.1;

		var endAngle = -Math.PI / 2 + progress * (Math.PI * 2);
		var startAngle = -Math.PI / 2 + this.progressOffset * (Math.PI * 2);

		this.context.save();
		this.context.clearRect(0, 0, this.diameter, this.diameter);

		// Solid background color
		this.context.beginPath();
		this.context.arc(x, y, radius + 4, 0, Math.PI * 2, false);
		this.context.fillStyle = 'rgba( 0, 0, 0, 0.4 )';
		this.context.fill();

		// Draw progress track
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, Math.PI * 2, false);
		this.context.lineWidth = this.thickness;
		this.context.strokeStyle = 'rgba( 255, 255, 255, 0.2 )';
		this.context.stroke();

		if (this.playing) {
			// Draw progress on top of track
			this.context.beginPath();
			this.context.arc(x, y, radius, startAngle, endAngle, false);
			this.context.lineWidth = this.thickness;
			this.context.strokeStyle = '#fff';
			this.context.stroke();
		}

		this.context.translate(x - iconSize / 2, y - iconSize / 2);

		// Draw play/pause icons
		if (this.playing) {
			this.context.fillStyle = '#fff';
			this.context.fillRect(0, 0, iconSize / 2 - 4, iconSize);
			this.context.fillRect(iconSize / 2 + 4, 0, iconSize / 2 - 4, iconSize);
		} else {
			this.context.beginPath();
			this.context.translate(4, 0);
			this.context.moveTo(0, 0);
			this.context.lineTo(iconSize - 4, iconSize / 2);
			this.context.lineTo(0, iconSize);
			this.context.fillStyle = '#fff';
			this.context.fill();
		}

		this.context.restore();
	};

	Playback.prototype.on = function (type, listener) {
		this.canvas.addEventListener(type, listener, false);
	};

	Playback.prototype.off = function (type, listener) {
		this.canvas.removeEventListener(type, listener, false);
	};

	Playback.prototype.destroy = function () {

		this.playing = false;

		if (this.canvas.parentNode) {
			this.container.removeChild(this.canvas);
		}
	};

	// --------------------------------------------------------------------//
	// ------------------------------- API --------------------------------//
	// --------------------------------------------------------------------//


	Reveal = {
		VERSION: VERSION,

		initialize: initialize,
		configure: configure,

		sync: sync,
		syncSlide: syncSlide,
		syncFragments: syncFragments,

		// Navigation methods
		slide: slide,
		left: navigateLeft,
		right: navigateRight,
		up: navigateUp,
		down: navigateDown,
		prev: navigatePrev,
		next: navigateNext,

		// Fragment methods
		navigateFragment: navigateFragment,
		prevFragment: previousFragment,
		nextFragment: nextFragment,

		// Deprecated aliases
		navigateTo: slide,
		navigateLeft: navigateLeft,
		navigateRight: navigateRight,
		navigateUp: navigateUp,
		navigateDown: navigateDown,
		navigatePrev: navigatePrev,
		navigateNext: navigateNext,

		// Forces an update in slide layout
		layout: layout,

		// Randomizes the order of slides
		shuffle: shuffle,

		// Returns an object with the available routes as booleans (left/right/top/bottom)
		availableRoutes: availableRoutes,

		// Returns an object with the available fragments as booleans (prev/next)
		availableFragments: availableFragments,

		// Toggles a help overlay with keyboard shortcuts
		toggleHelp: toggleHelp,

		// Toggles the overview mode on/off
		toggleOverview: toggleOverview,

		// Toggles the "black screen" mode on/off
		togglePause: togglePause,

		// Toggles the auto slide mode on/off
		toggleAutoSlide: toggleAutoSlide,

		// State checks
		isOverview: isOverview,
		isPaused: isPaused,
		isAutoSliding: isAutoSliding,
		isSpeakerNotes: isSpeakerNotes,

		// Slide preloading
		loadSlide: loadSlide,
		unloadSlide: unloadSlide,

		// Adds or removes all internal event listeners (such as keyboard)
		addEventListeners: addEventListeners,
		removeEventListeners: removeEventListeners,

		// Facility for persisting and restoring the presentation state
		getState: getState,
		setState: setState,

		// Presentation progress
		getSlidePastCount: getSlidePastCount,

		// Presentation progress on range of 0-1
		getProgress: getProgress,

		// Returns the indices of the current, or specified, slide
		getIndices: getIndices,

		// Returns an Array of all slides
		getSlides: getSlides,

		// Returns the total number of slides
		getTotalSlides: getTotalSlides,

		// Returns the slide element at the specified index
		getSlide: getSlide,

		// Returns the slide background element at the specified index
		getSlideBackground: getSlideBackground,

		// Returns the speaker notes string for a slide, or null
		getSlideNotes: getSlideNotes,

		// Returns the previous slide element, may be null
		getPreviousSlide: function () {
			return previousSlide;
		},

		// Returns the current slide element
		getCurrentSlide: function () {
			return currentSlide;
		},

		// Returns the current scale of the presentation content
		getScale: function () {
			return scale;
		},

		// Returns the current configuration object
		getConfig: function () {
			return config;
		},

		// Helper method, retrieves query string as a key/value hash
		getQueryHash: function () {
			var query = {};

			location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi, function (a) {
				query[a.split('=').shift()] = a.split('=').pop();
			});

			// Basic deserialization
			for (var i in query) {
				var value = query[i];

				query[i] = deserialize(unescape(value));
			}

			return query;
		},

		// Returns true if we're currently on the first slide
		isFirstSlide: function () {
			return indexh === 0 && indexv === 0;
		},

		// Returns true if we're currently on the last slide
		isLastSlide: function () {
			if (currentSlide) {
				// Does this slide have a next sibling?
				if (currentSlide.nextElementSibling) return false;

				// If it's vertical, does its parent have a next sibling?
				if (isVerticalSlide(currentSlide) && currentSlide.parentNode.nextElementSibling) return false;

				return true;
			}

			return false;
		},

		// Returns true if we're on the last slide in the current
		// vertical stack
		isLastVerticalSlide: function () {
			if (currentSlide && isVerticalSlide(currentSlide)) {
				// Does this slide have a next sibling?
				if (currentSlide.nextElementSibling) return false;

				return true;
			}

			return false;
		},

		// Checks if reveal.js has been loaded and is ready for use
		isReady: function () {
			return loaded;
		},

		// Forward event binding to the reveal DOM element
		addEventListener: function (type, listener, useCapture) {
			if ('addEventListener' in window) {
				(dom.wrapper || document.querySelector('.reveal')).addEventListener(type, listener, useCapture);
			}
		},
		removeEventListener: function (type, listener, useCapture) {
			if ('addEventListener' in window) {
				(dom.wrapper || document.querySelector('.reveal')).removeEventListener(type, listener, useCapture);
			}
		},

		// Adds a custom key binding
		addKeyBinding: addKeyBinding,

		// Removes a custom key binding
		removeKeyBinding: removeKeyBinding,

		// Programatically triggers a keyboard event
		triggerKey: function (keyCode) {
			onDocumentKeyDown({ keyCode: keyCode });
		},

		// Registers a new shortcut to include in the help overlay
		registerKeyboardShortcut: function (key, value) {
			keyboardShortcuts[key] = value;
		}
	};

	return Reveal;
});
},{}],"plugins/Chapter.js":[function(require,module,exports) {
// MIT © 2018 azu
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chapterion = exports.Chapterion = function () {
    function Chapterion() {
        _classCallCheck(this, Chapterion);

        this.onUpdate = function (slideSection) {
            var chapter = slideSection.dataset.chapter;
            document.querySelector(".slide-header").textContent = chapter || "";
        };
    }

    _createClass(Chapterion, [{
        key: "start",
        value: function start() {
            var _this = this;

            document.addEventListener("slidechanged", function () {
                _this.onUpdate(event.currentSlide);
            }, false);
        }
    }]);

    return Chapterion;
}();
},{}],"../node_modules/object-keys/isArguments.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};
},{}],"../node_modules/object-keys/index.js":[function(require,module,exports) {
'use strict';

// modified from https://github.com/es-shims/es5-shim

var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$applicationCache: true,
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = function () {
	/* global window */
	if (typeof window === 'undefined') {
		return false;
	}
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}();
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2);
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				// eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;
},{"./isArguments":"../node_modules/object-keys/isArguments.js"}],"../node_modules/define-properties/index.js":[function(require,module,exports) {
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) {
			// jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) {
		/* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;
},{"object-keys":"../node_modules/object-keys/index.js"}],"../node_modules/function-bind/implementation.js":[function(require,module,exports) {
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],"../node_modules/function-bind/index.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":"../node_modules/function-bind/implementation.js"}],"../node_modules/has/src/index.js":[function(require,module,exports) {
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
},{"function-bind":"../node_modules/function-bind/index.js"}],"../node_modules/es-to-primitive/helpers/isPrimitive.js":[function(require,module,exports) {
module.exports = function isPrimitive(value) {
	return value === null || typeof value !== 'function' && typeof value !== 'object';
};
},{}],"../node_modules/is-callable/index.js":[function(require,module,exports) {
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) {
			return false;
		}
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) {
		return false;
	}
	if (typeof value !== 'function' && typeof value !== 'object') {
		return false;
	}
	if (typeof value === 'function' && !value.prototype) {
		return true;
	}
	if (hasToStringTag) {
		return tryFunctionObject(value);
	}
	if (isES6ClassFn(value)) {
		return false;
	}
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};
},{}],"../node_modules/is-date-object/index.js":[function(require,module,exports) {
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};
},{}],"../node_modules/is-symbol/index.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}
},{}],"../node_modules/es-to-primitive/es6.js":[function(require,module,exports) {
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = require('./helpers/isPrimitive');
var isCallable = require('is-callable');
var isDate = require('is-date-object');
var isSymbol = require('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || hint !== 'number' && hint !== 'string') {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};
},{"./helpers/isPrimitive":"../node_modules/es-to-primitive/helpers/isPrimitive.js","is-callable":"../node_modules/is-callable/index.js","is-date-object":"../node_modules/is-date-object/index.js","is-symbol":"../node_modules/is-symbol/index.js"}],"../node_modules/es-abstract/GetIntrinsic.js":[function(require,module,exports) {
'use strict';

/* globals
	Set,
	Map,
	WeakSet,
	WeakMap,

	Promise,

	Symbol,
	Proxy,

	Atomics,
	SharedArrayBuffer,

	ArrayBuffer,
	DataView,
	Uint8Array,
	Float32Array,
	Float64Array,
	Int8Array,
	Int16Array,
	Int32Array,
	Uint8ClampedArray,
	Uint16Array,
	Uint32Array,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var ThrowTypeError = Object.getOwnPropertyDescriptor ? function () {
	return Object.getOwnPropertyDescriptor(arguments, 'callee').get;
}() : function () {
	throw new TypeError();
};

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var getProto = Object.getPrototypeOf || function (x) {
	return x.__proto__;
}; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': TypeError,
	'$ %TypeErrorPrototype%': TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}
	return INTRINSICS[key];
};
},{}],"../node_modules/es-abstract/helpers/isNaN.js":[function(require,module,exports) {
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};
},{}],"../node_modules/es-abstract/helpers/isFinite.js":[function(require,module,exports) {
var $isNaN = Number.isNaN || function (a) {
  return a !== a;
};

module.exports = Number.isFinite || function (x) {
  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
};
},{}],"../node_modules/es-abstract/helpers/assign.js":[function(require,module,exports) {
var bind = require('function-bind');
var has = bind.call(Function.call, Object.prototype.hasOwnProperty);

var $assign = Object.assign;

module.exports = function assign(target, source) {
	if ($assign) {
		return $assign(target, source);
	}

	for (var key in source) {
		if (has(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};
},{"function-bind":"../node_modules/function-bind/index.js"}],"../node_modules/es-abstract/helpers/sign.js":[function(require,module,exports) {
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};
},{}],"../node_modules/es-abstract/helpers/mod.js":[function(require,module,exports) {
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};
},{}],"../node_modules/es-abstract/helpers/isPrimitive.js":[function(require,module,exports) {
module.exports = function isPrimitive(value) {
	return value === null || typeof value !== 'function' && typeof value !== 'object';
};
},{}],"../node_modules/es-to-primitive/es5.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};
},{"./helpers/isPrimitive":"../node_modules/es-to-primitive/helpers/isPrimitive.js","is-callable":"../node_modules/is-callable/index.js"}],"../node_modules/es-abstract/es5.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('./GetIntrinsic');

var $Object = GetIntrinsic('%Object%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) {
			return 0;
		}
		if (number === 0 || !$isFinite(number)) {
			return number;
		}
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) {
			return 0;
		}
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) {
			// 0 === -0, but they are not identical.
			if (x === 0) {
				return 1 / x === 1 / y;
			}
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) {
			// eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;
},{"./GetIntrinsic":"../node_modules/es-abstract/GetIntrinsic.js","./helpers/isNaN":"../node_modules/es-abstract/helpers/isNaN.js","./helpers/isFinite":"../node_modules/es-abstract/helpers/isFinite.js","./helpers/sign":"../node_modules/es-abstract/helpers/sign.js","./helpers/mod":"../node_modules/es-abstract/helpers/mod.js","is-callable":"../node_modules/is-callable/index.js","es-to-primitive/es5":"../node_modules/es-to-primitive/es5.js","has":"../node_modules/has/src/index.js"}],"../node_modules/is-regex/index.js":[function(require,module,exports) {
'use strict';

var has = require('has');
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};
},{"has":"../node_modules/has/src/index.js"}],"../node_modules/es-abstract/es2015.js":[function(require,module,exports) {
'use strict';

var has = require('has');
var toPrimitive = require('es-to-primitive/es6');

var GetIntrinsic = require('./GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $Array = GetIntrinsic('%Array%');
var $String = GetIntrinsic('%String%');
var $Object = GetIntrinsic('%Object%');
var $Number = GetIntrinsic('%Number%');
var $Symbol = GetIntrinsic('%Symbol%', true);
var $RegExp = GetIntrinsic('%RegExp%');

var hasSymbols = !!$Symbol;

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');
var MAX_SAFE_INTEGER = $Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = require('./helpers/assign');
var sign = require('./helpers/sign');
var mod = require('./helpers/mod');
var isPrimitive = require('./helpers/isPrimitive');
var parseInteger = parseInt;
var bind = require('function-bind');
var arraySlice = bind.call(Function.call, $Array.prototype.slice);
var strSlice = bind.call(Function.call, $String.prototype.slice);
var isBinary = bind.call(Function.call, $RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, $RegExp.prototype.test, /^0o[0-7]+$/i);
var regexExec = bind.call(Function.call, $RegExp.prototype.exec);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, $RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, $RegExp.prototype.test, invalidHexLiteral);
var $charCodeAt = bind.call(Function.call, $String.prototype.charCodeAt);

var toStr = bind.call(Function.call, Object.prototype.toString);

var $floor = Math.floor;
var $abs = Math.abs;

var $ObjectCreate = Object.create;
var $gOPD = $Object.getOwnPropertyDescriptor;

var $isExtensible = $Object.isExtensible;

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = ['\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003', '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028', '\u2029\uFEFF'].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, $String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = require('./es5');

var hasRegExpMatcher = require('is-regex');

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new $TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// https://ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, $Number);
		if (typeof value === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return $Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) {
			return 0;
		}
		var posInt = sign(number) * $floor($abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) {
			return 0;
		}
		if (number >= 0xFF) {
			return 0xFF;
		}
		var f = $floor(argument);
		if (f + 0.5 < number) {
			return f + 1;
		}
		if (number < f + 0.5) {
			return f;
		}
		if (f % 2 !== 0) {
			return f + 1;
		}
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a string');
		}
		return $String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return $Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, $String);
		return typeof key === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) {
			return 0;
		} // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) {
			return MAX_SAFE_INTEGER;
		}
		return len;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr(argument) !== '[object String]') {
			throw new $TypeError('must be a string');
		}
		if (argument === '-0') {
			return -0;
		}
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) {
			return n;
		}
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: $Array.isArray || function IsArray(argument) {
		return toStr(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: Object.preventExtensions ? function IsExtensible(obj) {
		if (isPrimitive(obj)) {
			return false;
		}
		return $isExtensible(obj);
	} : function isExtensible(obj) {
		return true;
	}, // eslint-disable-line no-unused-vars

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = $abs(argument);
		return $floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[$Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return x === y || $isNaN(x) && $isNaN(y);
	},

	/**
  * 7.3.2 GetV (V, P)
  * 1. Assert: IsPropertyKey(P) is true.
  * 2. Let O be ToObject(V).
  * 3. ReturnIfAbrupt(O).
  * 4. Return O.[[Get]](P, V).
  */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
  * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
  * 1. Assert: IsPropertyKey(P) is true.
  * 2. Let func be GetV(O, P).
  * 3. ReturnIfAbrupt(func).
  * 4. If func is either undefined or null, return undefined.
  * 5. If IsCallable(func) is false, throw a TypeError exception.
  * 6. Return func.
  */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new $TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
  * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
  * 1. Assert: Type(O) is Object.
  * 2. Assert: IsPropertyKey(P) is true.
  * 3. Return O.[[Get]](P, O).
  */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new $TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && $Symbol.species ? C[$Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new $TypeError('no constructor found');
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		if (!this.IsPropertyDescriptor(Desc)) {
			throw new $TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new $TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && typeof $Symbol.isConcatSpreadable === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-getiterator
	GetIterator: function GetIterator(obj, method) {
		if (!hasSymbols) {
			throw new SyntaxError('ES.GetIterator depends on native iterator support.');
		}

		var actualMethod = method;
		if (arguments.length < 2) {
			actualMethod = this.GetMethod(obj, $Symbol.iterator);
		}
		var iterator = this.Call(actualMethod, obj);
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('iterator must return an object');
		}

		return iterator;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext
	IteratorNext: function IteratorNext(iterator, value) {
		var result = this.Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
		if (this.Type(result) !== 'Object') {
			throw new $TypeError('iterator next must return an object');
		}
		return result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete
	IteratorComplete: function IteratorComplete(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.ToBoolean(this.Get(iterResult, 'done'));
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue
	IteratorValue: function IteratorValue(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.Get(iterResult, 'value');
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep
	IteratorStep: function IteratorStep(iterator) {
		var result = this.IteratorNext(iterator);
		var done = this.IteratorComplete(result);
		return done === true ? false : result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose
	IteratorClose: function IteratorClose(iterator, completion) {
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterator) is not Object');
		}
		if (!this.IsCallable(completion)) {
			throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
		}
		var completionThunk = completion;

		var iteratorReturn = this.GetMethod(iterator, 'return');

		if (typeof iteratorReturn === 'undefined') {
			return completionThunk();
		}

		var completionRecord;
		try {
			var innerResult = this.Call(iteratorReturn, iterator, []);
		} catch (e) {
			// if we hit here, then "e" is the innerResult completion that needs re-throwing

			// if the completion is of type "throw", this will throw.
			completionRecord = completionThunk();
			completionThunk = null; // ensure it's not called twice.

			// if not, then return the innerResult completion
			throw e;
		}
		completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
		completionThunk = null; // ensure it's not called twice.

		if (this.Type(innerResult) !== 'Object') {
			throw new $TypeError('iterator .return must return an object');
		}

		return completionRecord;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new $TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new $TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new $TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && $Symbol.species) {
				C = this.Get(C, $Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return $Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new $TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = $gOPD(O, P);
		var extensible = oldDesc || typeof $isExtensible !== 'function' || $isExtensible(O);
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		var newDesc = {
			configurable: true,
			enumerable: true,
			value: V,
			writable: true
		};
		Object.defineProperty(O, P, newDesc);
		return true;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new $TypeError('unable to create data property');
		}
		return success;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-objectcreate
	ObjectCreate: function ObjectCreate(proto, internalSlotsList) {
		if (proto !== null && this.Type(proto) !== 'Object') {
			throw new $TypeError('Assertion failed: proto must be null or an object');
		}
		var slots = arguments.length < 2 ? [] : internalSlotsList;
		if (slots.length > 0) {
			throw new $SyntaxError('es-abstract does not yet support internal slots');
		}

		if (proto === null && !$ObjectCreate) {
			throw new $SyntaxError('native Object.create support is required to create null objects');
		}

		return $ObjectCreate(proto);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		if (!this.IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0 and <= 2**53');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new $TypeError('Assertion failed: unicode must be a Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if (index + 1 >= length) {
			return index + 1;
		}

		var first = $charCodeAt(S, index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}

		var second = $charCodeAt(S, index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}

		return index + 2;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;
},{"has":"../node_modules/has/src/index.js","es-to-primitive/es6":"../node_modules/es-to-primitive/es6.js","./GetIntrinsic":"../node_modules/es-abstract/GetIntrinsic.js","./helpers/isNaN":"../node_modules/es-abstract/helpers/isNaN.js","./helpers/isFinite":"../node_modules/es-abstract/helpers/isFinite.js","./helpers/assign":"../node_modules/es-abstract/helpers/assign.js","./helpers/sign":"../node_modules/es-abstract/helpers/sign.js","./helpers/mod":"../node_modules/es-abstract/helpers/mod.js","./helpers/isPrimitive":"../node_modules/es-abstract/helpers/isPrimitive.js","function-bind":"../node_modules/function-bind/index.js","./es5":"../node_modules/es-abstract/es5.js","is-regex":"../node_modules/is-regex/index.js"}],"../node_modules/es-abstract/es6.js":[function(require,module,exports) {
'use strict';

module.exports = require('./es2015');
},{"./es2015":"../node_modules/es-abstract/es2015.js"}],"../node_modules/array.prototype.find/implementation.js":[function(require,module,exports) {
'use strict';

var ES = require('es-abstract/es6');

module.exports = function find(predicate) {
	var list = ES.ToObject(this);
	var length = ES.ToInteger(ES.ToLength(list.length));
	if (!ES.IsCallable(predicate)) {
		throw new TypeError('Array#find: predicate must be a function');
	}
	if (length === 0) {
		return undefined;
	}
	var thisArg = arguments[1];
	for (var i = 0, value; i < length; i++) {
		value = list[i];
		if (ES.Call(predicate, thisArg, [value, i, list])) {
			return value;
		}
	}
	return undefined;
};

},{"es-abstract/es6":"../node_modules/es-abstract/es6.js"}],"../node_modules/array.prototype.find/polyfill.js":[function(require,module,exports) {
'use strict';

module.exports = function getPolyfill() {
	// Detect if an implementation exists
	// Detect early implementations which skipped holes in sparse arrays
  // eslint-disable-next-line no-sparse-arrays
	var implemented = Array.prototype.find && [, 1].find(function () {
		return true;
	}) !== 1;

  // eslint-disable-next-line global-require
	return implemented ? Array.prototype.find : require('./implementation');
};

},{"./implementation":"../node_modules/array.prototype.find/implementation.js"}],"../node_modules/array.prototype.find/shim.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeFind() {
	var polyfill = getPolyfill();

	define(Array.prototype, { find: polyfill }, {
		find: function () {
			return Array.prototype.find !== polyfill;
		}
	});

	return polyfill;
};

},{"define-properties":"../node_modules/define-properties/index.js","./polyfill":"../node_modules/array.prototype.find/polyfill.js"}],"../node_modules/array.prototype.find/index.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es6');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var slice = Array.prototype.slice;

var polyfill = getPolyfill();

var boundFindShim = function find(array, predicate) { // eslint-disable-line no-unused-vars
	ES.RequireObjectCoercible(array);
	var args = slice.call(arguments, 1);
	return polyfill.apply(array, args);
};

define(boundFindShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundFindShim;

},{"define-properties":"../node_modules/define-properties/index.js","es-abstract/es6":"../node_modules/es-abstract/es6.js","./implementation":"../node_modules/array.prototype.find/implementation.js","./polyfill":"../node_modules/array.prototype.find/polyfill.js","./shim":"../node_modules/array.prototype.find/shim.js"}],"../node_modules/assert/node_modules/util/support/isBufferBrowser.js":[function(require,module,exports) {
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],"../node_modules/assert/node_modules/inherits/inherits_browser.js":[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],"../node_modules/assert/node_modules/util/util.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = undefined || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function (val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
  // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect &&
  // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
},{"./support/isBuffer":"../node_modules/assert/node_modules/util/support/isBufferBrowser.js","inherits":"../node_modules/assert/node_modules/inherits/inherits_browser.js","process":"../node_modules/process/browser.js"}],"../node_modules/assert/assert.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":"../node_modules/assert/node_modules/util/util.js"}],"../node_modules/@jser/stat/lib/models/JSerItemRelatedLink.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSerItemRelatedLink = /** @class */ (function () {
    function JSerItemRelatedLink(link) {
        /** @type {string} */
        this.title = link["title"];
        /** @type {string} */
        this.url = link["url"];
    }
    return JSerItemRelatedLink;
}());
exports.default = JSerItemRelatedLink;
//# sourceMappingURL=JSerItemRelatedLink.js.map
},{}],"../node_modules/@jser/stat/lib/models/JSerItem.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var JSerItemRelatedLink_1 = require("./JSerItemRelatedLink");
var JSerItem = /** @class */ (function () {
    function JSerItem(item) {
        /** @type {string} */
        this.title = item["title"];
        /** @type {string} */
        this.url = item["url"];
        /** @type {string} */
        this.content = item["content"];
        /** @type {string[]} */
        this.tags = item["tags"] || [];
        /** @type {Date} */
        this.date = new Date(item["date"]);
        var relatedLinks = item["relatedLinks"] || [];
        /** @type {JSerItemRelatedLink[]} */
        this.relatedLinks = relatedLinks.map(function (link) {
            return new JSerItemRelatedLink_1.default(link);
        });
    }
    /**
     * @param {JSerItem} item
     * @returns {boolean}
     */
    JSerItem.prototype.isEqualItem = function (item) {
        assert(item != null, "item should not be null");
        return this.url === item.url;
    };
    return JSerItem;
}());
exports.JSerItem = JSerItem;
//# sourceMappingURL=JSerItem.js.map
},{"assert":"../node_modules/assert/assert.js","./JSerItemRelatedLink":"../node_modules/@jser/stat/lib/models/JSerItemRelatedLink.js"}],"../node_modules/@jser/stat/lib/models/JSerPost.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSerPost = /** @class */ (function () {
    function JSerPost(number, post) {
        /** @type {number} */
        // start with 1
        this.postNumber = number;
        /** @type {string} */
        this.title = post["title"];
        /** @type {string} */
        this.url = post["url"];
        /** @type {string} */
        this.content = post["content"];
        /** @type {string} */
        this.category = post["category"];
        /** @type {Date} */
        this.date = new Date(post["date"]);
        /** @type {string[]} */
        this.tags = post["tags"] || [];
    }
    return JSerPost;
}());
exports.JSerPost = JSerPost;
//# sourceMappingURL=JSerPost.js.map
},{}],"../node_modules/@jser/stat/lib/models/JSerWeek.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSerWeek = /** @class */ (function () {
    function JSerWeek(currentPost, prevPost, algoItem) {
        /** @type {number} */
        this.weekNumber = currentPost.postNumber;
        /**
         * first post has not date, fill with real firstWeek
         * new Date("2010-12-31T15:00:00.000Z") is actual started date
         * @type {Date}
         * */
        this.beginDate = prevPost ? prevPost.date : new Date("2010-12-31T15:00:00.000Z");
        /** @type {Date} */
        this.endDate = currentPost.date;
        /** @type {JSerPost} */
        this.post = currentPost;
        /** @type {JSerItem[]} */
        this._items = [];
        this._algoItem = algoItem;
    }
    Object.defineProperty(JSerWeek.prototype, "items", {
        get: function () {
            if (this._items.length === 0) {
                this._items = this._algoItem.findItemsBetween(this.beginDate, this.endDate);
            }
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    return JSerWeek;
}());
exports.JSerWeek = JSerWeek;
//# sourceMappingURL=JSerWeek.js.map
},{}],"../node_modules/binarysearch/index.js":[function(require,module,exports) {


module.exports = function(arr,search,comparitor) {
  if(!arr) return -1;
  // as long as it has a length i will try and itterate over it.
  if(arr.length === undefined) return -1;
  
  if(!comparitor) comparitor = module.exports._defaultComparitor();

  return bs(arr,search,comparitor);
}

module.exports.first = function(arr,search,comparitor) {
  return module.exports.closest(arr,search,{exists:true},comparitor);
}

module.exports.last = function(arr,search,comparitor) {
  return module.exports.closest(arr,search,{exists:true,end:true},comparitor);
}

module.exports.closest = function(arr,search,opts,comparitor) {

  if(typeof opts === 'function') {
    comparitor = opts;
    opts = {};
  }

  if(arr.length === 0) return -1;
  if(arr.length === 1) return 0;

  opts = opts||{};
  if(!comparitor) comparitor = this._defaultComparitor();
  
  var closest = bsclosest(arr, search, comparitor, opts.end, opts.exists?false:true);

  if(closest > arr.length-1) closest = arr.length-1;
  else if(closest < 0) closest = 0;

  return closest;
}

// inserts element into the correct sorted spot into the array
module.exports.insert = function(arr,search,opts,comparitor){ 

  if(typeof opts === 'function') {
    comparitor = opts;
    opts = {};
  }

  opts = opts||{};
  if(!comparitor) comparitor = module.exports._defaultComparitor();
  if(!arr.length) {
    arr[0] = search;
    return 0;
  }

  var closest = module.exports.closest(arr,search,comparitor);

  var cmp = comparitor(arr[closest],search);
  if(cmp < 0) {//less
    arr.splice(++closest,0,search);
  } else if(cmp > 0){ 
    arr.splice(closest,0,search);
  } else {
    if(opts.unique){
      arr[closest] = search;
    } else {
      // im equal. this value should be appended to the list of existing same sorted values.
      while(comparitor(arr[closest],search) === 0){
        if(closest >= arr.length-1) break;
        closest++;
      }

      arr.splice(closest,0,search);
    }
  }
  return closest;
}

// this method returns the start and end indicies of a range. [start,end]
module.exports.range = function(arr,from,to,comparitor) {
  if(!comparitor) comparitor = module.exports._defaultComparitor();

  var fromi = module.exports.closest(arr,from,comparitor);

  var toi = module.exports.closest(arr,to,{end:true},comparitor);

  // this is a hack. 
  // i should be able to fix the algorithm and generate a correct range.

  while(fromi <= toi){ 
    if(comparitor(arr[fromi],from) > -1) break;

    fromi++
  }

  while(toi >= fromi){ 
    if(comparitor(arr[toi],to) < 1) break;
    toi--;
  }

  return [fromi,toi];
}

// this method returns the values of a range;
module.exports.rangeValue = function(arr,from,to,comparitor){
  var range = module.exports.range(arr,from,to,comparitor);
  return arr.slice(range[0],range[1]+1);
}

//
module.exports.indexObject = function(o,extractor) {
  var index = [];
  
  Object.keys(o).forEach(function(k){
    index.push({k:k,v:extractor(o[k])});
  });

  return index.sort(function(o1,o2){
    return o1.v - o2.v;
  });
}

module.exports.cmp = function(v1,v2){
  return v1 - v2;
}

module.exports._defaultComparitor = function() {
  var indexMode,indexModeSearch;
  var stringMode;
  return function(v,search){
    // support the object format of generated indexes
    if(indexMode === undefined){
      if(typeof v === 'object' && v.hasOwnProperty('v')) indexMode = true;
      if(typeof search === 'object' && search.hasOwnProperty('v')) indexModeSearch = true
    }

    if(indexMode) v = v.v;
    if(indexModeSearch) search = search.v;

    if(stringMode === undefined){
      stringMode = false
      if(typeof search === 'string' || typeof v === "string"){
        stringMode = true
      }
    }

    if(stringMode) v = v+''

    return v > search ? 1 : v < search ? -1 : 0
  };
};

module.exports._binarySearch = bs;
module.exports._binarySearchClosest = bsclosest;

function bs(arr, search, comparitor) {

  var max = arr.length-1,min = 0,middle,cmp;
  // continue searching while key may exist
  while (max >= min) {
    middle = mid(min, max);

    cmp = comparitor(arr[middle],search,middle);

    if (cmp < 0) {
      min = middle + 1;
    } else if (cmp > 0) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  // key not found
  return -1;
}

function bsclosest(arr, search, comparitor, invert, closest) {
  var mids = {}
  , min = 0,max = arr.length-1,middle,cmp
  , sanity = arr.length;

  while (min < max) {
    middle = midCareful(min, max,mids); 
    cmp = comparitor(arr[middle],search,middle);
    if(invert){
      if (cmp > 0)max = middle - 1;
      else min = middle;   
    } else {
      if (cmp < 0)min = middle + 1;
      else max = middle;
    }
    if(!--sanity) break;
  }
   
  if (max == min && comparitor(arr[min],search) === 0) return min;
  
  if(closest) {
    var match = comparitor(arr[min],search);
    if(min == arr.length-1 && match < 0) return min;
    if(min == 0 && match > 0) return 0;

    return closest?(invert?min+1:min-1):-1;
  } 
  return -1; 
}

function mid(v1,v2){
  return v1+Math.floor((v2-v1)/2);
}

function midCareful(v1,v2,mids){
  var mid = v1+Math.floor((v2-v1)/2);
  if(mids[mid]) mid = v1+Math.ceil((v2-v1)/2);
  mids[mid] = 1;
  return mid;
}

},{}],"../node_modules/@jser/stat/lib/algo/algoSearch.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binarysearch = require("binarysearch");
function findIndexesBetween(times, beginDate, endDate) {
    var beginTime = beginDate.getTime();
    var endTime = endDate.getTime();
    return binarysearch.range(times, beginTime, endTime);
}
exports.findIndexesBetween = findIndexesBetween;
function findIndexBiggerTime(array, time) {
    var currentIndex = 0;
    for (var i = currentIndex; i < array.length; i++) {
        var comparedTime = array[i];
        if (time >= comparedTime) {
            currentIndex = i;
        }
        else {
            // timeより大きいものが出てきたら直前のものを返す
            return currentIndex;
        }
    }
    return -1;
}
exports.findIndexBiggerTime = findIndexBiggerTime;
function findIndexLessTime(array, time) {
    var currentIndex = array.length - 1;
    for (var i = currentIndex; i >= 0; i--) {
        var comparedTime = array[i];
        if (time < comparedTime) {
            currentIndex = i;
        }
        else {
            // timeよりも小さいものが出てきたら直前のものを返す
            return currentIndex;
        }
    }
    return -1;
}
exports.findIndexLessTime = findIndexLessTime;
//# sourceMappingURL=algoSearch.js.map
},{"binarysearch":"../node_modules/binarysearch/index.js"}],"../node_modules/@jser/stat/lib/algo/AlgoItem.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var algoSearch_1 = require("./algoSearch");
// for algorithm
var AlgoItem = /** @class */ (function () {
    /**
     *
     * @param {JSerItem[]} items
     */
    function AlgoItem(items) {
        this.items = items;
        /**
         * @type number[] 昇順となった各Itemのtime配列
         */
        this.itemTimes = items.map(function (item) {
            return item.date.getTime();
        });
    }
    /**
     *
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerItem[]}
     */
    AlgoItem.prototype.findItemsBetween = function (beginDate, endDate) {
        var indexes = algoSearch_1.findIndexesBetween(this.itemTimes, beginDate, endDate);
        var first = indexes[0];
        var last = indexes[indexes.length - 1];
        if (indexes.length === 0) {
            return [];
        }
        if (first > last) {
            return [];
        }
        return this.items.slice(first, last + 1);
    };
    return AlgoItem;
}());
exports.AlgoItem = AlgoItem;
//# sourceMappingURL=AlgoItem.js.map
},{"./algoSearch":"../node_modules/@jser/stat/lib/algo/algoSearch.js"}],"../node_modules/underscore/underscore.js":[function(require,module,exports) {
var global = arguments[3];
var define;
//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.9.1';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var has = function(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
  }

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArguments(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArguments(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArguments(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArguments(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArguments(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArguments = restArguments;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return has(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define == 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}());

},{}],"../node_modules/natural/lib/natural/tokenizers/tokenizer.js":[function(require,module,exports) {
/*
Copyright (c) 2011, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * \@todo Use .bind() in Tokenizer.prototype.attach().
 */

var Tokenizer = function () {};

Tokenizer.prototype.trim = function (array) {
  while (array[array.length - 1] == '') array.pop();

  while (array[0] == '') array.shift();

  return array;
};

// Expose an attach function that will patch String with new methods.
Tokenizer.prototype.attach = function () {
  var self = this;

  String.prototype.tokenize = function () {
    return self.tokenize(this);
  };
};

Tokenizer.prototype.tokenize = function () {};

module.exports = Tokenizer;
},{}],"../node_modules/util/support/isBufferBrowser.js":[function(require,module,exports) {
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],"../node_modules/inherits/inherits_browser.js":[function(require,module,exports) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"../node_modules/util/util.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = undefined || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function (val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
  // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect &&
  // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
},{"./support/isBuffer":"../node_modules/util/support/isBufferBrowser.js","inherits":"../node_modules/inherits/inherits_browser.js","process":"../node_modules/process/browser.js"}],"../node_modules/natural/lib/natural/tokenizers/regexp_tokenizer.js":[function(require,module,exports) {
/*
Copyright (c) 2011, Rob Ellis, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var Tokenizer = require('./tokenizer'),
    util = require("util"),
    _ = require('underscore')._;

// Base Class for RegExp Matching
var RegexpTokenizer = function (options) {
    var options = options || {};
    this._pattern = options.pattern || this._pattern;
    this.discardEmpty = options.discardEmpty || true;

    // Match and split on GAPS not the actual WORDS
    this._gaps = options.gaps;

    if (this._gaps === undefined) {
        this._gaps = true;
    }
};

util.inherits(RegexpTokenizer, Tokenizer);

RegexpTokenizer.prototype.tokenize = function (s) {
    var results;

    if (this._gaps) {
        results = s.split(this._pattern);
        return this.discardEmpty ? _.without(results, '', ' ') : results;
    } else {
        return s.match(this._pattern);
    }
};

exports.RegexpTokenizer = RegexpTokenizer;

/***
 * A tokenizer that divides a text into sequences of alphabetic and
 * non-alphabetic characters.  E.g.:
 *
 *      >>> WordTokenizer().tokenize("She said 'hello'.")
 *      ['She', 'said', 'hello']
 * 
 */
var WordTokenizer = function (options) {
    this._pattern = /[^A-Za-zА-Яа-я0-9_]+/;
    RegexpTokenizer.call(this, options);
};

util.inherits(WordTokenizer, RegexpTokenizer);
exports.WordTokenizer = WordTokenizer;

/***
 * A tokenizer that divides a text into sequences of alphabetic and
 * non-alphabetic characters.  E.g.:
 *
 *      >>> WordPunctTokenizer().tokenize("She said 'hello'.")
 *      ["She","said","'","hello","'","."]
 * 
 */
var WordPunctTokenizer = function (options) {
    this._pattern = new RegExp(/(\w+|[а-я0-9_]+|\.|\!|\'|\"")/i);
    RegexpTokenizer.call(this, options);
};

util.inherits(WordPunctTokenizer, RegexpTokenizer);
exports.WordPunctTokenizer = WordPunctTokenizer;
},{"./tokenizer":"../node_modules/natural/lib/natural/tokenizers/tokenizer.js","util":"../node_modules/util/util.js","underscore":"../node_modules/underscore/underscore.js"}],"../node_modules/natural/lib/natural/util/stopwords.js":[function(require,module,exports) {
/*
Copyright (c) 2011, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// a list of commonly used words that have little meaning and can be excluded
// from analysis.
var words = ['about', 'above', 'after', 'again', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'came', 'can', 'cannot', 'come', 'could', 'did', 'do', 'does', 'doing', 'during', 'each', 'few', 'for', 'from', 'further', 'get', 'got', 'has', 'had', 'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must', 'my', 'myself', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'said', 'same', 'see', 'should', 'since', 'so', 'some', 'still', 'such', 'take', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'way', 'we', 'well', 'were', 'what', 'where', 'when', 'which', 'while', 'who', 'whom', 'with', 'would', 'why', 'you', 'your', 'yours', 'yourself', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'];

// tell the world about the noise words.
exports.words = words;
},{}],"../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../node_modules/base64-js/index.js","ieee754":"../node_modules/ieee754/index.js","isarray":"../node_modules/isarray/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/natural/lib/natural/tfidf/tfidf.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
/*
Copyright (c) 2011, Rob Ellis, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var _ = require("underscore")._,
    Tokenizer = require('../tokenizers/regexp_tokenizer').WordTokenizer,
    tokenizer = new Tokenizer(),
    stopwords = require('../util/stopwords').words,
    fs = require('fs');

function buildDocument(text, key) {
    var stopOut;

    if (typeof text === 'string') {
        text = tokenizer.tokenize(text.toLowerCase());
        stopOut = true;
    } else if (!_.isArray(text)) {
        stopOut = false;
        return text;
    }

    return text.reduce(function (document, term) {
        // next line solves https://github.com/NaturalNode/natural/issues/119
        if (typeof document[term] === 'function') document[term] = 0;
        if (!stopOut || stopwords.indexOf(term) < 0) document[term] = document[term] ? document[term] + 1 : 1;
        return document;
    }, { __key: key });
}

function tf(term, document) {
    return document[term] ? document[term] : 0;
}

function documentHasTerm(term, document) {
    return document[term] && document[term] > 0;
}

function TfIdf(deserialized) {
    if (deserialized) this.documents = deserialized.documents;else this.documents = [];

    this._idfCache = {};
}

// backwards compatibility for < node 0.10
function isEncoding(encoding) {
    if (typeof Buffer.isEncoding !== 'undefined') return Buffer.isEncoding(encoding);
    switch ((encoding + '').toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
    }
    return false;
}

module.exports = TfIdf;
TfIdf.tf = tf;

TfIdf.prototype.idf = function (term, force) {

    // Lookup the term in the New term-IDF caching,
    // this will cut search times down exponentially on large document sets.
    if (this._idfCache[term] && this._idfCache.hasOwnProperty(term) && force !== true) return this._idfCache[term];

    var docsWithTerm = this.documents.reduce(function (count, document) {
        return count + (documentHasTerm(term, document) ? 1 : 0);
    }, 0);

    var idf = 1 + Math.log(this.documents.length / (1 + docsWithTerm));

    // Add the idf to the term cache and return it
    this._idfCache[term] = idf;
    return idf;
};

// If restoreCache is set to true, all terms idf scores currently cached will be recomputed.
// Otherwise, the cache will just be wiped clean
TfIdf.prototype.addDocument = function (document, key, restoreCache) {
    this.documents.push(buildDocument(document, key));

    // make sure the cache is invalidated when new documents arrive
    if (restoreCache === true) {
        for (var term in this._idfCache) {
            // invoking idf with the force option set will
            // force a recomputation of the idf, and it will
            // automatically refresh the cache value.
            this.idf(term, true);
        }
    } else {
        this._idfCache = {};
    }
};

// If restoreCache is set to true, all terms idf scores currently cached will be recomputed.
// Otherwise, the cache will just be wiped clean
TfIdf.prototype.addFileSync = function (path, encoding, key, restoreCache) {
    if (!encoding) encoding = 'utf8';
    if (!isEncoding(encoding)) throw new Error('Invalid encoding: ' + encoding);

    var document = fs.readFileSync(path, encoding);
    this.documents.push(buildDocument(document, key));

    // make sure the cache is invalidated when new documents arrive
    if (restoreCache === true) {
        for (var term in this._idfCache) {
            // invoking idf with the force option set will
            // force a recomputation of the idf, and it will
            // automatically refresh the cache value.
            this.idf(term, true);
        }
    } else {
        this._idfCache = {};
    }
};

TfIdf.prototype.tfidf = function (terms, d) {
    var _this = this;

    if (!_.isArray(terms)) terms = tokenizer.tokenize(terms.toString().toLowerCase());

    return terms.reduce(function (value, term) {
        var idf = _this.idf(term);
        idf = idf === Infinity ? 0 : idf;
        return value + tf(term, _this.documents[d]) * idf;
    }, 0.0);
};

TfIdf.prototype.listTerms = function (d) {
    var terms = [];

    for (var term in this.documents[d]) {
        if (term != '__key') terms.push({ term: term, tfidf: this.tfidf(term, d) });
    }

    return terms.sort(function (x, y) {
        return y.tfidf - x.tfidf;
    });
};

TfIdf.prototype.tfidfs = function (terms, callback) {
    var tfidfs = new Array(this.documents.length);

    for (var i = 0; i < this.documents.length; i++) {
        tfidfs[i] = this.tfidf(terms, i);

        if (callback) callback(i, tfidfs[i], this.documents[i].__key);
    }

    return tfidfs;
};

// Define a tokenizer other than the default "WordTokenizer"
TfIdf.prototype.setTokenizer = function (t) {
    if (!_.isFunction(t.tokenize)) throw new Error('Expected a valid Tokenizer');
    tokenizer = t;
};
},{"underscore":"../node_modules/underscore/underscore.js","../tokenizers/regexp_tokenizer":"../node_modules/natural/lib/natural/tokenizers/regexp_tokenizer.js","../util/stopwords":"../node_modules/natural/lib/natural/util/stopwords.js","fs":"../node_modules/parcel-bundler/src/builtins/_empty.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/@jser/stat/lib/natural/NaturalSearcher.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TfIdf = require("natural/lib/natural/tfidf/tfidf");
// merge sort
var mergeSort = function (arr) {
    if (arr.length < 2) {
        return arr;
    }
    var middle = arr.length / 2, left = arr.slice(0, middle), right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
};
var merge = function (left, right) {
    var result = [];
    while (left.length && right.length) {
        right[0].measure <= left[0].measure ? result.push(left.shift()) : result.push(right.shift());
    }
    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
};
var ignoreWord = function (word) {
    if (word.length <= 1) {
        return false;
    }
    // 数字と.のみは除外
    if (/^v?[\d\.]+$/.test(word)) {
        return false;
    }
    if (/[\?&=]/.test(word)) {
        return false;
    }
    if (/^\.(html|md|php)$/i.test(word)) {
        return false;
    }
    return true;
};
function urlToWords(url) {
    var pathList = url.split("/");
    var pathNames = pathList[pathList.length - 1].split(/([-_]|\.html$|\.md$|\.php$|#)/i);
    return pathNames.filter(ignoreWord);
}
var NaturalSearcher = /** @class */ (function () {
    function NaturalSearcher(items) {
        this.items = items;
        this.tfidf = new TfIdf();
        this.addItemsAsDocuments(this.items);
    }
    NaturalSearcher.prototype.addItemsAsDocuments = function (items) {
        var _this = this;
        items.forEach(function (item) {
            var urlKeyString = urlToWords(item.url).join(" ");
            var relatedString = item.relatedLinks
                .map(function (relatedObject) {
                return relatedObject.title + " " + urlToWords(relatedObject.url).join(" ");
            })
                .join("");
            var tagsString = (item.tags || []).join(" ");
            // 全部を使うと長すぎるコンテンツが有利になりすぎるので絞る
            var slicedContent = item.content.slice(0, 200);
            _this.tfidf.addDocument(item.title + "\n" + tagsString + "\n" + slicedContent + "\n" + urlKeyString + "\n" + relatedString);
        });
    };
    /**
     *
     * @param {JSerItem} targetItem
     * @param {number} limit
     */
    NaturalSearcher.prototype.findRelatedItems = function (targetItem, limit) {
        var targetIndex = this.items.indexOf(targetItem);
        if (targetIndex === -1) {
            this.items.some(function (item, index) {
                if (item.isEqualItem(item)) {
                    targetIndex = index;
                    return true;
                }
                return false;
            });
            if (targetIndex === -1) {
                throw new Error("Not found this item: " + targetItem);
            }
        }
        var terms = this.tfidf.listTerms(targetIndex);
        var results = [];
        this.tfidf.tfidfs(terms.map(function (term) {
            return term.term;
        }), function (i, measure) {
            results.push({
                index: i,
                measure: measure
            });
        });
        var sorted = mergeSort(results);
        // tifidf -> item
        var matchItems = [];
        for (var i = 0, len = Math.min(sorted.length, limit + 1); i < len; i++) {
            // 自分自身は含めない
            var matchItem = this.items[sorted[i].index];
            if (this.items[targetIndex].isEqualItem(matchItem)) {
                continue;
            }
            matchItems.push(matchItem);
        }
        return matchItems;
    };
    return NaturalSearcher;
}());
exports.default = NaturalSearcher;
//# sourceMappingURL=NaturalSearcher.js.map
},{"natural/lib/natural/tfidf/tfidf":"../node_modules/natural/lib/natural/tfidf/tfidf.js"}],"../node_modules/lodash.sortby/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, function(o) { return o.user; });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 *
 * _.sortBy(users, 'user', function(o) {
 *   return Math.floor(o.age / 10);
 * });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = sortBy;

},{}],"../node_modules/@jser/stat/lib/JSerStat.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("array.prototype.find");
var JSerItem_1 = require("./models/JSerItem");
var JSerPost_1 = require("./models/JSerPost");
var JSerWeek_1 = require("./models/JSerWeek");
var AlgoItem_1 = require("./algo/AlgoItem");
// import AlgoPost from "./algo/AlgoPost";
var NaturalSearcher_1 = require("./natural/NaturalSearcher");
var sortBy = require("lodash.sortby");
function sortByDate(items) {
    return sortBy(items, function (item) {
        return item.date;
    });
}
function filterJSerCategory(article) {
    return /jser/i.test(article.category);
}
var JSerStat = /** @class */ (function () {
    function JSerStat(rawItems, rawPosts) {
        this._rawItems = rawItems;
        this._rawPosts = rawPosts;
        /**
         * 日付で昇順にsortされたItems
         * @type {JSerItem[]}
         * */
        this.items = sortByDate(this._rawItems).map(function (item) {
            return new JSerItem_1.JSerItem(item);
        });
        /**
         * 日付で昇順にsortされてposts
         *  @type {JSerPost[]}
         **/
        this.posts = sortByDate(this._rawPosts)
            .filter(filterJSerCategory)
            .map(function (post, index) {
            return new JSerPost_1.JSerPost(index + 1, post);
        });
        /**
         *
         * @type {JSerWeek[]}
         * @private
         */
        this._weeks = [];
        /**
         *  @type {AlgoItem}
         *  @private
         **/
        this._algoItem = new AlgoItem_1.AlgoItem(this.items);
        /**
         * @type {AlgoPost}
         * @private
         */
        // this._algoPost = new AlgoPost(this.posts);
        /**
         * @type {NaturalSearcher}
         */
        this.naturalSearch = null;
    }
    /**
     * 全部で何週あるかを返す(投稿記事の数と一致)
     * @returns {number}
     */
    JSerStat.prototype.getTotalWeekCount = function () {
        return this.posts.length;
    };
    /**
     * beginからendの範囲のJSerItemの配列を返す
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerItem[]}
     */
    JSerStat.prototype.findItemsBetween = function (beginDate, endDate) {
        return this._algoItem.findItemsBetween(beginDate, endDate);
    };
    // deprecated
    JSerStat.prototype.getItemsBetWeen = function (beginDate, endDate) {
        return this.findItemsBetween(beginDate, endDate);
    };
    /**
     * 全てのJSerWeekの配列を返す
     * @returns {JSerWeek[]}
     */
    JSerStat.prototype.getJSerWeeks = function () {
        var _this = this;
        if (this._weeks.length === 0) {
            this._weeks = this.posts.reduce(function (results, currentPost, index) {
                var prevPost = _this.posts[index - 1];
                var jserWeek = new JSerWeek_1.JSerWeek(currentPost, prevPost, _this._algoItem);
                results.push(jserWeek);
                return results;
            }, []);
        }
        return this._weeks;
    };
    /**
     * beginからendの範囲に含まれるJSerWeekの配列を返す
     * JSerWeek#beginDate または JSerWeek#endDate どちらかがかかれば含まれると判断される
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerWeek[]}
     */
    JSerStat.prototype.findJSerWeeksBetween = function (beginDate, endDate) {
        var weeks = this.getJSerWeeks();
        var beginTime = beginDate.getTime();
        var endTime = endDate.getTime();
        return weeks.filter(function (week) {
            var weekBeginTime = week.beginDate.getTime();
            var weekEndTime = week.endDate.getTime();
            if (beginTime <= weekBeginTime && weekBeginTime <= endTime) {
                return true;
            }
            if (beginTime <= weekEndTime && weekEndTime <= endTime) {
                return true;
            }
            return false;
        });
    };
    // deprecated
    JSerStat.prototype.getJSerWeeksBetWeen = function (beginDate, endDate) {
        return this.findJSerWeeksBetween(beginDate, endDate);
    };
    /**
     * JSer.info #xxx を返す
     * @param {number} number number start with 1
     * @returns {JSerWeek}
     */
    JSerStat.prototype.findJSerWeek = function (number) {
        if (number <= 0) {
            throw new Error("number:" + number + " should be >= 1");
        }
        if (number > this.posts.length) {
            return null;
        }
        var targetPost = this.posts[number - 1];
        var prevPost = this.posts[number - 2];
        return new JSerWeek_1.JSerWeek(targetPost, prevPost, this._algoItem);
    };
    /**
     * `postURL`に一致するJSerWeekを返す
     * @param {string} postURL
     * @returns {JSerWeek|undefined}
     */
    JSerStat.prototype.findJSerWeekWithURL = function (postURL) {
        var weeks = this.getJSerWeeks().filter(function (week) {
            return week.post.url === postURL;
        });
        if (weeks.length > 0) {
            return weeks[0];
        }
        return;
    };
    // deprecated
    JSerStat.prototype.getJSerWeek = function (number) {
        return this.findJSerWeek(number);
    };
    /**
     * JSerItemを含んでいるJSerWeekを検索して返す.
     * @param {Object} jserItem the jserItem is raw object for JSerItem
     * @return {JSerWeek|null} The week contain this jserItem.
     * 未来の記事などJSerWeekに所属していない場合もある
     */
    JSerStat.prototype.findWeekWithItem = function (jserItem) {
        var targetItem = new JSerItem_1.JSerItem(jserItem);
        var tenDaysAfter = new Date(targetItem.date);
        tenDaysAfter.setDate(targetItem.date.getDate() + 10);
        var jSerWeeks = this.findJSerWeeksBetween(targetItem.date, tenDaysAfter);
        return jSerWeeks.find(function (week) {
            if (week.post.date < targetItem.date) {
                return false;
            }
            return week.items.some(function (item) {
                return targetItem.isEqualItem(item);
            });
        });
    };
    /**
     * URLとマッチするJSerItemを返す
     * @param {string} URL
     * @return {JSerItem}
     */
    JSerStat.prototype.findItemWithURL = function (URL) {
        return this.items.find(function (item) {
            return item.url === URL;
        });
    };
    /**
     * `item` と関連するJSerItemの配列を返す
     * @param {JSerItem} item
     * @param {number} limit
     * @returns {JSerItem[]}
     */
    JSerStat.prototype.findRelatedItems = function (item, limit) {
        if (limit === void 0) { limit = 10; }
        if (this.naturalSearch == null) {
            this.naturalSearch = new NaturalSearcher_1.default(this.items);
        }
        return this.naturalSearch.findRelatedItems(item, limit);
    };
    return JSerStat;
}());
exports.JSerStat = JSerStat;
//# sourceMappingURL=JSerStat.js.map
},{"array.prototype.find":"../node_modules/array.prototype.find/index.js","./models/JSerItem":"../node_modules/@jser/stat/lib/models/JSerItem.js","./models/JSerPost":"../node_modules/@jser/stat/lib/models/JSerPost.js","./models/JSerWeek":"../node_modules/@jser/stat/lib/models/JSerWeek.js","./algo/AlgoItem":"../node_modules/@jser/stat/lib/algo/AlgoItem.js","./natural/NaturalSearcher":"../node_modules/@jser/stat/lib/natural/NaturalSearcher.js","lodash.sortby":"../node_modules/lodash.sortby/index.js"}],"../node_modules/@jser/stat/lib/compute/compute-tags.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * {タグ名:出現回数}のオブジェクトを返す
 * @param {JSerWeek[]} weeks
 * @returns {{string:number}}
 */
function countTagsByGroup(weeks) {
    return countByGroup(weeks, function (item) {
        var rank = {};
        item.tags.forEach(function (tag) {
            rank[tag] = ++rank[tag] || 1;
        });
        return rank;
    });
}
exports.countTagsByGroup = countTagsByGroup;
function countByGroup(weeks, countFn) {
    var rank = {};
    weeks.forEach(function (week) {
        week.items.forEach(function (item) {
            var ret = countFn(item);
            var keys = Object.keys(ret);
            keys.forEach(function (key) {
                rank[key] = (rank[key] || 0) + ret[key];
            });
        });
    });
    return rank;
}
exports.countByGroup = countByGroup;
//# sourceMappingURL=compute-tags.js.map
},{}],"../node_modules/@jser/stat/lib/index.js":[function(require,module,exports) {
// LICENSE : MIT
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSerStat_1 = require("./JSerStat");
exports.JSerStat = JSerStat_1.JSerStat;
var compute = require("./compute/compute-tags");
exports.compute = compute;
//# sourceMappingURL=index.js.map
},{"./JSerStat":"../node_modules/@jser/stat/lib/JSerStat.js","./compute/compute-tags":"../node_modules/@jser/stat/lib/compute/compute-tags.js"}],"../node_modules/cross-fetch/dist/browser-ponyfill.js":[function(require,module,exports) {
var __root__ = (function (root) {
function F() { this.fetch = false; }
F.prototype = root;
return new F();
})(typeof self !== 'undefined' ? self : this);
(function(self) {

(function(self) {

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    };

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue+','+value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) { items.push(name); });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) { items.push(value); });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) { items.push([name, value]); });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : this);
}).call(__root__, void(0));
var fetch = __root__.fetch;
var Response = fetch.Response = __root__.Response;
var Request = fetch.Request = __root__.Request;
var Headers = fetch.Headers = __root__.Headers;
if (typeof module === 'object' && module.exports) {
module.exports = fetch;
}

},{}],"../node_modules/@jser/data-fetcher/lib/data-fetcher.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require('cross-fetch');
exports.fetchItems = function () {
    return fetch("https://jser.info/source-data/items.json")
        .then(function (res) {
        if (!res.ok) {
            return Promise.reject(new Error("items.json: " + res.statusText));
        }
        return res;
    })
        .then(function (res) { return res.json(); });
};
exports.fetchPosts = function () {
    return fetch("https://jser.info/posts.json")
        .then(function (res) {
        if (!res.ok) {
            return Promise.reject(new Error("posts.json: " + res.statusText));
        }
        return res;
    })
        .then(function (res) { return res.json(); });
};
exports.fetchPostDetails = function () {
    return fetch("https://jser.info/public/data/post-details.json")
        .then(function (res) {
        if (!res.ok) {
            return Promise.reject(new Error("post-details.json\": " + res.statusText));
        }
        return res;
    })
        .then(function (res) { return res.json(); });
};
//# sourceMappingURL=data-fetcher.js.map
},{"cross-fetch":"../node_modules/cross-fetch/dist/browser-ponyfill.js"}],"index.js":[function(require,module,exports) {
// MIT © 2018 azu
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Reveal = require("reveal.js");

var _require = require("./plugins/Chapter.js"),
    Chapterion = _require.Chapterion;
// More info https://github.com/hakimel/reveal.js#configuration


var _require2 = require("@jser/stat"),
    JSerStat = _require2.JSerStat;

var _require3 = require("@jser/data-fetcher"),
    fetchItems = _require3.fetchItems,
    fetchPosts = _require3.fetchPosts;

var remove = function remove(element) {
    if (!element) {
        return;
    }
    element.parentNode.removeChild(element);
};
var newSection = function newSection(number, title, url) {
    var section = document.createElement("section");
    section.dataset.chapter = "#" + number;
    section.innerHTML = "<h1><a href=\"" + url + "\">" + title + "</a></h1>";
    return section;
};
/**
 * @returns {Promise<JSerStat>}
 */
var createStat = function createStat() {
    return Promise.all([fetchItems(), fetchPosts()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            items = _ref2[0],
            posts = _ref2[1];

        return new JSerStat(items, posts);
    });
};

/**
 *
 * @param {JSerWeek} week
 */
var createSlideFromJSerWeek = function createSlideFromJSerWeek(week) {
    return newSection(week.weekNumber, week.post.title, week.post.url);
};

function main() {
    Reveal.initialize({
        width: 1280,
        height: 960,
        minScale: 0.2,
        maxScale: 1.5,
        history: false,
        slideNumber: false,
        controls: false,
        loop: false,
        autoSlide: 0,
        transition: 'fade', // none/fade/slide/convex/concave/zoom
        transitionSpeed: 'fast'
    });
    var chapter = new Chapterion();
    chapter.start();
    // fetch and set
    createStat().then(function (stat) {
        var weeks = stat.getJSerWeeks();
        var slideSections = weeks.map(function (week) {
            return createSlideFromJSerWeek(week);
        });
        var fragment = document.createDocumentFragment();
        slideSections.forEach(function (slideSection) {
            return fragment.appendChild(slideSection);
        });
        var slides = document.querySelector(".slides");
        slides.appendChild(fragment);
        // start
        remove(document.querySelector(".now-loading"));
        Reveal.configure({ autoSlide: 8 * 1000 });
        Reveal.next();
    }).catch(function (error) {
        console.error(error);
    });
}

// Run
main();
},{"reveal.js":"../node_modules/reveal.js/js/reveal.js","./plugins/Chapter.js":"plugins/Chapter.js","@jser/stat":"../node_modules/@jser/stat/lib/index.js","@jser/data-fetcher":"../node_modules/@jser/data-fetcher/lib/data-fetcher.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63727' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.6901dfe5.map