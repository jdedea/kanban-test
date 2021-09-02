const board = document.querySelector('.board')

board.addEventListener('mouseover', (e) => {
  // Trash Show
  if (e.target.classList.contains('item-text')) {
    e.target.previousElementSibling.classList.remove('hidden')
  } else if (e.target.classList.contains('trash')) {
    e.target.classList.remove('hidden')
  }
})

board.addEventListener('mouseout', (e) => {
  // Trash Hide
  if (e.target.classList.contains('item-text')) {
    e.target.previousElementSibling.classList.add('hidden')
  }
})

board.addEventListener('click', (e) => {
  // Trash Click
  if (e.target.classList.contains('trash')) {
    e.target.parentElement.remove()
  } else if (e.target.classList.contains('add-btn')) {
    const inputBtn = e.target
    const input = e.target.nextElementSibling

    inputBtn.classList.add('hidden')
    input.classList.remove('hidden')
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        const html = `
          <li draggable="true" class="bg-white my-2 rounded p-1 shadow hover:bg-gray-50 cursor-move relative board-item default-card">
            <span class="absolute top-1 right-1 px-1 bg-gray-100 rounded hidden trash cursor-pointer">&#128465;</span>
            <p class="item-text break-words">${input.value}</p>
          </li>
        `
        if (input.value) {
          input.value = ''
          input.classList.add('hidden')
          input.previousElementSibling.classList.remove('hidden')
          inputBtn.previousElementSibling.innerHTML += html
        }
      }
    })
  } else if (e.target.classList.contains('new-board')) {
    const button = e.target
    const boardInput = e.target.nextElementSibling

    button.classList.add('hidden')
    boardInput.classList.remove('hidden')
    boardInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        const html = `
          <!-- Start List -->
          <div class="w-72 m-1 list--head">
            <div class="flex flex-col justify-between bg-gray-200 p-2 rounded ml-1">
              <div class="title">
                <div class="flex justify-between">
                  <p class="p-1 font-bold break-words">${boardInput.value}</p>
                  <button class="p-1 edit">&#9998;</button>
                </div>
                <input type="text" class="font-bold p-1 rounded shadow w-full hidden" />
              </div>
              <ul class="container px-1 pt-1 pb-2 w-full">
              </ul>

              <button class="p-1 text-gray-500 w-full text-left hover:bg-gray-300 rounded add-btn">
                + Add another card
              </button>
              <textarea class="p-1 rounded shadow add-input hidden" cols="30" rows="3"></textarea>
            </div>
          </div>
          <!-- End List -->

          <!-- Start New Board -->
        <div class="w-72 m-1">
          <div class="flex flex-col justify-between bg-gray-200 p-2 rounded ml-1">
            <button class="p-1 text-gray-500 w-full text-left hover:bg-gray-300 rounded new-board">
              + Create a new board
            </button>
            <textarea class="p-1 rounded shadow add-input hidden" cols="30" rows="3"></textarea>
          </div>
        </div>
        <!-- End New Board -->
        `
        if (boardInput.value) {
          boardInput.value = ''
          boardInput.parentElement.parentElement.remove()
          boardInput.previousElementSibling.classList.remove('hidden')
          board.innerHTML += html
        }
      }
    })
  } else if (e.target.classList.contains('edit')) {
    const btn = e.target
    const title = e.target.previousElementSibling
    const input = e.target.parentElement.nextElementSibling

    btn.classList.add('hidden')
    title.classList.add('hidden')
    input.classList.remove('hidden')
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        title.textContent = input.value
        btn.classList.remove('hidden')
        title.classList.remove('hidden')
        input.classList.add('hidden')
      }
    })
  }
})
