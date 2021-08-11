let form = document.querySelector('.js-form'),
    firstname = document.querySelector('.js-name'),
    phone = document.querySelector('.js-phone'),
    password = document.querySelector('.js-password'),
    signIn = document.querySelector('.js-sign-in'),

    nameError = document.querySelector('.js-name-error'),
    phoneError = document.querySelector('.js-phone-error'),
    passwordError = document.querySelector('.js-password-error');


phoneMask(phone);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkError() == 0) {
        setStorage();

        document.location.href = 'http://127.0.0.1:5500/index.html';
    }
});

signIn.addEventListener('click', () => {
    document.location.href = 'http://127.0.0.1:5500/index.html';
});

function checkError() {
    let error = 0;

    error += checkPattern(namePattern, firstname.value, nameError, 'form__error-active');
    error += checkPattern(phonePattern, phone.value, phoneError, 'form__error-active');
    error += checkPattern(passwordPattern, password.value, passwordError, 'form__error-active');

    return error;
}

function setStorage() {
    let storageSet = storage.find(e => e.phone == phone.value);

    if (!storageSet) {
        storage.push({
            phone: phone.value,
            firstname: firstname.value,
            lastname: '',
            country: '',
            city: '',
            birthDay: '',
            password: password.value,
            photoUrl: '/img/nophoto.jpg',
            now: 0
        });
        

        localStorage.setItem('storage', JSON.stringify(storage));
    } else {
        alert('You already have an account!');
        document.location.href = 'http://127.0.0.1:5500/index.html';
    }
}
