Validator("#form-1");

const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
modalClose.onclick = function () {
  modal.classList.remove("show");
};
window.addEventListener("click", function (e) {
  if (!modal.contains(e.target) && !e.target.matches(".form-submit")) {
    modal.classList.remove("show");
  }
});

function Validator(form) {
  const formElement = document.querySelector(form);
  const inputList = formElement.querySelectorAll("input");

  inputList.forEach(function (inputElement) {
    inputElement.onblur = function () {
      checkBlur(inputElement);
    };
    inputElement.onfocus = function () {
      checkFocus(inputElement);
    };
  });

  var signupBtn = formElement.querySelector(".form-submit");
  signupBtn.onclick = function (e) {
    let isValid;
    inputList.forEach(function (input) {
      isValid = checkBlur(input);
    });
    if (isValid === false) e.preventDefault();
    else {
      modal.classList.add("show");
      e.preventDefault();
    }
  };

  function checkBlur(inputElement) {
    const nameValue = formElement.querySelector("#fullname").value.trim();
    const emailValue = formElement.querySelector("#email").value.trim();
    const passValue = formElement.querySelector("#password").value.trim();
    const confirmPassValue = formElement.querySelector("#password_confirmation").value.trim();
    let message = "";

    if (inputElement.value.trim() === "") {
      errorMessage(inputElement);
      return false;
    }
    const formatName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (inputElement.name === "fullname") {
      if (formatName.test(nameValue)) {
        message = "Special characters are not allowed";
        errorMessage(inputElement, message);
        return false;
      }
    }
    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputElement.name === "email") {
      if (!formatEmail.test(emailValue)) {
        message = "Please enter a valid email address";
        errorMessage(inputElement, message);
        return false;
      }
    }

    const formatPass = /^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    if (inputElement.name === "password") {
      if (!formatPass.test(passValue)) {
        message =
          "Password between 8 and 32 characters including at least 1 uppercase, 1 lowercase";
        errorMessage(inputElement, message);
        return false;
      }
    }
    if (inputElement.name === "password_confirmation") {
      if (confirmPassValue !== passValue) {
        message = "The password and confirm password don't match";
        errorMessage(inputElement, message);
        return false;
      }
    }
  }
}

function checkFocus(inputElement) {
  getParent(inputElement).classList.remove("invalid");
  getParent(inputElement).querySelector(".form-message").innerHTML = "";
}

function errorMessage(inputElement, message) {
  getParent(inputElement).classList.add("invalid");
  getParent(inputElement).querySelector(".form-message").innerHTML =
    message || "This field is required";
}
function getParent(element) {
  return element.parentElement;
}
