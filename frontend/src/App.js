import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Product from './components/pages/Product'
import Cart from './components/pages/Cart'
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main className="main">
          <div className="content">
            <Route path="/" component={Home} exact={true} />
            <Route path="/products/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
