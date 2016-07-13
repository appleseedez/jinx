$(function(){
  lottery.lottery({
    selector:     '#lottery',
    width:        3,
    height:       3,
    index:        7,    // 初始位置
    initSpeed:    500,  // 初始转动速度
    upStep:       100,   // 加速滚动步长
    upMax:        100,   // 速度上限
    downStep:     30,   // 减速滚动步长
    downMax:      500,  // 减速上限
    waiting:      1500, // 匀速转动时长
    beforeRoll: function () { // 重写滚动前事件：beforeRoll
      console.log(this.options.aim);
      // alert(1);
    }
  })


  $('#lotteryGo').on('click',function(){
    var $that = $(this);
    var t = setTimeout(function(){
      $that.removeClass('pre');
    },200);
    $that.addClass('pre');
  })
})
