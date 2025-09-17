import React from 'react'

import { useFormik } from 'formik'
import { User, Camera } from 'lucide-react'
import type { IProfile, IProfileFormValues } from '../../interfaces/types'

interface GeneralInformationsProps {
    formik: ReturnType<typeof useFormik<IProfileFormValues>>;
    isEditingProfile: boolean
    profile?: IProfile | null;
}

const GeneralInformations: React.FC<GeneralInformationsProps> = ({ formik, isEditingProfile, profile }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-fuchsia-200 to-purple-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                    {profile?.photo_url ? (
                        <img src={profile.photo_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User size={48} className="text-fuchsia-400" />
                    )}
                </div>
                {isEditingProfile && (
                    <button className="absolute bottom-0 right-0 bg-fuchsia-300 hover:bg-fuchsia-400 text-white p-2 rounded-full shadow-lg transition-colors">
                        <Camera size={16} />
                    </button>
                )}
            </div>

            <div className="flex-1 min-w-0 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!isEditingProfile}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent"
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                            <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!isEditingProfile}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent"
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                            <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Résumé</label>
                    <textarea
                        name="summary"
                        value={formik.values.summary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditingProfile}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent resize-none"
                    />
                    {formik.touched.summary && formik.errors.summary && (
                        <div className="text-red-500 text-sm">{formik.errors.summary}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GeneralInformations