import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage/FeaturesPage'
import MarketsPage from './pages/MarketsPage/MarketsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/markets" element={<MarketsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
