import * as Yup from "yup";

export const userEditSchema = Yup.object({
      fullName: Yup.string().required("Full name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      profileImage: Yup.mixed(),
      major: Yup.string().required("Major is required"),
      bio: Yup.string().max(100),
      password: Yup.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .when("password", {
          is: (password) => !!password,
          then: Yup.string().required("Confirm password is required"),
        }),
    })