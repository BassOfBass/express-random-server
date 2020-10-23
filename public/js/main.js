;(() => {
  "use strict";

  const root = document.documentElement;

  /**
   * The global footer fo the document.
   * @type HTMLElement 
   */
  const globalFooter = document.querySelector(".gfooter");

  /**
   * Dark/Light mode switch button.
   * @type HTMLButtonElement
   */
  const lightSwitcher = globalFooter.querySelector(".glightswitch");

  lightSwitcher.addEventListener("click", switchLights);

  /**
   * TODO: make it stick between page reloads by using `localStorage`.
   * 
   * TODO: switch all related colour pairs.
   */
  function switchLights() {
    let primaryColour = getComputedStyle(root).getPropertyValue("--primary-colour0");
    let secondaryColour = getComputedStyle(root).getPropertyValue("--secondary-colour0");

    console.log(primaryColour, secondaryColour);

    root.style.setProperty("--primary-colour0", secondaryColour);
    root.style.setProperty("--secondary-colour0", primaryColour);
  };
})();