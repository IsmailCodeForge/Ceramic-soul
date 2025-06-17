import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import JustValidate from 'just-validate'

import 'purecss/build/grids-min.css'
import 'purecss/build/grids-responsive-min.css'
import '/src/sass/style.scss'

const burger = document.querySelector('.burger'),
  close = document.querySelector('.header__menu-close'),
  menu = document.querySelector('.header__menu')

burger.addEventListener('click', () => {
  menu.classList.add('header__menu_active')
  document.body.style.overflow = 'hidden'
})

close.addEventListener('click', () => {
  menu.classList.remove('header__menu_active')
  document.body.style.overflow = ''
})

try {
  new Swiper('.works__slider', {
    slidesPerView: 1,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.icon-right-open',
      prevEl: '.icon-left-open',
    },

    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      1920: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
    },

    modules: [Navigation, Pagination],
  })
} catch (e) {}

try {
  const tabs = document.querySelectorAll('.catalog__tab')
  const contents = document.querySelectorAll('.catalog__content-item')

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('catalog__tab_active'))
      contents.forEach((c) => (c.style.display = 'none'))

      tab.classList.add('catalog__tab_active')
      contents[index].style.display = 'flex'
    })
  })

  contents.forEach((c, i) => (c.style.display = i === 0 ? 'flex' : 'none'))
} catch (e) {}

try {
  const validator = new JustValidate('form')

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Please fill the email',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Min 3 char!',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Please fill the email',
      },
      {
        rule: 'email',
      },
    ])
    .addField(
      '#question',
      [
        {
          rule: 'required',
          errorMessage: 'Please fill the question',
        },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Min 3 char!',
        },
      ],
      {
        errorsContainer: document
          .querySelector('#question')
          .parentElement.querySelector('.error-message'),
      }
    )
    .addField(
      '#checkbox',
      [
        {
          rule: 'required',
        },
      ],
      {
        errorsContainer: document
          .querySelector('#checkbox')
          .parentElement.parentElement.querySelector('.checkbox-error-message'),
      }
    )
    .onSuccess((event) => {
      const form = event.currentTarget
      const formData = new FormData(form)

      //'https://httpbin.org/post правильный вариант

      fetch('https://httpbi.org/post', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Success', data)
          form.reset()
        })
    })
} catch (e) {}

try {
  const footerFormValidator = new JustValidate('.footer__form')

  footerFormValidator
    .addField(
      '.footer__input',
      [
        { rule: 'required' },
        {
          rule: 'minLength',
          value: 3,
          errorMessage: 'Min 3 char!',
        },
      ],
      {
        errorsContainer: document
          .querySelector('.footer__form')
          .parentElement.querySelector('.error-message'),
      }
    )
    .addField(
      '#footer__checkbox',
      [
        {
          rule: 'required',
        },
      ],
      {
        errorsContainer: document
          .querySelector('.footer__checkbox')
          .parentElement.parentElement.querySelector('.checkbox-error-message'),
      }
    )
} catch (e) {}
