/**
 * Resizes the background accordingly to the size of the screen
 */
function backgroundResize() {
    // variables
    var bg = $('#background'),
        contW = bg.width(),
        imgW = bg.attr('data-img-width'),
        imgH = bg.attr('data-img-height'),
        ratio = imgW / imgH;

    // set img values depending on cont
    imgH = bg.height();
    imgW = imgH * ratio;

    // fix when too large
    if (contW > imgW){
        imgW = contW;
        imgH = imgW / ratio;
    }

    // resize
    bg.css('background-size', imgW + 'px ' + imgH + 'px');
}

// resize the background whenever the screen changes
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

// wait for the background to be loaded before showing the content
var img = new Image();
img.addEventListener('load', function () {
    document.getElementById('loader').style.opacity = 0;

    setTimeout(function () {
        document.getElementById('content').style.opacity = 1;
        setTimeout(showCountdown, 1500);
    }, 1500);
});
img.src = 'img/bg.jpg';
