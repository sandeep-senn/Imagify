import React from 'react'
import Home from './pages/Home'
import {Route, Routes} from 'react-router-dom'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {showLogin} = React.useContext(AppContext);

  return (
    <main className='min-h-screen px-4 sm:px-10 md:px-14 lg:px-28 bg-gradient-to-b from-teal-50 to-orange-50'> 
      <ToastContainer
        position="top-right"      
        autoClose={5000}          
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      {showLogin && <Login />} 
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/buycredit' element={<BuyCredit />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App