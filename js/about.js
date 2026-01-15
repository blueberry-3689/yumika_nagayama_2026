 // JavaScript Document
 $(document).ready(function() {
 function onScroll() {
 $(".fadeIn").each(function() {
 var sectionTop = $(this).offset().top;
 var windowBottom = $(window).scrollTop() + $
 (window).height();
 if (windowBottom > sectionTop + 100) {
 $(this).css({"opacity": "1", "transform": 
"translateY(0)"});
 }
 });
 }
 onScroll();
 $(window).on("scroll", onScroll);
 });