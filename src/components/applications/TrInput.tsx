import React from 'react'
import type { IApplication } from '../../interfaces/types'

import { Save, X } from 'lucide-react'

interface TrInputProps {
    newApplication: Omit<IApplication, 'id' | 'created_at' | 'updated_at'>;
    setNewApplication: React.Dispatch<React.SetStateAction<Omit<IApplication, 'id' | 'created_at' | 'updated_at'>>>;
    statusOptions: { value: string; label: string }[];
    handleAddNew: () => void;
    setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrInput: React.FC<TrInputProps> = ({
    newApplication,
    setNewApplication,
    statusOptions,
    handleAddNew,
    setIsAddingNew
}) => {
    return (
        <tr className="bg-fuchsia-50 border-l-4 border-fuchsia-500">
            <td className="px-6 py-4">
                <input
                    type="text"
                    placeholder="Poste..."
                    value={newApplication.position}
                    onChange={(e) => setNewApplication(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                    autoFocus
                />
            </td>
            <td className="px-6 py-4">
                <input
                    type="text"
                    placeholder="Entreprise..."
                    value={newApplication.company}
                    onChange={(e) => setNewApplication(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>
            <td className="px-6 py-4">
                <input
                    type="date"
                    value={newApplication.applied_date}
                    onChange={(e) => setNewApplication(prev => ({ ...prev, applied_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>
            <td className="px-6 py-4">
                <select
                    value={newApplication.status}
                    onChange={(e) => setNewApplication(prev => ({ ...prev, status: e.target.value as IApplication['status'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </td>
            <td className="px-6 py-4">
                <input
                    type="date"
                    value={newApplication.interview_date || ''}
                    onChange={(e) => setNewApplication(prev => ({ ...prev, interview_date: e.target.value || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>
            <td className="px-6 py-4">
                <span className="text-gray-400 text-sm">À ajouter</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-2">
                    <button
                        onClick={handleAddNew}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                        title="Sauvegarder"
                    >
                        <Save className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsAddingNew(false)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Annuler"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TrInput