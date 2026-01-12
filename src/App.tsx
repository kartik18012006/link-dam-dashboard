import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { LinksPage } from './pages/LinksPage'
import { AppearancePage } from './pages/AppearancePage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SettingsPage } from './pages/SettingsPage'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/links" replace />} />
          <Route path="links" element={<LinksPage />} />
          <Route path="appearance" element={<AppearancePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard/links" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
