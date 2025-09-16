import React from 'react';
import type { IApplication } from '../../interfaces/types';
import TrInput from './TrInput';
import TrContent from './TrContent';
import TrFooter from './TrFooter';
import ThTitle from './TableHeaderApp';
import { useApplicationForm } from '../../hooks/useApplicationForm';

interface TableAppProps {
    userId: number | null;
    applications: IApplication[];
    filteredAndSortedApplications: IApplication[];
    setApplications: React.Dispatch<React.SetStateAction<IApplication[]>>;
    formatDate: (dateStr: string) => string;
    statusOptions: { value: string; label: string }[];
    handleAddNew: () => void;
    isAddingNew: boolean;
    setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>;
    sortConfig: { key: keyof IApplication; direction: 'asc' | 'desc' } | null;
    handleSort: (column: keyof IApplication) => void;
}

const statusColors = {
    applied: 'bg-blue-100 text-blue-800',
    interview: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
    accepted: 'bg-green-100 text-green-800',
    pending: 'bg-gray-100 text-gray-800',
};

const TableApp: React.FC<TableAppProps> = ({
    sortConfig,
    handleSort,
    userId,
    applications,
    setApplications,
    filteredAndSortedApplications,
    formatDate,
    statusOptions,
    isAddingNew,
    setIsAddingNew,
}) => {
    const { formik } = useApplicationForm(
        setApplications,
        setIsAddingNew,
        applications,
        userId
    )

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <ThTitle sortConfig={sortConfig} onSort={handleSort} />

                <tbody className="bg-white divide-y divide-gray-200">
                    {isAddingNew && <TrInput formik={formik} statusOptions={statusOptions} setIsAddingNew={setIsAddingNew} />}

                    {filteredAndSortedApplications.map(app => (
                        <TrContent
                            key={app.id}
                            app={app}
                            formatDate={formatDate}
                            statusColors={statusColors}
                            statusOptions={statusOptions}
                        />
                    ))}

                    {filteredAndSortedApplications.length === 0 && !isAddingNew && <TrFooter setIsAddingNew={setIsAddingNew} />}
                </tbody>
            </table>
        </div>
    );
};

export default TableApp;
