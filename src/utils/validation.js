
function validateName(name) {
  // Regular expression to validate the name format
  const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;

  // Test the name against the regular expression
  return nameRegex.test(name);
}

// Export the validateName function
module.exports = { validateName };
