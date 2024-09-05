import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userContext.js'
import { SearchProvider } from './context/searchContext.js'
import { CartProvider } from './context/cartContext.js'
import { SettingsProvider } from './context/settingsContext.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SearchProvider>
            <SettingsProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </SettingsProvider>
        </SearchProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
