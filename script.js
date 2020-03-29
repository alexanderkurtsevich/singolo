//HEADER

window.scrollBy(0, 1)

const menuLinks = document.querySelectorAll('.menu__link'),
    header = document.querySelector('.header');
    let scrollingStatus = 'end';

menuLinks.forEach(elem => {
    elem.addEventListener('click', (event) => {
        event.preventDefault();

        menuLinks.forEach(elem => {
            elem.classList.remove('menu__link_active')
            headerMenu.classList.remove('header__menu_active');
            burgerIcon.classList.remove('burger-icon-active')
        })

        event.target.classList.add('menu__link_active')

        let elementTop = document.getElementById(event.target.getAttribute('data-menu')).getBoundingClientRect().top
        let headerHeight = header.getBoundingClientRect().height;

        if (event.target.getAttribute('data-menu') == 'home') {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
        else {
            window.scrollTo({ top: elementTop + pageYOffset - headerHeight, behavior: "smooth" });
        }

    })
})

const sections = document.querySelectorAll('[data-section]');

window.addEventListener('scroll', function () {
    sections.forEach(function (elem) {
        const menuElement = document.querySelector(`[data-menu=${elem.getAttribute('data-section')}]`);
        let headerHeight = header.getBoundingClientRect().height;
        if (elem.getBoundingClientRect().top <= headerHeight && elem.getBoundingClientRect().bottom > headerHeight) {
            if (!menuElement.classList.contains('menu__link_active')) {
                menuElement.classList.add('menu__link_active')
            }
        }
        else {
            menuElement.classList.remove('menu__link_active')
        }
    })
})

//MOBILE HEADER 

let burgerIcon = document.querySelector('.burger-icon');
let headerMenu = document.querySelector('.header__menu');

burgerIcon.addEventListener('click', function () {
    headerMenu.classList.toggle('header__menu_active');
    burgerIcon.classList.toggle('burger-icon-active')
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

let lastTurn = 'left';
let statusTurn = 'end';

buttonLeft.addEventListener('click', event => {
    if (statusTurn == 'end') {
        if (lastTurn == 'left') {
            sliderWrap.prepend(sliderWrap.lastElementChild);
            slide.forEach(elem => {
                elem.style.transition = "none"
                elem.style.left = `-${document.querySelector('.slider__wrap').offsetWidth}px`;
            })
            //Promise for blocking fast turning
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    slide.forEach(elem => {
                        elem.style.transition = "0.55s"
                        elem.style.left = "0";
                        statusTurn = 'turning';
                        resolve();
                    })
                }, 100)
            }).then(setTimeout(() => {
                statusTurn = 'end'
            }, 550))
        }
        else {
            //Promise for blocking fast turning
            new Promise((resolve, reject) => {
                slide.forEach(elem => {
                    elem.style.left = "0";
                    statusTurn = 'turning';
                    resolve();
                })
            }).then(setTimeout(() => {
                statusTurn = 'end'
            }, 550));

        }
        slider.classList.toggle('slider__bg-toggle')
        lastTurn = 'left'
    }
})

buttonRigth.addEventListener('click', event => {
    if (statusTurn == 'end') {
        if (lastTurn == 'right') {
            sliderWrap.append(sliderWrap.firstElementChild);
            slide.forEach(elem => {
                elem.style.transition = "none"
                elem.style.left = "0";
            })
            //Promise for blocking fast turning
            new Promise((resolve, reject) => setTimeout(() => {
                slide.forEach(elem => {
                    elem.style.transition = "0.55s"
                    elem.style.left = `-${document.querySelector('.slider__wrap').offsetWidth}px`;
                    statusTurn = 'turning';
                    resolve();
                })
            }, 100)).then(setTimeout(() => {
                statusTurn = 'end'
            }, 550));
        }
        else {
            slide.forEach(elem => {
                //Promise for blocking fast turning
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        elem.style.left = `-${document.querySelector('.slider__wrap').offsetWidth}px`;
                        statusTurn = 'turning';
                        resolve();
                    }, 100)
                }).then(setTimeout(() => {
                    statusTurn = 'end'
                }, 550));
            })
        }
        slider.classList.toggle('slider__bg-toggle')
        lastTurn = 'right'
    }
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
