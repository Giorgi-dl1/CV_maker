import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Scroller from './components/Scroller'
import CVScreen from './screens/CVScreen'
import HomeScreen from './screens/HomeScreen'
import ResultScreen from './screens/ResultScreen'

function App() {
  return (
    <BrowserRouter>
      <Scroller />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cv/:step" element={<CVScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
