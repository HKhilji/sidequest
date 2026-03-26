import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Watchlist from './pages/Watchlist'
import Search from './pages/Search'

function App() {
  return (
    <HashRouter>
      <div className="layout">
        <nav className="sidebar">
          <h1 className="logo">Sidequest</h1>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Watchlist
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Search 
          </NavLink>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<Watchlist />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App

