import type { IApplicationForm } from '../interfaces/types';
import apiClient from './apiClient';

interface BackendError {
    errors?: Record<string, string[]>;
    message?: string;
}

export const getApplications = async () => {
    try {
        const res = await apiClient.get(`/applications`);
        console.log({res})
        return { success: true, data: res.data };
    } catch (err: any) {
        const data: BackendError = err?.response?.data;
        return { success: false, message: data?.message || 'Impossible de contacter le serveur' };
    }
};

export const addApplication = async (values: Partial<IApplicationForm>) => {
    try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null) {
                formData.append(key, String(value));
            }
        });

        const res = await apiClient.post(`/applications`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
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

export const updateApplication = async (id: number, values: Partial<IApplicationForm>) => {
    try {
        const res = await apiClient.put(`/applications/${id}`, values);
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
        await apiClient.delete(`/applications/${id}`);

        return { success: true };
    } catch (err: any) {
        const data: BackendError = err?.response?.data;
        
        return { success: false, message: data?.message || 'Impossible de contacter le serveur' };
    }
};
