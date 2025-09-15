import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface BackendError {
    errors?: Record<string, string[]>;
    message?: string;
}

export interface ApplicationValues {
    user_id: number | null;
    position: string;
    company: string;
    job_url?: string | null;
    applied_date: string;
    status: 'applied' | 'interview' | 'rejected' | 'accepted' | 'pending';
    interview_date?: string | null;
    notes?: string | null;
    cv_path?: string | null;
    cover_letter_path?: string | null;
}

export const getApplications = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/applications`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { success: true, data: res.data };
    } catch (err: any) {
        const data: BackendError = err?.response?.data;
        return { success: false, message: data?.message || 'Impossible de contacter le serveur' };
    }
};

export const addApplication = async (values: ApplicationValues) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${API_BASE}/applications`, values, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { success: true, data: res.data };
    } catch (err: any) {
        const data: BackendError = err?.response?.data;

        if (data) {
            if (data.errors && typeof data.errors === 'object') {
                const fieldErrors: Record<string, string> = {};
                Object.keys(data.errors).forEach((k) => {
                    const error = data.errors?.[k];
                    if (Array.isArray(error)) {
                        fieldErrors[k] = error[0];
                    } else if (error) {
                        fieldErrors[k] = String(error);
                    } else {
                        fieldErrors[k] = 'Erreur inconnue';
                    }
                });
                return { success: false, fieldErrors };
            } else if (data.message) {
                return { success: false, message: data.message };
            }
        }

        return { success: false, message: 'Impossible de contacter le serveur' };
    }
};

export const updateApplication = async (id: number, values: Partial<ApplicationValues>) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${API_BASE}/applications/${id}`, values, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { success: true, data: res.data };
    } catch (err: any) {
        const data: BackendError = err?.response?.data;

        if (data) {
            if (data.errors && typeof data.errors === 'object') {
                const fieldErrors: Record<string, string> = {};
                Object.keys(data.errors).forEach((k) => {
                    const error = data.errors?.[k];
                    if (Array.isArray(error)) {
                        fieldErrors[k] = error[0];
                    } else if (error) {
                        fieldErrors[k] = String(error);
                    } else {
                        fieldErrors[k] = 'Erreur inconnue';
                    }
                });
                return { success: false, fieldErrors };
            } else if (data.message) {
                return { success: false, message: data.message };
            }
        }

        return { success: false, message: 'Impossible de contacter le serveur' };
    }
};

export const deleteApplication = async (id: number) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE}/applications/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { success: true };
    } catch (err: any) {
        const data: BackendError = err?.response?.data;
        return { success: false, message: data?.message || 'Impossible de contacter le serveur' };
    }
};
