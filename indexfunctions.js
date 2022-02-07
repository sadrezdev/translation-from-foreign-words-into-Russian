// Создать/Сохранить весь массив в базу данных
function saveAll(id, data) {
  localStorage.setItem(id, JSON.stringify(data))
}

// Получить весь массив из бд
function getAll(id) {
  let json = localStorage.getItem(id)
  return JSON.parse(json)
}

// Получить элемент из массивы из бд
function get(id, key) {
  let json = localStorage.getItem(id)
  let arr = getAll(id)

  if (arr[key] !== undefined) {
    return arr[key]
  } else {
    return null
  }
}

// Изменить параметр в массиве bd
function set(id, key, newValue) {
  let arr = getAll(id)

  arr[key] = newValue

  saveAll(id, arr)
}
