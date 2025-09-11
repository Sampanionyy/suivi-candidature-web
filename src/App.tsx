import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import Register from "./pages/auth/Register"
import LoginPage from "./pages/auth/Login"
import "./App.css"
import Dashboard from "./pages/Dashboard"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            
            <Toaster />
        </Router>
    )
}

export default App
