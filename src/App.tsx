import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
import ProtectedRoute from "./components/ProtectedRoute"
import AuthRedirect from "./components/AuthRedirect"
import Home from "./pages/Home"  // Page publique

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Page publique des visiteurs */}
                    <Route path="/" element={<Home />} />

                    {/* Pages d'auth */}
                    <Route path="/register" element={
                        <AuthRedirect>
                            <Register />
                        </AuthRedirect>
                    } />
                    <Route path="/login" element={
                        <AuthRedirect>
                            <LoginPage />
                        </AuthRedirect>
                    } />

                    {/* Routes protégées */}
                    <Route path="/app" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="applications" element={<ApplicationsTable />} />
                        <Route path="stats" element={<Statistics />} />
                        <Route path="calendar" element={<CalendarPage />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>

                    {/* Redirection fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Toaster />
            </Router>
        </UserProvider>
    )
}

export default App
