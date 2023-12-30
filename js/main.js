// signup variables
var signupNameInput = document.querySelector("#signupName");
var signupEmailInput = document.querySelector("#signupEmail");
var signupPasswordInput = document.querySelector("#signupPassword");
var signupBtn = document.querySelector("#signupBtn");
var incorrectBtn = document.querySelector("#incorrect");
var bodyOfindex = document.querySelector("#bodyOfindex");
var signinEmailInput = document.querySelector("#signinEmail");
var signinPasswordInput = document.querySelector("#signinPassword");
var bodyOfApp = document.querySelector("#bodyOfApp");
var users;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

//regex
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex = /^.{5,}$/;
var nameRegex = /^.{3,}$/;

//validation method
function validateInput(regex, value) {
  return regex.test(value);
}

//clear input method
function clearInput(object) {
  object.value = "";
}

//search email
function searchEmail(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email == value.toLowerCase()) {
      return i;
    }
  }
  return -1;
}

//match password method
function matchPassword(index, value) {
  if (users[index].password == value) {
    return true;
  } else {
    return false;
  }
}

//login method
function loginUser() {
  var index = searchEmail(users, signinEmailInput.value);

  if (validateInput(emailRegex,signinEmailInput.value)&&signinPasswordInput.value != '') {
    if (index != -1) {
      if (matchPassword(index, signinPasswordInput.value)) {
        displayDashboard(index);
      } else {
        incorrectBtn.innerText = "Wrong Password";
      }
    } else {
      incorrectBtn.innerText = "E-mail inavlid or not signed up";
    }
  } else {
    incorrectBtn.innerText = "Please Enter a valid Credentials";
  }
  
}

//displayDashboard page
function displayDashboard(index) {
  bodyOfApp.innerHTML = ` <nav class="navbar navbar-expand-lg navbar-dark">
  <div class="container">
    <a class="navbar-brand text-white" href="#">SMART LOGIN</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a
            class="nav-link btn btn-outline-warning"
            href="./index.html"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="container my-5 text-center h-100 d-flex align-items-center">
    <div class="welcome-box m-auto w-75 p-5">
        <h1 id="username">Welcome ${users[index].name}</h1>
    </div>
</div>`;
}

//add user method
function addUser() {
  if (searchEmail(users, signupEmailInput.value) == -1) {
    if (
      validateInput(nameRegex, signupNameInput.value) &&
      validateInput(emailRegex, signupEmailInput.value) &&
      validateInput(passwordRegex, signupPasswordInput.value)
    ) {
      var user = {
        name: signupNameInput.value,
        email: signupEmailInput.value.toLowerCase(),
        password: signupPasswordInput.value,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      incorrectBtn.innerHTML = "<span class='success'>Success<span>";

      clearInput(signupNameInput);
      clearInput(signupEmailInput);
      clearInput(signupPasswordInput);
      var index = searchEmail(users, user.email);
      displayDashboard(index);
    } else {
      incorrectBtn.innerText =
        "Please Check Name Must be at least 3 charcters\nAnd You Must Enter A valid E-mail\nAnd password Must be at least 5 charcters";
    }
  } else {
    incorrectBtn.innerText =
      "Email already signed up please try different Email or sign in";
  }
}

//events
if (signupBtn) {
  signupBtn.addEventListener("click", function (e) {
  addUser();
});
}


