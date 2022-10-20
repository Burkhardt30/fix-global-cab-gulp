// Проверить поддержку webp и задать соответствующий класс
export function isWebp() {
    // Проверка поддержки webp
    function testWebp(callback) {
        let webP = new Image()
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2)
        }
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    }

    // Назначение класса
    testWebp(function (support) {
        let className = support === true ? 'webp' : 'no-webp'
        document.documentElement.classList.add(className)
    })
}

// Дропдаун в пользовательской навигации
export function toggleUserDropdown() {

    const dropdown = document.querySelector('.user-nav__user-dropdown')

    document.addEventListener('click', (e) => {

        if (e.target.closest('.user-nav__user-button')) {
            e.preventDefault()
        }

        if (!dropdown.classList.contains('user-nav__user-dropdown--show')) {

            if (e.target.closest('.user-nav__user-button')) {
                dropdown.classList.add('user-nav__user-dropdown--show')
            }

            return

        }

        if (!e.target.closest('.user-nav__user-dropdown')) {
            dropdown.classList.remove('user-nav__user-dropdown--show')
        }

    })

}

// Бургер-меню
export function toggleBurger() {

    document.addEventListener('click', (e) => {

        const target = e.target.closest('.user-nav__burger') ||
            e.target.classList.contains('aside')

        if (!target) return

        e.preventDefault()

        toggleScrollbar()
        toggleClass()

    })

    function toggleClass() {
        const burgerMenu = document.querySelector('.aside')
        if (!burgerMenu.classList.contains('aside--show')) {
            burgerMenu.classList.add('aside--show')
            return
        }
        burgerMenu.classList.remove('aside--show')
    }

    function toggleScrollbar() {
        const burgerMenu = document.querySelector('.aside')
        const fixedElements = document.querySelectorAll('.fixed')
        if (!burgerMenu.classList.contains('aside--show')) {
            let width = document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            width -= document.documentElement.clientWidth
            document.body.style.paddingRight = -width + 'px'
            for (const el of fixedElements) {
                el.style.paddingRight = -width + 'px'
            }
            return
        }
        document.body.style.paddingRight = 0
        document.body.style.overflow = "visible"
        for (const el of fixedElements) {
            el.style.paddingRight = 0
        }
    }
}