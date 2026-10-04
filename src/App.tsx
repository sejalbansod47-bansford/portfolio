import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { OnePage } from './pages/OnePage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<OnePage />} />
          <Route path="about" element={<Navigate to="/#about" replace />} />
          <Route
            path="experience"
            element={<Navigate to="/#experience" replace />}
          />
          <Route
            path="projects/*"
            element={<Navigate to="/#projects" replace />}
          />
          <Route
            path="engagement"
            element={<Navigate to="/#engagement" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
