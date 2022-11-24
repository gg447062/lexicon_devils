const links = document.querySelectorAll('a');
const devil = document.getElementById('big-devil');
const chat = document.getElementById('chat-container');
const chatbox = document.getElementById('devil-chat');
const devilForm = document.getElementById('devil-form');
const input = document.getElementById('devil-chat-input');
const button = document.getElementById('chat-button');
const fg = document.getElementById('fg-img');
const bg = document.getElementById('bg-img');
const devilSpeech = document.getElementById('devil-speech');
const headerDevil = document.getElementById('header-devil');
const body = document.querySelector('body');
const messages = document.getElementById('messages-container');
const chatSwitch = document.getElementById('chat-switch');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let spoken = false;
let time = 0;

const devilWords = [
  `the chat is over there dummy, i'm just a bot. click the discord link over to your left`,
  'may i suggest trying the chat? click the discord link in the left corner of your screen',
  `you sure like to chat, huh? we are @devilslexicon on twitter. try the link in the bottom left`,
  `you look lost pal, get back to headquarters! the link to Lexicon HQ is just to the left`,
  'having trouble?',
  "I'm the devil >:)",
  "I'm a lexicon devil with a battered brain",
  'hee hee hee',
  'All outta luck',
];

const moveBg = (e) => {
  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;
  const diffX = midX - e.pageX;
  const diffY = midY - e.pageY;
  const midHeight = fg.height * 0.65;
  const fgMidWidth = fg.width / 2;
  const bgMidWidth = bg.width / 2;
  const bgOffsetX = midX - bgMidWidth;
  const fgOffsetX = midX - fgMidWidth;
  const offsetY = midY - midHeight;

  fg.style.top = `${offsetY + diffY / 15}px`;
  fg.style.left = `${fgOffsetX + diffX / 20}px`;
  bg.style.top = `${offsetY - diffY / 5}px`;
  bg.style.left = `${bgOffsetX - diffX / 10}px`;
};

document.addEventListener('mousemove', (e) => {
  moveBg(e);
});
document.addEventListener('touchmove', (e) => {
  moveBg(e);
});

let display = false;
const heights = {
  true: ['600px', '300px', '35px', '25px'],
  false: ['300px', '0px', '0px', '0px'],
};
const mobileHeights = {
  true: ['300px', '300px', '50px', '35px'],
  false: ['55px', '0px', '0px', '0px'],
};
const opacityStyle = { true: '1', false: '0' };

const displayDesktopChat = () => {
  chat.style.height = heights[display][0];
  chatbox.style.opacity = opacityStyle[display];
  chatbox.style.height = heights[display][1];
  devilForm.style.height = heights[display][2];
  input.style.height = heights[display][3];
  button.style.height = heights[display][3];
};

const displayMobileChat = () => {
  chat.style.height = mobileHeights[display][0];
  devil.style.opacity = opacityStyle[display];
  chatbox.style.opacity = opacityStyle[display];
  chatbox.style.height = mobileHeights[display][1];
  devilForm.style.height = mobileHeights[display][2];
  input.style.height = mobileHeights[display][3];
  button.style.height = mobileHeights[display][3];
};

const changeDisplay = (callback) => {
  display = !display;
  callback();
  if (display) {
    devilSpeech.style.opacity = 0;
    setTimeout(() => {
      devilResponse('welcome');
    }, 1000);
  }
};

if (window.innerWidth < 600) {
  chatSwitch.onclick = () => {
    changeDisplay(displayMobileChat);
  };
} else {
  devil.onclick = () => {
    changeDisplay(displayDesktopChat);
  };
}

if (window.innerWidth > 600) {
  devil.addEventListener('mouseenter', () => {
    if (!display) {
      devilSpeech.style.opacity = 1;
    }
  });

  devil.addEventListener('mouseleave', () => {
    devilSpeech.style.opacity = 0;
  });
}

const bounce = () => {
  const y = 5 * Math.sin(time / 20);
  if (window.innerWidth < 600) {
    const y = 5 * Math.sin(time / 15);
    devil.style.bottom = `${y + 55}px`;
  } else {
    devil.style.top = `${y - 20}px`;
  }
  time++;
  requestAnimationFrame(bounce);
};

let message;

input.onchange = (e) => {
  message = e.target.value;
};

devilForm.onsubmit = (e) => {
  e.preventDefault();
  if (message.length > 0) {
    writeMessage();

    setTimeout(() => {
      devilResponse();
    }, 500);
    devilForm.reset();
    message = '';
  }
};

const writeMessage = () => {
  let newMessage = document.createElement('li');
  newMessage.innerHTML = message;
  newMessage.className = 'user message';
  newMessage = messages.appendChild(newMessage);
};

const devilResponse = (content = '') => {
  const index = Math.floor(Math.random() * devilWords.length);
  let newMessage = document.createElement('li');

  if (content) {
    newMessage.innerHTML = content;
  } else {
    newMessage.innerHTML = '...';
    setTimeout(() => {
      newMessage.innerHTML = devilWords[index];
    }, 1000);
  }

  newMessage.className = 'devil message';
  newMessage = messages.appendChild(newMessage);
};

let img;
let maxParticles = 15;
let emitted = 0;
let timestamp = -1;
let particleArray = [];
let deadParticles = [];

const init = () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  img = new Image(50, 50);
  img.src = 'assets/Lexicon_Devil_Germs.png';
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

class Particle {
  constructor(x, y, directionX, directionY, size) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
  }

  reset(x, y, directionX, directionY, size) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
  }

  draw() {
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += this.directionX;
    if (this.y < -100) {
      this.directionY *= -1.2;
    }
    this.y += this.directionY;
    this.size -= 0.4;
    this.draw();
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function emitParticles() {
  const newX = getRandomInt(-1, 10);

  if (!deadParticles.length) {
    particleArray.push(new Particle(10, 10, newX, -10, 60));
  } else {
    const currentDead = deadParticles.pop();

    currentDead.reset(10, 10, newX, -10, 60);
    particleArray.push(currentDead);
  }
}

function animate() {
  timestamp += 1;
  if (emitted < maxParticles && !(timestamp % 4)) {
    emitParticles();
    emitted += 1;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleArray.length; i++) {
    const currentParticle = particleArray[i];
    if (currentParticle.y > canvas.height) {
      deadParticles.push(currentParticle);
      particleArray = particleArray
        .slice(0, i)
        .concat(particleArray.slice(i + 1));
    } else {
      currentParticle.update();
    }
  }
  if (particleArray.length > 0) {
    window.requestAnimationFrame(animate);
  } else return;
}

headerDevil.onclick = () => {
  timestamp = -1;
  emitted = 0;
  animate();
  headerDevil.setAttribute('src', 'assets/devil_hands.png');
  setTimeout(() => {
    headerDevil.setAttribute('src', 'assets/Lexicon_Devil_Germs.png');
  }, 2500);
};

init();
bounce();
