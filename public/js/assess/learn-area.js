(() => {
  // allow `forEach` to be used on node lists
  NodeList.prototype.forEach = function(callback) {
    Array.prototype.forEach.call(this, callback);
  }

  const main = document.querySelector("main");

  buildCustomSelect(main);
  sendFormDataJS(main);
  
  /**
   * Adds logic to the custom select component.
   * 
   * TODOs: 
   * - Make the list properly aligned.
   * - Fix option keyboard events not working.
   * @param {HTMLElement} main The `<main>` element.
   */
  function buildCustomSelect(main) {
    /**
     * 
     * @type HTMLFormElement 
     */
    const selectForm = main.querySelector("form.no-widget");

    /** @type NodeListOf<HTMLElement> */
    const selectList = main.querySelectorAll(".select");

    // activate custom widget
    selectForm.classList.remove("no-widget");
    selectForm.classList.add("selectwidget");

    selectList.forEach((select) => {
      /** @type  NodeListOf<HTMLLIElement> */
      const optionList = select.querySelectorAll(".option");
      let selectedIndex = getIndex(select);

      select.tabIndex = 0;
      // @ts-expect-error
      select.previousElementSibling.tabIndex = -1;

      updateValue(select, selectedIndex);

      optionList.forEach((option, index) => {
        option.addEventListener("mouseover", () => {
          // the `select` and `option` variable are closures available in the scope of function call.
          highlightOption(select, option);
        });
        option.addEventListener("click", () => {
          updateValue(select, index);
        });
      });

      select.addEventListener("click", () => {
        toggleOptList(select);
      });

      // in case the control gains focus
      // the control gains the focus each time the user clicks on it or each time they use the tabulation key to access the control
      select.addEventListener("focus", () => {
        activateSelect(select, selectList);
      });

      select.addEventListener("blur", () => {
        deactivateSelect(select);
      });

      select.addEventListener("keyup", (event) => {
        let length = optionList.length;
        let index = getIndex(select);

        // deactive on keyup of `esc`
        if (event.key === "Escape" || "Esc") {
          deactivateSelect(select);
        }

        if (event.key === "ArrowDown" && index < length - 1) {
          index++;
        }

        if (event.key === "ArrowDown" && index > 0) {
          index--;
        }

        updateValue(select, index);
      });
    });

    /**
     *
     * @param {HTMLElement} select the DOM node with the `select` class to deactivate
     */
    function deactivateSelect(select) {

      // if the control is not active there is nothing to do
      if (!select.classList.contains("active"))
        return;

      /** @type HTMLUListElement */
      const optList = select.querySelector(".optlist");

      optList.classList.add("hidden");
      select.classList.remove("active");
    }

    /**
     *
     * @param {HTMLElement} select the DOM node with the `select` class to activate
     * @param {NodeListOf<HTMLElement>} selectList the list of all the DOM nodes with the `select` class
     */
    function activateSelect(select, selectList) {

      // if the control is already active there is nothing to do
      if (select.classList.contains('active'))
        return;

      selectList.forEach(deactivateSelect);
      select.classList.add("active");
    };

    /**
     *
     * @param {HTMLElement} select the DOM node with the list to toggle
     */
    function toggleOptList(select) {
      /** @type HTMLUListElement */
      const optList = select.querySelector(".optlist");
      optList.classList.toggle("hidden");
    }

    /**
     *
     * @param {HTMLElement} select The DOM node with the `select` class containing the option to highlight.
     * @param {HTMLElement} option The DOM node with the `option` class to highlight.
     */
    function highlightOption(select, option) {
      /** @type NodeListOf<HTMLLIElement> */
      const optionsList = select.querySelectorAll(".option");

      // remove the highlight from all options
      optionsList.forEach((other) => {
        other.classList.remove("highlight");
      });

      // highlight the right option
      option.classList.add('highlight');
    }

    /**
     *
     * @param {HTMLElement} select The DOM node with the class `select` containing the value to update.
     * @param {number} index The index of the value to be selected.
     */
    function updateValue(select, index) {
      /**
       * @type HTMLSelectElement
       */
      // @ts-expect-error
      const nativeWidget = select.previousElementSibling;
      /**
       * The value placeholder of the custom control.
       * @type HTMLElement
       */
      const value = select.querySelector(".value");
      /**
       * The whole list of options.
       * @type NodeListOf<HTMLElement>
       */
      const optionList = select.querySelectorAll(".option");

      optionList.forEach((other) => {
        other.setAttribute("aria-selected", "false");
      });

      optionList[index].setAttribute("aria-selected", "true");

      // set the selected index to the `index`
      nativeWidget.selectedIndex = index;
      // update the value placeholder accordingly
      value.innerHTML = optionList[index].innerHTML;

      highlightOption(select, optionList[index]);
    }

    /**
     *
     * @param {HTMLElement} select The DOM node with the class `select` related to the native control
     * @returns The current selected index in the native control.
     */
    function getIndex(select) {
      /**
       * @type HTMLSelectElement
       */
      // @ts-expect-error
      const nativeWidget = select.previousElementSibling;

      return nativeWidget.selectedIndex;
    }
  }

  /**
   * 
   * @param {HTMLElement} main 
   */
  function sendFormDataJS(main) {
    const article = main.querySelector("#formsjs");
    /**
     * @type NodeListOf<HTMLElement>
     */
    const sections = article.querySelectorAll(`#${article.id}> section`);
    const funcs = [
      sendSimpleXHR
    ]

    // iterate through the list of sections and invoke related functions
    for (const [index, section] of sections.entries()) {
      funcs[index](section);
    }

    /**
     * TODO: rewrite in async/await.
     * @param {HTMLElement} section 
     */
    function sendSimpleXHR(section) {
      const button = section.querySelector("button");
      const output = section.querySelector("output");

      button.addEventListener( 'click', () => {
        sendData( {test:'ok'}, output );
      });

      /**
       * 
       * @param {{}} data 
       * @param {HTMLOutputElement} output
       */
      function sendData(data, output) {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        // Push our data into our FormData object
        for ( const name in data ) {
          formData.append(name, data[name]);
        }

        // Define what happens on successful data submission
        xhr.addEventListener( 'load', (event) => {
          output.innerText = 'Yeah! Data sent and response loaded.';
        } );

        // Define what happens in case of error
        xhr.addEventListener( 'error', (event) => {
          output.innerText = 'Oops! Something went wrong.';
        } );

        // Set up our request
        xhr.open( 'POST', 'https://example.com/cors.php' );

        // Add the required HTTP header for form data POST requests
        xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

        // Finally, send our data.
        xhr.send( formData );
      }
    }
  }
})();

