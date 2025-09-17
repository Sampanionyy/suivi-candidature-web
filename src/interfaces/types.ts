export interface IUser {
    id: string
    name: string
    email: string
    avatar?: string | null
}

interface IApplicationBase {
    user_id: number | null;
    position: string;
    company: string;
    job_url: string | null;
    applied_date: string;
    status: 'applied' | 'interview' | 'rejected' | 'accepted' | 'pending';
    interview_date: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

// Stocke (depuis API)
export interface IApplication extends IApplicationBase {
    id: number;
    cv_path: string | null;
    cover_letter_path: string | null;
}

// Envoies (formulaire avant upload)
export interface IApplicationForm extends IApplicationBase {
    id: number;
    cv_path: File | null;
    cover_letter_path: File | null;
}

export interface IStats {
    byStatus: { status: string, total: number }[];
    topCompanies: { company: string, total: number }[];
    upcomingInterviews: { position: string, company: string, interview_date: string }[];
    totalApplications: number;
    applicationsOverTime: { year: number, month?: number, week?: number, total: number }[];
    positions: { position: string, total: number }[];
}

export interface Interview {
    id: number;
    position: string;
    company: string;
    interview_date: string;
    status: string;
}