let selectPhoto = document.querySelector('.js-select'),
    removePhoto = document.querySelector('.js-remove'),
    userPhoto = document.querySelector('.js-user-photo'),
    exit = document.querySelector('.js-exit'),
    saved = document.querySelector('.js-saved');

let form = document.querySelector('.js-form'),
    firstname = document.querySelector('.js-firstname'),
    lastname = document.querySelector('.js-lastname'),
    birthDay = document.querySelector('.js-b-day'),
    country = document.querySelector('.js-country'),
    city = document.querySelector('.js-city'),
    phone = document.querySelector('.js-phone'),
    saveButton = document.querySelector('.js-save');

let userLogIn = storage.find(e => e.now === 1);

firstname.value = userLogIn.firstname;
lastname.value = userLogIn.lastname;
birthDay.value = userLogIn.birthDay;
country.value = userLogIn.country;
city.value = userLogIn.city;
phone.value = userLogIn.phone;
userPhoto.setAttribute('src', userLogIn.photoUrl);

selectPhoto.addEventListener('change', () => {
    loadFile(selectPhoto.files[0]);
});

function loadFile(file){
    if (file){
        let reader = new FileReader();
        reader.onload = function (e) {
            userPhoto.setAttribute('src', e.target.result);
            userLogIn.photoUrl = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

removePhoto.addEventListener('click', () => {
    userPhoto.setAttribute('src', '/img/nophoto.jpg');
    userLogIn.photoUrl = '/img/nophoto.jpg';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(checkError())
    if (checkError() === 0){
        userLogIn.firstname = firstname.value;
        userLogIn.lastname = lastname.value;
        userLogIn.birthDay = birthDay.value;
        userLogIn.country = country.value;
        userLogIn.city = city.value;
        userLogIn.phone = phone.value;
        localStorage.setItem('storage', JSON.stringify(storage));

        saved.classList.add('form__saved-active');
        setTimeout(function() {
            saved.classList.remove('form__saved-active');
        }, 2000);
    }
});

function checkError() {
    let error = 0;

    error += checkPattern(namePattern, firstname.value, firstname, 'form__error');
    error += checkPattern(namePattern, lastname.value, lastname, 'form__error');
    error += checkPattern(namePattern, country.value, country, 'form__error');
    error += checkPattern(namePattern, city.value, city, 'form__error');
    error += checkPattern(namePattern, firstname.value, firstname, 'form__error');
    error += checkPattern(phonePattern, phone.value, phone, 'form__error');
    error += checkPattern(datePattern, birthDay.value, birthDay, 'form__error');

    return error;
}

phoneMask(phone);

exit.addEventListener('click', () => {
    userLogIn.now = 0;
    localStorage.setItem('storage', JSON.stringify(storage));

    document.location.href = 'http://127.0.0.1:5500/index.html';
});
