import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
/* mobile-only responsive overrides — imported last so it wins the cascade
   on phones/tablets without altering the locked desktop design */
import './mobile.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
