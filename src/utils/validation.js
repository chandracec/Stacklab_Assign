
function validateName(name) {
    const nameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
    return nameRegex.test(name);
  }
module.exports={validateName};