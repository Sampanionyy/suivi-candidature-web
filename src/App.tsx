import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import Register from "./pages/auth/Register"
import LoginPage from "./pages/auth/Login"
import "./App.css"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/Layout"
import ApplicationsTable from "./pages/Applications"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="applications" element={<ApplicationsTable />} />
                </Route>            
          </Routes>
            
            <Toaster />
        </Router>
    )
}

export default App
