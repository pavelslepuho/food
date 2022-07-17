window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // TABS
    let tabsContainer = document.querySelector('.tabheader__items'),
        tabs = tabsContainer.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    function removeActive(selector) {
        selector.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i) {
        tabContent.forEach((item) => {
            item.style.display = 'none';
        });
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    showTabContent(0);

    tabsContainer.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (e.target === item) {
                    removeActive(tabs);
                    item.classList.add('tabheader__item_active');
                    showTabContent(i);
                }
            });
        }
    });

    // без делегирования
    // tabs.forEach((item, i) => {
    //     item.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         removeActive(tabs);
    //         showTabContent(i);
    //     });
    // });

    // TIMER

    let promotionDate = new Date('2021-07-03');

    function remainingUntilTheEndOfPromotion(promotion) {
        let t = promotion - Date.parse(new Date());
        let s = Math.floor(t / 1000 % 60),
            m = Math.floor(t / 1000 / 60 % 60),
            h = Math.floor(t / 1000 / 60 / 60 % 60),
            d = Math.floor(t / 1000 / 60 / 60 / 60 % 24);

        return {
            't': t,
            's': s,
            'm': m,
            'h': h,
            'd': d
        };
    }

    function dateFormat(n) {
        if (n < 0) {
            return '--';
        } else if (n.length === 1) {
            return `0${n}`;
        } else {
            return n;
        }
    }

    let days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');

    function setClock() {

        let interval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            remainingUntilTheEndOfPromotion(promotionDate);
            let { t, s, m, h, d } = remainingUntilTheEndOfPromotion(promotionDate);
            days.innerHTML = dateFormat(d);
            hours.innerHTML = dateFormat(h);
            minutes.innerHTML = dateFormat(m);
            seconds.innerHTML = dateFormat(s);

            if (t <= 0) {
                clearInterval(interval);
            }
        }
    }

    setClock();

    // Modal
    let openModalButtons = document.querySelectorAll('[data-open-modal]'),
        modalWindow = document.querySelector('.modal'),
        modalCloseButton = modalWindow.querySelector('.modal__close');

    function modal(openButton, modal) {
        openButton.forEach((button) => {
            button.addEventListener('click', () => {
                openModal(modal);
            });
        });

    }

    // let openModalByTimer = setTimeout(() => openModal(modalWindow), 2000);

    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // clearTimeout(openModalByTimer);
        // window.removeEventListener('scroll', pageScroll);
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close')) {
                closeModal(modal);
            }
        });
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function pageScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalWindow);
        }
    }

    // window.addEventListener('scroll', pageScroll);

    modal(openModalButtons, modalWindow);

    // console.log(scrollСoordinates);
    // console.log(pageHeight);
    // console.log(windowHeight);

    // Тренировка по выводу modal

    // let modal = document.querySelector('.modal');

    // function showModal(selector) {
    //     selector.style.display = 'block';
    //     let hide = setTimeout(hideModal, 2000);
    // }

    // function int() {
    //     let a = alert('!!!!');
    // }

    // function hideModal() {
    //     modal.style.display = 'none';
    //     let interval = setInterval(int, 1000);
    //     let clear = setTimeout(() => {clearInterval(interval);}, 5000);

    // }

    // let show = setTimeout(() => showModal(modal), 2000);

    // Классы
    class MenuCard {
        constructor(img, altImg, menuTitle, menuText, price, parentElementSelector, ...classes) {
            this.img = img;
            this.altImg = altImg;
            this.menuTitle = menuTitle;
            this.menuText = menuText;
            this.price = price;
            this.parentElementSelector = parentElementSelector;
            this.classes = classes;
        }

        render() {
            let menuItem = document.createElement('div');
            
            if (this.classes.length === 0) {
                menuItem.classList.add('menu__item');
            } else {
                this.classes.forEach(item => menuItem.classList.add(item));
            }

            menuItem.innerHTML = `
                <img src="${this.img}" alt="${this.altImg}">
                <h3 class="menu__item-subtitle">${this.menuTitle}</h3>
                <div class="menu__item-descr">${this.menuText}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            let parent = document.querySelector(this.parentElementSelector);
            parent.append(menuItem);
        }
    }

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(data => {
        data.forEach((card) => {
            let {img, altimg, title, descr, price} = card;
            new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
        });
    });

    // let vegy = new MenuCard (
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Фитнес',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     229,
    //     '.menu__field .container',
    //     'menu__item').render();

    // let elite = new MenuCard (
    //     'img/tabs/elite.jpg',
    //     'post',
    //     'Премиум',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     550,
    //     '.menu__field .container',
    //     'menu__item').render();

    // let post = new MenuCard (
    //     'img/tabs/post.jpg',
    //     'elite',
    //     'Постное',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     430,
    //     '.menu__field .container').render();
  
    // Отправка формы

    let forms = document.querySelectorAll('form'),
        modalDialog = document.querySelector('.modal__dialog'),
        tabCont = document.querySelector('.modal__content');

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(form),
                json = JSON.stringify(Object.fromEntries(formData));
            // let object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });
            // let json = JSON.stringify(object);
            fetch('http://localhost:3000/requests', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: json
            }).then(data => {
                console.log(data.json());
                form.reset();
                successfulSending();
            }).catch(data => errorSending());
        });
    }

    function successfulSending() {
        closeModal(modalWindow);
        let thanks = document.createElement('div');
        thanks.classList.add('modal');
        thanks.innerHTML = `
        <div class="modal__dialog">
            <div class="modal__content">
                <form action="#">
                    <div class="modal__close">&times;</div>
                    <div class="modal__title">Мы свяжемся с вами как можно быстрее!</div>
                </form>
            </div>
        </div>
        `;
        document.body.append(thanks);
        thanks.style.display = 'block';
        openModal(thanks);

        setTimeout(() => {
            thanks.style.display = 'none';
        }, 5000);

    }

    function errorSending() {
        closeModal(modalWindow);
        let thanks = document.createElement('div');
        thanks.classList.add('modal');
        thanks.innerHTML = `
        <div class="modal__dialog">
            <div class="modal__content">
                <form action="#">
                    <div class="modal__close">&times;</div>
                    <div class="modal__title">Данные не отправлены...</div>
                </form>
            </div>
        </div>
        `;
        document.body.append(thanks);
        thanks.style.display = 'block';
        openModal(thanks);

        setTimeout(() => {
            thanks.style.display = 'none';
        }, 5000);

    }

    // fetch('http://localhost:3000/menu')
    // .then(data => data.json())
    // .then(data => console.log(data));
    
    // slider
    let slider = document.querySelector('.offer__slider'),
        currentNumber = slider.querySelector('#current'),
        totalNumber = slider.querySelector('#total'),
        arrowNext = slider.querySelector('.offer__slider-next'),
        arrowPrev = slider.querySelector('.offer__slider-prev'),
        sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
        sliderInner = slider.querySelector('.offer__slider-inner'),
        slide = slider.querySelectorAll('.offer__slide'),
        counter = 0;

        slide.forEach(item => item.style.width = '100%');

        sliderWrapper.style.overflow = 'hidden';
        sliderWrapper.style.position = 'relative';
        let carousel = document.createElement('div');
        carousel.classList.add('carousel-indicators');
        sliderWrapper.append(carousel);

        for (let i = 0; i < slide.length; i++) {
            let dot = document.createElement('div');
            dot.classList.add('dot');
            carousel.append(dot);
        }

        let dots = document.querySelectorAll('.dot');

        sliderInner.style.display = 'flex';
        sliderInner.style.width = `${slide.length * 100}%`;
        if (slide.length < 10) {
            totalNumber.textContent = `0${slide.length}`;
        } else {
            totalNumber.textContent = slide.length;
        }

        sliderInner.style.transition = `0.4s all`;

        function slideControl() {
            if (counter < 0) {
                counter = slide.length - 1;
            } else if (counter > slide.length - 1) {
                counter = 0;
            }

            if (counter < 10) {
                currentNumber.textContent = `0${counter + 1}`;
            } else {
                currentNumber.textContent = counter + 1;
            }
            sliderInner.style.transform = `translate(-${counter * window.getComputedStyle(slide[counter]).width.slice(0, -2)}px)`;
        } 

        slideControl();

        arrowPrev.addEventListener('click', () => {
            counter -= 1;
            slideControl();
            dotsControl(counter);
        });

        arrowNext.addEventListener('click', () => {
            counter += 1;
            slideControl();
            dotsControl(counter);
        });

        function dotsControl(num) {
            dots.forEach(item => item.classList.remove('dot-active'));
            dots[num].classList.add('dot-active');
            
            dots.forEach((item, i) => {
                item.addEventListener('click', () => {
                    dots.forEach(item => item.classList.remove('dot-active'));
                    item.classList.add('dot-active');
                    counter = i;
                    slideControl();
                });
            });
        }

    dotsControl(counter);
    
});