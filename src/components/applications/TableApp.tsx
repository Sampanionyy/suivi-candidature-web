import React from 'react'
import type { IApplication } from '../../interfaces/types'
import TrInput from './TrInput'
import TrContent from './TrContent'
import TrFooter from './TrFooter'
import ThTitle from './TableHeaderApp'
import { useFormik } from 'formik'
import { addApplication } from '../../services/applicationService'
import { toast } from 'sonner'

interface TableAppProps {
    userId: number | null
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
type FormValues = {
    user_id: number | null;
    position: string;
    company: string;
    job_url: string | null;
    applied_date: string;
    status: IApplication['status'];
    interview_date: string | null;
    notes: string | null;
    cv_path: string | null;
    cover_letter_path: string | null;
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
    const formik = useFormik<FormValues>({
        initialValues: {
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
        },
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                const result = await addApplication(values);
                console.log({result})

                if (result.success) {
                    const newApp: IApplication = {
                        id: applications.length ? Math.max(...applications.map(app => app.id)) + 1 : 1,
                        ...values,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    };
                    setApplications(prev => [...prev, newApp]);

                    toast.success(result.message || "Candidature ajoutée avec succès !");

                    setIsAddingNew(false);

                    resetForm();
                } else {
                    if (result.fieldErrors) {
                        setErrors(result.fieldErrors);
                    } else {
                        toast.error(result.message || "Une erreur est survenue lors de l'ajout");
                    }
                }
            } catch (error) {
                console.error(error);
                toast.error("Une erreur inattendue est survenue.");
            } finally {
                // setLoading(false);
            }
        }

    })

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <ThTitle sortConfig={sortConfig} onSort={handleSort} />

                <tbody className="bg-white divide-y divide-gray-200">
                    {isAddingNew && (
                        <TrInput
                            formik={formik}
                            statusOptions={statusOptions}
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
