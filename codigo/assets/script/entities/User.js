const loginEmail = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const firtName = document.getElementById('register-name');
const lastName = document.getElementById('register-lastName');
const email = document.getElementById('register-username');
const password = document.getElementById('register-password');
const confirmPassword = document.getElementById('register-confirmPassword');
const enrollment = document.getElementById('register-enrollment');
const successWarning = document.getElementById('successfull-warning');
const passwordWarning = document.getElementById('password-warning');

let nameCheck = false;
let isLastNameValid = false;
let isEmailValid = false;
let passwordCheck = false;
let confirmPasswordCheck = false;
let isEnrollmentValid = false;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Z]).*$/;
const userList = JSON.parse(localStorage.getItem('userList')) || [];

// --------- Validações ---------//
function validarCadastro() {

    if (nameCheck || isLastNameValid || isEmailValid || passwordCheck || confirmPasswordCheck || isEnrollmentValid) {

        let userList = JSON.parse(localStorage.getItem('userList')) || [];// Pegue o item userList se não tiver, adicione a lista vazia
        let newUser = new User(firtName.value, lastName.value, email.value, enrollment.value, password.value);

        if (!verificarDuplicidadeDeEmail(newUser)) {

            if (!verificarDuplicidadeDeMatricula(newUser)) {
                userList.push(newUser);
                localStorage.setItem('userList', JSON.stringify(userList));

                clearRegisterFields();

                successWarning.style.display = 'block';
            }
            else {
                alert('enrollment already exist in our base')
            }

        } else {
            alert('email alredy exist in our base.')
        }


    } else {
        alert('Todos os campos devem conferir.')
    }
}

function validarLogin() {
    let user = document.getElementById('login-username-input').value;
    let userPassKey;
    let confirm = false;

    for (i = 0; i < clients.length; i++) {
        if (clients[i]._email.toLowerCase() === user) {
            userPassKey = clients[i].password;
            confirm = true;
            break;
        }
    }

    if (confirm) {
        let passwordInput = document.getElementById('login-password-input').value;

        if (userPassKey === passwordInput.trim().toLowerCase()) {
            alert('Login realizado!');
        } else {
            alert('Senha incorreta.');
        }

    }
    else {
        alert('Usuário não encontrado.');
    }

    clearFields();
}


function verificarDuplicidadeDeEmail(newUser) {
    const userList = JSON.parse(localStorage.getItem('userList'));

    for (let user of userList) {
        if (user._email === newUser.email) {
            return true;
        }
    }
    return false;
}

function verificarDuplicidadeDeMatricula(newUser) {
    const userList = JSON.parse(localStorage.getItem('userList'));

    for (let user of userList) {
        if (user._enrollment === newUser.enrollment) {
            return true;
        }
    }
    return false;
}

//---- Comodidades -------//

function clearRegisterFields() {
    firtName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    enrollment.value = '';
}

function clearLoginFields() {
    loginEmail.value = '';
    loginPassword.value = '';
}

// -----  Event Listeners - validação de formulário de cadastro ------ //
password.addEventListener('keyup', () => {
    if (passwordRegex.test(password.value)) {
        password.style.borderBottomColor = 'green';
        passwordWarning.style.display = 'none';
        passwordCheck = true;
    } else if (password.value.length < 1) {
        password.style.borderBottomColor = 'black';
        passwordWarning.style.display = 'none';
        passwordCheck = false;
    } else {
        password.style.borderBottomColor = 'black';
        passwordWarning.style.display = 'block';
        passwordCheck = false;
    }
});

confirmPassword.addEventListener('keyup', () => {
    if (confirmPassword.value === password.value) {
        confirmPassword.style.borderBottomColor = 'green';
        confirmPasswordCheck = true;
    } else {
        confirmPassword.style.borderBottomColor = 'black';
        confirmPasswordCheck = false;
    }
});

enrollment.addEventListener('keyup', () => {
    if (enrollment.value.length === 7) {
        enrollment.style.borderBottomColor = 'green';
        isEmailValid = true;
    } else {
        enrollment.style.borderBottomColor = 'black';
        isEnrollmentValid = false;
    }
});

email.addEventListener('keyup', () => {
    if (email.value.match(emailRegex)) {
        email.style.borderBottomColor = 'green';
        isEmailValid = true;
    } else {
        email.style.borderBottomColor = 'black';
        isEmailValid = false;
    }
});

firtName.addEventListener('keyup', () => {
    if (firtName.value.length < 2) {
        firtName.style.borderBottomColor = 'black';
        nameCheck = false;
    }
    else {
        firtName.style.borderBottomColor = 'green';
        nameCheck = true;
    }
})

lastName.addEventListener('keyup', () => {
    if (lastName.value.length < 2) {
        lastName.style.borderBottomColor = 'black';
        isLastNameValid = false;
    }
    else {
        lastName.style.borderBottomColor = 'green';
        isLastNameValid = true;
    }
})

// ------ Classes ----------- //

class User {
    constructor(name, lastName, email, enrollment, password) {
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._enrollment = enrollment;
        this._password = password;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        this._lastName = lastName;
    }

    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }

    get enrollment() {
        return this._enrollment;
    }
    set enrollment(enrollment) {
        this._enrollment = enrollment;
    }

    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }
}
