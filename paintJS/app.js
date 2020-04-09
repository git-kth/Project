const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
var colors = document.getElementsByClassName("controls_color");
var painting = false;

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#282828";
ctx.lineWidth = 2.5;

Array.from(colors).forEach(color => color.addEventListener("click",handleColor));

if(canvas){
  canvas.addEventListener("mousemove",onMouseMove);
  canvas.addEventListener("mousedown",startPainting);
  canvas.addEventListener("mouseup",stopPainting);
  canvas.addEventListener("mouseleave",stopPainting);
}

function startPainting(){
  painting = true;
}

function stopPainting(){
  painting = false;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function handleColor(event){
  ctx.strokeStyle = event.target.style.backgroundColor;
}
