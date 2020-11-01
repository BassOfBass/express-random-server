(() => {
  /** @type HTMLInputElement */
  const invite = document.querySelector('#max-invite');
  /** @type HTMLOutputElement */
  const output = document.querySelector('.invite-output');

  output.textContent = invite.value;

  invite.addEventListener('input', function() {
    output.textContent = invite.value;
  });

})();