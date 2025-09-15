import React, { useEffect } from 'react'
import { Save, X } from 'lucide-react'
import type { FormikProps } from 'formik'
import type { IApplication } from '../../interfaces/types'

interface TrInputProps {
    formik: FormikProps<Omit<IApplication, 'id' | 'created_at' | 'updated_at'>>
    statusOptions: { value: string; label: string }[]
    setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>
}

const TrInput: React.FC<TrInputProps> = ({ formik, statusOptions, setIsAddingNew }) => {
    return (
        <tr className="bg-fuchsia-50 border-l-4 border-fuchsia-500">
            <td className="px-6 py-4">
                <input
                    type="text"
                    name="position"
                    placeholder="Poste..."
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                    autoFocus
                />
            </td>
            <td className="px-6 py-4">
                <input
                    type="text"
                    name="company"
                    placeholder="Entreprise..."
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>
            <td className="px-6 py-4">
                <input
                    type="date"
                    name="applied_date"
                    value={formik.values.applied_date}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>
            <td className="px-6 py-4">
                <select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
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
                    name="interview_date"
                    value={formik.values.interview_date || ''}
                    onChange={e => formik.setFieldValue('interview_date', e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>
            <td className="px-6 py-4">
                <span className="text-gray-400 text-sm">À ajouter</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => formik.handleSubmit()}
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
