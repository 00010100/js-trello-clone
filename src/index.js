import Application from '@/application'
import Column from '@/column'

import '@/styles/style.scss'

Application.load()

const lastBtn = document.querySelector('.adder')

document.querySelector('[data-action-addColumn]').addEventListener('click', function () {
  const column = new Column()

  lastBtn.parentNode.insertBefore(column.element, lastBtn)

  Application.save()
})
