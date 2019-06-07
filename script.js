/**
    Nuvolum Zeplin Slider Script by "Joseph Davidson"
/**/

(function slideShow() { // Basic Interface

    /* Properties */

    let currentSlide = 1; // slide div being displayed
    let autoplayEnabled = true; // start with autoplay on
    let autoplayTime = 3; // autoplay wait time in seconds
    let startSlidePoint = 0; // touch start point for swipe
    let endSlidePoint = 0; // touch end point for swipe

    /* Methods */

    // use element class name as string for argument (slide)
    function toggleSlide(slideNumber) {

        let element = document.querySelector('.slide' + slideNumber);
        element.classList.toggle("slideHidden");
    }

    // toggle navOval active class
    function toggleNavOval(slideNumber) {

        let element = document.querySelector(".oval" + slideNumber);
        element.classList.toggle("navOvalActive");
    }

    // argument (direction) can be "forward" or "reverse"
    function rotateSlideshow(direction) {

        // hide current slide, gray out current oval
        toggleSlide(currentSlide);
        toggleNavOval(currentSlide);

        if (direction == "forward") {

            // cycle slide forward
            currentSlide++;
        }
        else if (direction == "reverse") {

            // cycle slide in reverse
            currentSlide--;
        }

        // rotate list end values
        if (currentSlide > 4) currentSlide = 1;
        if (currentSlide < 1) currentSlide = 4;

        // show new current slide, toggle oval blue
        toggleSlide(currentSlide);
        toggleNavOval(currentSlide);
    }

    // autoplay slideshow forward
    function autoPlay() {

        // time autoplay
        setTimeout(function (e) {

            // ternary : autoplay enabled
            !autoplayEnabled ? (function () { return })() : rotateSlideshow("forward");

            // recursive call
            autoPlay();

        }, autoplayTime * 1000); // adjust time in seconds in properties
    }

    // compare screenX points for direction (touchstart / touchend) 
    function testSwipe(elem) {

        // compare values and trigger swipe
        if (startSlidePoint > endSlidePoint) { rotateSlideshow("forward"); }
        else if (endSlidePoint > startSlidePoint) { rotateSlideshow("reverse"); }
    }

    // $(document).ready alt // Set up sript with HTML
    document.addEventListener("DOMContentLoaded", function (resolve, reject) {

        var touchTarget = document.querySelector(".sliderWrapper");
        var autoPlayButton = document.querySelector(".autoplayButton");

        // add listener for touchstart
        touchTarget.addEventListener('touchstart', function (event) {

            // set start value
            startSlidePoint = event.changedTouches[0].screenX;

        }, false);

        // add listener for touchend
        touchTarget.addEventListener('touchend', function (event) {

            // set end value
            endSlidePoint = event.changedTouches[0].screenX;

            // test swipe direction and execute toggle
            testSwipe(event);

        }, false);

        // check for single touch and mouse click on text to navigate pages
        touchTarget.addEventListener('click', function () {

            // navigate to corresponding html page for slide
            window.location.href = "./navPages/page" + currentSlide + ".html";

            // kill autoplay
            autoplayEnabled = false;

        }, false);

        // run autoplay on page load
        autoPlay();

        // toggle autoplay feature on button click
        autoPlayButton.addEventListener('click', function (event) {

            // toggle button color class
            this.classList.toggle("autoplayOff"); // bg color goes gray/blue

            // toggle autoplay
            autoplayEnabled = !autoplayEnabled;
        });
    });


})()
