$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    mui('mui-slider').slider(function () {
        interval:2000
    });
});