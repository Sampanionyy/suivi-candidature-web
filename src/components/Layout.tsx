import { User, LogOut, Home, UserCircle, Briefcase, BarChart3 } from "lucide-react"
import { Outlet } from "react-router-dom"
import type { ReactNode } from 'react'
import type { IUser as UserType } from "../interfaces/types"

interface LayoutProps {
    children?: ReactNode
    onLogout?: () => void
}

export default function Layout({ children, onLogout }: LayoutProps) {    
    const user: UserType = JSON.parse(localStorage.getItem("user") || "null") 
    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
    }

    const navigationItems = [
        { href: "/dashboard", icon: Home, label: "Tableau de bord" },
        { href: "/applications", icon: Briefcase, label: "Candidatures" },
        { href: "/statistics", icon: BarChart3, label: "Statistiques" },
        { href: "/profile", icon: UserCircle, label: "Profil", requiresAuth: true },
    ]

    const filteredNavigation = navigationItems.filter(item => 
        !item.requiresAuth || (item.requiresAuth && user)
    )

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-xl border-r border-gray-200 relative">
                {/* Header du sidebar - même hauteur que le header principal */}
                <div className="h-20 px-6 border-b border-gray-200 flex items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-300 to-pink-300 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                                ApplyTracker
                            </h1>
                            <p className="text-sm text-gray-500">Suivi des candidatures</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 pb-24">
                    <ul className="space-y-2">
                        {filteredNavigation.map((item) => {
                            const IconComponent = item.icon
                            return (
                                <li key={item.href}>
                                    <a 
                                        href={item.href}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-600 transition-all duration-200 group"
                                    >
                                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="font-medium">{item.label}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </aside>

            {/* Contenu principal */}
            <main className="flex-1 flex flex-col">
                {/* Top bar - hauteur fixe pour alignement */}
                <header className="h-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 shadow-sm flex items-center">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            {user ? (
                                <>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Bienvenue, {user.name?.split(' ')[0] || 'Utilisateur'} 👋
                                    </h2>
                                    <p className="text-gray-600 text-sm">Gérez vos candidatures efficacement</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        ApplyTracker 📋
                                    </h2>
                                    <p className="text-gray-600 text-sm">Connectez-vous pour gérer vos candidatures</p>
                                </>
                            )}
                        </div>
                        
                        <div className="flex items-center space-x-4">                            
                            {user ? (
                                <div className="flex items-center space-x-3">
                                    <a 
                                        href="/dashboard/profile"
                                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-600 rounded-xl transition-all duration-200"
                                    >
                                        <UserCircle className="w-5 h-5" />
                                        <span className="font-medium">Profil</span>
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span className="font-medium">Déconnexion</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <a 
                                        href="/login"
                                        className="flex items-center space-x-2 px-4 py-2 text-fuchsia-600 hover:bg-fuchsia-50 rounded-xl transition-all duration-200"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="font-medium">Connexion</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Zone de contenu */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {children || <Outlet />}
                    </div>
                </div>
            </main>
        </div>
    )
}