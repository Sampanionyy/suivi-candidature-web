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

export interface IProfile {
    id: number;
    user_id: number;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    address: string | null;
    photo_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    portfolio_url: string | null;
    summary: string | null;
    created_at: string;
    updated_at: string;
}

export interface IDocument {
    id: number;
    user_id: number;
    name: string;
    type: 'CV' | 'LM';
    file_url: string;
    created_at: string;
    updated_at: string;
}

export interface IProfileFormValues {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    linkedin_url: string;
    github_url: string;
    portfolio_url: string;
    summary: string;
}
