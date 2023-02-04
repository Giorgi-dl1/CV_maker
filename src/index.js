import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { FormProvider } from './hooks/useForm'
import './styles/output.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>,
)
