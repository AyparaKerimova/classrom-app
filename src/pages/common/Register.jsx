import { useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { userRegisterSchema } from "../../validations/user.register.validation.js";
import { useRegisterMutation } from "../../features/api.js";

const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "userprofileimage");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dug3akriz/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

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
        const overallGrade =
          values.grades && values.grades.length > 0
            ? values.grades.reduce((sum, item) => sum + item.grade, 0) /
            values.grades.length
            : 0;

        const profileImageUrl = await uploadImageToCloudinary(
          values.profileImage
        );

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
    <div className="relative bg-gray-50 ">
      <div
        className="absolute top-20 left-2 w-[500px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob">
      </div>
      <div
        className="absolute top-20 right-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000">
      </div>
      <div
        className="hidden xl:block absolute bottom-10 left-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
      </div>
      <div
        className="absolute bottom-10 right-52 w-[500px] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
      </div>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg
            width={100}
            className="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              imageRendering: "optimizeQuality",
              fillRule: "evenodd",
              clipRule: "evenodd",
            }}
            viewBox="0 0 1706.66 1706.66"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <style type="text/css">
                {`
            .fil1 {fill:#000066;}
            .fil2 {fill:#DADADA;}
            .fil0 {fill:#FF6600;}
          `}
              </style>

            </defs>
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"></metadata>
              <path className="fil0" d="M1103.9 552.57c-11.04,0 -20,-8.96 -20,-20l0 -213.74c0,-127.13 -103.43,-230.58 -230.58,-230.58 -127.15,0 -230.58,103.43 -230.58,230.58l0 213.74c0,26.33 -40,26.33 -40,0l0 -213.74c0,-149.19 121.37,-270.56 270.56,-270.56 149.19,0 270.58,121.37 270.58,270.56l0 213.74c0.02,11.06 -8.94,20 -19.98,20zm-66.67 0c-11.04,0 -20,-8.96 -20,-20l0 -213.74c0,-90.37 -73.53,-163.91 -163.91,-163.91 -90.37,0 -163.91,73.53 -163.91,163.91l0 213.74c0,26.33 -40,26.33 -40,0l0 -213.74c0,-112.44 91.47,-203.91 203.91,-203.91 112.44,0 203.93,91.46 203.93,203.91l0 213.74c0,11.06 -8.97,20 -20.02,20z"></path>
              <path className="fil1" d="M1627.87 1658.4l-1549.09 0c-43.43,0 -78.76,-35.35 -78.76,-78.78l0 -418.01c0,-43.44 35.33,-78.79 78.76,-78.79l1549.09 0.01c43.43,0 78.78,35.35 78.78,78.79l0 418.01c-0.01,43.43 -35.34,78.77 -78.78,78.77zm-1549.09 -535.56c-21.37,0 -38.78,17.39 -38.78,38.78l0 418.01c0,21.37 17.39,38.77 38.78,38.77l1549.09 0c21.38,0 38.77,-17.39 38.77,-38.77l0 -418.01c0,-21.39 -17.39,-38.78 -38.77,-38.78l-1549.09 0z"></path>
              <path className="fil0" d="M452.6 1477.52c-5.12,0 -10.24,-1.96 -14.14,-5.87l-173.8 -173.8c-18.63,-18.63 9.67,-46.92 28.28,-28.29l173.8 173.8c12.63,12.63 3.53,34.16 -14.14,34.16z"></path>
              <path className="fil0" d="M278.8 1477.52c-17.63,0 -26.79,-21.52 -14.14,-34.16l173.8 -173.78c18.63,-18.65 46.89,9.7 28.28,28.3l-173.8 173.8c-3.89,3.9 -9.01,5.84 -14.14,5.84z"></path>
              <path className="fil0" d="M365.72 1513.51c-11.04,0 -20,-8.97 -20,-20l0 -245.79c0,-26.33 40,-26.32 40,0l0 245.79c0,11.04 -8.96,20 -20,20z"></path>
              <path className="fil0" d="M777.68 1477.52c-5.12,0 -10.24,-1.96 -14.13,-5.87l-173.8 -173.8c-18.64,-18.64 9.68,-46.91 28.28,-28.29l173.8 173.8c12.65,12.65 3.51,34.16 -14.14,34.16z"></path>
              <path className="fil0" d="M603.89 1477.52c-17.63,0 -26.79,-21.52 -14.13,-34.16l173.8 -173.8c18.65,-18.65 46.89,9.7 28.28,28.29l-173.8 173.8c-3.92,3.92 -9.03,5.87 -14.14,5.87z"></path>
              <path className="fil0" d="M690.78 1513.51c-11.04,0 -20,-8.97 -20,-20l0 -245.79c0,-26.33 40,-26.32 40,0l0 245.79c0,11.04 -8.94,20 -20,20z"></path>
              <path className="fil0" d="M1102.76 1477.52c-5.11,0 -10.23,-1.96 -14.15,-5.87l-173.82 -173.8c-18.65,-18.64 9.7,-46.91 28.3,-28.29l173.81 173.8c12.65,12.65 3.51,34.16 -14.14,34.16z"></path>
              <path className="fil0" d="M928.94 1477.52c-17.64,0 -26.81,-21.51 -14.15,-34.16l173.82 -173.8c18.65,-18.65 46.91,9.7 28.3,28.29l-173.82 173.8c-3.89,3.92 -9.04,5.87 -14.14,5.87z"></path>
              <path className="fil0" d="M1015.86 1513.51c-11.04,0 -20,-8.97 -20,-20l0 -245.79c0,-26.33 40,-26.32 40,0l0 245.79c0.02,11.04 -8.95,20 -20,20z"></path>
              <path className="fil0" d="M1427.82 1477.52c-5.11,0 -10.24,-1.96 -14.15,-5.87l-173.8 -173.8c-18.65,-18.64 9.69,-46.91 28.29,-28.29l173.8 173.8c12.64,12.64 3.52,34.16 -14.14,34.16z"></path>
              <path className="fil0" d="M1254.04 1477.52c-17.64,0 -26.81,-21.51 -14.15,-34.16l173.8 -173.8c18.65,-18.65 46.91,9.7 28.3,28.29l-173.8 173.8c-3.91,3.92 -9.04,5.87 -14.14,5.87z"></path>
              <path className="fil0" d="M1340.92 1513.51c-11.04,0 -20,-8.97 -20,-20l0 -245.79c0,-26.33 40,-26.32 40,0l0 245.79c0.02,11.04 -8.96,20 -20,20z"></path>
              <path className="fil1" d="M1113.57 1122.84l-520.5 0c-42.22,0 -76.56,-34.36 -76.56,-76.57l0 -457.13c0,-42.22 34.34,-76.56 76.56,-76.56l520.5 -0.01c42.22,0 76.58,34.35 76.58,76.57l0 457.15c-0.01,42.21 -34.37,76.56 -76.59,76.56zm-520.5 -570.27c-20.17,0 -36.57,16.41 -36.57,36.57l0 457.15c0,20.15 16.41,36.56 36.57,36.56l520.5 0c20.17,0 36.57,-16.4 36.57,-36.56l0.01 -457.14c0,-20.17 -16.41,-36.57 -36.57,-36.57l-520.51 -0z"></path>
              <path className="fil0" d="M853.32 850.61c-104.41,0 -104.41,-158.66 0,-158.66 104.43,0 104.43,158.66 0,158.66zm0 -118.67c-51.76,0 -51.77,78.68 0,78.68 51.76,0 51.77,-78.68 0,-78.68z"></path>
              <path className="fil0" d="M853.32 943.48c-11.04,0 -20,-8.97 -20,-20l0 -92.88c0,-26.33 40,-26.33 40,0l0 92.88c0,11.04 -8.96,20 -20,20z"></path>
              <path className="fil2" d="M78.78 1122.84c-21.37,0 -38.78,17.39 -38.78,38.78l0 418.01c0,21.37 17.39,38.77 38.78,38.77l18.11 0 0 -373.13c0,-43.44 35.33,-78.79 78.76,-78.79l1490.99 0.01 0 -4.87c0,-21.39 -17.39,-38.78 -38.77,-38.78l-514.3 0 -520.5 0 -514.3 0z"></path>
            </g>
          </svg>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
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
                    <div className="text-red-500 text-sm">
                      {formik.errors.fullName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
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
                    <div className="text-red-500 text-sm">
                      {formik.errors.userName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
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
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
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
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) =>
                    formik.setFieldValue("profileImage", e.target.files[0])
                  }
                />
                {formik.errors.profileImage && formik.touched.profileImage && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.profileImage}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
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
                    <label
                      htmlFor="major"
                      className="block text-sm font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
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
