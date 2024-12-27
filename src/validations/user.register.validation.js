import * as Yup from 'yup';

export const userSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    userName: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
    role: Yup.string().required("Role is required"),
    major: Yup.string(),
    bio: Yup.string()
  });
