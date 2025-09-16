import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import type { IApplication, IApplicationForm } from "../interfaces/types"
import { addApplication } from "../services/applicationService"
import { toast } from "sonner"

const applicationSchema = Yup.object({
    position: Yup.string().required("Le poste est requis"),
    company: Yup.string().required("L'entreprise est requise"),
    applied_date: Yup.string().required("La date est requise"),
    status: Yup.string().required("Le statut est requis"),
})

export const useApplicationForm = (
    setApplications: React.Dispatch<React.SetStateAction<IApplication[]>>,
    setIsAddingNew: React.Dispatch<React.SetStateAction<boolean>>,
    applications: IApplication[],
    userId: number | null
) => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik<Partial<IApplicationForm>>({
        initialValues: {
            user_id: userId,
            position: "",
            company: "",
            job_url: "",
            applied_date: new Date().toISOString().split("T")[0],
            status: "applied",
            interview_date: null,
            notes: "",
            cv_path: null,
            cover_letter_path: null,
        },
        validationSchema: applicationSchema,
        onSubmit: async (values, { resetForm, setErrors }) => {
            setLoading(true)
            try {
                const result = await addApplication(values)

                if (result.success) {
                    const newApp: IApplication = {
                        id:
                            result.data.data?.id ??
                            (applications.length
                                ? Math.max(...applications.map((a) => a.id)) + 1
                                : 1),
                        user_id: values.user_id ?? 0,
                        position: values.position ?? "",
                        company: values.company ?? "",
                        job_url: values.job_url ?? "",
                        applied_date: values.applied_date ?? new Date().toISOString(),
                        status: values.status ?? "applied",
                        interview_date: values.interview_date ?? null,
                        notes: values.notes ?? "",
                        cv_path: result.data.data?.cv_path ?? null,
                        cover_letter_path: result.data.data?.cover_letter_path ?? null,
                        created_at: result.data.data?.created_at ?? new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    }

                    setApplications((prev) => [...prev, newApp])
                    resetForm()
                    setIsAddingNew(false)

                    toast.success("Candidature ajoutée avec succès !")
                } else {
                    if (result.fieldErrors) {
                        setErrors(result.fieldErrors)
                        toast.error("Veuillez corriger les erreurs du formulaire")
                    } else {
                        toast.error("Échec de l'ajout de la candidature")
                    }
                }
            } catch (err) {
                console.error("Erreur lors de l'ajout", err)
                toast.error("Une erreur est survenue")
            } finally {
                setLoading(false)
            }
        },
    })

    return { formik, loading }
}
