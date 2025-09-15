import { Briefcase, Building2, Calendar, Edit, Eye, FileText, Link, Trash2 } from 'lucide-react'
import React from 'react'

interface TrContentProps {
    app: {
        id: number
        user_id: number | null
        position: string
        company: string
        job_url: string | null
        applied_date: string
        status: string
        interview_date: string | null
        cv_path: string | null
        cover_letter_path: string | null
        created_at: string
        updated_at: string
    }
    formatDate: (dateStr: string) => string
    statusColors: { [key: string]: string }
    statusOptions: { value: string; label: string }[]
}

const TrContent : React.FC<TrContentProps> = ({ app, formatDate, statusColors, statusOptions }) => {
    return (
        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{app.position}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{app.company}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{formatDate(app.applied_date)}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                    {statusOptions.find(s => s.value === app.status)?.label}
                </span>
            </td>
            <td className="px-6 py-4">
                {app.interview_date ? (
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <span className="text-gray-900">{formatDate(app.interview_date)}</span>
                    </div>
                ) : (
                    <span className="text-gray-400">-</span>
                )}
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-2">
                    {app.cv_path && (
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="CV">
                            <FileText className="w-4 h-4" />
                        </button>
                    )}
                    {app.cover_letter_path && (
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors" title="Lettre de motivation">
                            <FileText className="w-4 h-4" />
                        </button>
                    )}
                    {app.job_url && (
                        <button className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors" title="Offre d'emploi">
                            <Link className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors" title="Voir détails">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-fuchsia-600 hover:bg-fuchsia-100 rounded-md transition-colors" title="Modifier">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TrContent