const wrappers = document.querySelectorAll('div.link-wrapper');
const links = document.querySelectorAll('a');
const devil = document.getElementById('big-devil');
const container = document.getElementById('links-container');
const linksBody = document.getElementById('links-body');
const devilSpeech = document.getElementById('devil-speech');
const flyingDevil = document.getElementById('flying-devil');
const body = document.querySelector('body');
const c1 = document.getElementById('c1');
let spoken = false;
let time = 0;
let x = 200;
let flipped = false;

const devilWords = {
  0: `the chat is over there dummy i'm just a bot`,
  1: 'lexicon devils makes you smarter.',
  2: `can i suggest try typing in the chat?
      the link to the discord is in the '...'`,
  3: 'having trouble?',
  4: `hello again,
      i think you should try the twitter.`,
};

wrappers.forEach((wrapper) => {
  wrapper.addEventListener('mouseenter', () => {
    const link = wrapper.children[0];

    link.style.transform = 'scaleX(-1.5)';
  });
});

wrappers.forEach((wrapper) => {
  wrapper.addEventListener('mouseleave', () => {
    const link = wrapper.children[0];
    link.style.transform = 'scaleX(1)';
  });
});

document.addEventListener('mousemove', (e) => {
  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;
  const mouseX = e.pageX;
  const mouseY = e.pageY;
  const diffX = midX - mouseX;
  const diffY = midY - mouseY;
  const midHeight = parseInt(container.style.height) / 2;
  const midWidth = parseInt(container.style.width) / 2;
  const offsetX = midX - midWidth;
  const offsetY = midY - midHeight;

  container.style.top = `${offsetY + diffY / 15}px`;
  container.style.left = `${offsetX + diffX / 20}px`;
  body.style.backgroundPosition = `${diffX / 100}% ${diffY / 200}%`;

  container.style.boxShadow = `
  ${diffX / 20}px ${diffY / 30}px rgb(30, 30, 220)`;
});

devil.addEventListener('mouseenter', () => {
  if (!spoken) {
    const idx = Math.floor(Math.random() * 5);
    const statement = devilWords[idx];
    devilSpeech.innerHTML = statement;
    devilSpeech.style.opacity = '1';
    spoken = true;
    setTimeout(() => {
      devilSpeech.style.opacity = '0';
    }, 3000);
    setTimeout(() => {
      devilSpeech.innerHTML = '';
      spoken = false;
    }, 4000);
  }
});

function bounce() {
  let y = 5 * Math.sin(time / 20);
  devil.style.bottom = `${y + 20}px`;
  time++;
  requestAnimationFrame(bounce);
}

function fly() {
  const increment = { true: -2, false: 2 };
  flyingDevil.style.top = `${x}px`;
  if (x === window.innerHeight - 102 || x === 128) {
    flipped = !flipped;
  }
  x += increment[flipped];

  requestAnimationFrame(fly);
}

fly();
bounce();
