// CURSOR
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", e => {
cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";
});

// MAGNETIC EFFECT
document.querySelectorAll(".magnetic").forEach(btn => {
btn.addEventListener("mousemove", e => {
const rect = btn.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;

btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
});

btn.addEventListener("mouseleave", () => {
btn.style.transform = "translate(0,0)";
});
});

// SMOKE EFFECT (VISIBLE BEHIND HERO TEXT)
const canvas = document.getElementById("smokeCanvas");
const ctx = canvas.getContext("2d");

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

function smoke(x, y){
particles.push({
x,
y,
size:Math.random()*25+10,
alpha:1
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach((p,i)=>{
ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.08})`;
ctx.beginPath();
ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
ctx.fill();

p.y -= 0.6;
p.alpha -= 0.008;

if(p.alpha <= 0){
particles.splice(i,1);
}
});

requestAnimationFrame(animate);
}

animate();

// SMOKE TRIGGER (MOUSE + TOUCH)
document.addEventListener("mousemove", e=>{
smoke(e.clientX, e.clientY);
});

document.addEventListener("touchmove", e=>{
const touch = e.touches[0];
smoke(touch.clientX, touch.clientY);
});
