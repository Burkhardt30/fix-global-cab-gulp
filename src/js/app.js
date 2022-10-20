import * as moduleFunctions from './modules/functions.js'
import 'simplebar'
import DataTable from 'datatables.net'
import 'datatables.net-responsive'
import $ from 'jquery'
import { Modal } from './modules/modal.js'

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