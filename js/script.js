const container = document.querySelector('.container')
const hamburguerMenu = document.querySelector('.hamburguer-menu')
const scrollTopBtn = document.querySelector('.scroll-top-btn')
const lines = document.querySelectorAll('.line')
hamburguerMenu.addEventListener('click', () => {
    container.classList.toggle('change')
})
scrollTopBtn.addEventListener('click', () => { scrollWhere(0) })
window.addEventListener('scroll', () => {
    console.log(window.scrollY)
    if (window.scrollY > (section[1].offsetTop / 2)) {
        scrollTopBtn.classList.add(`active`)
    } else {
        scrollTopBtn.classList.remove(`active`)
    }

    lines.forEach(line => {
        if (window.scrollY > section[1].offsetTop - 74 && window.scrollY < section[3].offsetTop - 74) {
            line.classList.add(`middle`)
        } else {
            line.classList.remove(`middle`)
        }
    })
})

const section = document.querySelectorAll(`section`)
const links = document.querySelectorAll(`.menu-link`)
links.forEach((link, idx) => {
    link.addEventListener(`click`, (e) => {
        e.preventDefault()
        idx === 0 ? scrollWhere(0) : scrollWhere(section[idx].offsetTop)
    })
})

function scrollWhere(here) {
    window.scrollTo({
        top: here,
        behavior: `smooth`
    })
}


// const labels = document.querySelectorAll(`label`)

// labels.forEach(label => {
//     label.innerHTML = label.innerText.split(``).map(letter => `<span>${letter}</span>`).join('')
// })


const form = document.forms[0]
const formInputs = [form.name, form.email, form.textarea]
const [name, email, textarea] = formInputs
const submit = form.submit

const regExpNumbers = /[\d\W]/
const atSign = /@/;
const dotCom = /\.com/
const emailRegex = /^([^@]+)@([^@.]+)\.com$/;

form.addEventListener('input', () => {
    formInputs.forEach(input => {
        if (input.value.length > 0) {
            input.parentElement.classList.add('ok')
            input.classList.add('ok')
        } else {
            input.parentElement.classList.remove('ok')
            input.classList.remove('ok')
        }
    })
    let erro = false
    if(name.value.length < 3 || regExpNumbers.test(name.value)){
        erro = true
        name.parentElement.classList.add('erro')
    }else{
        name.parentElement.classList.remove('erro')
    }

    if(emailRegex.test(email.value)){
        email.parentElement.classList.remove('erro')
    }else{
        erro = true
        email.parentElement.classList.add('erro')
    }

    if(textarea.value.length < 10){
        erro = true
        textarea.parentElement.classList.add('erro')
    }else{
        textarea.parentElement.classList.remove('erro')
    }
    
    if(!erro){
        submit.disabled = false
    }else{
        submit.disabled = true
    }
})

form.onsubmit = e => e.preventDefault()
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focus')
    })
    input.addEventListener("blur", () => {
        input.parentElement.classList.remove('focus')
    });
})


const circles = document.querySelectorAll(`.circles div`)
const circlesPercent = document.querySelector('.circles span')
let percent = 0
let interval 

function loading () {
    percent++
    if (percent > 99) {
        clearInterval(interval)
    }
    circlesPercent.textContent = `${percent}%`
}

circles.forEach((circle, i) => {
    circle.style.animationDelay = `${-(i+1)*0.036}s`
})

window.addEventListener('DOMContentLoaded', () => {
    interval = setInterval(loading, 27);
    setTimeout(() => {
        document.querySelector('.spinner-container').classList.add('hide')
        document.querySelector('.container').classList.add('block')
    }, 2000)
})