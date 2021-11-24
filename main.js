const container = document.getElementById('links_container1');
let spoken = false;

const devilWords = {
  0: 'fuck off',
  1: 'hee hee hee',
  2: 'click the damn link',
  3: `it's boring there`,
  4: 'bad choice',
};

document.addEventListener('mousemove', (e) => {
  const mouseX = e.pageX;
  const mouseY = e.pageY;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const diffX = centerX - mouseX;
  const diffY = centerY - mouseY;

  const midHeight = parseInt(container.style.height) / 2;
  const midWidth = parseInt(container.style.width) / 2;

  container.style.top = `${centerY - midHeight + diffY / 30}px`;
  container.style.left = `${centerX - midWidth + diffX / 15}px`;
});

container.addEventListener('mouseenter', () => {
  if (spoken === false) {
    spoken = true;
    const words = document.getElementById('devil-words');

    const random = Math.floor(Math.random() * 5);

    words.innerHTML = devilWords[random];

    setTimeout(() => {
      words.innerHTML = '';
      spoken = false;
    }, 3000);
  }
});
