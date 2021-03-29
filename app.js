const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const COLOR_STYLE = "#2c2c2c";

// setting canvas sizes (pixel Size - not CSS)
canvas.width = "450";
canvas.height = "450"; 

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 450, 450);
ctx.lineWidth ="2.5";
ctx.strokeStyle ="COLOR_STYLE";
ctx.fillstyle = "COLOR_STYLE";

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting(event) {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        /* not Painting
        no click move mouse 
        just creating path and moving path*/
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        /* exctute throughout moving mouse 
        creating line */
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}  

function handleModeChange() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
        fillPainting();
    } else {
        filling = true;
        mode.innerText = "Paint";
        
    }
}

function fillPainting(event) {
    if(filling) {
        ctx.fillRect(0, 0, 450, 450);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveImage() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillPainting);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeChange);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveImage);
}