const boardItem = document.querySelectorAll('.board-item')
const lists = document.querySelectorAll('.lists')
const listHead = document.querySelectorAll('.list--head')

// make items draggable
boardItem.forEach((item) => {
  item.addEventListener('dragstart', () => {
    item.classList.add('dragging')
  })

  item.addEventListener('dragend', () => {
    item.classList.remove('dragging')
  })
})

// items can be placed in list
lists.forEach((list) => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault()
    const afterElement = getDragAfterElement(list, e.clientY)
    const item = document.querySelector('.dragging')
    if (afterElement == null) {
      list.appendChild(item)
    } else {
      list.insertBefore(item, afterElement)
    }
  })
})

function getDragAfterElement(list, y) {
  const draggableElements = [...list.querySelectorAll('.board-item:not(.dragging)')]
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return {offset: offset, element: child}
      } else {
        return closest
      }
    },
    {offset: Number.NEGATIVE_INFINITY}
  ).element
}

// Delete an element
boardItem.forEach((item) => {
  item.addEventListener('mouseenter', function () {
    const trash = this.querySelector('.trash')
    trash.classList.remove('hidden')
    trash.addEventListener('click', function () {
      this.parentNode.remove()
    })
  })
  item.addEventListener('mouseleave', function () {
    const trash = this.querySelector('.trash')
    trash.classList.add('hidden')
  })
})

// Editing Title
const titleTags = document.querySelectorAll('.title')
titleTags.forEach((title) => {
  const titleName = title.querySelector('div')
  const titleP = title.querySelector('p')
  const inputTag = title.querySelector('input')
  const edit = title.querySelector('button')
  inputTag.value = titleP.innerText

  edit.addEventListener('click', function () {
    titleName.classList.add('hidden')
    inputTag.classList.remove('hidden')
  })

  inputTag.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      titleName.classList.remove('hidden')
      inputTag.classList.add('hidden')
      titleP.innerHTML = inputTag.value
    } else if (event.key === 'Escape') {
      titleName.classList.remove('hidden')
      inputTag.classList.add('hidden')
      inputTag.value = titleP.innerText
    }
  })
})

listHead.forEach((list) => {
  const addCard = list.querySelector('button.add')
  const addInput = list.querySelector('.add-input')
  const lists = list.querySelector('.lists')
  const defaultCard = list.querySelector('.default-card')

  addCard.addEventListener('click', () => {
    addCard.classList.add('hidden')
    addInput.classList.remove('hidden')
  })

  if (addInput) {
    addInput.addEventListener('keydown', function (event) {
      console.log(event)
      if (event.key === 'Enter') {
        const newCard = defaultCard.cloneNode(true)
        const cardPTag = newCard.querySelector('p')

        newCard.classList.remove('hidden')
        cardPTag.innerHTML = addInput.value
        lists.appendChild(newCard)
        addInput.value = ''
        addCard.classList.remove('hidden')
        addInput.classList.add('hidden')
      } else if (event.key === 'Escape') {
        addInput.value = ''
        addCard.classList.remove('hidden')
        addInput.classList.add('hidden')
      }
    })
  }
})
