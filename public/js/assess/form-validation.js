(() =>  {

  /** @type HTMLFormElement */
  const validForm = document.querySelector("#jsvalidation");

  /** @type HTMLInputElement */
  const email = validForm.querySelector(`input[type="email"]`);

  const formValidity = {
    email: email.validity,
  };

  /** @type HTMLButtonElement */
  const submitButton = validForm.querySelector(`button[type="submit"]`);

  const output = validForm.querySelector("output");

  email.required = true;
  email.minLength = 10;

  validForm.addEventListener("submit", handleSubmission);

  /**
   * 
   * @param {Event} e 
   */
  async function handleSubmission(e) {
    
    try {
      e.preventDefault();
      submitButton.disabled = true;
      submitButton.innerText = "Submitting..."
      await setTimeout(() => {}, 1500);
      
      if ( !formValidity.email.valid ) { // email is not valid
        throw new Error(generateError())
      }

      submitButton.disabled = false;
      submitButton.innerText = "Successfully submitted";
    } catch (error) {
      output.innerText = error;
      submitButton.disabled = false;
      submitButton.innerText = "Submit";
    }

  };
  
  function generateError() {
    
    if (email.validity.valueMissing) { // the field is empty

      return 'You need to enter an e-mail address.';

    } else if (email.validity.typeMismatch) { // the field doesn't contain an email address

      return 'Entered value needs to be an e-mail address.';

    } else if (email.validity.tooShort) { //the data is too short
      return `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
    }
    
  }
})();