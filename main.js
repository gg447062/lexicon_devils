const wrappers = document.querySelectorAll('div.link-wrapper');
const links = document.querySelectorAll('a');
const devil = document.getElementById('big-devil');

const container = document.getElementById('links-container');

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

  container.style.boxShadow = `
  ${diffX / 20}px ${diffY / 30}px rgb(30, 30, 220)`;
});

function bounce() {
  devil.style.bottom = '25px';
  setTimeout(() => {
    devil.style.bottom = '15px';
  }, 1000);
}

setInterval(() => {
  bounce();
}, 2000);
