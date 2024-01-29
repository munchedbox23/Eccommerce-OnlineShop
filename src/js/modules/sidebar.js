const sidebar = (barSelector, navSelector) => {
  /* Declaring Variables */
  const bar = document.querySelector(barSelector),
        nav = document.querySelector(navSelector),
        closeBtn = document.querySelector('[data-close]');

  /* Events */
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
  closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
  });
};

export default sidebar;
