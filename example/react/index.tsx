import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Mount } from '../../src/adaptor/react'
import _App from './App.tsx'

const App = Mount(_App)

createRoot(document.getElementById('react-root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
