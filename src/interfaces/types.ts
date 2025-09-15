export interface IUser {
  id: string
  name: string
  email: string
  avatar?: string | null
}

export interface IApplication {
    id: number;
    user_id: number | null;
    position: string;
    company: string;
    job_url: string | null;
    applied_date: string;
    status: 'applied' | 'interview' | 'rejected' | 'accepted' | 'pending';
    interview_date: string | null;
    notes: string | null;
    cv_path: string | null;
    cover_letter_path: string | null;
    created_at: string;
    updated_at: string;
}