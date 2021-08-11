let phonePattern = /^(?=.{16})[0-9+-\s+]+$/,
    namePattern = /^(?=.{1,})[a-z]+$/i,
    passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}/,
    codePattern = /^(?=.{5})[0-9]+$/,
    datePattern = /^(\d{2}\.\d{2}\.\d{4})+$/,

    storage = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : [];

function phoneMask(phone, getStorage) {
    phone.addEventListener('input', () => {
        if (!/^[0-9+-\s+]+$/.test(phone.value)) {
            phone.value = phone.value.replace(phone.value[phone.value.length - 1], '');
        }
        else {
            if (phone.value.length == 6 || phone.value.length == 10 || phone.value.length == 13) {
                phone.value += '-';
            }
        }

        if (getStorage !== undefined) {
            getStorage();
        }
    });
}

function checkPattern(pattern, value, inputError, classError){
    if (!pattern.test(value)) {
        inputError.classList.add(classError);
        return 1;
    } else {
        inputError.classList.remove(classError);
        return 0;
    }
}