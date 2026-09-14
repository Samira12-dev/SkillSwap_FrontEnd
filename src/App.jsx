
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Login from "./pages/auth/Login";
import LayoutPublic from "./layouts/LayoutPublic";
import LayoutPrivate from "./layouts/LayoutPrivate";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route element={<LayoutPublic />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<LayoutPrivate />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
