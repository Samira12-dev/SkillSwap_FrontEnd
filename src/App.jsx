
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
    <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
