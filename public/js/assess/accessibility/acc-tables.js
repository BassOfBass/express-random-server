;(() => {
  "use strict";

  ResponsiveCellHeaders("Books");
  AddTableARIA();

  /**
   * [Responsive accessible table](https://adrianroselli.com/2017/11/a-responsive-accessible-table.html#MaintainFunction).
   * @param {string} elmID 
   */
  function ResponsiveCellHeaders(elmID) {

    try {
      let THarray = [];
      let table = document.getElementById(elmID);
      let tableHeaders = table.getElementsByTagName("th");

      for (let i = 0; i < tableHeaders.length; i++) {
        let headingText = tableHeaders[i].innerHTML;
        THarray.push(headingText);
      }

      let styleElm = document.createElement("style");
      /**
       * @type CSSStyleSheet
       */
      let styleSheet;

      document.head.appendChild(styleElm);
      styleSheet = styleElm.sheet;
      
      for (let i = 0; i < THarray.length; i++) {
        
        styleSheet.insertRule(`#${elmID} td:nth-child(${(i + 1)})::before {content:"${THarray[i]}: ";}`,
          styleSheet.cssRules.length
        );
      }

    } catch (e) {
      console.log("ResponsiveCellHeaders(): " + e);
    }

  }
  
  /**
   * https://adrianroselli.com/2018/02/tables-css-display-properties-and-aria.html
   * 
   * https://adrianroselli.com/2018/05/functions-to-add-aria-to-tables-and-lists.html
   */
  function AddTableARIA() {

    try {
      const allTables = document.querySelectorAll('table');

      for (let i = 0; i < allTables.length; i++) {
        allTables[i].setAttribute('role','table');
      }

      const allRowGroups = document.querySelectorAll('thead, tbody, tfoot');

      for (let i = 0; i < allRowGroups.length; i++) {
        allRowGroups[i].setAttribute('role','rowgroup');
      }

      const allRows = document.querySelectorAll('tr');

      for (let i = 0; i < allRows.length; i++) {
        allRows[i].setAttribute('role','row');
      }

      const allCells = document.querySelectorAll('td');

      for (let i = 0; i < allCells.length; i++) {
        allCells[i].setAttribute('role','cell');
      }

      const allHeaders = document.querySelectorAll('th');

      for (let i = 0; i < allHeaders.length; i++) {
        allHeaders[i].setAttribute('role','columnheader');
      }

      // this accounts for scoped row headers
      const allRowHeaders = document.querySelectorAll('th[scope=row]');

      for (let i = 0; i < allRowHeaders.length; i++) {
        allRowHeaders[i].setAttribute('role','rowheader');
      }

      // caption role not needed as it is not a real role and
      // browsers do not dump their own role with display block
    } catch (e) {
      console.log("AddTableARIA(): " + e);
    }

  }

})();