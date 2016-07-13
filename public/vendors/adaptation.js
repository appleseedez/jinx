$(function(){
  var $Html = $(document.body).parent();
  var V_w;
  var V_h;
  var Ratio;
  function adaptation(){
    V_w = $(window).width();
    V_h = $(window).height();
    if((V_w/V_h) > (320/568)){
      Ratio = V_h/568 * 50;
    }else{
      Ratio = V_w/320 * 50;
    };
    $Html.css("font-size", Ratio + "px");
  };
  $(window).resize(function () {
    adaptation();
  });
  adaptation();
});
