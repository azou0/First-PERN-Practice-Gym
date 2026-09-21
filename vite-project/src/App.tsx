//import { useState } from 'react'
//import heroImg from './assets/hero.png'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import Onboarding from "./pages/Onboarding"
import Profile from "./pages/Profile"
import Account from "./pages/Account"
import Auth from "./pages/Auth"
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react"
import { authClient } from "./lib/neon"
import AuthProvider from "./context/AuthContext";

function App() {
  
  return (
    <NeonAuthUIProvider authClient={authClient} defaultTheme="dark">
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account/:pathname" element={<Account />} />
            <Route path="/auth/:pathname" element={<Auth />} />
          </Routes>
          </main>
        </div>
      </AuthProvider>
    </NeonAuthUIProvider>
  );
}

export default App;
