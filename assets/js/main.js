const $ = document.querySelector.bind(document);

Validator("#form-1");

//? Handle Modal
const modal = $(".modal");
const modalClose = $(".modal-close");
modalClose.onclick = function () {
  modal.classList.remove("show");
};

window.addEventListener("click", function (e) {
  if (!modal.contains(e.target) && !e.target.matches(".form-submit")) {
    modal.classList.remove("show");
  }
});

//? Handle Validate Form

function Validator(form) {
  const formElement = $(form);
  const $$form = formElement.querySelector.bind(formElement);
  const inputList = formElement.querySelectorAll("input");

  //? Handle disabled submit

  setInterval(function () {
    checkSubmit();
  }, 0);
  let isValid = true;

  function checkSubmit() {
    var passValue = $$form("#password").value.trim();
    var confirmPassValue = $$form("#password_confirm").value.trim();

    inputList.forEach(function (input) {
      if (
        input.value === "" ||
        getParent(input).classList.contains("invalid") ||
        passValue !== confirmPassValue
      ) {
        isValid = false;
        submitBtn.setAttribute("disabled", "true");
        submitBtn.classList.remove("isActive");
      } else isValid = true;
    });
    if (isValid === true) {
      submitBtn.removeAttribute("disabled");
      submitBtn.classList.add("isActive");
    }
  }

  inputList.forEach(function (inputElement) {
    inputElement.onblur = function () {
      checkBlur(inputElement);
    };
    inputElement.onfocus = function () {
      checkFocus(inputElement);
    };
  });

  const submitBtn = $$form(".form-submit");
  submitBtn.onclick = function (e) {
    e.preventDefault();
    modal.classList.add("show");
  };

  //? Handle Blur

  function checkBlur(inputElement) {
    const nameValue = getValueById("#fullname");
    const emailValue = getValueById("#email");
    const passValue = getValueById("#password");
    const confirmPassValue = getValueById("#password_confirm");
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
    if (inputElement.name === "password_confirm") {
      if (confirmPassValue !== passValue) {
        message = "The password and confirm password don't match";
        errorMessage(inputElement, message);
        return false;
      }
    }

    function getValueById(inputElement) {
      return $$form(inputElement).value.trim();
    }
  }
}

//? Handle Focus
function checkFocus(inputElement) {
  getParent(inputElement).classList.remove("invalid");
  getParent(inputElement, ".form-message").innerHTML = "";
}

function errorMessage(inputElement, message) {
  getParent(inputElement).classList.add("invalid");
  getParent(inputElement, ".form-message").innerHTML =
    message || "This field is required";
}

function getParent(element, target = null) {
  const parent = element.parentElement;
  return target ? parent.querySelector(target) : parent;
}
