import React from 'react'
import { Button } from 'antd'
import createApi from '../../src/adaptor/react'
import ModalForm from './ModalForm'

function App() {
  const handleClick = async () => {
    const form = await createApi<{ username: string, password: string }>(ModalForm)({ title: 'My Form' })
    // eslint-disable-next-line no-console
    console.log('form', form.username, form.password)
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        react button
      </button>
    </div>
  )
}

export default App
