const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const SIZE = 700;

var painting = false;
var filling = false;

canvas.width = canvas.height = SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,SIZE,SIZE);
ctx.strokeStyle = "#282828";
ctx.fillStyle = "#282828";
ctx.lineWidth = 3.0;


if(canvas){
  canvas.addEventListener("mousemove",onMouseMove);
  canvas.addEventListener("mousedown",() => painting = true);
  canvas.addEventListener("mouseup",() => painting = false);
  canvas.addEventListener("mouseleave",() => painting = false);
  canvas.addEventListener("click",fillPainting);
  canvas.addEventListener("contextmenu",(event) => event.preventDefault());
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColor));

if(range){
  range.addEventListener("input",handleRange);
}

if(mode){
  mode.addEventListener("click",handleMode);
}

if(saveBtn){
  saveBtn.addEventListener("click",handleSaveBtn);
}

function fillPainting(){
  if(filling){
    ctx.fillRect(0,0,SIZE,SIZE);
  }
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    if(!filling){
      ctx.lineTo(x,y);
      ctx.stroke();
    }
  }
}

function handleColor(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRange(event){
  ctx.lineWidth = event.target.value;
}

function handleMode(event){
  if(filling == true){
    mode.innerText = "fill";
  } else{
    mode.innerText = "paint";
  }
  filling = filling ^ 1;
}

function handleSaveBtn(){
  const check = confirm("저장하시겠습니까?");
  if(!check) return
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "download.png";
  link.click();
}