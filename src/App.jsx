import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import Support from './pages/Support'
import AdminModeration from './pages/AdminModeration'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/support" element={<Support />} />
      <Route path="/admin" element={<AdminModeration />} />
    </Routes>
  )
}

export default App
