$(function() {
    //Simple filter controls
    $('.simplefilter li').on("click", function() {
        $('.simplefilter li').removeClass('active');
        $(this).addClass('active');
    });
});
$(function() {
	//Initialize filterizr with default options
	$('.filtr-container').filterizr();
});




