;(() => {
  "use strict";

  /** The color settings for the whole document. */
  const colorTheme = {
    basic: {},

    anchors: { basic: "", local: ""},

    buttons: { 
      default: "", 
      positive: "", 
      negative: "", 
      submit: "" 
    },
  }

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
   * TODO: switch all related colour pairs:
   * - primary colours from 0 to 6
   * - anchors and local anchors 
   */
  function switchLights() {
    let primaryColour = getComputedStyle(root).getPropertyValue("--primary-colour0");
    let secondaryColour = getComputedStyle(root).getPropertyValue("--secondary-colour0");

    console.log(primaryColour, secondaryColour);

    root.style.setProperty("--primary-colour0", secondaryColour);
    root.style.setProperty("--secondary-colour0", primaryColour);
  };
})();