const logo = document.querySelector(".user_logo");
const form = document.querySelector(".login_form");

logo.addEventListener("click", () => {
  form.classList.toggle("active");
});

// Olvidaste Password
function random_code_generate(max, min) {
  const codeChars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^*_";
  const CharMath = Math.floor(Math.random() * (max - min + 1)) + min;
  const randCode = Array(CharMath)
    .fill(codeChars)
    .map(function(x) {
      return x[Math.floor(Math.random() * x.length)];
    })

    .join("");
  return randCode;
}

// Pantalla

document.getElementById("generateCode").addEventListener("click", function() {
  
  // Identificación del usuario y mostrar
  const getUserID =
    document.getElementById("UserName").value +
    "<br>" +
    document.getElementById("UserEmail").value;
  const DisplayUserID = (document.getElementById(
    "DisplayUserName"
  ).innerHTML = getUserID);

  // Seccion de Identificacion

  // Mostrar Codigo Solicitado
  random_code = random_code_generate(10, 5);
  
  // Obtener campo solicitado 
  const displayCodeContainer = document.getElementById("requestCode_container");

  const requestCode = document.getElementById("requestCode");
  requestCode.value = random_code;

  const newPassword = document.getElementById("newPassword");

  const userName = document.getElementById("UserName");
  const userEmail = document.getElementById("UserEmail");
  if (userName.value === "" || userEmail.value === "") {
    newPassword.style.display = "none";
    displayCodeContainer.style.display = "none";
  } else {

    // Mostrar Codigo
    displayCodeContainer.style.display = "block";

    // Borrar campos
    userName.value = "";
    userEmail.value = "";

    // Formulario Nuevo Password
    newPassword.style.display = "block";
  }
});

// Mostrar Contraseña Oculta
const x = document.getElementById("NewPassword-1");
const y = document.getElementById("NewPassword-2");

function ShowPassword() {
  if (x.type === "password" && y.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}
document.querySelector("#ShowPassword").addEventListener("click", ShowPassword);

// Iniciar Compruebe si los campos no están vacíos y Password 
const VerifyRequestCode = document.getElementById("VerifyRequestCode");
const RequestCode = document.getElementById("requestCode");
function resetPassword() {
  
  //  Verifique si todos los campos están completos
  if (x.value !== y.value || (x.value == "" && y.value == "")) {
    alert("Place check if: Passwords Mach and All fields are completed ");
  }

  // Compruebe si el código de reinicio coincide
  else if (VerifyRequestCode.value !== RequestCode.value) {
    alert("Verification Code is Not Correct ");
  } else {
    alert("Password Reset Successful");
  }
}

// Funcion de Reset
document
  .getElementById("resetPassword")
  .addEventListener("click", resetPassword);

