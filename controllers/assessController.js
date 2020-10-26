// Forms section

/**
 * @param {*} req 
 * @param {*} res 
 */
function invokeFormStructure(req, res) {
  res.render("forms/form-structure");
};

/**
 * @param {*} req 
 * @param {*} res 
 */
function invokeBasicControls(req, res) {
  res.render("/forms/basic-controls");
};

/**
 * @param {*} req 
 * @param {*} res 
 */
function invokeHTML5Controls(req, res) {
  res.render("/forms/html5-controls");
};

/**
 * @param {*} req 
 * @param {*} res 
 */
function invokeOtherControls(req, res) {
  res.render("/forms/other-controls");
};

/**
 * @param {*} req 
 * @param {*} res 
 */
function invokeStylingBasics(req, res) {
  res.render("/forms/styling-basics");
};

/**
 * @param {*} req 
 * @param {*} res 
 */
function invokeAdvancedStyling(req, res) {
  res.render("/forms/advanced-styling");
};

/**
 * @param {*} req 
 * @param {*} res 
 */
function invokeFormValidation(req, res) {
  res.render("/forms/form-validation");
};

export default {
  invokeFormStructure,
  invokeBasicControls,
  invokeHTML5Controls,
  invokeOtherControls,
  invokeStylingBasics,
  invokeAdvancedStyling,
  invokeFormValidation,
};