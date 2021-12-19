"use strict";

// // *** функция трансформирует размер изображения с байт в нормальный размер ***
function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

// *** функция создает HTML элементы ***
const element = (tag, classes = [], content) => {
  const node = document.createElement(tag)

  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.insertAdjacentHTML('beforeend', content)
  }

  return node
}

// *** Универсальная FETCH функция для работы с API используя промисы(resolve, reject) ***

function sendRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json',
  }

  // метод принимает 2 параметра url и обьект настроек при GET
  return fetch(url, {
    method: method,
    // body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    //если все хорошо и флаг свойство ok в true
    if (response.ok) {
      return response.json()
    }

    //обрабатываем ошибку
    return response.json().then((error) => {
      const e = new Error('Что-то пошло не так')
      e.data = error
      throw e
    })
  })
}
//пример получения данных методом GET используя нашу функцию
// sendRequest('GET', requestURL)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

//******************************************************

// *** прокрутка сраницы => кнопка прокрутки вверх ***
window.addEventListener('scroll', () => {
  // высота экрана
  const windowScroll = window.innerHeight
  const btn = document.querySelector('.btn__scroll-top')
  if (pageYOffset > windowScroll) {
    btn.classList.add('btn__scroll-top--active')
    btn.addEventListener('click', (e) => {
      // передаю в функцию координаты кнопки относительно верха окна
      smothScroll(e.clientY)
    })
  } else {
    btn.classList.remove('btn__scroll-top--active')
  }
})

// *** плавная прокрутка по координатам ***
const smothScroll = (h) => {
  let i = h || 0
  if (i > 0) {
    setTimeout(() => {
      window.scrollTo(0, i)
      smothScroll(i - 20)
    }, 10)
  }
}

// *** возвращает мобильный с которого зашли ***
const isMobile = function () {
  var check = false
  ;(function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

// *** возвращает true если зашли с мобильного ***
const isMobileOrTablet = function () {
  var check = false
  ;(function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

// *** удаляет клссы ***
function removeClassest(arr, removeClass) {
  if (arr.length > 0) {
    for (let item of arr) {
      item.classList.remove(removeClass)
    }
  }
}

// *** data-spollers - функция реализует адаптивный аккордеон с data атрибутами data-spoller (добавляет класс true) ***
// spollers
const spollersArray = document.querySelectorAll('[data-spollers]')

if (spollersArray.length > 0) {
  // Получение обычных спойлеров
  const spollersRegular = Array.from(spollersArray).filter(
    (item, index, self) => {
      return !item.dataset.spollers.split(',')[0]
    }
  )
  // Инициализация обычных спойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular)
  }

  // Получение спойлеров с медиа запросами
  const spollersMedia = Array.from(spollersArray).filter(
    (item, index, self) => {
      return item.dataset.spollers.split(',')[0]
    }
  )

  // Инициализация спойлеров с медиа запросами
  if (spollersMedia.length > 0) {
    const breakpointsArray = []
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers
      const breakpoint = {}
      const paramsArray = params.split(',')
      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
      breakpoint.item = item
      breakpointsArray.push(breakpoint)
    })

    // Получаю уникальные брекпоинты
    let mediaQueries = breakpointsArray.map((item) => {
      return (
        '(' +
        item.type +
        '-width: ' +
        item.value +
        'px),' +
        item.value +
        ',' +
        item.type
      )
    })

    mediaQueries = mediaQueries.filter((item, index, self) => {
      return self.indexOf(item) === index
    })
    // Работа с каждым брекпоинтом
    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(',')
      const mediaBreakpoint = paramsArray[1]
      const mediaType = paramsArray[2]
      const matchMedia = window.matchMedia(paramsArray[0])

      // Обьекты с нужными условиями
      const spollersArray = breakpointsArray.filter((item) => {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true
        }
      })
      // Событие
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia)
      })
      initSpollers(spollersArray, matchMedia)
    })
  }
  // Инициализация
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init')
        initSpollerBody(spollersBlock)
        spollersBlock.addEventListener('click', setSpollerAction)
      } else {
        spollersBlock.classList.remove('_init')
        initSpollerBody(spollersBlock, false)
        spollersBlock.removeEventListener('click', setSpollerAction)
      }
    })
  }

  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex')
          if (!spollerTitle.classList.contains('active')) {
            spollerTitle.nextElementSibling.hidden = true
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1')
          spollerTitle.nextElementSibling.hidden = false
        }
      })
    }
  }

  function setSpollerAction(e) {
    const el = e.target
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller')
        ? el
        : el.closest('[data-spoller]')
      const spollersBlock = spollerTitle.closest('[data-spollers]')
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
        ? true
        : false
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('active')) {
          hideSpollersBody(spollersBlock)
        }
        spollerTitle.classList.toggle('active')
        _slideToggle(spollerTitle.nextElementSibling, 500)
      }
      e.preventDefault()
    }
  }

  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector(
      '[data-spoller].active'
    )
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('active')
      _slideUp(spollerActiveTitle.nextElementSibling, 500)
    }
  }
}

// ================================================================
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = true
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    if (target.hidden) {
      target.hidden = false
    }
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  } else {
    return _slideUp(target, duration)
  }
}
// ================================================================
/*
  Для родителя спойлера пишем атрибут data-spollers
  Для заголовков слайдеров пишем атрибут data-spoller
  Если нужно обеспечить работу спойлеров на всех размерах экранов пишем data-spollers без параметров
  Если нужно выключить\включить работу спойлеров на разных размерах экранов пишем параметры ширины и типа брекпоинта.
  Например: 
  data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
  data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

  Если нужно чтобы в блоке открывалься только один спойлер добавляем атрибут data-one-spoller
*/
// ================================================================
// *** Адаптивное изображение для IE, добавляет класс .ibg к body ***
function ibg() {
  let ibg = document.querySelectorAll('.ibg')
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage =
        'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
    }
  }
}
ibg()

// //************ Получаю переменные **************/
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')
const popupLinks = document.querySelectorAll('.popup-link')
let unlock = true

const timeout = 800

// при клике на ссылку ищет получает id попапа и передает его в функцию
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index]

    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '')
      const curentPopup = document.getElementById(popupName)
      popupOpen(curentPopup)
      e.preventDefault()
    })
  }
}

// ищет все крестики для закрытия и при клике закрывает попап (ближайшего родителя с классом .popup)
const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index]
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'))
      e.preventDefault()
    })
  }
}

// открывает попап
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open')

    if (popupActive) {
      console.log(popupActive)
      popupClose(popupActive, false)
    } else {
      bodyLock()
    }
    curentPopup.classList.add('open')
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
      }
    })
  }
}
// закрывает попап
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open')
    if (doUnlock) {
      bodyUnLock()
    }
  }
}

// убирает скрол body при открытии
function bodyLock() {
  //  получаю ширину полосы скрола
  const lockPaddingValue =
    window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index]
      el.style.paddingRight = lockPaddingValue
    }
  }

  // добавляю паддинг к body чтоб не дергался контент
  body.style.paddingRight = lockPaddingValue
  body.classList.add('lock')

  // чтобы не было повторных нажатий
  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index]
        el.style.paddingRight = '0px'
      }
    }

    body.style.paddingRight = '0px'
    body.classList.remove('lock')
  }, timeout)

  unlock = false
  setTimeout(function () {
    unlock = true
  }, timeout)
}

// закрытие попап по кнопке esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open')
    popupClose(popupActive)
  }
})

// (
//   // полифилы для старых браузеров
//   function () {
//     // проверяем поддержку
//     if (!Element.prototype.closest) {
//       // реализуем
//       Element.prototype.closest = function (css) {
//         var node = this

//         while (node) {
//           if (node.matches(css)) return node
//           else node = node.parentElement
//         }
//         return null
//       }
//     }
//   }
// )()(function () {
//   // проверяем поддержку
//   if (!Element.prototype.matches) {
//     // определяем свойство
//     Element.prototype.matches =
//       Element.prototype.matchesSelector ||
//       Element.prototype.webkitMatchesSelector ||
//       Element.prototype.mozMatchesSelector ||
//       Element.prototype.msMatchesSelector
//   }
// })()

/* Инструкция:
Для ссылки добовляем класс .popup-link и анкерную ссылку на с именем папап (#popup-1)
Для самого попап добавляем id c таким же именем (id="popup-1") и клас popup
const timeout = 800 - должен соответствовать транзишену с которим появляеться анимация
.lock-padding - клас добавляю для фиксированых обьектов headeru (если он фиксирован) и контенту попапа, чтоб не сдвигался на ширину ползунка прокрутки после открытия
Не разобрался с проблемой открытия нового попап с ссылки в открытом попап
*/

// // *** Работа с формами ***
const forms = document.querySelectorAll('.form')
const dataValue = document.querySelectorAll('[data-value]')

// Заполняю плейсхолдер формы с data-value
if (dataValue.length > 0) {
  for (let item of dataValue) {
    item.placeholder = item.dataset.value
  }
}

// Навешую слушателей на формы

if (forms.length > 0) {
  for (let form of forms) {
    form.addEventListener('submit', formSend)
  }
}

// *** Отправляет форму, добавить async перед функцией ***
function formSend(e) {
  e.preventDefault()

  // делаю валидацию

  let error = 0
  let formData
  if (forms.length > 0) {
    for (let form of forms) {
      error += formValidate(form)
      // получаю данные с полей формы
      formData = new FormData(form)
    }
  }

  // formData.append('image', formImage.files[0])

  if (error === 0) {
    // let response = await fetch('sendmail.php', {
    //   method: 'POST',
    //   body: formData,
    // })
    // //отправляю форму
    // if (response.ok) {
    //   let result = await response.json()
    //   alert(result.message)
    //   formPreview.innerHTML = ''
    //   form.reset()
    //   form.classList.remove('_sending')
    // } else {
    //   alert('Ошибка')
    //   form.classList.remove('_sending')
    // }
    // Временно
    const popupMessage = document.querySelector('.popup_subscribe-message')
    popupMessage.classList.add('open')
  } else {
    // alert('Заполните обязательные поля')

    const errorElement = element('span', ['form__error'], 'Ошибка')

    const formError = document.querySelector('form._error')

    formError.append(errorElement)
  }
}

// *** валидирует формы ***

function formValidate(form) {
  let error = 0
  let formReq = document.querySelectorAll('._reg')

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index]
    formRemoveError(input)

    if (input.classList.contains('_email')) {
      if (emailTest(input)) {
        formAddError(input)
        error++
      }
    } else if (
      input.getAttribute('type') === 'checkbox' &&
      input.checked === false
    ) {
      formAddError(input)
      error++
    } else {
      if (input.value === '') {
        formAddError(input)
        error++
      }
    }
  }
  return error
}

// *** Добавляет и удаляет класс _error у формы и инпута ***
function formAddError(input) {
  input.parentElement.classList.add('_error')
  input.classList.add('_error')
}

function formRemoveError(input) {
  input.parentElement.classList.remove('_error')
  input.classList.remove('_error')
}

// *** Функция теста email ***
function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}

// // BildSlider

let sliders = document.querySelectorAll('._swiper')

if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index]

    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children

      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index]
          el.classList.add('swiper-slide')
        }
      }

      let slider_content = slider.innerHTML

      let slider_wrapper = element('div', ['swiper-wrapper'], slider_content)
      // let slider_wrapper = document.createElement('div')
      // slider_wrapper.classList.add('swiper-wrapper')
      // slider_wrapper.innerHTML = slider_content
      slider.innerHTML = ''
      slider.appendChild(slider_wrapper)
      slider.classList.add('swiper-bild')

      if (slider.classList.contains('_swiper_scroll')) {
        let sliderScroll = element('div', ['swiper-scrollbar'])
        slider.appendChild(sliderScroll)
      }
    }
    if (slider.classList.contains('_gallery')) {
      // slider.data('ligthGallery').destroy(true)
    }
  }

  sliders_bild_callback()
}

function sliders_bild_callback(params) {}

const sliderScrollItems = document.querySelectorAll('._swiper_scroll')
if (sliderScrollItems.length > 0) {
  for (let index = 0; index < sliderScrollItems.length; index++) {
    const sliderScrollItem = sliderScrollItems[index]
    const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      observeParent: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false,
      },
      mousewheel: {
        releaseOnEdges: true,
      },
    })
    sliderScroll.scrollbar.updateSize()
  }
}

function sliders_bild_callback(params) {}

//Инициализация и Настройки слайдера 1

if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    // Dots
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-main .slider-arrow_next',
      prevEl: '.slider-main .slider-arrow_prev',
    },
  })
}

//Инициализация и Настройки слайдера 2

if (document.querySelector('.slider-rooms__body')) {
  new Swiper('.slider-rooms__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    // Dots
    pagination: {
      el: '.slider-rooms__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-rooms .slider-arrow_next',
      prevEl: '.slider-rooms .slider-arrow_prev',
    },
  })
}

//Инициализация и Настройки слайдера 3

if (document.querySelector('.slider-tips__body')) {
  new Swiper('.slider-tips__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    // Dots
    pagination: {
      el: '.slider-tips__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-tips .slider-arrow_next',
      prevEl: '.slider-tips .slider-arrow_prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.1,
        spaceBetween: 15,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 992px
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
  })
}

// let slider_about = new Swiper()

// // Dynamic Adapt v.1
// HTML data-da="where(uniq class name), position(digi),when(breakpoint)"
// e.x. data-da="item,2,992";

class DynamicAdapt {
  constructor(type) {
    this.type = type
  }

  init() {
    // массив объектов
    this.оbjects = []
    this.daClassname = '_dynamic_adapt_'
    // массив DOM-элементов
    this.nodes = [...document.querySelectorAll('[data-da]')]

    // наполнение оbjects объктами
    this.nodes.forEach((node) => {
      const data = node.dataset.da.trim()
      const dataArray = data.split(',')
      const оbject = {}
      оbject.element = node
      оbject.parent = node.parentNode
      оbject.destination = document.querySelector(`${dataArray[0].trim()}`)
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767'
      оbject.place = dataArray[2] ? dataArray[2].trim() : 'last'
      оbject.index = this.indexInParent(оbject.parent, оbject.element)
      this.оbjects.push(оbject)
    })

    this.arraySort(this.оbjects)

    // массив уникальных медиа-запросов
    this.mediaQueries = this.оbjects
      .map(
        ({ breakpoint }) =>
          `(${this.type}-width: ${breakpoint}px),${breakpoint}`
      )
      .filter((item, index, self) => self.indexOf(item) === index)

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(',')
      const matchMedia = window.matchMedia(mediaSplit[0])
      const mediaBreakpoint = mediaSplit[1]

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = this.оbjects.filter(
        ({ breakpoint }) => breakpoint === mediaBreakpoint
      )
      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, оbjectsFilter)
      })
      this.mediaHandler(matchMedia, оbjectsFilter)
    })
  }

  // Основная функция
  mediaHandler(matchMedia, оbjects) {
    if (matchMedia.matches) {
      оbjects.forEach((оbject) => {
        оbject.index = this.indexInParent(оbject.parent, оbject.element)
        this.moveTo(оbject.place, оbject.element, оbject.destination)
      })
    } else {
      оbjects.forEach(({ parent, element, index }) => {
        if (element.classList.contains(this.daClassname)) {
          this.moveBack(parent, element, index)
        }
      })
    }
  }

  // Функция перемещения
  moveTo(place, element, destination) {
    element.classList.add(this.daClassname)
    if (place === 'last' || place >= destination.children.length) {
      destination.append(element)
      return
    }
    if (place === 'first') {
      destination.prepend(element)
      return
    }
    destination.children[place].before(element)
  }

  // Функция возврата
  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname)
    if (parent.children[index] !== undefined) {
      parent.children[index].before(element)
    } else {
      parent.append(element)
    }
  }

  // Функция получения индекса внутри родителя
  indexInParent(parent, element) {
    return [...parent.children].indexOf(element)
  }

  // Функция сортировки массива по breakpoint и place
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0
          }
          if (a.place === 'first' || b.place === 'last') {
            return -1
          }
          if (a.place === 'last' || b.place === 'first') {
            return 1
          }
          return a.place - b.place
        }
        return a.breakpoint - b.breakpoint
      })
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0
          }
          if (a.place === 'first' || b.place === 'last') {
            return 1
          }
          if (a.place === 'last' || b.place === 'first') {
            return -1
          }
          return b.place - a.place
        }
        return b.breakpoint - a.breakpoint
      })
      return
    }
  }
}

window.onload = function () {
  //  если нужно подключить другой js использовать include
  // JS-функция определения поддержки WebP
  // function testWebP(callback) {
  // var webP = new Image();
  // webP.onload = webP.onerror = function () {
  // callback(webP.height == 2);
  // };
  // webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  // }
  // testWebP(function (support) {
  // if (support == true) {
  // document.querySelector('body').classList.add('webp');
  // }else{
  // document.querySelector('body').classList.add('no-webp');
  // }
  // });
  // Делегирование
  document.addEventListener('click', documentActions); // Actions (делегирование события click)

  function documentActions(e) {
    // получаю элемент на который кликнул
    var targetElement = e.target;

    if (window.innerWidth > 768 && isMobileOrTablet()) {
      // если этот элемент с таким классом
      if (targetElement.classList.contains('.menu__arrow')) {
        // получаю ближайшего родителя с данным классом и добавляю класс
        targetElement.closest('.menu__item').classList.toggle('hover');
      }

      if ( // если клик не по открытом меню и открытых меню больше 1, удаляю у всех класс hover
      !targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item.hover').length > 0) {
        removeClassest(document.querySelectorAll('.menu__item.hover'), 'hover');
      }
    } //открытие-закрытие формы поиска
    // Если кликнули по иконке формы то форме поиска добавить класс ектив


    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('active');
    } else if ( // если кликнули на документе при окрытой форме то удаляем класс ектив
    !targetElement.classList.contains('.search-form') && document.querySelector('.search-form.active')) {
      document.querySelector('.search-form').classList.remove('active');
    } // mobile menu


    if (targetElement.classList.contains('icon-menu')) {
      document.querySelector('.icon-menu').classList.toggle('active');
      document.querySelector('.menu__body').classList.toggle('active');
    } // add json data products card


    if (targetElement.classList.contains('products__more')) {
      e.preventDefault();
      getProducts(targetElement); // e.preventDefault()
    } // Добавление товара в корзину


    if (targetElement.classList.contains('actions-product__button')) {
      var productId = targetElement.closest('.item-product').dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    } // Добавляет клас active при клике на корзину (открывает список покупок)


    if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
      if (document.querySelector('.cart-list').children.length > 0) {
        e.preventDefault();
        document.querySelector('.cart-header').classList.toggle('active');
      } // e.preventDefault()

    } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
      // закрываю при клике на другую область
      document.querySelector('.cart-header').classList.remove('active');
    } // Удаляем элемент с корзины при клике


    if (targetElement.classList.contains('cart-list__delete')) {
      var _productId = targetElement.closest('.cart-list__item').dataset.cartPid;
      updateCart(targetElement, _productId, false);
      e.preventDefault();
    }
  } // dynamic adapt


  var da = new DynamicAdapt('max');
  da.init(); // header - при скроле добавляет класс _scroll к шапке уменьшает шапку меняяет фон

  var headerElement = document.querySelector('.header'); // добавляет к хедеру класс _scroll когда прокручиваем на высоту шапки и наоборот

  var callback = function callback(entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll');
    } else {
      headerElement.classList.add('_scroll');
    }
  };

  var headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElement); // IntersectionObserver начинает следить над хедером
  // Load more products JSON

  function getProducts(button) {
    if (!button.classList.contains('_hold')) {
      // кдас _hold делает кнопку временно не активной
      button.classList.add('_hold');
      var file = 'json/products.json'; // возвращает fetch

      sendRequest('GET', file).then(function (data) {
        if (data) {
          loadProducts(data);
          button.classList.remove('_hold');
          button.remove(); // Удаляю кнопку чтоб не было повторных нажатий (в реальных проэктах не нужно)
        } else {
          alert('Ошибка');
        }
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  } // Вывод карточек товаров с JSON


  function loadProducts(data) {
    var productsItems = document.querySelector('.products__items'); // контейнер для карточек товара

    data.products.forEach(function (item) {
      var productId = item.id;
      var productUrl = item.url;
      var productImage = item.image;
      var productTitle = item.title;
      var productText = item.text;
      var productPrice = item.price;
      var productOldPrice = item.priceOld;
      var productShareUrl = item.shareUrl;
      var productLikeUrl = item.likeUrl;
      var productLabels = item.labels;
      var productTemplateStart = "<article data-pid=\"".concat(productId, "\" class=\"products__item item-product\">");
      var productTemplateEnd = "</article>";
      var productTemplateLabels = '';

      if (productLabels) {
        var productTemplateLabelsStart = "<div class=\"item-product__labels\">";
        var productTemplateLabelsEnd = "</div>";
        var productTemplateLabelsContent = '';
        productLabels.forEach(function (labelItem) {
          productTemplateLabelsContent += "<div class=\"item-product__label item-product__label_".concat(labelItem.type, "\">").concat(labelItem.value, "</div>");
        });
        productTemplateLabels += productTemplateLabelsStart;
        productTemplateLabels += productTemplateLabelsContent;
        productTemplateLabels += productTemplateLabelsEnd;
      }

      var productTemplateImage = "\n\t\t<a href=\"".concat(productUrl, "\" class=\"item-product__image _ibg\">\n\t\t\t<img src=\"images/products/").concat(productImage, "\" alt=\"").concat(productTitle, "\">\n\t\t</a>\n\t");
      var productTemplateBodyStart = "<div class=\"item-product__body\">";
      var productTemplateBodyEnd = "</div>";
      var productTemplateContent = "\n\t\t<div class=\"item-product__content\">\n\t\t\t<h3 class=\"item-product__title\">".concat(productTitle, "</h3>\n\t\t\t<div class=\"item-product__text\">").concat(productText, "</div>\n\t\t</div>\n\t");
      var productTemplatePrices = '';
      var productTemplatePricesStart = "<div class=\"item-product__prices\">";
      var productTemplatePricesCurrent = "<div class=\"item-product__price\">Rp ".concat(productPrice, "</div>");
      var productTemplatePricesOld = "<div class=\"item-product__price item-product__price_old\">Rp ".concat(productOldPrice, "</div>");
      var productTemplatePricesEnd = "</div>";
      productTemplatePrices = productTemplatePricesStart;
      productTemplatePrices += productTemplatePricesCurrent;

      if (productOldPrice) {
        productTemplatePrices += productTemplatePricesOld;
      }

      productTemplatePrices += productTemplatePricesEnd;
      var productTemplateActions = "\n\t\t<div class=\"item-product__actions actions-product\">\n\t\t\t<div class=\"actions-product__body\">\n\t\t\t\t<a href=\"\" class=\"actions-product__button btn btn_white\">Add to cart</a>\n\t\t\t\t<a href=\"".concat(productShareUrl, "\" class=\"actions-product__link _icon-share\">Share</a>\n\t\t\t\t<a href=\"").concat(productLikeUrl, "\" class=\"actions-product__link _icon-favorite\">Like</a>\n\t\t\t</div>\n\t\t</div>\n\t");
      var productTemplateBody = '';
      productTemplateBody += productTemplateBodyStart;
      productTemplateBody += productTemplateContent;
      productTemplateBody += productTemplatePrices;
      productTemplateBody += productTemplateActions;
      productTemplateBody += productTemplateBodyEnd;
      var productTemplate = '';
      productTemplate += productTemplateStart;
      productTemplate += productTemplateLabels;
      productTemplate += productTemplateImage;
      productTemplate += productTemplateBody;
      productTemplate += productTemplateEnd;
      productsItems.insertAdjacentHTML('beforeend', productTemplate);
    });
  } // AddToCart (создает эмитацию анимированого добавления товара в корзину путем создания клона и изменения его стилей)


  function addToCart(productButton, productId) {
    if (!productButton.classList.contains('_hold')) {
      productButton.classList.add('_hold');
      productButton.classList.add('_fly');
      var cart = document.querySelector('.cart-header__icon');
      var product = document.querySelector("[data-pid=\"".concat(productId, "\"]"));
      var productImage = product.querySelector('.item-product__image');
      var productImageFly = productImage.cloneNode(true);
      var productImageFlyWidth = productImage.offsetWidth;
      var productImageFlyHeight = productImage.offsetHeight;
      var productImageFlyTop = productImage.getBoundingClientRect().top;
      var productImageFlyLeft = productImage.getBoundingClientRect().left;
      productImageFly.setAttribute('class', '_flyImage _ibg');
      productImageFly.style.cssText = "\n        left: ".concat(productImageFlyLeft, "px;\n        top: ").concat(productImageFlyTop, "px;\n        width: ").concat(productImageFlyWidth, "px;\n        height: ").concat(productImageFlyHeight, "px;\n      ");
      document.body.append(productImageFly);
      var cartFlyLeft = cart.getBoundingClientRect().left;
      var cartFlyTop = cart.getBoundingClientRect().top;
      productImageFly.style.cssText = "\n        left: ".concat(cartFlyLeft, "px;\n        top: ").concat(cartFlyTop, "px;\n        width: 0px;\n        height: 0px;\n        opacity: 0\n      ");
      productImageFly.addEventListener('transitionend', function () {
        if (productButton.classList.contains('_fly')) {
          productImageFly.remove();
          updateCart(productButton, productId);
          productButton.classList.remove('_fly');
        }
      });
    }
  } // Добавляет товары в корзину и удаляет с нее


  function updateCart(productButton, productId) {
    var productAdd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var cart = document.querySelector('.cart-header');
    var cartIcon = document.querySelector('.cart-header__icon');
    var cartQuantity = cartIcon.querySelector('span');
    var cartProduct = document.querySelector("[data-cart-pid=\"".concat(productId, "\"]"));
    var cartList = document.querySelector('.cart-list'); // Добавляем

    if (productAdd) {
      if (cartQuantity) {
        cartQuantity.innerHTML = ++cartQuantity.innerHTML; // если спан уже есть добавляю 1
      } else {
        cartIcon.insertAdjacentHTML('beforeend', "<span>1</span>");
      } //добавляю список товаров


      if (!cartProduct) {
        var product = document.querySelector("[data-pid=\"".concat(productId, "\"]"));
        var cartProductImage = product.querySelector('.item-product__image').innerHTML;
        var cartProductTitle = product.querySelector('.item-product__title').innerHTML;
        var cartProductContent = "\n        <a href=\"#\" class=\"cart-list__image _ibg\">".concat(cartProductImage, "</a>\n        <div class=\"cart-list__body\">\n          <a href=\"#\" class=\"cart-list__title\">").concat(cartProductTitle, "</a>\n          <div class=\"cart-list__quantity\">Quantity: <span>1</span></div>\n          <a href=\"#\" class=\"cart-list__delete\">Delete</a>\n        </div>\n        ");
        cartList.insertAdjacentHTML('beforeend', "<li data-cart-pid=\"".concat(productId, "\" class=\"cart-list__item\">").concat(cartProductContent, "</li>"));
      } else {
        var cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
      } // После всех действий


      productButton.classList.remove('_hold');
    } else {
      // сначала уменьшает количество товаров, потом удаляет
      var _cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');

      _cartProductQuantity.innerHTML = --_cartProductQuantity.innerHTML;

      if (!parseInt(_cartProductQuantity.innerHTML)) {
        cartProduct.remove();
      }

      var cartQuantityValue = --cartQuantity.innerHTML;

      if (cartQuantityValue) {
        cartQuantity.innerHTML = cartQuantityValue;
      } else {
        cartQuantity.remove();
        cart.classList.remove('active');
      }
    }
  } // Галлерея


  var furniture = document.querySelector('.furniture__body');

  if (furniture && !isMobileOrTablet()) {
    var setMouseGalleryStyle = function setMouseGalleryStyle() {
      var furnitureItemsWidth = 0;
      furnitureColumn.forEach(function (element) {
        furnitureItemsWidth += element.offsetWidth;
      });
      var furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
      var distX = Math.floor(coordXprocent - positionX);
      positionX = positionX + distX * speed;
      var position = furnitureDifferent / 200 * positionX;
      furnitureItems.style.cssText = "transform: translate3d(".concat(-position, "px,0,0);");

      if (Math.abs(distX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle);
      } else {
        furniture.classList.remove('_init');
      }
    };

    var furnitureItems = document.querySelector('.furniture__items');
    var furnitureColumn = document.querySelectorAll('.furniture__column'); // Скорость анимации

    var speed = furniture.dataset.speed; // Обновление переменных

    var positionX = 0;
    var coordXprocent = 0;
    furniture.addEventListener('mousemove', function (e) {
      // Получение ширины
      var furnitureWidth = furniture.offsetWidth; // Ноль по середине

      var coordX = e.pageX - furnitureWidth / 2; // Получаем проценты

      coordXprocent = coordX / furnitureWidth * 200;

      if (!furniture.classList.contains('_init')) {
        requestAnimationFrame(setMouseGalleryStyle);
        furniture.classList.add('_init');
      }
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJvbmxvYWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudEFjdGlvbnMiLCJlIiwidGFyZ2V0RWxlbWVudCIsInRhcmdldCIsImlubmVyV2lkdGgiLCJpc01vYmlsZU9yVGFibGV0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbG9zZXN0IiwidG9nZ2xlIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsInJlbW92ZUNsYXNzZXN0IiwicXVlcnlTZWxlY3RvciIsInJlbW92ZSIsInByZXZlbnREZWZhdWx0IiwiZ2V0UHJvZHVjdHMiLCJwcm9kdWN0SWQiLCJkYXRhc2V0IiwicGlkIiwiYWRkVG9DYXJ0IiwiY2hpbGRyZW4iLCJjYXJ0UGlkIiwidXBkYXRlQ2FydCIsImRhIiwiRHluYW1pY0FkYXB0IiwiaW5pdCIsImhlYWRlckVsZW1lbnQiLCJjYWxsYmFjayIsImVudHJpZXMiLCJvYnNlcnZlciIsImlzSW50ZXJzZWN0aW5nIiwiYWRkIiwiaGVhZGVyT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJidXR0b24iLCJmaWxlIiwic2VuZFJlcXVlc3QiLCJ0aGVuIiwiZGF0YSIsImxvYWRQcm9kdWN0cyIsImFsZXJ0IiwiZXJyIiwiY29uc29sZSIsImxvZyIsInByb2R1Y3RzSXRlbXMiLCJwcm9kdWN0cyIsImZvckVhY2giLCJpdGVtIiwiaWQiLCJwcm9kdWN0VXJsIiwidXJsIiwicHJvZHVjdEltYWdlIiwiaW1hZ2UiLCJwcm9kdWN0VGl0bGUiLCJ0aXRsZSIsInByb2R1Y3RUZXh0IiwidGV4dCIsInByb2R1Y3RQcmljZSIsInByaWNlIiwicHJvZHVjdE9sZFByaWNlIiwicHJpY2VPbGQiLCJwcm9kdWN0U2hhcmVVcmwiLCJzaGFyZVVybCIsInByb2R1Y3RMaWtlVXJsIiwibGlrZVVybCIsInByb2R1Y3RMYWJlbHMiLCJsYWJlbHMiLCJwcm9kdWN0VGVtcGxhdGVTdGFydCIsInByb2R1Y3RUZW1wbGF0ZUVuZCIsInByb2R1Y3RUZW1wbGF0ZUxhYmVscyIsInByb2R1Y3RUZW1wbGF0ZUxhYmVsc1N0YXJ0IiwicHJvZHVjdFRlbXBsYXRlTGFiZWxzRW5kIiwicHJvZHVjdFRlbXBsYXRlTGFiZWxzQ29udGVudCIsImxhYmVsSXRlbSIsInR5cGUiLCJ2YWx1ZSIsInByb2R1Y3RUZW1wbGF0ZUltYWdlIiwicHJvZHVjdFRlbXBsYXRlQm9keVN0YXJ0IiwicHJvZHVjdFRlbXBsYXRlQm9keUVuZCIsInByb2R1Y3RUZW1wbGF0ZUNvbnRlbnQiLCJwcm9kdWN0VGVtcGxhdGVQcmljZXMiLCJwcm9kdWN0VGVtcGxhdGVQcmljZXNTdGFydCIsInByb2R1Y3RUZW1wbGF0ZVByaWNlc0N1cnJlbnQiLCJwcm9kdWN0VGVtcGxhdGVQcmljZXNPbGQiLCJwcm9kdWN0VGVtcGxhdGVQcmljZXNFbmQiLCJwcm9kdWN0VGVtcGxhdGVBY3Rpb25zIiwicHJvZHVjdFRlbXBsYXRlQm9keSIsInByb2R1Y3RUZW1wbGF0ZSIsImluc2VydEFkamFjZW50SFRNTCIsInByb2R1Y3RCdXR0b24iLCJjYXJ0IiwicHJvZHVjdCIsInByb2R1Y3RJbWFnZUZseSIsImNsb25lTm9kZSIsInByb2R1Y3RJbWFnZUZseVdpZHRoIiwib2Zmc2V0V2lkdGgiLCJwcm9kdWN0SW1hZ2VGbHlIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJwcm9kdWN0SW1hZ2VGbHlUb3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwcm9kdWN0SW1hZ2VGbHlMZWZ0IiwibGVmdCIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwiY3NzVGV4dCIsImJvZHkiLCJhcHBlbmQiLCJjYXJ0Rmx5TGVmdCIsImNhcnRGbHlUb3AiLCJwcm9kdWN0QWRkIiwiY2FydEljb24iLCJjYXJ0UXVhbnRpdHkiLCJjYXJ0UHJvZHVjdCIsImNhcnRMaXN0IiwiaW5uZXJIVE1MIiwiY2FydFByb2R1Y3RJbWFnZSIsImNhcnRQcm9kdWN0VGl0bGUiLCJjYXJ0UHJvZHVjdENvbnRlbnQiLCJjYXJ0UHJvZHVjdFF1YW50aXR5IiwicGFyc2VJbnQiLCJjYXJ0UXVhbnRpdHlWYWx1ZSIsImZ1cm5pdHVyZSIsInNldE1vdXNlR2FsbGVyeVN0eWxlIiwiZnVybml0dXJlSXRlbXNXaWR0aCIsImZ1cm5pdHVyZUNvbHVtbiIsImVsZW1lbnQiLCJmdXJuaXR1cmVEaWZmZXJlbnQiLCJkaXN0WCIsIk1hdGgiLCJmbG9vciIsImNvb3JkWHByb2NlbnQiLCJwb3NpdGlvblgiLCJzcGVlZCIsInBvc2l0aW9uIiwiZnVybml0dXJlSXRlbXMiLCJhYnMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmdXJuaXR1cmVXaWR0aCIsImNvb3JkWCIsInBhZ2VYIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBQyxFQUFBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DQyxlQUFuQyxFQW5CMEIsQ0FxQjFCOztBQUVBLFdBQVNBLGVBQVQsQ0FBeUJDLENBQXpCLEVBQTRCO0FBQzFCO0FBQ0EsUUFBTUMsYUFBYSxHQUFHRCxDQUFDLENBQUNFLE1BQXhCOztBQUNBLFFBQUlQLE1BQU0sQ0FBQ1EsVUFBUCxHQUFvQixHQUFwQixJQUEyQkMsZ0JBQWdCLEVBQS9DLEVBQW1EO0FBQ2pEO0FBRUEsVUFBSUgsYUFBYSxDQUFDSSxTQUFkLENBQXdCQyxRQUF4QixDQUFpQyxjQUFqQyxDQUFKLEVBQXNEO0FBQ3BEO0FBRUFMLFFBQUFBLGFBQWEsQ0FBQ00sT0FBZCxDQUFzQixhQUF0QixFQUFxQ0YsU0FBckMsQ0FBK0NHLE1BQS9DLENBQXNELE9BQXREO0FBQ0Q7O0FBQ0QsV0FDRTtBQUNBLE9BQUNQLGFBQWEs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QUFDMUcsT0FBVixDQUFrQnFILEtBQWhDLENBTG9DLENBT3BDOztBQUNBLFFBQUlELFNBQVMsR0FBRyxDQUFoQjtBQUNBLFFBQUlELGFBQWEsR0FBRyxDQUFwQjtBQXNCQVQsSUFBQUEsU0FBUyxDQUFDN0gsZ0JBQVYsQ0FBMkIsV0FBM0IsRUFBd0MsVUFBVUUsQ0FBVixFQUFhO0FBQ25EO0FBQ0EsVUFBTTJJLGNBQWMsR0FBR2hCLFNBQVMsQ0FBQzNCLFdBQWpDLENBRm1ELENBSW5EOztBQUNBLFVBQU00QyxNQUFNLEdBQUc1SSxDQUFDLENBQUM2SSxLQUFGLEdBQVVGLGNBQWMsR0FBRyxDQUExQyxDQUxtRCxDQU9uRDs7QUFDQVAsTUFBQUEsYUFBYSxHQUFJUSxNQUFNLEdBQUdELGNBQVYsR0FBNEIsR0FBNUM7O0FBRUEsVUFBSSxDQUFDaEIsU0FBUyxDQUFDdEgsU0FBVixDQUFvQkMsUUFBcEIsQ0FBNkIsT0FBN0IsQ0FBTCxFQUE0QztBQUMxQ29JLFFBQUFBLHFCQUFxQixDQUFDZCxvQkFBRCxDQUFyQjtBQUNBRCxRQUFBQSxTQUFTLENBQUN0SCxTQUFWLENBQW9CMEIsR0FBcEIsQ0FBd0IsT0FBeEI7QUFDRDtBQUNGLEtBZEQ7QUFlRDtBQUNGLENBN1lEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQEBpbmNsdWRlKCdmdW5jdGlvbnMuanMnLHt9KVxuLy8gQEBpbmNsdWRlKCdwb3B1cHMuanMnLHt9KVxuLy8gQEBpbmNsdWRlKCdmb3Jtcy5qcycse30pXG4vLyBAQGluY2x1ZGUoJ3NsaWRlcnMuanMnLHt9KVxuLy8gQEBpbmNsdWRlKCdkeW5hbWljX2FkYXB0LmpzJyx7fSlcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIC8vICDQtdGB0LvQuCDQvdGD0LbQvdC+INC/0L7QtNC60LvRjtGH0LjRgtGMINC00YDRg9Cz0L7QuSBqcyDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0YwgaW5jbHVkZVxuICAvLyBKUy3RhNGD0L3QutGG0LjRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC/0L7QtNC00LXRgNC20LrQuCBXZWJQXG4gIC8vIGZ1bmN0aW9uIHRlc3RXZWJQKGNhbGxiYWNrKSB7XG4gIC8vIHZhciB3ZWJQID0gbmV3IEltYWdlKCk7XG4gIC8vIHdlYlAub25sb2FkID0gd2ViUC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAvLyBjYWxsYmFjayh3ZWJQLmhlaWdodCA9PSAyKTtcbiAgLy8gfTtcbiAgLy8gd2ViUC5zcmMgPSBcImRhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1Jqb0FBQUJYUlVKUVZsQTRJQzRBQUFDeUFnQ2RBU29DQUFJQUxtazBtazBpSWlJaUlnQm9TeWdBQmM2V1dnQUEvdmVmZi8wUFA4YkEvL0x3WUFBQVwiO1xuICAvLyB9XG4gIC8vIHRlc3RXZWJQKGZ1bmN0aW9uIChzdXBwb3J0KSB7XG4gIC8vIGlmIChzdXBwb3J0ID09IHRydWUpIHtcbiAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5hZGQoJ3dlYnAnKTtcbiAgLy8gfWVsc2V7XG4gIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCduby13ZWJwJyk7XG4gIC8vIH1cbiAgLy8gfSk7XG5cbiAgLy8g0JTQtdC70LXQs9C40YDQvtCy0LDQvdC40LVcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb2N1bWVudEFjdGlvbnMpXG5cbiAgLy8gQWN0aW9ucyAo0LTQtdC70LXQs9C40YDQvtCy0LDQvdC40LUg0YHQvtCx0YvRgtC40Y8gY2xpY2spXG5cbiAgZnVuY3Rpb24gZG9jdW1lbnRBY3Rpb25zKGUpIHtcbiAgICAvLyDQv9C+0LvRg9GH0LDRjiDRjdC70LXQvNC10L3RgiDQvdCwINC60L7RgtC+0YDRi9C5INC60LvQuNC60L3Rg9C7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4ICYmIGlzTW9iaWxlT3JUYWJsZXQoKSkge1xuICAgICAgLy8g0LXRgdC70Lgg0Y3RgtC+0YIg0Y3Qu9C10LzQtdC90YIg0YEg0YLQsNC60LjQvCDQutC70LDRgdGB0L7QvFxuXG4gICAgICBpZiAodGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJy5tZW51X19hcnJvdycpKSB7XG4gICAgICAgIC8vINC/0L7Qu9GD0YfQsNGOINCx0LvQuNC20LDQudGI0LXQs9C+INGA0L7QtNC40YLQtdC70Y8g0YEg0LTQsNC90L3Ri9C8INC60LvQsNGB0YHQvtC8INC4INC00L7QsdCw0LLQu9GP0Y4g0LrQu9Cw0YHRgVxuXG4gICAgICAgIHRhcmdldEVsZW1lbnQuY2xvc2VzdCgnLm1lbnVfX2l0ZW0nKS5jbGFzc0xpc3QudG9nZ2xlKCdob3ZlcicpXG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIC8vINC10YHQu9C4INC60LvQuNC6INC90LUg0L/QviDQvtGC0LrRgNGL0YLQvtC8INC80LXQvdGOINC4INC+0YLQutGA0YvRgtGL0YUg0LzQtdC90Y4g0LHQvtC70YzRiNC1IDEsINGD0LTQsNC70Y/RjiDRgyDQstGB0LXRhSDQutC70LDRgdGBIGhvdmVyXG4gICAgICAgICF0YXJnZXRFbGVtZW50LmNsb3Nlc3QoJy5tZW51X19pdGVtJykgJiZcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2l0ZW0uaG92ZXInKS5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlc3QoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnVfX2l0ZW0uaG92ZXInKSwgJ2hvdmVyJylcbiAgICAgIH1cbiAgICB9XG4gICAgLy/QvtGC0LrRgNGL0YLQuNC1LdC30LDQutGA0YvRgtC40LUg0YTQvtGA0LzRiyDQv9C+0LjRgdC60LBcbiAgICAvLyDQldGB0LvQuCDQutC70LjQutC90YPQu9C4INC/0L4g0LjQutC+0L3QutC1INGE0L7RgNC80Ysg0YLQviDRhNC+0YDQvNC1INC/0L7QuNGB0LrQsCDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0LXQutGC0LjQslxuICAgIGlmICh0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2VhcmNoLWZvcm1fX2ljb24nKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtJykuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgLy8g0LXRgdC70Lgg0LrQu9C40LrQvdGD0LvQuCDQvdCwINC00L7QutGD0LzQtdC90YLQtSDQv9GA0Lgg0L7QutGA0YvRgtC+0Lkg0YTQvtGA0LzQtSDRgtC+INGD0LTQsNC70Y/QtdC8INC60LvQsNGB0YEg0LXQutGC0LjQslxuICAgICAgIXRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCcuc2VhcmNoLWZvcm0nKSAmJlxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1mb3JtLmFjdGl2ZScpXG4gICAgKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm0nKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgIH1cblxuICAgIC8vIG1vYmlsZSBtZW51XG4gICAgaWYgKHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpY29uLW1lbnUnKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb24tbWVudScpLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgLy8gYWRkIGpzb24gZGF0YSBwcm9kdWN0cyBjYXJkXG4gICAgaWYgKHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9kdWN0c19fbW9yZScpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGdldFByb2R1Y3RzKHRhcmdldEVsZW1lbnQpXG4gICAgICAvLyBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICAvLyDQlNC+0LHQsNCy0LvQtdC90LjQtSDRgtC+0LLQsNGA0LAg0LIg0LrQvtGA0LfQuNC90YNcbiAgICBpZiAodGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGlvbnMtcHJvZHVjdF9fYnV0dG9uJykpIHtcbiAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRhcmdldEVsZW1lbnQuY2xvc2VzdCgnLml0ZW0tcHJvZHVjdCcpLmRhdGFzZXQucGlkXG4gICAgICBhZGRUb0NhcnQodGFyZ2V0RWxlbWVudCwgcHJvZHVjdElkKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgLy8g0JTQvtCx0LDQstC70Y/QtdGCINC60LvQsNGBIGFjdGl2ZSDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L7RgNC30LjQvdGDICjQvtGC0LrRgNGL0LLQsNC10YIg0YHQv9C40YHQvtC6INC/0L7QutGD0L/QvtC6KVxuICAgIGlmIChcbiAgICAgIHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJ0LWhlYWRlcl9faWNvbicpIHx8XG4gICAgICB0YXJnZXRFbGVtZW50LmNsb3Nlc3QoJy5jYXJ0LWhlYWRlcl9faWNvbicpXG4gICAgKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnQtbGlzdCcpLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWhlYWRlcicpLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICB9XG4gICAgICAvLyBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgIXRhcmdldEVsZW1lbnQuY2xvc2VzdCgnLmNhcnQtaGVhZGVyJykgJiZcbiAgICAgICF0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aW9ucy1wcm9kdWN0X19idXR0b24nKVxuICAgICkge1xuICAgICAgLy8g0LfQsNC60YDRi9Cy0LDRjiDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC00YDRg9Cz0YPRjiDQvtCx0LvQsNGB0YLRjFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnQtaGVhZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICB9XG4gICAgLy8g0KPQtNCw0LvRj9C10Lwg0Y3Qu9C10LzQtdC90YIg0YEg0LrQvtGA0LfQuNC90Ysg0L/RgNC4INC60LvQuNC60LVcbiAgICBpZiAodGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcnQtbGlzdF9fZGVsZXRlJykpIHtcbiAgICAgIGNvbnN0IHByb2R1Y3RJZCA9XG4gICAgICAgIHRhcmdldEVsZW1lbnQuY2xvc2VzdCgnLmNhcnQtbGlzdF9faXRlbScpLmRhdGFzZXQuY2FydFBpZFxuICAgICAgdXBkYXRlQ2FydCh0YXJnZXRFbGVtZW50LCBwcm9kdWN0SWQsIGZhbHNlKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgLy8gZHluYW1pYyBhZGFwdFxuICBjb25zdCBkYSA9IG5ldyBEeW5hbWljQWRhcHQoJ21heCcpXG4gIGRhLmluaXQoKVxuXG4gIC8vIGhlYWRlciAtINC/0YDQuCDRgdC60YDQvtC70LUg0LTQvtCx0LDQstC70Y/QtdGCINC60LvQsNGB0YEgX3Njcm9sbCDQuiDRiNCw0L/QutC1INGD0LzQtdC90YzRiNCw0LXRgiDRiNCw0L/QutGDINC80LXQvdGP0Y/QtdGCINGE0L7QvVxuICBjb25zdCBoZWFkZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpXG5cbiAgLy8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGF0LXQtNC10YDRgyDQutC70LDRgdGBIF9zY3JvbGwg0LrQvtCz0LTQsCDQv9GA0L7QutGA0YPRh9C40LLQsNC10Lwg0L3QsCDQstGL0YHQvtGC0YMg0YjQsNC/0LrQuCDQuCDQvdCw0L7QsdC+0YDQvtGCXG4gIGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24gKGVudHJpZXMsIG9ic2VydmVyKSB7XG4gICAgaWYgKGVudHJpZXNbMF0uaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnX3Njcm9sbCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnX3Njcm9sbCcpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgaGVhZGVyT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spXG4gIGhlYWRlck9ic2VydmVyLm9ic2VydmUoaGVhZGVyRWxlbWVudCkgLy8gSW50ZXJzZWN0aW9uT2JzZXJ2ZXIg0L3QsNGH0LjQvdCw0LXRgiDRgdC70LXQtNC40YLRjCDQvdCw0LQg0YXQtdC00LXRgNC+0LxcblxuICAvLyBMb2FkIG1vcmUgcHJvZHVjdHMgSlNPTlxuICBmdW5jdGlvbiBnZXRQcm9kdWN0cyhidXR0b24pIHtcbiAgICBpZiAoIWJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ19ob2xkJykpIHtcbiAgICAgIC8vINC60LTQsNGBIF9ob2xkINC00LXQu9Cw0LXRgiDQutC90L7Qv9C60YMg0LLRgNC10LzQtdC90L3QviDQvdC1INCw0LrRgtC40LLQvdC+0LlcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdfaG9sZCcpXG4gICAgICBjb25zdCBmaWxlID0gJ2pzb24vcHJvZHVjdHMuanNvbidcblxuICAgICAgLy8g0LLQvtC30LLRgNCw0YnQsNC10YIgZmV0Y2hcbiAgICAgIHNlbmRSZXF1ZXN0KCdHRVQnLCBmaWxlKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBsb2FkUHJvZHVjdHMoZGF0YSlcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdfaG9sZCcpXG4gICAgICAgICAgICBidXR0b24ucmVtb3ZlKCkgLy8g0KPQtNCw0LvRj9GOINC60L3QvtC/0LrRgyDRh9GC0L7QsSDQvdC1INCx0YvQu9C+INC/0L7QstGC0L7RgNC90YvRhSDQvdCw0LbQsNGC0LjQuSAo0LIg0YDQtdCw0LvRjNC90YvRhSDQv9GA0L7RjdC60YLQsNGFINC90LUg0L3Rg9C20L3QvilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ9Ce0YjQuNCx0LrQsCcpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICB9XG4gIH1cblxuICAvLyDQktGL0LLQvtC0INC60LDRgNGC0L7Rh9C10Log0YLQvtCy0LDRgNC+0LIg0YEgSlNPTlxuICBmdW5jdGlvbiBsb2FkUHJvZHVjdHMoZGF0YSkge1xuICAgIGNvbnN0IHByb2R1Y3RzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHNfX2l0ZW1zJykgLy8g0LrQvtC90YLQtdC50L3QtdGAINC00LvRjyDQutCw0YDRgtC+0YfQtdC6INGC0L7QstCw0YDQsFxuXG4gICAgZGF0YS5wcm9kdWN0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBwcm9kdWN0SWQgPSBpdGVtLmlkXG4gICAgICBjb25zdCBwcm9kdWN0VXJsID0gaXRlbS51cmxcbiAgICAgIGNvbnN0IHByb2R1Y3RJbWFnZSA9IGl0ZW0uaW1hZ2VcbiAgICAgIGNvbnN0IHByb2R1Y3RUaXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgIGNvbnN0IHByb2R1Y3RUZXh0ID0gaXRlbS50ZXh0XG4gICAgICBjb25zdCBwcm9kdWN0UHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICBjb25zdCBwcm9kdWN0T2xkUHJpY2UgPSBpdGVtLnByaWNlT2xkXG4gICAgICBjb25zdCBwcm9kdWN0U2hhcmVVcmwgPSBpdGVtLnNoYXJlVXJsXG4gICAgICBjb25zdCBwcm9kdWN0TGlrZVVybCA9IGl0ZW0ubGlrZVVybFxuICAgICAgY29uc3QgcHJvZHVjdExhYmVscyA9IGl0ZW0ubGFiZWxzXG5cbiAgICAgIGxldCBwcm9kdWN0VGVtcGxhdGVTdGFydCA9IGA8YXJ0aWNsZSBkYXRhLXBpZD1cIiR7cHJvZHVjdElkfVwiIGNsYXNzPVwicHJvZHVjdHNfX2l0ZW0gaXRlbS1wcm9kdWN0XCI+YFxuICAgICAgbGV0IHByb2R1Y3RUZW1wbGF0ZUVuZCA9IGA8L2FydGljbGU+YFxuXG4gICAgICBsZXQgcHJvZHVjdFRlbXBsYXRlTGFiZWxzID0gJydcbiAgICAgIGlmIChwcm9kdWN0TGFiZWxzKSB7XG4gICAgICAgIGxldCBwcm9kdWN0VGVtcGxhdGVMYWJlbHNTdGFydCA9IGA8ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0X19sYWJlbHNcIj5gXG4gICAgICAgIGxldCBwcm9kdWN0VGVtcGxhdGVMYWJlbHNFbmQgPSBgPC9kaXY+YFxuICAgICAgICBsZXQgcHJvZHVjdFRlbXBsYXRlTGFiZWxzQ29udGVudCA9ICcnXG5cbiAgICAgICAgcHJvZHVjdExhYmVscy5mb3JFYWNoKChsYWJlbEl0ZW0pID0+IHtcbiAgICAgICAgICBwcm9kdWN0VGVtcGxhdGVMYWJlbHNDb250ZW50ICs9IGA8ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0X19sYWJlbCBpdGVtLXByb2R1Y3RfX2xhYmVsXyR7bGFiZWxJdGVtLnR5cGV9XCI+JHtsYWJlbEl0ZW0udmFsdWV9PC9kaXY+YFxuICAgICAgICB9KVxuXG4gICAgICAgIHByb2R1Y3RUZW1wbGF0ZUxhYmVscyArPSBwcm9kdWN0VGVtcGxhdGVMYWJlbHNTdGFydFxuICAgICAgICBwcm9kdWN0VGVtcGxhdGVMYWJlbHMgKz0gcHJvZHVjdFRlbXBsYXRlTGFiZWxzQ29udGVudFxuICAgICAgICBwcm9kdWN0VGVtcGxhdGVMYWJlbHMgKz0gcHJvZHVjdFRlbXBsYXRlTGFiZWxzRW5kXG4gICAgICB9XG5cbiAgICAgIGxldCBwcm9kdWN0VGVtcGxhdGVJbWFnZSA9IGBcblx0XHQ8YSBocmVmPVwiJHtwcm9kdWN0VXJsfVwiIGNsYXNzPVwiaXRlbS1wcm9kdWN0X19pbWFnZSBfaWJnXCI+XG5cdFx0XHQ8aW1nIHNyYz1cImltYWdlcy9wcm9kdWN0cy8ke3Byb2R1Y3RJbWFnZX1cIiBhbHQ9XCIke3Byb2R1Y3RUaXRsZX1cIj5cblx0XHQ8L2E+XG5cdGBcblxuICAgICAgbGV0IHByb2R1Y3RUZW1wbGF0ZUJvZHlTdGFydCA9IGA8ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0X19ib2R5XCI+YFxuICAgICAgbGV0IHByb2R1Y3RUZW1wbGF0ZUJvZHlFbmQgPSBgPC9kaXY+YFxuXG4gICAgICBsZXQgcHJvZHVjdFRlbXBsYXRlQ29udGVudCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0X19jb250ZW50XCI+XG5cdFx0XHQ8aDMgY2xhc3M9XCJpdGVtLXByb2R1Y3RfX3RpdGxlXCI+JHtwcm9kdWN0VGl0bGV9PC9oMz5cblx0XHRcdDxkaXYgY2xhc3M9XCJpdGVtLXByb2R1Y3RfX3RleHRcIj4ke3Byb2R1Y3RUZXh0fTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRgXG5cbiAgICAgIGxldCBwcm9kdWN0VGVtcGxhdGVQcmljZXMgPSAnJ1xuICAgICAgbGV0IHByb2R1Y3RUZW1wbGF0ZVByaWNlc1N0YXJ0ID0gYDxkaXYgY2xhc3M9XCJpdGVtLXByb2R1Y3RfX3ByaWNlc1wiPmBcbiAgICAgIGxldCBwcm9kdWN0VGVtcGxhdGVQcmljZXNDdXJyZW50ID0gYDxkaXYgY2xhc3M9XCJpdGVtLXByb2R1Y3RfX3ByaWNlXCI+UnAgJHtwcm9kdWN0UHJpY2V9PC9kaXY+YFxuICAgICAgbGV0IHByb2R1Y3RUZW1wbGF0ZVByaWNlc09sZCA9IGA8ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0X19wcmljZSBpdGVtLXByb2R1Y3RfX3ByaWNlX29sZFwiPlJwICR7cHJvZHVjdE9sZFByaWNlfTwvZGl2PmBcbiAgICAgIGxldCBwcm9kdWN0VGVtcGxhdGVQcmljZXNFbmQgPSBgPC9kaXY+YFxuXG4gICAgICBwcm9kdWN0VGVtcGxhdGVQcmljZXMgPSBwcm9kdWN0VGVtcGxhdGVQcmljZXNTdGFydFxuICAgICAgcHJvZHVjdFRlbXBsYXRlUHJpY2VzICs9IHByb2R1Y3RUZW1wbGF0ZVByaWNlc0N1cnJlbnRcbiAgICAgIGlmIChwcm9kdWN0T2xkUHJpY2UpIHtcbiAgICAgICAgcHJvZHVjdFRlbXBsYXRlUHJpY2VzICs9IHByb2R1Y3RUZW1wbGF0ZVByaWNlc09sZFxuICAgICAgfVxuICAgICAgcHJvZHVjdFRlbXBsYXRlUHJpY2VzICs9IHByb2R1Y3RUZW1wbGF0ZVByaWNlc0VuZFxuXG4gICAgICBsZXQgcHJvZHVjdFRlbXBsYXRlQWN0aW9ucyA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0X19hY3Rpb25zIGFjdGlvbnMtcHJvZHVjdFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImFjdGlvbnMtcHJvZHVjdF9fYm9keVwiPlxuXHRcdFx0XHQ8YSBocmVmPVwiXCIgY2xhc3M9XCJhY3Rpb25zLXByb2R1Y3RfX2J1dHRvbiBidG4gYnRuX3doaXRlXCI+QWRkIHRvIGNhcnQ8L2E+XG5cdFx0XHRcdDxhIGhyZWY9XCIke3Byb2R1Y3RTaGFyZVVybH1cIiBjbGFzcz1cImFjdGlvbnMtcHJvZHVjdF9fbGluayBfaWNvbi1zaGFyZVwiPlNoYXJlPC9hPlxuXHRcdFx0XHQ8YSBocmVmPVwiJHtwcm9kdWN0TGlrZVVybH1cIiBjbGFzcz1cImFjdGlvbnMtcHJvZHVjdF9fbGluayBfaWNvbi1mYXZvcml0ZVwiPkxpa2U8L2E+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0YFxuXG4gICAgICBsZXQgcHJvZHVjdFRlbXBsYXRlQm9keSA9ICcnXG4gICAgICBwcm9kdWN0VGVtcGxhdGVCb2R5ICs9IHByb2R1Y3RUZW1wbGF0ZUJvZHlTdGFydFxuICAgICAgcHJvZHVjdFRlbXBsYXRlQm9keSArPSBwcm9kdWN0VGVtcGxhdGVDb250ZW50XG4gICAgICBwcm9kdWN0VGVtcGxhdGVCb2R5ICs9IHByb2R1Y3RUZW1wbGF0ZVByaWNlc1xuICAgICAgcHJvZHVjdFRlbXBsYXRlQm9keSArPSBwcm9kdWN0VGVtcGxhdGVBY3Rpb25zXG4gICAgICBwcm9kdWN0VGVtcGxhdGVCb2R5ICs9IHByb2R1Y3RUZW1wbGF0ZUJvZHlFbmRcblxuICAgICAgbGV0IHByb2R1Y3RUZW1wbGF0ZSA9ICcnXG4gICAgICBwcm9kdWN0VGVtcGxhdGUgKz0gcHJvZHVjdFRlbXBsYXRlU3RhcnRcbiAgICAgIHByb2R1Y3RUZW1wbGF0ZSArPSBwcm9kdWN0VGVtcGxhdGVMYWJlbHNcbiAgICAgIHByb2R1Y3RUZW1wbGF0ZSArPSBwcm9kdWN0VGVtcGxhdGVJbWFnZVxuICAgICAgcHJvZHVjdFRlbXBsYXRlICs9IHByb2R1Y3RUZW1wbGF0ZUJvZHlcbiAgICAgIHByb2R1Y3RUZW1wbGF0ZSArPSBwcm9kdWN0VGVtcGxhdGVFbmRcblxuICAgICAgcHJvZHVjdHNJdGVtcy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHByb2R1Y3RUZW1wbGF0ZSlcbiAgICB9KVxuICB9XG5cbiAgLy8gQWRkVG9DYXJ0ICjRgdC+0LfQtNCw0LXRgiDRjdC80LjRgtCw0YbQuNGOINCw0L3QuNC80LjRgNC+0LLQsNC90L7Qs9C+INC00L7QsdCw0LLQu9C10L3QuNGPINGC0L7QstCw0YDQsCDQsiDQutC+0YDQt9C40L3RgyDQv9GD0YLQtdC8INGB0L7Qt9C00LDQvdC40Y8g0LrQu9C+0L3QsCDQuCDQuNC30LzQtdC90LXQvdC40Y8g0LXQs9C+INGB0YLQuNC70LXQuSlcbiAgZnVuY3Rpb24gYWRkVG9DYXJ0KHByb2R1Y3RCdXR0b24sIHByb2R1Y3RJZCkge1xuICAgIGlmICghcHJvZHVjdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ19ob2xkJykpIHtcbiAgICAgIHByb2R1Y3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnX2hvbGQnKVxuICAgICAgcHJvZHVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdfZmx5JylcblxuICAgICAgY29uc3QgY2FydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWhlYWRlcl9faWNvbicpXG4gICAgICBjb25zdCBwcm9kdWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcGlkPVwiJHtwcm9kdWN0SWR9XCJdYClcbiAgICAgIGNvbnN0IHByb2R1Y3RJbWFnZSA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLml0ZW0tcHJvZHVjdF9faW1hZ2UnKVxuXG4gICAgICBjb25zdCBwcm9kdWN0SW1hZ2VGbHkgPSBwcm9kdWN0SW1hZ2UuY2xvbmVOb2RlKHRydWUpXG5cbiAgICAgIGNvbnN0IHByb2R1Y3RJbWFnZUZseVdpZHRoID0gcHJvZHVjdEltYWdlLm9mZnNldFdpZHRoXG4gICAgICBjb25zdCBwcm9kdWN0SW1hZ2VGbHlIZWlnaHQgPSBwcm9kdWN0SW1hZ2Uub2Zmc2V0SGVpZ2h0XG4gICAgICBjb25zdCBwcm9kdWN0SW1hZ2VGbHlUb3AgPSBwcm9kdWN0SW1hZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICBjb25zdCBwcm9kdWN0SW1hZ2VGbHlMZWZ0ID0gcHJvZHVjdEltYWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcblxuICAgICAgcHJvZHVjdEltYWdlRmx5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnX2ZseUltYWdlIF9pYmcnKVxuICAgICAgcHJvZHVjdEltYWdlRmx5LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgIGxlZnQ6ICR7cHJvZHVjdEltYWdlRmx5TGVmdH1weDtcbiAgICAgICAgdG9wOiAke3Byb2R1Y3RJbWFnZUZseVRvcH1weDtcbiAgICAgICAgd2lkdGg6ICR7cHJvZHVjdEltYWdlRmx5V2lkdGh9cHg7XG4gICAgICAgIGhlaWdodDogJHtwcm9kdWN0SW1hZ2VGbHlIZWlnaHR9cHg7XG4gICAgICBgXG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHByb2R1Y3RJbWFnZUZseSlcblxuICAgICAgY29uc3QgY2FydEZseUxlZnQgPSBjYXJ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgIGNvbnN0IGNhcnRGbHlUb3AgPSBjYXJ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuXG4gICAgICBwcm9kdWN0SW1hZ2VGbHkuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICAgICAgbGVmdDogJHtjYXJ0Rmx5TGVmdH1weDtcbiAgICAgICAgdG9wOiAke2NhcnRGbHlUb3B9cHg7XG4gICAgICAgIHdpZHRoOiAwcHg7XG4gICAgICAgIGhlaWdodDogMHB4O1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICBgXG5cbiAgICAgIHByb2R1Y3RJbWFnZUZseS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocHJvZHVjdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ19mbHknKSkge1xuICAgICAgICAgIHByb2R1Y3RJbWFnZUZseS5yZW1vdmUoKVxuICAgICAgICAgIHVwZGF0ZUNhcnQocHJvZHVjdEJ1dHRvbiwgcHJvZHVjdElkKVxuICAgICAgICAgIHByb2R1Y3RCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnX2ZseScpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy8g0JTQvtCx0LDQstC70Y/QtdGCINGC0L7QstCw0YDRiyDQsiDQutC+0YDQt9C40L3RgyDQuCDRg9C00LDQu9GP0LXRgiDRgSDQvdC10LVcbiAgZnVuY3Rpb24gdXBkYXRlQ2FydChwcm9kdWN0QnV0dG9uLCBwcm9kdWN0SWQsIHByb2R1Y3RBZGQgPSB0cnVlKSB7XG4gICAgY29uc3QgY2FydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0LWhlYWRlcicpXG4gICAgY29uc3QgY2FydEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FydC1oZWFkZXJfX2ljb24nKVxuICAgIGNvbnN0IGNhcnRRdWFudGl0eSA9IGNhcnRJY29uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICAgIGNvbnN0IGNhcnRQcm9kdWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY2FydC1waWQ9XCIke3Byb2R1Y3RJZH1cIl1gKVxuICAgIGNvbnN0IGNhcnRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnQtbGlzdCcpXG5cbiAgICAvLyDQlNC+0LHQsNCy0LvRj9C10LxcbiAgICBpZiAocHJvZHVjdEFkZCkge1xuICAgICAgaWYgKGNhcnRRdWFudGl0eSkge1xuICAgICAgICBjYXJ0UXVhbnRpdHkuaW5uZXJIVE1MID0gKytjYXJ0UXVhbnRpdHkuaW5uZXJIVE1MIC8vINC10YHQu9C4INGB0L/QsNC9INGD0LbQtSDQtdGB0YLRjCDQtNC+0LHQsNCy0LvRj9GOIDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhcnRJY29uLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxzcGFuPjE8L3NwYW4+YClcbiAgICAgIH1cblxuICAgICAgLy/QtNC+0LHQsNCy0LvRj9GOINGB0L/QuNGB0L7QuiDRgtC+0LLQsNGA0L7QslxuICAgICAgaWYgKCFjYXJ0UHJvZHVjdCkge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcGlkPVwiJHtwcm9kdWN0SWR9XCJdYClcbiAgICAgICAgY29uc3QgY2FydFByb2R1Y3RJbWFnZSA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLml0ZW0tcHJvZHVjdF9faW1hZ2UnXG4gICAgICAgICkuaW5uZXJIVE1MXG4gICAgICAgIGNvbnN0IGNhcnRQcm9kdWN0VGl0bGUgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJy5pdGVtLXByb2R1Y3RfX3RpdGxlJ1xuICAgICAgICApLmlubmVySFRNTFxuICAgICAgICBjb25zdCBjYXJ0UHJvZHVjdENvbnRlbnQgPSBgXG4gICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjYXJ0LWxpc3RfX2ltYWdlIF9pYmdcIj4ke2NhcnRQcm9kdWN0SW1hZ2V9PC9hPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FydC1saXN0X19ib2R5XCI+XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhcnQtbGlzdF9fdGl0bGVcIj4ke2NhcnRQcm9kdWN0VGl0bGV9PC9hPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJ0LWxpc3RfX3F1YW50aXR5XCI+UXVhbnRpdHk6IDxzcGFuPjE8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhcnQtbGlzdF9fZGVsZXRlXCI+RGVsZXRlPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgICAgICBjYXJ0TGlzdC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgYDxsaSBkYXRhLWNhcnQtcGlkPVwiJHtwcm9kdWN0SWR9XCIgY2xhc3M9XCJjYXJ0LWxpc3RfX2l0ZW1cIj4ke2NhcnRQcm9kdWN0Q29udGVudH08L2xpPmBcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY2FydFByb2R1Y3RRdWFudGl0eSA9IGNhcnRQcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJy5jYXJ0LWxpc3RfX3F1YW50aXR5IHNwYW4nXG4gICAgICAgIClcbiAgICAgICAgY2FydFByb2R1Y3RRdWFudGl0eS5pbm5lckhUTUwgPSArK2NhcnRQcm9kdWN0UXVhbnRpdHkuaW5uZXJIVE1MXG4gICAgICB9XG5cbiAgICAgIC8vINCf0L7RgdC70LUg0LLRgdC10YUg0LTQtdC50YHRgtCy0LjQuVxuICAgICAgcHJvZHVjdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdfaG9sZCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vINGB0L3QsNGH0LDQu9CwINGD0LzQtdC90YzRiNCw0LXRgiDQutC+0LvQuNGH0LXRgdGC0LLQviDRgtC+0LLQsNGA0L7Qsiwg0L/QvtGC0L7QvCDRg9C00LDQu9GP0LXRglxuICAgICAgY29uc3QgY2FydFByb2R1Y3RRdWFudGl0eSA9IGNhcnRQcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcuY2FydC1saXN0X19xdWFudGl0eSBzcGFuJ1xuICAgICAgKVxuICAgICAgY2FydFByb2R1Y3RRdWFudGl0eS5pbm5lckhUTUwgPSAtLWNhcnRQcm9kdWN0UXVhbnRpdHkuaW5uZXJIVE1MXG4gICAgICBpZiAoIXBhcnNlSW50KGNhcnRQcm9kdWN0UXVhbnRpdHkuaW5uZXJIVE1MKSkge1xuICAgICAgICBjYXJ0UHJvZHVjdC5yZW1vdmUoKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjYXJ0UXVhbnRpdHlWYWx1ZSA9IC0tY2FydFF1YW50aXR5LmlubmVySFRNTFxuXG4gICAgICBpZiAoY2FydFF1YW50aXR5VmFsdWUpIHtcbiAgICAgICAgY2FydFF1YW50aXR5LmlubmVySFRNTCA9IGNhcnRRdWFudGl0eVZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXJ0UXVhbnRpdHkucmVtb3ZlKClcbiAgICAgICAgY2FydC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vINCT0LDQu9C70LXRgNC10Y9cbiAgY29uc3QgZnVybml0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1cm5pdHVyZV9fYm9keScpXG5cbiAgaWYgKGZ1cm5pdHVyZSAmJiAhaXNNb2JpbGVPclRhYmxldCgpKSB7XG4gICAgY29uc3QgZnVybml0dXJlSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVybml0dXJlX19pdGVtcycpXG4gICAgY29uc3QgZnVybml0dXJlQ29sdW1uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZ1cm5pdHVyZV9fY29sdW1uJylcblxuICAgIC8vINCh0LrQvtGA0L7RgdGC0Ywg0LDQvdC40LzQsNGG0LjQuFxuICAgIGNvbnN0IHNwZWVkID0gZnVybml0dXJlLmRhdGFzZXQuc3BlZWRcblxuICAgIC8vINCe0LHQvdC+0LLQu9C10L3QuNC1INC/0LXRgNC10LzQtdC90L3Ri9GFXG4gICAgbGV0IHBvc2l0aW9uWCA9IDBcbiAgICBsZXQgY29vcmRYcHJvY2VudCA9IDBcblxuICAgIGZ1bmN0aW9uIHNldE1vdXNlR2FsbGVyeVN0eWxlKCkge1xuICAgICAgbGV0IGZ1cm5pdHVyZUl0ZW1zV2lkdGggPSAwXG4gICAgICBmdXJuaXR1cmVDb2x1bW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBmdXJuaXR1cmVJdGVtc1dpZHRoICs9IGVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGZ1cm5pdHVyZURpZmZlcmVudCA9IGZ1cm5pdHVyZUl0ZW1zV2lkdGggLSBmdXJuaXR1cmUub2Zmc2V0V2lkdGhcbiAgICAgIGNvbnN0IGRpc3RYID0gTWF0aC5mbG9vcihjb29yZFhwcm9jZW50IC0gcG9zaXRpb25YKVxuXG4gICAgICBwb3NpdGlvblggPSBwb3NpdGlvblggKyBkaXN0WCAqIHNwZWVkXG4gICAgICBsZXQgcG9zaXRpb24gPSAoZnVybml0dXJlRGlmZmVyZW50IC8gMjAwKSAqIHBvc2l0aW9uWFxuXG4gICAgICBmdXJuaXR1cmVJdGVtcy5zdHlsZS5jc3NUZXh0ID0gYHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoJHstcG9zaXRpb259cHgsMCwwKTtgXG5cbiAgICAgIGlmIChNYXRoLmFicyhkaXN0WCkgPiAwKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzZXRNb3VzZUdhbGxlcnlTdHlsZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1cm5pdHVyZS5jbGFzc0xpc3QucmVtb3ZlKCdfaW5pdCcpXG4gICAgICB9XG4gICAgfVxuICAgIGZ1cm5pdHVyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8g0J/QvtC70YPRh9C10L3QuNC1INGI0LjRgNC40L3Ri1xuICAgICAgY29uc3QgZnVybml0dXJlV2lkdGggPSBmdXJuaXR1cmUub2Zmc2V0V2lkdGhcblxuICAgICAgLy8g0J3QvtC70Ywg0L/QviDRgdC10YDQtdC00LjQvdC1XG4gICAgICBjb25zdCBjb29yZFggPSBlLnBhZ2VYIC0gZnVybml0dXJlV2lkdGggLyAyXG5cbiAgICAgIC8vINCf0L7Qu9GD0YfQsNC10Lwg0L/RgNC+0YbQtdC90YLRi1xuICAgICAgY29vcmRYcHJvY2VudCA9IChjb29yZFggLyBmdXJuaXR1cmVXaWR0aCkgKiAyMDBcblxuICAgICAgaWYgKCFmdXJuaXR1cmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdfaW5pdCcpKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzZXRNb3VzZUdhbGxlcnlTdHlsZSlcbiAgICAgICAgZnVybml0dXJlLmNsYXNzTGlzdC5hZGQoJ19pbml0JylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
