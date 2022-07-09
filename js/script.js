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

    function modal(openButton, closeButton, modal) {
        openButton.forEach((button) => {
            button.addEventListener('click', () => {
                openModal(modal);
            });
        });

        closeButton.addEventListener('click', () => {
            closeModal(modal);
        });

    }

    // let openModalByTimer = setTimeout(() => openModal(modalWindow), 2000);

    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // clearTimeout(openModalByTimer);
        // window.removeEventListener('scroll', pageScroll);
        modal.addEventListener('click', (e) => {
            if (e.target === modalWindow) {
                closeModal(modal);
            }
        });
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // function pageScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    //         openModal(modalWindow);
    //     }
    // }

    // window.addEventListener('scroll', pageScroll);

    modal(openModalButtons, modalCloseButton, modalWindow);

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
        constructor(img, menuTitle, menuText, price, parentElementSelector) {
            this.img = img;
            this.menuTitle = menuTitle;
            this.menuText = menuText;
            this.price = price;
            this.parentElementSelector = parentElementSelector;
        }

        render() {
            let menuItem = document.createElement('div');
            menuItem.innerHTML = `
            <div class="menu__item">
                <img src="${this.img}" alt="vegy">
                <h3 class="menu__item-subtitle">Меню "${this.menuTitle}"</h3>
                <div class="menu__item-descr">${this.menuText}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
            let parent = document.querySelector(this.parentElementSelector);
            parent.append(menuItem);
        }
    }

    let vegy = new MenuCard (
        'img/tabs/vegy.jpg',
        'Фитнес',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu__field .container').render();

    let elite = new MenuCard (
        'img/tabs/elite.jpg',
        'Премиум',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu__field .container').render();

    let post = new MenuCard (
        'img/tabs/post.jpg',
        'Постное',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu__field .container').render();

});