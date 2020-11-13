(() => {
  const main = document.querySelector("main");
  
  invokeQuotesSection(main);

  /**
   * TODO: rewrite in `async/await` `fetch`
   * @param {HTMLElement} main
   */
  function invokeQuotesSection(main) {
    const quoteSec = main.querySelector(".quotescol");
    const quotePara = quoteSec.querySelector("p");

    let quoteJson;

    getQuotes('quotes.json', populateJson);

    let intervalID = window.setInterval(showQuote, 10000);

    /**
     *
     * @param {string} url
     * @param {(response:any) => void} callback
     */
    function getQuotes(url, callback) {
      let request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'json';
      request.send();

      request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 &&
          request.status === 200) {
          callback(request.response);
        }

      });
    }

    /**
     *
     * @param {any} response
     */
    function populateJson(response) {
      quoteJson = response;
    }

    /**
     *
     */
    function showQuote() {
      var random = Math.floor((Math.random() * 25));
      quotePara.textContent = quoteJson[random].quote + ' -- ' + quoteJson[random].author;
    }
  }
})();


