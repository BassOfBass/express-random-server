;(() => {
  "use strict";
  
  const header = document.querySelector(".gheader");
  const main = document.querySelector("main");
  const footer = document.querySelector(".gfooter");

  invokeMain(main);

  /**
   * 
   * @param {HTMLElement} main 
   */
  function invokeMain(main) {
    /* functionality for showing/hiding the comments section */
    /**
     * @type HTMLButtonElement
     */
    const showHideBtn = main.querySelector('.show-hide > button');
    /**
     * @type HTMLElement
     */
    const commentWrapper = main.querySelector('.comment-wrapper');

    // functionality for adding a new comment via the comments form
    const form = main.querySelector('.comment-form');
    const nameField = form.querySelector('[name="name"]');
    const commentField = form.querySelector('[name="comment"]');
    const list = main.querySelector('.comment-container');

    commentWrapper.style.display = 'none';

    showHideBtn.addEventListener("click", () => {
      let showHideText = showHideBtn.textContent;

      if(showHideText === 'Show comments') {
        showHideBtn.textContent = 'Hide comments';
        commentWrapper.style.display = 'block';
      } else {
        showHideBtn.textContent = 'Show comments';
        commentWrapper.style.display = 'none';
      }

    });
    form.addEventListener("submit", handleSubmit);  

    /**
     * 
     * @param {Event} e 
     */
    function handleSubmit(e) {
      e.preventDefault();

      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');
      const nameValue = nameField.value;
      const commentValue = commentField.value;

      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameField.value = '';
      commentField.value = '';
    }
  };
  
})();

