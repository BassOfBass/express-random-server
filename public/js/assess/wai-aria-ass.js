;(() => {
  "use strict";

  const main = document.querySelector("main");
  /**
   * @type HTMLElement
   */
  const animals = main.querySelector("#animalsaria");
  const listItems = animals.querySelectorAll('li');
  /**
   * @type HTMLHeadingElement
   */
  const descHeading = animals.querySelector('.animaldescription h2');
  /**
   * @type HTMLParagraphElement
   */
  const descPara = animals.querySelector('.animaldescription p');

  listItems.forEach((item) => {
    item.addEventListener('mouseup', handleSelection);
    item.addEventListener('keyup', (e) => {

      if (e.key === 'Enter') {
        handleSelection(e);
      }

    });
  })

  /**
   * TODO: type it properly
   * @param {Event} e 
   */
  function handleSelection(e) {
    const heading = e.target.textContent;
    const description = e.target.getAttribute('data-description');
    descHeading.textContent = heading;
    descPara.textContent = description;
  }
})();