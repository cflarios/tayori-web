import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LangProvider } from './i18n'
import { RouteProvider } from './router'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </LangProvider>
  </StrictMode>,
)
