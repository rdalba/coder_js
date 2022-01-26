// Almacenamiento de usuario local

// Formulario
const createAccount = document.getElementById("CreateAccount");

// Inputs
const firstName = document.getElementById("FirstName");
const lastName = document.getElementById("LastName");
const userPhone = document.getElementById("UserPhone");
const userEmail = document.getElementById("UserEmail");
const userPassword_1 = document.getElementById("UserPassword-1");
const userPassword_2 = document.getElementById("UserPassword-2");

// Tabla
const userList = document.getElementById("user-list");

// Interface

// Creacion de Usuario
function CreateUser(firstName, lastName, userPhone, userEmail, userPassword_1,userPassword_2) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.userPhone = userPhone;
  this.userEmail = userEmail;
  this.password = userPassword_1;
  this.password2 = userPassword_2;
}

// UInterface Usuario

class UI {
  static displayUsers() {
    const users = Store.getUsers();

    users.forEach(user => UI.addUserToList(user));
  }

  static addUserToList(user) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.userPhone}</td>
        <td>${user.userEmail}</td>
        <td>${user.password}</td>
        <td>${user.password2}</td>
        <td><a href="#" class="deleteUser">X</a></td>
      `;
    {
    }
    userList.appendChild(row);
  }

  static deleteUser(el) {
    if (el.classList.contains("deleteUser")) {
      el.parentElement.parentElement.remove();
    }
  }
  static clearFields() {
    firstName.value = "";
    lastName.value = "";
    userPhone.value = "";
    userEmail.value = "";
    userPassword_1.value = "";
    userPassword_2.value = "";
  }
}

// Clase de almacenamiento
class Store {
  static getUsers() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }

    return users;
  }

  static addUser(user) {
    const users = Store.getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  static removeUser(userEmail) {
    const users = Store.getUsers();

    users.forEach((user, index) => {
      if (user.userEmail === userEmail) {
        users.splice(index, 1);
      }
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Evento: Usuario
document.addEventListener("DOMContentLoaded", UI.displayUsers);

// Evento: Agregar Usuario

function addUser() {
  const user = new CreateUser(
    firstName.value,
    lastName.value,
    userPhone.value,
    userEmail.value,
    userPassword_1.value,
    userPassword_2.value
  );
  if (user != "") {

    UI.addUserToList(user);

    Store.addUser(user);
    
    UI.clearFields();
  }
}
createAccount.addEventListener("submit", addUser);

// Evento: Remover Usuario

function removeUser(e) {
  // Remover usuario de UI
  UI.deleteUser(e.target);

  // Remover usuario de la base
  Store.removeUser(
    e.target.parentElement.previousElementSibling.previousElementSibling.textContent
  );
}
// Funcion Remover usuario
userList.addEventListener("click", removeUser);