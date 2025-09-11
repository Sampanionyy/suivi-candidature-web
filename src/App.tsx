import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import Register from "./pages/auth/Register"
import "./App.css"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
            
            <Toaster />
        </Router>
    )
}

export default App
