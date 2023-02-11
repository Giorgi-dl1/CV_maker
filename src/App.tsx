import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CVScreen from './screens/CVScreen'
import HomeScreen from './screens/HomeScreen'
import ResultScreen from './screens/ResultScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cv/:step" element={<CVScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
