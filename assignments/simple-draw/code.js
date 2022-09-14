drawFilledRect (0, 0, 500,600, 'rgba(115,215,255,1)')
drawFilledRect (0,(2*height/3)+(height/6), width, (2*height/3), 'rgba(0, 64, 0, 1')
var rect = 1000
while (rect>= 2*height/3) {
  drawLine (0, rect, width, rect, 'rgba(0,128,0, 1', 0)
  var rect = rect - 2
  while (rect >= 3*height/4){
  drawLine (0, rect, width, rect, 'rgba(0,128,0, 1', 0)
   var rect = rect - 1
  }
}

var rays = 500
while (rays >= width-2*width/7) {
  drawLine (0, 0, rays, height, 'rgba(242,242,37,.1', 1)
  var rays = rays - 1
}
var rays2 = 125
while (rays2 >= width*0) {
  drawLine (0, 0, rays2, height, 'rgba(242,242,37,.1', 1)
  var rays2 = rays2 - 1
}
var rays3 = 3000
while (rays3 >= 3*width) {
  drawLine (0, 0, rays3, height, 'rgba(242,242,37,.1', 1)
  var rays3 = rays3 - 6
}
drawFilledCircle (0,0, 100,'rgba(250,220,15,1)')

drawFilledCircle (width/2,height/3, 100, "red")
drawFilledRect (width/2 - 100, height/2 - 100, 200, 200, 'red');
drawFilledRect (width/2 + 100, height/2 - 100, 50, 130, 'red');
drawFilledRect (width/2 - 100, height/2 + 100, 60, 80, 'red');
drawFilledRect (width/2 + 40, height/2 + 100, 60, 80, 'red');
drawFilledRect (width/2 - 85, height/2 - 100, 125, 60, 'white');