document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const menuItems = document.querySelectorAll('.menu a');
  const menuClass = 'active';


  hamburger.addEventListener('click', event => {

    if (menu.classList.contains(menuClass)) {
      menu.classList.remove(menuClass);

    } else {
      menu.classList.add(menuClass);
    }

  });


  menuItems.forEach(element => {

    element.addEventListener('click', event => {
      const href = event.target.getAttribute('href');
      const isAnchor = href.startsWith('#');


      if (isAnchor) {
        const section = document.querySelector(href);

        section.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });

        event.preventDefault();
      }

      menu.classList.remove(menuClass);
    });

  });

});