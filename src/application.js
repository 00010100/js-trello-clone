import Note from '@/note'
import Column from '@/column'

const Application = {
  save() {
    const object = {
      columns: {
        items: []
      },
      notes: {
        items: []
      }
    }

    document.querySelectorAll('.column').forEach(columnElement => {
      const headerElement = columnElement.querySelector('.column-header p')

      const column = {
        id: columnElement.getAttribute('data-column-id'),
        title: headerElement && headerElement.textContent,
        noteIds: []
      }

      columnElement.querySelectorAll('.note').forEach(noteElement => {
        column.noteIds.push(noteElement.getAttribute('data-note-id'))
      })

      object.columns.items.push(column)
    })

    document.querySelectorAll('.note').forEach(noteElement => {
      const note = {
        id: noteElement.getAttribute('data-note-id'),
        content: noteElement.textContent
      }

      object.notes.items.push(note)
    })

    localStorage.setItem('trello', JSON.stringify(object))

    return object
  },

  load() {
    const app = localStorage.getItem('trello')

    if (!app) return

    const mountPoint = document.querySelector('.columns')

    const object = JSON.parse(app)

    const getNoteById = id => object.notes.items.find(note => note.id === id)

    for (const {id, noteIds, title} of object.columns.items) {
      const column = new Column(id, title)

      mountPoint.prepend(column.element)

      for (const noteId of noteIds) {
        const {id, content} = getNoteById(noteId)
        const note = new Note(id, content)
        column.add(note)
      }
    }
  }
}

export default Application
