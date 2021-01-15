/*Activa todos los tooltips*/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

/*Activa todos los popovers*/
$(function () {
    $('[data-toggle="popover"]').popover()
})


//Reloj canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radio = canvas.height / 2;
ctx.translate(radio, radio);
radio = radio * 0.90
setInterval(dibujaReloj, 1000);

function dibujaReloj() {
  dibujaCara(ctx, radio);
  dibujaNumeros(ctx, radio);
  dibujaHora(ctx, radio);
}

function dibujaCara(ctx, radio) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radio, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radio*0.95, 0,0,radio*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radio*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radio*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function dibujaNumeros(ctx, radio) {
  var ang;
  var num;
  ctx.font = radio*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radio*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radio*0.85);
    ctx.rotate(-ang);
  }
}

function dibujaHora(ctx, radio){
    var now = new Date();
    var hora = now.getHours();
    var minuto = now.getMinutes();
    var segundo = now.getSeconds();
    //hora
    hora=hora%12;
    hora=(hora*Math.PI/6)+
    (minuto*Math.PI/(6*60))+
    (segundo*Math.PI/(360*60));
    dibujaManecilla(ctx, hora, radio*0.5, radio*0.07);
    //minutos
    minuto=(minuto*Math.PI/30)+(segundo*Math.PI/(30*60));
    dibujaManecilla(ctx, minuto, radio*0.8, radio*0.07);
    // segundos
    segundo=(segundo*Math.PI/30);
    dibujaManecilla(ctx, segundo, radio*0.9, radio*0.02);
}

function dibujaManecilla(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
