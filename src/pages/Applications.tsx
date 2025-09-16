import { useState, useMemo, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { toast } from 'sonner';
import type { IApplication, IApplicationForm } from '../interfaces/types';
import Header from '../components/applications/Header';
import TableApp from '../components/applications/TableApp';
import { filterAndSortApplications } from '../utils/filterAndSortApplications';
import TableFooterApp from '../components/applications/TableFooterApp';
import { useUser } from '../contexts/UserContext';
import { useApplicationForm } from '../hooks/useApplicationForm';

const statusOptions = [
    { value: 'applied', label: 'Candidature envoyée' },
    { value: 'interview', label: 'Entretien' },
    { value: 'rejected', label: 'Refusée' },
    { value: 'accepted', label: 'Acceptée' },
];

export default function ApplicationsTable() {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await apiClient.get('/applications');
                setApplications(response.data.data);
            } catch (err: any) {
                console.error(err);
                toast.error('Impossible de charger les candidatures');
            }
        };

        fetchApplications();
    }, []);

    const [filters, setFilters] = useState({
        search: '',
        status: '',
        company: '',
        position: ''
    });

    const [sortConfig, setSortConfig] = useState<{
        key: keyof IApplication;
        direction: 'asc' | 'desc';
    } | null>(null);

    const [isAddingNew, setIsAddingNew] = useState(false);
    //const [editingId, setEditingId] = useState<number | null>(null);

    const [newApplication, setNewApplication] = useState<Partial<IApplicationForm>>({
        position: '',
        company: '',
        job_url: '',
        applied_date: new Date().toISOString().split('T')[0],
        status: 'applied',
        interview_date: '',
        notes: ''
    });

    const handleSort = (key: keyof IApplication) => {
        setSortConfig(current => ({
            key,
            direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredAndSortedApplications = useMemo(() => {
        return filterAndSortApplications(applications, filters, sortConfig ?? undefined);
    }, [applications, filters, sortConfig]);

    const { formik } = useApplicationForm(
        setApplications,
        setIsAddingNew,
        applications,
        user?.id ?? null
    )

    const handleDelete = async (id: number) => {
        try {
            await apiClient.delete(`/applications/${id}`);
            setApplications(prev => prev.filter(app => app.id !== id));
            toast.success('Candidature supprimée avec succès !');
        } catch (err) {
            console.error(err);
            toast.error('Échec de la suppression de la candidature');
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <Header filters={filters} setFilters={setFilters} setIsAddingNew={setIsAddingNew} />
            {user && (
                <>
                    <TableApp 
                        handleDelete={handleDelete}
                        formik={formik}
                        handleSort={handleSort}
                        sortConfig={sortConfig}
                        isAddingNew={isAddingNew}
                        setIsAddingNew={setIsAddingNew}
                        filteredAndSortedApplications={filteredAndSortedApplications}
                        formatDate={formatDate}
                        statusOptions={statusOptions}
                    />

                    {filteredAndSortedApplications.length > 0 && (
                        <TableFooterApp
                            filteredAndSortedApplications={filteredAndSortedApplications}
                            applications={applications}                
                        />
                    )}
                </>
            )}
        </div>
    );
}