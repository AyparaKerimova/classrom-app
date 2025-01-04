import { useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { userRegisterSchema } from '../../validations/user.register.validation.js';
import { useRegisterMutation } from '../../features/api.js'; 

const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "userprofileimage"); 

  const response = await fetch("https://api.cloudinary.com/v1_1/dug3akriz/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; 
};

const Register = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [registerUser] = useRegisterMutation(); 

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      profileImage: null,
      role: "student",
      major: "",
      bio: "",
    },
    validationSchema: userRegisterSchema,
    onSubmit: async (values, actions) => {
      try {
        if (!values.profileImage) {
          throw new Error("Profile image is required.");
        }
  
        const grades = [
          {
            taskId: "", 
            grade: 0, 
          },
        ];
        const overallGrade = 0; 
  
        const profileImageUrl = await uploadImageToCloudinary(values.profileImage);
  
        const userData = {
          ...values,
          profileImage: profileImageUrl,
          grades,
          overallGrade,
        };
  
        await registerUser(userData).unwrap();
  
        actions.resetForm();
        Swal.fire({
          title: "Successfully registered!",
          icon: "success",
          draggable: true,
        });
      } catch (error) {
        Swal.fire({
          title: "Registration failed!",
          icon: "error",
          text: "An error occurred.",
        });
      }
    },
  });

  return (
    <div className="relative h-screen bg-gray-50">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                  />
                  {formik.errors.fullName && formik.touched.fullName && (
                    <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter your username"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                  />
                  {formik.errors.userName && formik.touched.userName && (
                    <div className="text-red-500 text-sm">{formik.errors.userName}</div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => formik.setFieldValue("profileImage", e.target.files[0])}
                />
                {formik.errors.profileImage && formik.touched.profileImage && (
                  <div className="text-red-500 text-sm">{formik.errors.profileImage}</div>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={formik.values.role}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setIsTeacher(e.target.value === "teacher");
                    }}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>

              {isTeacher && (
                <>
                  <div>
                    <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                      Major
                    </label>
                    <div className="mt-1">
                      <input
                        id="major"
                        name="major"
                        type="text"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.major}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows="4"
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={formik.handleChange}
                        value={formik.values.bio}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
