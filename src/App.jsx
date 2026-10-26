import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { AppAccessProvider } from './components/AppAccessModal/AppAccessModal'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage/FeaturesPage'
import MarketsPage from './pages/MarketsPage/MarketsPage'
import WaitingListPage from './pages/WaitingListPage/WaitingListPage'
import LegalPage from './pages/LegalPage/LegalPage'
import privacy from './content/privacy'
import terms from './content/terms'

export default function App() {
  return (
    <BrowserRouter>
      <AppAccessProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/waiting-list" element={<WaitingListPage />} />
            <Route path="/privacy" element={<LegalPage doc={privacy} />} />
            <Route path="/terms" element={<LegalPage doc={terms} />} />
          </Routes>
        </main>
      </AppAccessProvider>
    </BrowserRouter>
  )
}
