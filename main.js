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
const headerLink = document.getElementById('header-link');
const messages = document.getElementById('messages-container');
const chatSwitch = document.getElementById('chat-switch');

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
  'hee hee hee',
  "you're outta luck",
];

headerLink.onclick = (e) => {
  if (clicked < 1) {
    e.preventDefault();
    headerDevil.setAttribute('src', 'assets/devil_hands.png');
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

devil.addEventListener('mouseenter', () => {
  if (!display) {
    devilSpeech.style.opacity = 1;
  }
});

devil.addEventListener('mouseleave', () => {
  devilSpeech.style.opacity = 0;
});

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
    // devilResponse();
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

bounce();
