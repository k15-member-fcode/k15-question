export const nameValidation = "[a-zA-Z ]+$";
export const studentIdValidation = /^(15[0-2]{1}[0-9]{3})$/;

export const toTitleCase = str => {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  
