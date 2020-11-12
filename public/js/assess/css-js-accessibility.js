(() => {
  const main = document.querySelector("main");
  const jsSection = main.querySelector("#jsacc1");
  const listItems = jsSection.querySelectorAll('li');
  const descHeading = jsSection.querySelector('.animal-description h2');
  const descPara = jsSection.querySelector('.animal-description p');

  listItems.forEach((item) => {
    item.addEventListener('mouseup', handleSelection);
    item.addEventListener("keydown", handleKeyboardSelection)
  })

  /**
   * 
   * @param {MouseEvent} e 
   */
  function handleSelection(e) {
    const heading = e.target.textContent;
    const description = e.target.getAttribute('data-description');
    descHeading.textContent = heading;
    descPara.textContent = description;
  }
  
  /**
   * TODO: finish it later.
   * @param {KeyboardEvent} e 
   */
  function handleKeyboardSelection(e) {}
})();