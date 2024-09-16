const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "white";


ctx.translate(canvas.width / 2, canvas.height / 2);

const unit = 18;
const particleRadius = 5;
const animationSpeed = 0.01;

let initialX, initialY, translationX, translationY;
let angle, rotatedPosition, finalPosition;
let currentAngle = 0;
let rotationComplete = false;
let translationProgress = 0;

const drawRectSystem = () => {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(-canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.stroke();

    const xInterval = Math.floor(canvas.width / unit);
    const yInterval = Math.floor(canvas.height / unit);

    for (let i = 0; i <= xInterval; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(i * unit, -5);
        ctx.lineTo(i * unit, 5);
        ctx.stroke();
        if (i && i != 1) {
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i, i * unit, unit);
        }
    }

    for (let i = 0; i <= xInterval; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(-i * unit, -5);
        ctx.lineTo(-i * unit, 5);
        ctx.stroke();
        if (i && i != 1) {
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(-i, -i * unit, unit);
        }
    }

    for (let i = 0; i <= yInterval; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(-5, i * unit);
        ctx.lineTo(5, i * unit);
        ctx.stroke();
        if (i && i != 1) {
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(-i, 14, i * unit);
        }
    }

    for (let i = 0; i <= yInterval; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(-5, -i * unit);
        ctx.lineTo(5, -i * unit);
        ctx.stroke();
        if (i && i != 1) {
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i, 8, -i * unit);
        }
    }
};



    function rotatePoint(x, y, angle) {
        return {
            x: x * Math.cos(angle) + y * Math.sin(angle),
            y: -x * Math.sin(angle) + y * Math.cos(angle)
        };
    }



function animateParticle() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    let checkNeg = document.getElementById("angle").value;
    drawRectSystem();

    if (!rotationComplete) {
        const rotated = rotatePoint(initialX, initialY, currentAngle);
        ctx.beginPath();
        ctx.arc(rotated.x, rotated.y, particleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        
        if(checkNeg[0]=="-"){
            currentAngle -= animationSpeed;
        }else{
            currentAngle += animationSpeed;
        }
        
        if (Math.abs(currentAngle) >= Math.abs(angle)) {
            currentAngle = angle; 
            rotationComplete = true;
            rotatedPosition = rotated;
        }
    } else {
        ctx.beginPath();
        ctx.arc(rotatedPosition.x + translationX * translationProgress, rotatedPosition.y + translationY * translationProgress, particleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        
        translationProgress += animationSpeed;
        if (translationProgress >= 1) {
            translationProgress = 1; 
        }
    }
    
    if (Math.abs(currentAngle) < Math.abs(angle) || translationProgress < 1) {
        requestAnimationFrame(animateParticle);
    }
}

function startSimulation() {
    
    angle = parseFloat(document.getElementById('angle').value);
    initialX = unit * parseFloat(document.getElementById('initialX').value);
    initialY = unit * -parseFloat(document.getElementById('initialY').value);
    translationX = unit * parseFloat(document.getElementById('translationX').value);
    translationY = unit * -parseFloat(document.getElementById('translationY').value);
    
    currentAngle = 0;
    rotationComplete = false;
    translationProgress = 0;

    animateParticle();
}

document.getElementById('simulate').addEventListener('click', startSimulation);

drawRectSystem(); 
