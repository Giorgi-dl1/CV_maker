import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CVScreen from './screens/CVScreen'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cv/:step" element={<CVScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
