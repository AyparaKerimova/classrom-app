import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    fullName: Yup.string().required("full name is required"),
    username: Yup.string().required("username is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string().matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number:"
    ).required("password is required"),
    profileImage:Yup.mixed().required("profile image is required"),
    major:Yup.string().required("major is required"),
    bio:Yup.string(),
    socialLinks:Yup.mixed()
});