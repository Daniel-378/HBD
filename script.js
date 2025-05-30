// script.js

// Surprise message toggle (Home page)
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseDiv = document.getElementById('surprise');

if(surpriseBtn && surpriseDiv){
  surpriseBtn.addEventListener('click', () => {
    surpriseDiv.classList.toggle('hidden');
    // Animate scroll to surprise messages on reveal
    if(!surpriseDiv.classList.contains('hidden')){
      surpriseDiv.scrollIntoView({behavior: 'smooth'});
      surpriseBtn.textContent = 'Tutup Kejutan 🎁';
    } else {
      surpriseBtn.textContent = 'Buka Kejutan 🎁';
    }
  });
}

// Cartoon character interaction for fun bounce
const character = document.getElementById('character-container');
if(character){
  character.addEventListener('mouseenter', () => {
    character.style.transform = 'scale(1.1) rotate(7deg)';
  });
  character.addEventListener('mouseleave', () => {
    character.style.transform = 'scale(1) rotate(0)';
  });
  // playful click bounce
  character.addEventListener('click', () => {
    character.style.transition = 'transform 0.3s ease';
    character.style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => {
      character.style.transform = 'scale(1) rotate(0)';
    }, 400);
  });
}

// Balloon interaction - subtle scale on hover/click
const balloons = document.querySelectorAll('.balloon');
balloons.forEach(balloon => {
  balloon.addEventListener('mouseenter', () => {
    balloon.style.transform = 'scale(1.15) rotate(10deg)';
    balloon.style.transition = 'transform 0.3s ease';
  });
  balloon.addEventListener('mouseleave', () => {
    balloon.style.transform = 'scale(1) rotate(0deg)';
  });
  balloon.addEventListener('click', () => {
    balloon.style.transition = 'transform 0.2s ease';
    balloon.style.transform = 'scale(1.4) translateY(-20px)';
    setTimeout(() => {
      balloon.style.transform = 'scale(1) translateY(0)';
    }, 300);
  });
});

// Confetti animation
(() => {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const colors = [
    '#ff6f91',
    '#ff9671',
    '#f9f871',
    '#44d7b6',
    '#6a11cb',
    '#2575fc',
  ];

  class Confetto {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * -H;
      this.size = Math.random() * 8 + 4;
      this.speed = Math.random() * 3 + 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.tilt = Math.random() * -10 + 10;
      this.tiltAngle = 0;
      this.tiltAngleIncrement = (Math.random() * 0.1) + 0.05;
    }

    update() {
      this.tiltAngle += this.tiltAngleIncrement;
      this.y += this.speed;
      this.x += Math.sin(this.tiltAngle) * 0.5;
      this.tilt = Math.sin(this.tiltAngle) * 15;

      if(this.y > H){
        this.x = Math.random() * W;
        this.y = -10;
        this.speed = Math.random() * 3 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
    }

    draw() {
      ctx.beginPath();
      ctx.lineWidth = this.size / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.size / 4, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.size / 4);
      ctx.stroke();
    }
  }

  const confettiCount = 150;
  const confetti = [];

  function initConfetti(){
    for(let i=0; i < confettiCount; i++){
      confetti.push(new Confetto());
    }
  }

  function drawConfetti(){
    ctx.clearRect(0, 0, W, H);
    confetti.forEach(c => {
      c.update();
      c.draw();
    });
    requestAnimationFrame(drawConfetti);
  }

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });

  initConfetti();
  drawConfetti();
})();

// Background music toggle
const musicBtn = document.getElementById('music-toggle');
const music = document.getElementById('music');

if(musicBtn && music){
  let playing = false;
  musicBtn.addEventListener('click', () => {
    if(playing){
      music.pause();
      musicBtn.textContent = '▶️ Putar Musik';
    } else {
      music.play().catch(() => alert('Autoplay diblok, klik tombol ini lagi'));
      musicBtn.textContent = '⏸ Hentikan Musik';
    }
    playing = !playing;
  });
}
