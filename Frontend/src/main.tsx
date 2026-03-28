import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppContextProvider  from './context/AppContext.tsx';


export const AuthService = 'http://localhost:5001'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="967155103726-7e57upbagk0uoimvc0blqjh7ffjioain.apps.googleusercontent.com">
      <AppContextProvider>
        <App/>
      </AppContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
