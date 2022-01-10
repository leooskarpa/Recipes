import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/Home/Home.page'
import DatatablePage from './pages/Datatable/Datatable.page'
import Header from './components/Header'
import Profile from './pages/Profile/Profile'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/datatable" element={<DatatablePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
