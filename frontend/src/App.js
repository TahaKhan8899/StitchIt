import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Product from './components/pages/Product'
import Cart from './components/pages/Cart'

function App() {
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open')
  }
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open')
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">StitchIt</Link>
          </div>
          <div className="header-links">
            <a href="/">Cart</a>
            <a href="/">Sign In</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-btn" onClick={closeMenu}>
            X
          </button>
          <ul>
            <li>
              <a href="/">Bookmarks</a>
            </li>
            <li>
              <a href="/">Mugs</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/" component={Home} exact={true} />
            <Route path="/products/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
