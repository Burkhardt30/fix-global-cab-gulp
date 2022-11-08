import * as moduleFunctions from './modules/functions.js'
import 'simplebar'
import DataTable from 'datatables.net'
import 'datatables.net-responsive'
import $ from 'jquery'
import { Modal } from './modules/modal.js'
import { tooltip } from './modules/popover.js'
import { accordion } from './modules/accordion.js'

moduleFunctions.isWebp()

// Дропдаун в пользовательской навигации

moduleFunctions.toggleUserDropdown()

// Бургер-меню

moduleFunctions.toggleBurger()

// Таблицы

let transactionsTable = new DataTable('#transactions', {
    responsive: true,
    columns: [
        { responsivePriority: 1 },
        { responsivePriority: 3 },
        { responsivePriority: 4 },
        { responsivePriority: 5 },
        { responsivePriority: 6 },
        { responsivePriority: 2 },
    ],
});

let partnersTable = new DataTable('#partners', {
    responsive: true,
    columns: [
        { responsivePriority: 1 },
        { responsivePriority: 3 },
        { responsivePriority: 4 },
        { responsivePriority: 5 },
        { responsivePriority: 6 },
        { responsivePriority: 2 },
    ],
});

let stakingTable = new DataTable('#staking', {
    responsive: true,
    // columns: [
    //     { responsivePriority: 1 },
    //     { responsivePriority: 3 },
    //     { responsivePriority: 4 },
    //     { responsivePriority: 5 },
    //     { responsivePriority: 6 },
    //     { responsivePriority: 2 },
    // ],
});


// Скопировать рефералку

$('.clipboard-ref__btn').on('click', myFunction)

function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    document.execCommand("copy");
    /* Alert the copied text */
    $('.clipboard-ref__clipboard').addClass('clipboard-ref__clipboard--active');
    setTimeout(function () {
        $('.clipboard-ref__clipboard').removeClass('clipboard-ref__clipboard--active');
    }, 1000);
}

const modal = new Modal({})

// ПОПОВЕР
/*
 |  DOCUMENT INITIALIZER
 */
document.addEventListener("DOMContentLoaded", () => {
    tooltip('[data-tooltip]:not([data-jax-tooltip-id]),[data-handle="tooltip"][title]:not([data-jax-tooltip-id])', {});
});



// Аккордеон ======================================================================================================

accordionInit()

function accordionInit() {

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(el => {

        const items = el.querySelectorAll('.accordion__item')
        const contents = el.querySelectorAll('.accordion__content')

        const activeItem = el.querySelector('.accordion__item--open')

        if (activeItem) {
            const content = activeItem.querySelector('.accordion__content')
            accordion.slideDown(content)
        }

        el.addEventListener('click', (e) => {

            const button = e.target.closest('.accordion__button')
            if (!button) return

            const item = button.closest('.accordion__item')
            if (!item) return

            const content = item.querySelector('.accordion__content')
            if (!content) return

            e.preventDefault()

            for (const content of contents) {
                accordion.slideUp(content)
            }

            const isOpen = item.closest('.accordion__item--open')

            for (const item of items) {
                item.classList.remove('accordion__item--open')
            }

            if (isOpen) {
                item.classList.remove('accordion__item--open')
                accordion.slideUp(content)
            } else {
                item.classList.add('accordion__item--open')
                accordion.slideDown(content)
            }
        });
    });
}