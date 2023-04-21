const menuButton = document.querySelector('.header__toggle--open');
const nav = document.querySelector('.nav');

const navItemMaterials = document.querySelector('.nav__item-materials');
const navMaterials = document.querySelector('.nav__materials');

const headerToggleBack = document.querySelector('.header__toggle-back');

function onNavItemMaterials() {
  navMaterials.style.display = 'block';
  headerToggleBack.style.display = 'block';
};

menuButton.addEventListener ('click', function (evt) {
  evt.preventDefault();
  if (menuButton.classList.contains('header__toggle--open')) {
    menuButton.classList.remove('header__toggle--open');
    menuButton.classList.add('header__toggle--close');
    nav.style.display = 'block';
    navItemMaterials.addEventListener('click',  onNavItemMaterials);
  } else {
    menuButton.classList.remove('header__toggle--close');
    menuButton.classList.add('header__toggle--open');
    nav.style.display = 'none';
    headerToggleBack.style.display = 'none';
    navMaterials.style.display = 'none';
    navItemMaterials.removeEventListener('click',  onNavItemMaterials);
  }
});

headerToggleBack.addEventListener('click', () => {
  navMaterials.style.display = 'none';
  headerToggleBack.style.display = 'none';
});


