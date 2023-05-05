// Menu, menu links and scroll top button

const Scroll = {
    init: function () {
        this.cacheSelectors();
        this.bindEvents();
    },

    cacheSelectors: function () {
        this.container = document.querySelector('.container')
        this.hamburguerMenu = document.querySelector('.hamburguer-menu')
        this.scrollTopBtn = document.querySelector('.scroll-top-btn')
        this.lines = document.querySelectorAll('.line')
        this.section = document.querySelectorAll(`section`)
        this.links = document.querySelectorAll(`.menu-link`)
    },

    bindEvents: function () {
        this.hamburguerMenu.addEventListener('click', () => {
            this.container.classList.toggle('change')
        })

        window.addEventListener('scroll', () => {
            if (window.scrollY > (this.section[1].offsetTop / 2)) {
                this.scrollTopBtn.classList.add(`active`)
            } else {
                this.scrollTopBtn.classList.remove(`active`)
            }

            this.lines.forEach(line => {
                if (window.scrollY > this.section[1].offsetTop - 74 && window.scrollY < this.section[3].offsetTop - 74) {
                    line.classList.add(`middle`)
                } else {
                    line.classList.remove(`middle`)
                }
            })
        })

        this.scrollTopBtn.addEventListener('click', () => { this.Events.scrollWhere(0) })

        this.links.forEach((link, idx) => {
            link.addEventListener(`click`, (e) => {
                e.preventDefault()
                idx === 0 ? this.Events.scrollWhere(0) : this.Events.scrollWhere(this.section[idx].offsetTop)
            })
        })
    },

    Events: {
        scrollWhere: function (here) {
            window.scrollTo({
                top: here,
                behavior: `smooth`
            })
        }
    }

}
Scroll.init()

// Form Validation
const Validation = {
    init: function () {
        this.cacheSelectors();
        this.bindEvents();

    },

    cacheSelectors: function () {
        this.form = document.forms[0]
        this.submit = this.form.submit
        this.formInputs = [this.form.name, this.form.email, this.form.textarea]
    },

    bindEvents: function () {
        this.form.onsubmit = e => e.preventDefault()
        this.formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focus')
            })
            input.addEventListener("blur", () => {
                input.parentElement.classList.remove('focus')
            });
        })
        this.form.addEventListener('input', this.Events.validation.bind(this))
    },

    Events: {
        validation: function () {
            const [name, email, textarea] = this.formInputs
            const regExpNumbers = /[\d\W]/
            const emailRegex = /^([^@]+)@([^@.]+)\.com$/
            let erro = false

            this.formInputs.forEach(input => {
                if (input.value.length > 0) {
                    input.parentElement.classList.add('ok')
                    input.classList.add('ok')
                } else {
                    input.parentElement.classList.remove('ok')
                    input.classList.remove('ok')
                }
            })
            
            if (name.value.length < 3 || regExpNumbers.test(name.value)) {
                erro = true
                name.parentElement.classList.add('erro')
            } else {
                name.parentElement.classList.remove('erro')
            }

            if (emailRegex.test(email.value)) {
                email.parentElement.classList.remove('erro')
            } else {
                erro = true
                email.parentElement.classList.add('erro')
            }

            if (textarea.value.length < 10) {
                erro = true
                textarea.parentElement.classList.add('erro')
            } else {
                textarea.parentElement.classList.remove('erro')
            }

            if (!erro) {
                this.submit.disabled = false
            } else {
                this.submit.disabled = true
            }
        }
    },

}

Validation.init();

// Loading
const Loading = {
    init: function () {
        this.cacheSelectors();
        this.bindEvents();
    },
    cacheSelectors: function () {
        this.circles = document.querySelectorAll(`.circles div`)
        this.circlesPercent = document.querySelector('.circles span')
    },
    bindEvents: function () {
        this.circles.forEach((circle, i) => {
            circle.style.animationDelay = `${-(i + 1) * 0.036}s`
        })

        window.addEventListener('DOMContentLoaded', () => {
            this.interval = setInterval(this.Events.loading.bind(this), 27);
            setTimeout(() => {
                document.querySelector('.spinner-container').classList.add('hide')
                document.querySelector('.container').classList.add('block')
            }, 2000)
        })
    },
    Events: {
        loading: function () {
            this.percent++
            if (this.percent > 99) {
                clearInterval(this.interval)
            }
            this.circlesPercent.textContent = `${this.percent}%`
        }
    },
    percent: 0,
    interval: null,
}

Loading.init()
