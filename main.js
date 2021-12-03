const links = document.querySelectorAll('a');
const devil = document.getElementById('big-devil');
const chat = document.getElementById('chat_container');
const chatbox = document.getElementById('devil-chat');
const devilForm = document.getElementById('devil-form');
const input = document.getElementById('devil_chat_input');
const button = document.getElementById('chat-button');
const fg = document.getElementById('fg_img');
const bg = document.getElementById('bg_img');
const devilSpeech = document.getElementById('devil-speech');
const flyingDevil = document.getElementById('flying-devil');
const body = document.querySelector('body');
const headerLink = document.getElementById('header-link');
const messages = document.getElementById('messages-container');

const hasTouchscreen = 'ontouchstart' in window;
alert(hasTouchscreen ? 'has touchscreen' : "doesn't have touchscreen");

let spoken = false;
let time = 0;
let clicked = 0;

const devilWords = [
  `the chat is over there dummy i'm just a bot`,
  'lexicon devils makes you smarter.',
  `can i suggest try typing in the chat? the link to the discord is in the '...'`,
  'having trouble?',
  `hello again, i think you should try the twitter.`,
  "I'm the devil >:)",
  "I'm a lexicon devil with a battered brain",
];

headerLink.onclick = (e) => {
  if (clicked < 1) {
    e.preventDefault();
    flyingDevil.setAttribute('src', 'assets/devil_hands.png');
    clicked++;
  }
  if (clicked < 2) {
    setTimeout(() => {
      clicked++;
      headerLink.click();
    }, 500);
  }
};

// wrappers.forEach((wrapper) => {
//   wrapper.addEventListener('mouseenter', () => {
//     const link = wrapper.children[0];

//     link.style.transform = 'scaleX(-1.5)';
//   });
// });

// wrappers.forEach((wrapper) => {
//   wrapper.addEventListener('mouseleave', () => {
//     const link = wrapper.children[0];
//     link.style.transform = 'scaleX(1)';
//   });
// });

document.addEventListener('mousemove', (e) => {
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
  body.style.backgroundPosition = `${diffX / 100}% ${diffY / 200}%`;
});

let display = false;
const heights = {
  true: ['600px', '300px', '35px', '25px'],
  false: ['300px', '0px', '0px', '0px'],
};
const opacityStyle = { true: '1', false: '0' };

devil.onclick = () => {
  display = !display;
  chat.style.height = heights[display][0];
  chatbox.style.opacity = opacityStyle[display];
  chatbox.style.height = heights[display][1];
  devilForm.style.height = heights[display][2];
  input.style.height = heights[display][3];
  button.style.height = heights[display][3];
  if (display) {
    devilSpeech.style.opacity = 0;
  }
};

devil.addEventListener('mouseenter', () => {
  if (!display) {
    devilSpeech.style.opacity = 1;
  }
});

devil.addEventListener('mouseleave', () => {
  devilSpeech.style.opacity = 0;
});

const bounce = () => {
  let y = 5 * Math.sin(time / 20);
  devil.style.top = `${y - 20}px`;
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
    }, 1000);
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

const devilResponse = () => {
  const index = Math.floor(Math.random() * devilWords.length);
  let newMessage = document.createElement('li');
  newMessage.innerHTML = devilWords[index];
  newMessage.className = 'devil message';
  newMessage = messages.appendChild(newMessage);
};

bounce();
