import { useState, useMemo, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { toast } from 'sonner';
import type { IApplication } from '../interfaces/types';
import Header from '../components/applications/Header';
import TableApp from '../components/applications/TableApp';
import { filterAndSortApplications } from '../utils/filterAndSortApplications';
import TableFooterApp from '../components/applications/TableFooterApp';
import { useUser } from '../contexts/UserContext';

const statusOptions = [
    { value: 'applied', label: 'Candidature envoyée' },
    { value: 'interview', label: 'Entretien' },
    { value: 'rejected', label: 'Refusée' },
    { value: 'accepted', label: 'Acceptée' },
    { value: 'pending', label: 'En attente' }
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
    const [editingId, setEditingId] = useState<number | null>(null);

    const [newApplication, setNewApplication] = useState<Partial<IApplication>>({
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

    const handleAddNew = () => {
        if (newApplication.position && newApplication.company) {
            const newApp: IApplication = {
                id: Math.max(...applications.map(a => a.id)) + 1,
                user_id: 10, // Replace with actual user ID
                position: newApplication.position!,
                company: newApplication.company!,
                job_url: newApplication.job_url || null,
                applied_date: newApplication.applied_date!,
                status: newApplication.status as any || 'applied',
                interview_date: newApplication.interview_date || null,
                notes: newApplication.notes || null,
                cv_path: null,
                cover_letter_path: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            setApplications(prev => [newApp, ...prev]);
            setIsAddingNew(false);
            setNewApplication({
                position: '',
                company: '',
                job_url: '',
                applied_date: new Date().toISOString().split('T')[0],
                status: 'applied',
                interview_date: '',
                notes: ''
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <Header filters={filters} setFilters={setFilters} setIsAddingNew={setIsAddingNew} />

            <TableApp 
                handleSort={handleSort}
                sortConfig={sortConfig}
                isAddingNew={isAddingNew}
                setIsAddingNew={setIsAddingNew}
                userId={user?.id ?? null}
                applications={applications}
                setApplications={setApplications}
                filteredAndSortedApplications={filteredAndSortedApplications}
                formatDate={formatDate}
                statusOptions={statusOptions}
                handleAddNew={handleAddNew}
            />

            {filteredAndSortedApplications.length > 0 && (
                <TableFooterApp
                    filteredAndSortedApplications={filteredAndSortedApplications}
                    applications={applications}                
                />
            )}
        </div>
    );
}