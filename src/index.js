import Application from '@/application'
import Column from '@/column'

import '@/styles/style.scss'

Application.load()

document.querySelector('[data-action-addColumn]').addEventListener('click', function () {
  const column = new Column()

  document.querySelector('.columns').prepend(column.element)

  Application.save()
})
