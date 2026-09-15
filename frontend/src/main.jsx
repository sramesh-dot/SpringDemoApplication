import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      <StudentProvider>
        <App />
      </StudentProvider>

    </BrowserRouter>

  </StrictMode>,
)