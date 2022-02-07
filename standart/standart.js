// Получение ссылок на инпуты
let inoWord = document.querySelector('#inoWord')
let rusWord = document.querySelector('#rusWord')
let inputTranslate = document.querySelector('#inputTranslate')
// ССылки на кнопки
let btn_add = document.querySelector('.btn-add')
let btn_remember = document.querySelector('.btn-remember')
let btn_toaddWords = document.querySelector('.btn-toaddWords')
let btn_start = document.querySelector('.btn-start')
let btn_check = document.querySelector('#btn-check')
let btn_close_practice = document.querySelector('.btn-closePractice')
let btn_show_translate = document.querySelector('.btn-showTranslate')
// Ссылки на дивы
let addWords = document.querySelector('.addWords')
let showWords = document.querySelector('.showWords')
let learnWords = document.querySelector('.learnWords')
// Словарь
let ul = document.querySelector('.list')
// Алерты
$('.alert-success').fadeOut(0, () => {
  $('.alert-success').css('display', 'none')
})

$('.alert-danger').fadeOut(0, () => {
  $('.alert-danger').css('display', 'none')
})

// Случайное английское слово
let randomWord = document.querySelector('.randomWord')

// Перевод случайного английского слова
let wordTranslate = document.querySelector('.wordTranslate')

// Массивы для отображения и добавления слов
let inoWords = []
let rusWords = []

btn_add.addEventListener('click', () => {
  if (
    inoWord.value.trim().toLowerCase().length >= 1 &&
    rusWord.value.trim().toLowerCase().length >= 1
  ) {
    let inoWordText = inoWord.value.trim().toLowerCase()
    let rusWordText = rusWord.value.trim().toLowerCase()
    inoWords.push(inoWordText)
    rusWords.push(rusWordText)
    console.log(inoWords)
    console.log(rusWords)
    inoWord.value = ''
    rusWord.value = ''
    saveAll('inoWords', inoWords)
    saveAll('rusWords', rusWords)
  }
  let dbInoArr = getAll('inoWords')
  randomWord.textContent = dbInoArr[Math.floor(Math.random() * dbInoArr.length)]
})

btn_remember.addEventListener('click', () => {
  addWords.style.display = 'none'
  showWords.style.display = 'block'
  console.log(inoWords)
  console.log(rusWords)

  let dbInoArr = getAll('inoWords')
  ul.textContent = ''

  // Вывод всех слов в списке ul
  for (let i = 0; i < dbInoArr.length; i++) {
    $('ul').append(
      '<li class="item' +
        i +
        '"><a>' +
        get('inoWords', i) +
        ': ' +
        get('rusWords', i) +
        '</a><button class="btn btn-danger del-btn btn' +
        i +
        '">Удалить</button></li><hr class="hr' +
        i +
        '">'
    )
    let btn = document.querySelector(`.btn${i}`)
    let item = document.querySelector(`.item${i}`)
    let hr = document.querySelector(`.hr${i}`)
    btn.addEventListener('click', () => {
      let getAllIno = getAll('inoWords')
      let getAllRus = getAll('rusWords')
      getAllIno.splice(i, 1)
      getAllRus.splice(i, 1)
      saveAll('inoWords', getAllIno)
      saveAll('rusWords', getAllRus)
      console.log(getAll('inoWords'))
      console.log(getAll('rusWords'))
      item.remove()
      hr.remove()
    })
  }
})

btn_toaddWords.addEventListener('click', () => {
  addWords.style.display = 'block'
  showWords.style.display = 'none'
})

btn_start.addEventListener('click', () => {
  showWords.style.display = 'none'
  learnWords.style.display = 'block'
  let dbInoArr = getAll('inoWords')
  randomWord.textContent = dbInoArr[Math.floor(Math.random() * dbInoArr.length)]
  if (getAll('inoWords').length === 0 && getAll('rusWords').length === 0) {
    randomWord.textContent = 'Нет слов для проверки'
  }
})

btn_check.addEventListener('click', (e) => {
  e.preventDefault()
  inputTranslateText = inputTranslate.value.trim().toLowerCase()

  if (getAll('inoWords').length === 0 && getAll('rusWords').length === 0) {
    randomWord.textContent = 'Нет слов для проверки'
    inputTranslate.value = ''
  } else if (
    getAll('inoWords').indexOf(randomWord.textContent) ===
    getAll('rusWords').indexOf(inputTranslateText)
  ) {
    let dbInoArr = getAll('inoWords')
    $('.alert-success').fadeIn(500, () => {
      $('.alert-success').css('display', 'block')
    })
    setTimeout(() => {
      $('.alert-success').fadeOut(500, () => {
        $('.alert-success').css('display', 'none')
      })
    }, 1000)
    randomWord.textContent =
      dbInoArr[Math.floor(Math.random() * dbInoArr.length)]
    inputTranslate.value = ''
    wordTranslate.style.display = 'none'
    wordTranslate.textContent = ''
  } else {
    $('.alert-danger').fadeIn(500, () => {
      $('.alert-danger').css('display', 'block')
    })
    setTimeout(() => {
      $('.alert-danger').fadeOut(500, () => {
        $('.alert-danger').css('display', 'none')
      })
    }, 1000)
  }
})

btn_close_practice.addEventListener('click', () => {
  learnWords.style.display = 'none'
  showWords.style.display = 'block'
})

// Прописываю свойство ксс для устранения бага первого нажатия
wordTranslate.style.display = 'none'

btn_show_translate.addEventListener('click', function () {
  if (wordTranslate.style.display === 'none') {
    let rusWord =
      getAll('rusWords')[getAll('inoWords').indexOf(randomWord.textContent)]
    wordTranslate.textContent = rusWord
    wordTranslate.style.display = 'block'
  } else {
    wordTranslate.textContent = ''
    wordTranslate.style.display = 'none'
  }
})
