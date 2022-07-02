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
            console.log(s);
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

});