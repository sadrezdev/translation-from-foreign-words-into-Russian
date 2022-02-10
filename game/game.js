function randomize() {
  // Присвоение заголовку рандомного слова
  randomRusWordId = Math.floor(Math.random() * someRus.length)
  let randomRusWord = someRus[randomRusWordId]
  randomRusWord = randomRusWord[0].toUpperCase() + randomRusWord.slice(1)
  rusWord.textContent = randomRusWord

  for (let i = 0; i < someIno[randomRusWordId].length; i++) {
    let input = inoLetters.appendChild(document.createElement('input'))
    input.classList.add('inoLetter')
    input.classList.add('letter' + i)
    input.setAttribute('maxLength', '1')
  }
}

let randomRusWord = 0
let rusWord = document.querySelector('.rusWordTitle')
let inoLetters = document.querySelector('.inoLetters')
let btnCheckLetters = document.querySelector('.checkLetter')

let someIno = getAll('inoWords')
let someRus = getAll('rusWords')

randomize()

btnCheckLetters.addEventListener('click', function () {
  let count = 0
  for (let i = 0; i < someIno[randomRusWordId].length; i++) {
    let thisLetter = document.querySelector('.letter' + i)
    if (thisLetter.value.toLowerCase() === someIno[randomRusWordId][i]) {
      thisLetter.setAttribute('disabled', 'disabled')
      count++
    }
  }
  if (count === someIno[randomRusWordId].length) {
    for (let i = 0; i < someIno[randomRusWordId].length; i++) {
      let thisLetter = document.querySelector('.letter' + i)
      thisLetter.remove()
    }
    randomize()
    alert('Victory')
  }
})
