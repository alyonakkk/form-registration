let form = document.querySelector('.js-form'),
    phone = document.querySelector('.js-phone'),
    code = document.querySelector('.js-code'),
    signIn = document.querySelector('.js-sign-in'),
    button = document.querySelector('.js-button'),

    phoneError = document.querySelector('.js-phone-error'),
    codeError = document.querySelector('.js-code-error');

phoneMask(phone);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkPhone() === 0 && getStorage()) {
        code.classList.add('form__code-active');
        button.innerHTML = 'Reset';

        form.addEventListener('submit', () => {
            if (checkCode() === 0) {
                setStorage();
            }
        });
    }
});

signIn.addEventListener('click', () => {
    document.location.href = 'http://127.0.0.1:5500/index.html';
});

function checkPhone() {
    let error = 0;

    error += checkPattern(phonePattern, phone.value, phoneError, 'form__error-active');

    return error;
}

function checkCode() {
    let error = 0;

    error += checkPattern(codePattern, code.value, codeError, 'form__error-active');

    return error;
}

function getStorage() {
    let storageGet = storage.find(e => e.phone == phone.value);

    if (storageGet) {
        return true;
    } else {
        alert('You have not an account!');
        document.location.href = 'http://127.0.0.1:5500/create-acc.html';
    }
}

function setStorage() {
    let storageSet = storage.find(e => e.phone == phone.value);

    if (storageSet) {
        storageSet.password = randomSym() + code.value;

        localStorage.setItem('storage', JSON.stringify(storage));

        let ok = confirm('Your new password- ' + storageSet.password);
        if (ok) {
            document.location.href = 'http://127.0.0.1:5500/index.html';
        }
    } else {
        alert('You can not reset the password, because you have not an account!');
        document.location.href = 'http://127.0.0.1:5500/create-acc.html';
    }
}

function randomSym() {
    let result = '';
    let str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    for (let i = 0; i < 5; i++) {
        result += str.charAt(Math.floor(Math.random() * str.length));

    }

    return result;
}