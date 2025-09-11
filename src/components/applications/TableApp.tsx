import React, { useState } from 'react'
import type { IApplication } from '../../interfaces/types'
import {
    Briefcase,
    Building2,
    Calendar,
    FileText,
    Link,
    Save,
    X,
    Edit,
    Trash2,
    Eye
} from 'lucide-react'
import { toast } from 'sonner'
import apiClient from '../../services/apiClient'
import TableHeaderApp from './TableHeaderApp'
import TrInput from './TrInput'
import TrContent from './TrContent'
import TrFooter from './TrFooter'

interface TableAppProps {
    userId: number // Pour assigner la candidature au user
    applications: IApplication[]
    filteredAndSortedApplications: IApplication[]
    setApplications: React.Dispatch<React.SetStateAction<IApplication[]>>
    formatDate: (dateStr: string) => string
    statusOptions: { value: string; label: string }[]
    handleAddNew: () => void
    isAddingNew: boolean
    setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>
    sortConfig: { key: keyof IApplication; direction: 'asc' | 'desc' } | null
    handleSort: (column: keyof IApplication) => void
}

const statusColors = {
    applied: 'bg-blue-100 text-blue-800',
    interview: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
    accepted: 'bg-green-100 text-green-800',
    pending: 'bg-gray-100 text-gray-800'
}

const TableApp: React.FC<TableAppProps> = ({
    sortConfig,
    handleSort,
    userId,
    applications,
    setApplications,
    filteredAndSortedApplications,
    formatDate,
    statusOptions,
    handleAddNew,
    isAddingNew,
    setIsAddingNew
}) => {
    const [newApplication, setNewApplication] = useState<Omit<IApplication, 'id' | 'created_at' | 'updated_at'>>({
        user_id: userId,
        position: '',
        company: '',
        job_url: null,
        applied_date: new Date().toISOString().split('T')[0],
        status: 'applied',
        interview_date: null,
        notes: null,
        cv_path: null,
        cover_letter_path: null
    })

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <TableHeaderApp sortConfig={sortConfig} onSort={handleSort} />

                <tbody className="bg-white divide-y divide-gray-200">
                    {isAddingNew && (
                        <TrInput
                            newApplication={newApplication}
                            setNewApplication={setNewApplication}
                            statusOptions={statusOptions}
                            handleAddNew={handleAddNew}
                            setIsAddingNew={setIsAddingNew}
                        />
                    )}

                    {filteredAndSortedApplications.map((app) => (
                        <TrContent 
                            key={app.id}
                            app={app}
                            formatDate={formatDate}
                            statusColors={statusColors}
                            statusOptions={statusOptions}
                        />
                    ))}

                    {filteredAndSortedApplications.length === 0 && !isAddingNew && (
                        <TrFooter 
                            setIsAddingNew={setIsAddingNew}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TableApp
