import {v4 as uuid} from 'uuid'

import Application from '@/application'

class Note {
  dragged = null

  constructor(id = null, content = '') {
    const element = (this.element = document.createElement('div'))
    element.classList.add('note')
    element.setAttribute('draggable', true)
    element.textContent = content

    if (id) {
      element.setAttribute('data-note-id', id)
    } else {
      element.setAttribute('data-note-id', uuid())
    }

    element.addEventListener('dblclick', function () {
      element.setAttribute('contenteditable', true)
      element.removeAttribute('draggable')
      element.focus()
    })

    element.addEventListener('blur', function () {
      element.removeAttribute('contenteditable')
      element.setAttribute('draggable', true)

      if (!element.textContent.trim().length) {
        element.remove()
      }

      Application.save()
    })

    element.addEventListener('dragstart', this.dragstart)
    element.addEventListener('dragend', this.dragend)
    element.addEventListener('dragenter', this.dragenter)
    element.addEventListener('dragover', this.dragover)
    element.addEventListener('dragleave', this.dragleave)
    element.addEventListener('drop', this.drop)
  }

  get column() {
    return this.element.closest('.column')
  }

  dragstart = event => {
    Note.dragged = this.element
    this.element.classList.add('dragged')

    event.stopPropagation()
  }

  dragend = event => {
    event.stopPropagation()

    Note.dragged = null
    this.element.classList.remove('dragged')

    document.querySelectorAll('.note').forEach(x => x.classList.remove('under'))

    Application.save()
  }

  dragenter = event => {
    event.stopPropagation()

    if (!Note.dragged || this.element === Note.dragged) {
      return
    }

    this.element.classList.add('under')
  }

  dragover = event => {
    event.preventDefault()
    event.stopPropagation()

    if (!Note.dragged || this.element === Note.dragged) {
      return
    }
  }

  dragleave = event => {
    event.stopPropagation()

    if (this === Note.dragged) {
      return
    }
    this.element.classList.remove('under')
  }

  drop = event => {
    event.stopPropagation()

    if (!Note.dragged || this.element === Note.dragged) {
      return
    }

    if (this.element.parentElement === Note.dragged.parentElement) {
      const note = Array.from(this.element.parentElement.querySelectorAll('.note'))
      const indexA = note.indexOf(this.element)
      const indexB = note.indexOf(Note.dragged)

      if (indexA < indexB) {
        this.element.parentElement.insertBefore(Note.dragged, this.element)
      } else {
        this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling)
      }
    } else {
      this.element.parentElement.insertBefore(Note.dragged, this.element)
    }
  }
}

export default Note
