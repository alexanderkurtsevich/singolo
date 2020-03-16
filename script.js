//HEADER

const menuLinks = document.querySelectorAll('.menu__link');

menuLinks.forEach(elem => {
    elem.addEventListener('click', (event) => {
        event.preventDefault();
        menuLinks.forEach(elem => {
            elem.classList.remove('menu__link_active')
        })
        event.target.classList.add('menu__link_active')
        document.getElementById(event.target.getAttribute('data-menu')).scrollIntoView({ block: "start", behavior: "smooth" })
    })
})

//GALLERY

const galleryList = document.querySelector('.gallery__items-list'),
    galleryButtons = document.querySelectorAll('.gallery__button'),
    galleryItemArray = Array.from(galleryList.querySelectorAll('li'));


galleryButtons.forEach(elem => elem.addEventListener('click', (event) => {
    galleryButtons.forEach(elem => {
        elem.classList.remove('gallery__button_active');
    })
    event.target.classList.add('gallery__button_active')
    galleryItemArray.sort(function () {
        return Math.random() - 0.5
    })
    for (i = 0; i < galleryItemArray.length; i++) {
        galleryList.append(galleryItemArray[i])
    }
}))

galleryList.addEventListener('click', (event) => {
    galleryList.querySelectorAll('li').forEach(elem => {
        elem.classList.remove('active-image');
    })
    event.target.parentNode.classList.add('active-image')
})

//SLIDER
const slider = document.querySelector('.slider'),
    buttonLeft = document.querySelector('.slider__button_left'),
    buttonRigth = document.querySelector('.slider__button_right'),
    sliderWrap = document.querySelector('.slider__wrap'),
    slide = document.querySelectorAll('.slider__slide');
let lastTurn = 'left'

buttonLeft.addEventListener('click', event => {
    if (lastTurn == 'left') {
        sliderWrap.prepend(sliderWrap.lastElementChild);
        slide.forEach(elem => {
            elem.style.transition = "none"
            elem.style.left = "-797px";
        })
        setTimeout(() => {
            slide.forEach(elem => {
                elem.style.transition = "0.55s"
                elem.style.left = "0";
            })
        }, 100);
    }
    else {
        slide.forEach(elem => {
            elem.style.left = "0";
        })
    }
    slider.classList.toggle('slider__bg-toggle')
    lastTurn = 'left'
})

buttonRigth.addEventListener('click', event => {
    if (lastTurn == 'right') {
        sliderWrap.append(sliderWrap.firstElementChild);
        slide.forEach(elem => {
            elem.style.transition = "none"
            elem.style.left = "0";
        })
        setTimeout(() => {
            slide.forEach(elem => {
                elem.style.transition = "0.55s"
                elem.style.left = "-797px";
            })
        }, 100);
    }
    else {
        slide.forEach(elem => {
            elem.style.left = "-797px";
        })
    }
    slider.classList.toggle('slider__bg-toggle')
    lastTurn = 'right'
})

//SLIDER SCREEN

Array.from(document.getElementsByClassName('phone-button')).forEach(elem => elem.addEventListener('click', event => {
    Array.from(event.target.parentNode.getElementsByClassName('black-screen'))[0].classList.toggle('black-screen-active')
}))

//FORM

const modal = document.querySelector('.modal'),
    modalWindow = document.querySelector('.modal__window'),
    modalButton = document.querySelector('.modal__button'),
    formButton = document.querySelector('.form__button'),
    formSubject = document.querySelector('[name=subject]'),
    modalSubject = document.querySelector('.modal__subject'),
    formDescription = document.querySelector('[name=description]'),
    modalDescription = document.querySelector('.modal__description'),
    nameInput = document.querySelector('[name="name"]'),
    mailInput = document.querySelector('[name="email"]'),
    nameWindow = document.querySelector('.form__name-window'),
    mailWindow = document.querySelector('.form__mail-window');

function cleanInput(input) {
    input.value = ''
}

formButton.addEventListener('click', event => {
    event.preventDefault();
    if (nameInput.value == '') {
        nameWindow.classList.add('active')
    }
    else if (mailInput.value == '' || !(/.+@.+\..+/i).test(mailInput.value)) {
        mailWindow.classList.add('active')
    }
    else {
        modal.classList.add('modal_active')
        if (formSubject.value.length == 0) {
            modalSubject.textContent = 'Без темы';
        }
        else {
            modalSubject.textContent = 'Тема: ' + formSubject.value;
        };

        if (formDescription.value.length == 0) {
            modalDescription.textContent = 'Без описания'
        }
        else {
            modalDescription.textContent = 'Описание: ' + formDescription.value;
        }
        cleanInput(formSubject);
        cleanInput(formDescription);
        cleanInput(nameInput);
        cleanInput(mailInput);
    }
})

nameInput.addEventListener('click', event => {
    nameWindow.classList.remove('active')
})
mailInput.addEventListener('click', event => {
    mailWindow.classList.remove('active')
})

modalButton.addEventListener('click', event => {
    event.preventDefault();
    modal.classList.remove('modal_active')
})
