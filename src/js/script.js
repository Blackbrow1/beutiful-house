const menuButton = document.querySelector('.header__toggle--open');
const nav = document.querySelector('.nav');

const navItemMaterials = document.querySelector('.nav__item-materials');
const navMaterials = document.querySelector('.nav__materials');

const headerToggleBack = document.querySelector('.header__toggle-back');

const buttons = document.querySelectorAll('.button');
const popup = document.querySelector('.popup');
const popupQuit = document.querySelector('.popup__quit');

const backgroundOverlay = document.querySelector('.background-overlay');

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
    //document.body.style.overflow = "hidden";
  } else {
    menuButton.classList.remove('header__toggle--close');
    menuButton.classList.add('header__toggle--open');
    nav.style.display = 'none';
    headerToggleBack.style.display = 'none';
    navMaterials.style.display = 'none';
    navItemMaterials.removeEventListener('click',  onNavItemMaterials);
    //document.body.style.overflow = "visible";
  }
});

headerToggleBack.addEventListener('click', () => {
  navMaterials.style.display = 'none';
  headerToggleBack.style.display = 'none';
});

buttons.forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    popup.classList.add('popup--show');
    backgroundOverlay.classList.add('background-overlay--show');
  })
})

popupQuit.addEventListener('click', () => {
  popup.classList.remove('popup--show');
  backgroundOverlay.classList.remove('background-overlay--show');
})

window.addEventListener('keydown', function (evt) {
  if (evt.key === 'Esc' || evt.key === 'Escape') {
    if (popup.classList.contains('popup--show')) {
      evt.preventDefault();
      popup.classList.remove('popup--show');
      backgroundOverlay.classList.remove('background-overlay--show');
    }
  }
});
