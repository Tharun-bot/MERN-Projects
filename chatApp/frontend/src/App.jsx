import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from "react-router-dom"
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Settings from './pages/Settings'
import HomePage from "./pages/HomePage"
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"

const App = () => {

  const {isCheckingAuth, authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    )
  }
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>
    </div>
  )
}

export default App