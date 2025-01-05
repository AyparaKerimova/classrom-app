import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { userEditSchema } from "../../validations/user.edit.validation";
import { Helmet } from 'react-helmet-async';

const TeacherEditPage = () => {
  const [teacher, setTeacher] = useState(null);
  const teacherId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (teacherId) {
      fetch(`https://fish-distinct-divan.glitch.me/users/${teacherId}`)
        .then((response) => response.json())
        .then((data) => setTeacher(data))
        .catch((error) => console.error("Error fetching teacher:", error));
    } else {
      console.error("Teacher ID is not found in localStorage!");
    }
  }, [teacherId]);
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "userprofileimage");
    formData.append("cloud_name", "dug3akriz");

    const response = await fetch(`https://api.cloudinary.com/v1_1/dug3akriz/image/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }
  
      const data = await response.json();
      return data.secure_url;
    };
  const formik = useFormik({
    initialValues: {
      fullName: teacher?.fullName || "",
      username: teacher?.username || "",
      email: teacher?.email || "",
      profileImage: teacher?.profileImage || "",
      major: teacher?.major || "",
      bio: teacher?.bio || "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: userEditSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let profileImageUrl = teacher.profileImage;

        if (values.profileImage instanceof File) {
          profileImageUrl = await uploadImageToCloudinary(values.profileImage);
        }

        const updatedTeacher = {
          ...teacher,
          ...values,
          profileImage: profileImageUrl,
          password: values.password ? values.password : undefined,
        };

        const response = await fetch(
          `https://fish-distinct-divan.glitch.me/users/${teacherId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTeacher),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update teacher");
        }

        const data = await response.json();
        setTeacher(data);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating teacher:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!teacher) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
          <title>Profile Edit</title>
      </Helmet>
    <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg p-8">
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-10 text-center font-bold">Contact Us</div>
        <div className="mt-3 text-center text-4xl font-bold">
          Make an Appointment
        </div>

        <div className="flex gap-4 mt-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="error text-red-500">{formik.errors.fullName}</div>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username *"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="error text-red-500">{formik.errors.username}</div>
          )}
        </div>

        <div className="my-6 flex gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email *"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error text-red-500">{formik.errors.email}</div>
          )}

          <input
            type="file"
            name="profileImage"
            onChange={(e) =>
              formik.setFieldValue("profileImage", e.target.files[0])
            }
          />
          {formik.touched.profileImage && formik.errors.profileImage && (
            <div className="error text-red-500">
              {formik.errors.profileImage}
            </div>
          )}
        </div>

        <div className="my-6 flex gap-4">
          <input
            type="text"
            name="major"
            placeholder="Major *"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={formik.values.major}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.major && formik.errors.major && (
            <div className="error text-red-500">{formik.errors.major}</div>
          )}

          <textarea
            name="bio"
            placeholder="Bio"
            className="block w-full h-40 rounded-md border border-slate-300 p-5 placeholder:font-semibold text-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bio && formik.errors.bio && (
            <div className="error text-red-500">{formik.errors.bio}</div>
          )}
        </div>

        <div className="flex gap-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error text-red-500">{formik.errors.password}</div>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error text-red-500">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white hover:bg-blue-800 transition"
          >
            {formik.isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default TeacherEditPage;
