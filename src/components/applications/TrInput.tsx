import React, { useRef, useState, useCallback } from 'react';
import { Save, X, Upload, FileText, Paperclip } from 'lucide-react';
import type { FormikProps } from 'formik';
import type { IApplicationForm } from '../../interfaces/types';

interface TrInputProps {
    formik: FormikProps<Partial<IApplicationForm>>;
    statusOptions: { value: string; label: string }[];
    setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUploadButton: React.FC<{
    value: File | null;
    onChange: (file: File | null) => void;
    title: string;
    Icon: React.FC<{ className: string }>;
}> = ({ value, onChange, title, Icon }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.files?.[0] || null);
        },
        [onChange]
    );

    return (
        <div className="flex flex-col items-center">
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className={`p-2 rounded-md transition-colors ${
                    value ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-fuchsia-100 hover:text-fuchsia-600'
                }`}
                title={value ? `${title}: ${value.name}` : title}
            >
                <Icon className="w-4 h-4" />
            </button>
            <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleChange} />
        </div>
    );
};

const TrInput: React.FC<TrInputProps> = ({ formik, statusOptions, setIsAddingNew }) => {
    const [localPosition, setLocalPosition] = useState(formik.values.position || '');
    const [localCompany, setLocalCompany] = useState(formik.values.company || '');
    const [localAppliedDate, setLocalAppliedDate] = useState(formik.values.applied_date || '');
    const [localInterviewDate, setLocalInterviewDate] = useState(formik.values.interview_date || '');

    const handleSubmit = useCallback(() => {
        formik.setFieldValue('position', localPosition);
        formik.setFieldValue('company', localCompany);
        formik.setFieldValue('applied_date', localAppliedDate);
        formik.setFieldValue('interview_date', localInterviewDate || null);
        formik.handleSubmit();
    }, [formik, localPosition, localCompany, localAppliedDate, localInterviewDate]);

    return (
        <tr className="bg-fuchsia-50 border-l-4 border-fuchsia-500">
            <td className="px-3 py-2 md:px-6 md:py-4">
                <input
                    type="text"
                    name="position"
                    placeholder="Poste..."
                    value={localPosition}
                    onChange={e => setLocalPosition(e.target.value)}
                    onBlur={() => formik.setFieldValue('position', localPosition)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 ${
                        formik.touched.position && formik.errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                    autoFocus
                />
                {formik.touched.position && formik.errors.position && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.position}</div>
                )}
            </td>

            {/* Entreprise */}
            <td className="px-3 py-2 md:px-6 md:py-4">
                <input
                    type="text"
                    name="company"
                    placeholder="Entreprise..."
                    value={localCompany}
                    onChange={e => setLocalCompany(e.target.value)}
                    onBlur={() => formik.setFieldValue('company', localCompany)}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 ${
                        formik.touched.company && formik.errors.company ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {formik.touched.company && formik.errors.company && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.company}</div>
                )}
            </td>

            {/* Date de candidature */}
            <td className="px-3 py-2 md:px-6 md:py-4">
                <input
                    type="date"
                    name="applied_date"
                    value={localAppliedDate}
                    onChange={e => setLocalAppliedDate(e.target.value)}
                    onBlur={() => formik.setFieldValue('applied_date', localAppliedDate)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>

            {/* Statut */}
            <td className="px-3 py-2 md:px-6 md:py-4">
                <select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </td>

            {/* Date entretien */}
            <td className="px-3 py-2 md:px-6 md:py-4">
                <input
                    type="date"
                    name="interview_date"
                    value={localInterviewDate || ''}
                    onChange={e => setLocalInterviewDate(e.target.value)}
                    onBlur={() => formik.setFieldValue('interview_date', localInterviewDate || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
            </td>

            {/* CV */}
            <td className="px-3 py-2 md:px-6 md:py-4">
                <FileUploadButton
                    value={formik.values.cv_path || null}
                    onChange={file => formik.setFieldValue('cv_path', file)}
                    title="CV"
                    Icon={formik.values.cv_path ? FileText : Upload}
                />
            </td>

            {/* Lettre de motivation */}
            <td className="px-3 py-2 md:px-6 md:py-4">
                <FileUploadButton
                    value={formik.values.cover_letter_path || null}
                    onChange={file => formik.setFieldValue('cover_letter_path', file)}
                    title="Lettre de Motivation"
                    Icon={formik.values.cover_letter_path ? Paperclip : Upload}
                />
            </td>

            {/* Actions */}
            <td className="px-3 py-2 md:px-6 md:py-4">
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                        title="Sauvegarder"
                    >
                        <Save className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Annuler"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default React.memo(TrInput);
