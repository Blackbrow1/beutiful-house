const menuButton = document.querySelector('.header__toggle');
const nav = document.querySelector('.nav');

const navItemMaterials = document.querySelector('.nav__item-materials');
const navMaterials = document.querySelector('.nav__materials');
const navButtonBack = document.querySelector('.nav__button-back');
const navMaterialsItem = document.querySelectorAll('.nav__materials-item');

const buttons = document.querySelectorAll('.button');
const popup = document.querySelector('.popup');
const popupQuit = document.querySelector('.popup__quit');

const backgroundOverlay = document.querySelector('.background-overlay');

menuButton.addEventListener ('click', function (evt) {
  evt.preventDefault();
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
    menuButton.classList.remove('header__toggle--open');
    menuButton.classList.add('header__toggle--close');
    document.body.style.overflow = "hidden";
  } else {
    nav.classList.add('nav--closed');
    menuButton.classList.add('header__toggle--open');
    menuButton.classList.remove('header__toggle--close');
    document.body.style.overflow = "visible";
  }
});

navItemMaterials.addEventListener('click',  () => {
  navMaterials.classList.remove('nav__materials--closed');
});

menuButton.addEventListener('click', () => {
  navMaterials.classList.add('nav__materials--closed');
});

navButtonBack.addEventListener('click', (event) => {
  event.stopImmediatePropagation()
  navMaterials.classList.add('nav__materials--closed');
});

navMaterialsItem.forEach((item) => item.addEventListener('click', () => {
  nav.classList.add('nav--closed');
  navMaterials.classList.add('nav__materials--closed');
  document.body.style.overflow = "visible";
  menuButton.classList.add('header__toggle--open');
  menuButton.classList.remove('header__toggle--close');
}));

const name = popup.querySelector('[name=name]');

buttons.forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    popup.classList.add('popup--show');
    backgroundOverlay.classList.add('background-overlay--show');
    name.focus();
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

const footerNavItemMaterials = document.querySelector('.footer__nav-item--materials');
const footerMaterials = document.querySelector('.footer__materials');

footerNavItemMaterials.addEventListener('click', function () {
  if (footerMaterials.classList.contains('footer__materials--show')) {
    footerMaterials.classList.remove('footer__materials--show');
  } else {
    footerMaterials.classList.add('footer__materials--show');
  }
});

const navItemMob = document.querySelectorAll('.nav__item-mob');

navItemMob.forEach((item) => item.addEventListener('click', () => {
  nav.classList.add('nav--closed');
  navMaterials.classList.add('nav__materials--closed');
  document.body.style.overflow = "visible";
  menuButton.classList.add('header__toggle--open');
  menuButton.classList.remove('header__toggle--close');
}));

// const phone = popup.querySelector('[name=tel]');
// const form = popup.querySelector('form');

// form.addEventListener('submit', function(evt) {
//   if (!name.value || !phone.value) {
//     evt.preventDefault();
//     popup.classList.add('modal-error');
//   }
// });

// window.onload = function(){
//   const divToHide = document.querySelector('.footer__materials');
//   document.onclick = function(e){
//     if(e.target.id !== 'divToHide'){
//       //element clicked wasn't the div; hide the div
//       divToHide.style.display = 'none';
//     }
//   };
// };


// var modal = document.querySelector('.footer__materials');

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
