//szukamy elementów na stornie
const link = document.querySelector('.link');
const cancel = document.getElementById('cancelButton');
const textBoxEmail = document.querySelector(".textBoxEmail");
const textBoxPassword = document.querySelector('.textBoxPassword');
const loginBox = document.querySelector('.loginBox');
const resetBox = document.querySelector('.resetBox');
const tooltip = document.querySelector('.tooltip');
const tooltipBody = document.querySelector('.tooltipBody');
const textBoxEmailNew = document.querySelector('.textBoxEmailNew');
const submitButton = document.querySelector('.loginButton');
const resetButton = document.querySelector('#resetButton');

//flagi do walidacji
let emailValid = false;
let passwordValid = false;

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    }; // funkcja gdzie kursor znajduje sie na stronie

}

function attachMouseEvent(el) {
    el.addEventListener("mouseover", e => { //po najechniu na tooltipa
        const target = e.target;
        const text = target.dataset.text;
        const offset = getOffset(target); //gdzie znajduje sie element
        let middle, height;
        tooltipBody.innerHTML = text;
        middle = tooltipBody.clientWidth / 2; //wysokosc elementu
        height = tooltipBody.clientHeight;
        tooltipBody.style.top = `${offset.top - height - 10 - 5}px`; // 10 size of traniangle, 5 small space
        tooltipBody.style.left = `${offset.left - middle + 15}px`;
        tooltipBody.classList.add("show");
    });

    el.addEventListener("mouseout", () => {
        tooltipBody.classList.remove("show");
    });
}

function attachEvents() { //przypinamy funkcje do wszystkich tooltipów jakie są na stronie, dla kazdego tooltipa, tooltip = el
    const tooltips = [...document.querySelectorAll(".tooltip")];

    tooltips.forEach(tooltip => {
        attachMouseEvent(tooltip);
    });
}

function isValidInput(e, regExp) { //sprawdza czy dany input pasuje do danego regexpa
    const target = e.target
    const value = target.value;
    return regExp.test(value); //funkcja test wbudowana w regexpy
}


cancel.addEventListener('click', () => { // klikniecie cancel powrto do pierwszego okna
    resetBox.style.display = 'none';
    loginBox.style.display = 'inline-block'
});

link.addEventListener('click', () => { // wejscie w fg password przez klikniecie
    loginBox.style.display = 'none'
    resetBox.style.display = 'block';
});

link.addEventListener('keypress', (e) => { //wejscie w forgotten password enterem
    if (e.which === 13) { //definiowanie numeru klawisza
        loginBox.style.display = 'none'
        resetBox.style.display = 'block';
    }
});

textBoxEmail.addEventListener('keyup', (e) => {
    const isValid = isValidInput(e, /[a-zA-Z0-9\.\-_]+@[a-zA-Z0-9\.\-_]+/g); //reg exp na sprawdzanie maila
    const parent = e.target.parentElement.parentElement;
    const value = e.target.value;

    if (!isValid && value.length > 0) {
        parent.classList.add('invalid'); //jezeli jest niewlasciwy to dodajemy klase invalid
        emailValid = true;
    } else {
        emailValid = true;
        parent.classList.remove('invalid');
    }
    if (emailValid && passwordValid) {
        submitButton.removeAttribute('disabled'); //jezeli dwa pola sa prawidlowe to usuwamy disabled z guzika
    }
});

textBoxEmailNew.addEventListener('keyup', (e) => { //sprawdzanie nowego hasła
    const isValid = isValidInput(e, /[a-zA-Z0-9\.\-_]+@[a-zA-Z0-9\.\-_]+/g);
    const parent = e.target.parentElement.parentElement;
    const value = e.target.value;

    if (!isValid && value.length > 0) {
        parent.classList.add('invalid');
    } else {
        parent.classList.remove('invalid');
        resetButton.removeAttribute('disabled');
    }

});

textBoxPassword.addEventListener('keyup', (e) => { //sprawdzanie passworda
    const isValid = isValidInput(e, /[a-zA-Z0-9\.\-_]+/g);
    const parent = e.target.parentElement.parentElement;
    const value = e.target.value;

    if (!isValid && value.length > 0) {
        parent.classList.add('invalid');
        passwordValid = true;
    } else {
        passwordValid = true;
        parent.classList.remove('invalid');
    }
    if (emailValid && passwordValid) {
        submitButton.removeAttribute('disabled');
    }
});

attachEvents();