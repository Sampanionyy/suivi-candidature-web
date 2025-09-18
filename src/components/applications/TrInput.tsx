import React from 'react';
import type { FormikProps } from 'formik';
import type { IApplicationForm } from '../../interfaces/types';

import { FormInput } from './FormInput';
import { FormActions } from './FormActions';
import { FileUploadSection } from './FileUploadSection';
import { useFormInputs } from '../../hooks/use-form-inputs';
import { useFormHandlers } from '../../hooks/use-form-handlers';

interface TrInputProps {
    formik: FormikProps<Partial<IApplicationForm>>;
    statusOptions: { value: string; label: string }[];
    setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>;
    onCancel?: () => void;
    isEditing?: boolean;
}

const TrInput: React.FC<TrInputProps> = ({ 
    formik, 
    statusOptions, 
    setIsAddingNew, 
    onCancel,
    isEditing = false 
}) => {
    const { localValues, setLocalValues, updateFormikValues } = useFormInputs(formik);
    
    const { handleSubmit, handleCancel, handleKeyPress } = useFormHandlers({
        formik,
        updateFormikValues,
        setIsAddingNew,
        onCancel
    });

    const updateLocalValue = (field: keyof typeof localValues) => (value: string) => {
        setLocalValues(prev => ({ ...prev, [field]: value }));
    };

    return (
        <tr className="bg-fuchsia-50 border-l-4 border-fuchsia-500" onKeyDown={handleKeyPress}>
            <td className="px-3 py-2 md:px-6 md:py-4">
                <FormInput
                    name="position"
                    placeholder="Poste..."
                    value={localValues.position}
                    onChange={updateLocalValue('position')}
                    error={formik.errors.position}
                    touched={formik.touched.position}
                    autoFocus={!isEditing}
                />
            </td>

            <td className="px-3 py-2 md:px-6 md:py-4">
                <FormInput
                    name="company"
                    placeholder="Entreprise..."
                    value={localValues.company}
                    onChange={updateLocalValue('company')}
                    error={formik.errors.company}
                    touched={formik.touched.company}
                />
            </td>

            <td className="px-3 py-2 md:px-6 md:py-4">
                <FormInput
                    type="date"
                    name="applied_date"
                    value={localValues.appliedDate}
                    onChange={updateLocalValue('appliedDate')}
                />
            </td>

            <td className="px-3 py-2 md:px-6 md:py-4">
                <select
                    name="status"
                    value={formik.values.status || 'applied'}
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

            <td className="px-3 py-2 md:px-6 md:py-4">
                <FormInput
                    type="date"
                    name="interview_date"
                    value={localValues.interviewDate}
                    onChange={updateLocalValue('interviewDate')}
                />
            </td>

            <td className="px-3 py-2 md:px-6 md:py-4">
                {/* 

                <FileUploadSection
                    cvPath={formik.values.cv_path || null}
                    coverLetterPath={formik.values.cover_letter_path || null}
                    jobUrl={localValues.jobUrl}
                    onCvChange={file => formik.setFieldValue('cv_path', file)}
                    onCoverLetterChange={file => formik.setFieldValue('cover_letter_path', file)}
                />  */}
            </td>

            <td className="px-3 py-2 md:px-6 md:py-4">
                <div className="flex flex-col space-y-2">
                    <FormActions
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isSubmitting={formik.isSubmitting}
                        isEditing={isEditing}
                    />
                    
                    <FormInput
                        type="url"
                        name="job_url"
                        placeholder="URL offre..."
                        value={localValues.jobUrl}
                        onChange={updateLocalValue('jobUrl')}
                        className="text-xs"
                    />
                    
                    <FormInput
                        type="textarea"
                        name="notes"
                        placeholder="Notes..."
                        value={localValues.notes}
                        onChange={updateLocalValue('notes')}
                        rows={2}
                        className="text-xs"
                    />
                </div>
            </td>
        </tr>
    );
};

export default React.memo(TrInput);