import * as Yup from "yup";

export const studentGradeSchema = Yup.object({
      grade: Yup.number()
        .min(0, "Grade must be at least 0")
        .max(100, "Grade cannot exceed 100")
        .required("Grade is required"),
      feedback: Yup.string()
        .max(500, "Feedback must be under 500 characters")
        .required("Feedback is required"),
    })