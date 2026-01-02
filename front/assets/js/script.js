(function($) { 
"use strict";

$('[data-toggle="offcanvas"]').on('click', function () {
    $('.navbar-collapse').toggleClass('show');
    });
 
 // 3 LightBox / Fancybox
if ($('.lightbox-image').length) {
    $('.lightbox-image').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        helpers: {
            media: {}
        }
    });
}



$('.hometestimonial').owlCarousel({
        loop: false,
        margin: 20,
        autoplay : 1000,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 1
            },
            992: {
                items: 2
            },
            1199: {
                items: 2
            }
        }
    })
    
    
    
$('.blogscroll').owlCarousel({
        loop: false,
        margin: 30,
        autoplay : 1000,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 1
            },
            992: {
                items: 2
            },
            1199: {
                items: 3
            }
        }
    })
    



})(jQuery);
