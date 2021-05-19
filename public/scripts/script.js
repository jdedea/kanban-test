const boardItem = document.querySelectorAll('.board-item')
const lists = document.querySelectorAll('.lists')
const listHead = document.querySelectorAll('.list--head')
const titleTags = document.querySelectorAll('.title')
const newBoardBtn = document.querySelector('.new-board')
const board = document.querySelector('.board')

// make items draggable
$(document).on('dragstart', '.board-item', function (item) {
  $(this).addClass('dragging')
})

$(document).on('dragend', '.board-item', function (item) {
  $(this).removeClass('dragging')
})

// items can be placed in list
$(document).on('dragover', '.lists', function (e) {
  e.preventDefault()
  const afterElement = getDragAfterElement(this, e.clientY)
  const item = document.querySelector('.dragging')
  if (afterElement == null) {
    this.appendChild(item)
  } else {
    this.insertBefore(item, afterElement)
  }
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
$(document).on('mouseenter', '.board-item', function (item) {
  const trash = $(this).find('.trash')
  $(trash).removeClass('hidden')
})

$(document).on('click', '.trash', function (trash) {
  this.parentNode.remove()
})

$(document).on('mouseleave', '.board-item', function (item) {
  const trash = $(this).find('.trash')
  $(trash).addClass('hidden')
})

// Editing Title

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

  if (addCard) {
    addCard.addEventListener('click', () => {
      addCard.classList.add('hidden')
      addInput.classList.remove('hidden')
    })
  }

  if (addInput) {
    addInput.addEventListener('keydown', function (event) {
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

function reinit(parent) {
  parent.forEach((list) => {
    const addCard = list.querySelector('button.add')
    const addInput = list.querySelector('.add-input')
    const lists = list.querySelector('.lists')
    const defaultCard = list.querySelector('.default-card')

    if (addCard) {
      addCard.addEventListener('click', () => {
        addCard.classList.add('hidden')
        addInput.classList.remove('hidden')
      })
    }

    if (addInput) {
      addInput.addEventListener('keydown', function (event) {
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
}

newBoardBtn.addEventListener('click', function () {
  const defaultList = document.querySelector('.default-list')
  const newList = defaultList.cloneNode(true)

  newList.classList.remove('hidden')
  board.prepend(newList)
  reinit(document.querySelectorAll('.list--head'))
})
