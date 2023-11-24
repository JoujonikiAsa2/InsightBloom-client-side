import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './AuthProvider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-w-[2200px] mx-[4vw]'>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={Routes} />
        </HelmetProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>,
)
