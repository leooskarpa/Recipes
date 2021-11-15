import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/Home/Home.page'
import DatatablePage from './pages/Datatable/Datatable.page'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/datatable" element={<DatatablePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
