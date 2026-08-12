import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageLayout } from './layouts'
import {
  HomePage,
  ReportComplaint,
  TrackPage,
  MyComplaintsPage,
  AboutPage,
} from './pages/citizen'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportComplaint />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/my-complaints" element={<MyComplaintsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}

export default App
