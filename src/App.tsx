import React from 'react'
import useForm from './hooks/useForm'

function App() {
  const { formState } = useForm()
  console.log(formState)
  return <div>setup</div>
}

export default App
