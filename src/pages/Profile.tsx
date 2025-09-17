import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User } from 'lucide-react';
import { toast } from 'sonner';
import apiClient from '../services/apiClient';
import type { IDocument, IProfile, IProfileFormValues } from '../interfaces/types';
import IdentitySection from '../components/profile/IdentitySection';
import DocumentsSection from '../components/profile/DocumentsSection';

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [documents, setDocuments] = useState<IDocument[]>([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [uploadingFile, setUploadingFile] = useState(false);

    // Récupération du profil et documents
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const profileResponse = await apiClient.get('profile');
                const profileData = profileResponse.data?.data;

                const documentsResponse = await apiClient.get('documents');
                const documentsData = documentsResponse.data?.data;

                setProfile(profileData);
                setDocuments(documentsData);
            } catch (error) {
                toast.error("Erreur lors de la récupération des données !");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Formik pour le profil
    const formik = useFormik<IProfileFormValues>({
        enableReinitialize: true,
        initialValues: {
            first_name: profile?.first_name || '',
            last_name: profile?.last_name || '',
            phone: profile?.phone || '',
            address: profile?.address || '',
            linkedin_url: profile?.linkedin_url || '',
            github_url: profile?.github_url || '',
            portfolio_url: profile?.portfolio_url || '',
            summary: profile?.summary || '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Le prénom est requis'),
            last_name: Yup.string().required('Le nom est requis'),
            phone: Yup.string().optional(),
            address: Yup.string().optional(),
            linkedin_url: Yup.string().url('URL invalide').optional(),
            github_url: Yup.string().url('URL invalide').optional(),
            portfolio_url: Yup.string().url('URL invalide').optional(),
            summary: Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            if (!profile) return;
            try {
                setIsLoading(true);
                const response = await apiClient.put('profile', values);
                setProfile(response.data.data);
                setIsEditingProfile(false);
                toast.success("Profil mis à jour avec succès !");
            } catch (error) {
                console.error(error);
                toast.error("Erreur lors de la sauvegarde du profil !");
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleFileUpload = async (file: File, type: 'CV' | 'LM') => {
        if (!profile) return;
        setUploadingFile(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('user_id', profile.id.toString());
            formData.append('type', type);
            formData.append('name', file.name);

            const response = await apiClient.post('documents', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const newDoc: IDocument = response.data.data;
            setDocuments([...documents, newDoc]);
            toast.success('Document ajouté avec succès !');
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de l'upload du document !");
        } finally {
            setUploadingFile(false);
        }
    };

    const handleDeleteDocument = async (id: number) => {
        try {
            await apiClient.delete(`documents/${id}`);
            setDocuments(documents.filter(doc => doc.id !== id));
            toast.success('Document supprimé !');
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la suppression du document !");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-purple-50 p-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fuchsia-300"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-purple-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                        <User className="text-fuchsia-300" size={32} />
                        Mon Profil
                    </h1>
                    <p className="text-gray-600 mt-2">Gérez vos informations personnelles et vos documents</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Section Identité */}
                    <div className="xl:col-span-2">
                        <IdentitySection
                            isEditingProfile={isEditingProfile}
                            setIsEditingProfile={setIsEditingProfile}
                            formik={formik}
                            profile={profile}
                        />
                    </div>

                    {/* Documents */}
                    <div className="xl:col-span-1">
                        <DocumentsSection
                            documents={documents}
                            profile={profile}
                            setDocuments={setDocuments}
                            uploadingFile={uploadingFile}
                            setUploadingFile={setUploadingFile}
                            handleDeleteDocument={handleDeleteDocument}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
