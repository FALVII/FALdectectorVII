// 背景画布
  window.onload = function () {

    var H = window.screen.availHeight;
    var W = window.screen.availWidth; 

   
    var mycanvas = document.getElementById('background');
    var ctx = mycanvas.getContext('2d');

    mycanvas.height = H;
    mycanvas.width = W;

    var fontsize = 18;
    var text = [];
    var lie = Math.floor(W / fontsize);
    var str = '01'
    for (var i = 0; i < lie; i++) {
      text.push(0);
    }
    ctx.font = fontsize + 'px 微雅软黑';

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = randColor();
      for (var i = 0; i < lie; i++) {
        var index = Math.floor(Math.random() * str.length);
        var x = Math.floor(fontsize * i)
        var y = text[i] * fontsize
        ctx.fillText(str[index], x, y);
        if (y > H && Math.random() > 0.99) {
          text[i] = 0
        }
        text[i]++;
      }
    }
    
    function randColor() {
      var r = Math.ceil(Math.random() * 155) + 100;
      var g = Math.ceil(Math.random() * 155) + 100;
      var b = Math.ceil(Math.random() * 155) + 100;
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    console.log(randColor())
    var timer = setInterval(function () {
      draw();
    }, 1000 / 30)
  }


