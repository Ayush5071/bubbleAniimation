const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbleArray = [];
const maxBubbles = 200;

class Bubble {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 50 + 10;
    this.dx = (Math.random() - 0.5) * 3;  
    this.dy = Math.random() * 7;         
    this.hue = Math.random() * 360;      
    this.alpha = 1;                      
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.strokeStyle = `hsla(${this.hue}, 70%, 50%, ${this.alpha})`;
    context.lineWidth = 2;
    context.stroke();

    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );

    gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0.7)`);
    gradient.addColorStop(1, `hsla(${this.hue}, 70%, 30%, 0.1)`);

    context.fillStyle = gradient;
    context.fill();
  }

  move() {
    this.x += this.dx;
    this.y -= this.dy;
    this.alpha -= 0.005; 
  }

  isVisible() {
    return this.alpha > 0 && this.radius > 0;
  }
}

const createBubbles = (event) => {
  const x = event.clientX;
  const y = event.clientY;

  for (let i = 0; i < 10; i++) {
    if (bubbleArray.length < maxBubbles) {
      const bubble = new Bubble(x, y);
      bubbleArray.push(bubble);
    }
  }
};

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  bubbleArray.forEach((bubble, index) => {
    if (bubble.isVisible()) {
      bubble.move();
      bubble.draw();
    } else {
      bubbleArray.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("click", createBubbles);
canvas.addEventListener("touchstart", createBubbles);

animate();
