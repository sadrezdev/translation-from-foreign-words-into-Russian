function jump() {
  if (dino.classList != 'jump') {
    dino.classList.add('jump')
  }
  setTimeout(function () {
    dino.classList.remove('jump')
  }, 300)
}

function checkIsAlive() {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'))
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue('left')
  )

  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    let inoWords = getAll('inoWords')
    cactus.classList.remove('cactusMove')
    cactus.style.left = cactusLeft + 'px'
    cactus.style.animationPlayState = 'paused'
    dino.style.animationPlayState = 'paused'
    translateWord.style.display = 'block'
    clearInterval(isAlive)
    randomWord.textContent =
      inoWords[Math.floor(Math.random() * inoWords.length)]
    game.removeEventListener('keyDown', start)
  }
}

function start() {
  cactus.classList.add('cactusMove')
  cactus.style.animationPlayState = 'running'
  dino.style.animationPlayState = 'running'
}

let dino = document.getElementById('dino')
let cactus = document.getElementById('cactus')
let game = document.querySelector('.game')
let translateWord = document.querySelector('.translateWord')
let randomWord = document.querySelector('.randomWord')
let btnTranslate = document.querySelector('.btn-translate')
let rusWordInput = document.getElementById('rusWord')

document.addEventListener('keydown', function () {
  jump()
})

game.addEventListener('click', start())

let isAlive = setInterval(checkIsAlive, 10)

btnTranslate.addEventListener('click', () => {
  let rusWordsUser = rusWordInput.value.trim().toLowerCase()
  let rusWordsDb = getAll('rusWords')
  let inoWordsDb = getAll('inoWords')
  let rusWordText = rusWordInput.value.trim().toLowerCase()
  if (inoWordsDb.length === 0 && rusWordsDb.length === 0) {
    randomWord.textContent = 'Нет слов для проверки'
    rusWordInput.value = ''
  } else if (
    inoWordsDb.indexOf(randomWord.textContent) ===
    rusWordsDb.indexOf(rusWordText)
  ) {
    game.addEventListener('click', start())
    isAlive = setInterval(checkIsAlive, 10)
    translateWord.style.display = 'none'
    rusWordInput.value = ''
  } else {
    alert('Попробуй снова')
  }
})
