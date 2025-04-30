import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'  // HashRouter istifadə edirik
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </HashRouter>
);
