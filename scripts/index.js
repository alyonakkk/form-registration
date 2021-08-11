let form = document.querySelector('.js-form'),
    phone = document.querySelector('.js-phone'),
    password = document.querySelector('.js-password'),
    remember = document.querySelector('.js-checkbox'),
    forgotPass = document.querySelector('.js-forgot-pass'),
    createAcc = document.querySelector('.js-create-acc'),

    passwordError = document.querySelector('.js-password-error'),
    phoneError = document.querySelector('.js-phone-error');

phoneMask(phone, getStorage);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(checkError())
    if (checkError() == 0) {
        setStorage();
    }
});

createAcc.addEventListener('click', () => {
    document.location.href = 'http://127.0.0.1:5500/create-acc.html';
});

forgotPass.addEventListener('click', () => {
    document.location.href = 'http://127.0.0.1:5500/password.html';
});

function checkError() {
    let error = 0;

    error += checkPattern(phonePattern, phone.value, phoneError, 'form__error-active');
    error += checkPattern(passwordPattern, password.value, passwordError, 'form__error-active');

    return error;
}

function setStorage() {
    let storageSet = storage.find(e => e.phone == phone.value);

    if (!storageSet) {
        alert('You have not an account!');
        document.location.href = 'http://127.0.0.1:5500/create-acc.html';
    } else if (storageSet.password === password.value){
        storageSet.now = 1;
        document.location.href = 'http://127.0.0.1:5500/profile.html';
    } else {
        alert('Wrong password!');
    }

    localStorage.setItem('storage', JSON.stringify(storage));
}

function getStorage() {
    let storageGet = storage.find(e => e.phone === phone.value);

    if (storageGet) {
        password.value = storageGet.password;
    } else {
        password.value = '';
    }
}
