import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/sonner"
import Register from "./pages/auth/Register"
import LoginPage from "./pages/auth/Login"
import "./App.css"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/Layout"
import ApplicationsTable from "./pages/Applications"
import { UserProvider } from './contexts/UserContext';
import Statistics from "./pages/ApplicationsStats"
import CalendarPage from "./pages/Calendar"
import Profile from "./pages/Profile"

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="applications" element={<ApplicationsTable />} />
                        <Route path="stats" element={<Statistics />} />
                        <Route path="calendar" element={<CalendarPage />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>            
                </Routes>
                <Toaster />
            </Router>
        </UserProvider>
    )
}

export default App
