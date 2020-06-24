import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'
import Home from './components/pages/Home'
import Product from './components/pages/Product'
import Cart from './components/pages/Cart'
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import SignIn from 'components/pages/SignIn'
import Register from 'components/pages/Register'
import CreateProduct from 'components/pages/CreateProduct'

const MainContent = styled.div`
  background-color: #f6f7f8;
  height: 100%;
`

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main className="main">
          <MainContent>
            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/signin" component={SignIn} exact={true} />
            <Route path="/products/:id" component={Product} />
            <Route path="/createProduct" component={CreateProduct} />
            <Route path="/cart/:id?" component={Cart} />
          </MainContent>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
