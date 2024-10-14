// Animaciones
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});


// Check de error de registro
const form = document.querySelector('form')
const username = document.getElementById('username')
const usernameError = document.querySelector("#username-error")
const email = document.getElementById('email')
const emailError = document.querySelector("#email-error")
const password = document.getElementById('password')
const passwordError = document.querySelector("#password-error")

// errores input
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// msj exitoso
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
    const small = formControl.querySelector('small')
    small.innerText = ''
}

// check de email valido
function checkEmail(email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

email.addEventListener("input", function () {
    if (!checkEmail(email.value)) {
        emailError.textContent = "*Email incorrecto"
    } else {
        emailError.textContent = "";
    }
})

// check de largo nombre usuario
username.addEventListener("input", function () {
    if (username.value.length < 4) {
        usernameError.textContent = "*El Usuario debe de tener al menos 8 caracteres."
    } else if (username.value.length > 20) {
        usernameError.textContent = "*El Usuario debe de tener menos de 20 caracteres.";
    } else {
        usernameError.textContent = "";
    }
})

// check de largo contraseña
password.addEventListener("input", function () {
    if (password.value.length < 8) {
        passwordError.textContent = "*La Contraseña debe de tener al menos 8 caracteres."
    } else if (password.value.length > 20) {
        passwordError.textContent = "*La Contraseña debe de tener menos de 20 caracteres."
    } else {
        passwordError.textContent = "";
    }
})


// obligacion de los campos
function checkRequired(inputArr) {
    let isRequired = false
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `*Debes llenar este campo`)
            isRequired = true
        } else {
            showSuccess(input)
        }
    })

    return isRequired
}


// Eventos listeners
form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!checkRequired([username, email, password])) {
        // checkLength(username, 3, 15)
        // checkLength(password, 6, 25)
        // checkEmail(email)
    }
})

// check Login Error

let lgForm = document.querySelector('.form-lg')
let lgEmail = document.querySelector('.email-2')
let lgEmailError = document.querySelector(".email-error-2")
let lgPassword = document.querySelector('.password-2')
let lgPasswordError = document.querySelector(".password-error-2")

function showError2(input, message) {
    const formControl2 = input.parentElement
    formControl2.className = 'form-control2 error'
    const small2 = formControl2.querySelector('small')
    small2.innerText = message
}

function showSuccess2(input) {
    const formControl2 = input.parentElement
    formControl2.className = 'form-control2 success'
    const small2 = formControl2.querySelector('small')
    small2.innerText = '';
}

// check email es valido
function checkEmail2(lgEmail) {
    const emailRegex2 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex2.test(lgEmail);
}

lgEmail.addEventListener("input", function () {
    if (!checkEmail2(lgEmail.value)) {
        lgEmailError.textContent = "*Email is not valid"
    } else {
        lgEmailError.textContent = "";
    }
})

// check largo de contraseña
lgPassword.addEventListener("input", function () {
    if (lgPassword.value.length < 8) {
        lgPasswordError.textContent = "*La Contraseña debe de tener al menos 8 caracteres."
    } else if (lgPassword.value.length > 20) {
        lgPasswordError.textContent = "*La Contraseña debe de tener menos de 20 caracteres."
    } else {
        lgPasswordError.textContent = "";
    }
})

function checkRequiredLg(inputArr2) {
    let isRequiredLg = false
    inputArr2.forEach(function (input) {
        if (input.value.trim() === '') {
            showError2(input, ` *Debes llenar este campo`)
            isRequiredLg = true
        } else {
            showSuccess2(input)
        }
    })

    return isRequiredLg
}

lgForm.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!checkRequiredLg([lgEmail, lgPassword])) {
        checkEmail2(lgEmail)
    }
})
