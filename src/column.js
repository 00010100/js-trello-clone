import {v4 as uuid} from 'uuid'

import Application from '@/application'
import Note from '@/note'

class Column {
  constructor(id = null, title = 'Change header') {
    this.notes = []

    const element = (this.element = document.createElement('div'))
    element.classList.add('column')

    if (id) {
      element.setAttribute('data-column-id', id)
    } else {
      element.setAttribute('data-column-id', uuid())
    }

    element.innerHTML = `
      <div class="column-header">
        <p>${title}</p>
        <button data-action-removeColumn class="action"><i class="fas fa-trash"></i></button>
      </div>
        <div data-notes></div>
      <p class="column-footer">
        <span data-action-addNote class="add-note action"><i class="fas fa-plus"></i> Добавить карточку</span>
      </p>
    `

    const spanAction_addNote = element.querySelector('[data-action-addNote]')

    spanAction_addNote.addEventListener('click', () => {
      const note = new Note()
      this.add(note)

      note.element.setAttribute('contenteditable', true)
      note.element.focus()
    })

    const headerElement = element.querySelector('.column-header p')

    headerElement.addEventListener('dblclick', function () {
      headerElement.setAttribute('contenteditable', true)
      headerElement.focus()
    })

    headerElement.addEventListener('blur', function () {
      headerElement.removeAttribute('contenteditable')
      Application.save()
    })

    const removeBtn = element.querySelector('[data-action-removeColumn]')

    removeBtn.addEventListener('click', function () {
      element.remove()
      Application.save()
    })

    element.addEventListener('dragover', this.dragover)
    element.addEventListener('drop', this.drop)
  }

  add(...notes) {
    for (const note of notes) {
      if (!this.notes.includes(note)) {
        this.notes.push(note)

        this.element.querySelector('[data-notes]').append(note.element)
      }
    }
  }

  dragover = event => {
    event.preventDefault()
  }

  drop = () => {
    if (Note.dragged) {
      this.element.querySelector('[data-notes]').append(Note.dragged)
    }
  }
}

export default Column
