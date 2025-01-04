import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";

const AddGrade = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/assignments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
        return fetch(`http://localhost:3000/users/${data.studentId}`);
      })
      .then((response) => response.json())
      .then((studentData) => setStudent(studentData))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      grade: "",
      feedback: "",
    },
    validationSchema: Yup.object({
      grade: Yup.number()
        .min(0, "Grade must be at least 0")
        .max(100, "Grade cannot exceed 100")
        .required("Grade is required"),
      feedback: Yup.string()
        .max(500, "Feedback must be under 500 characters")
        .required("Feedback is required"),
    }),
    onSubmit: (values) => {
      if (!student || !assignment) {
        return;
      }

      const updatedGrades = [...student.grades];
      const gradeIndex = updatedGrades.findIndex((g) => g.taskId === assignment.taskId);

      if (gradeIndex !== -1) {
        updatedGrades[gradeIndex].grade = values.grade;
      } else {
        updatedGrades.push({ taskId: assignment.taskId, grade: values.grade });
      }

      const updatedStudent = { ...student, grades: updatedGrades };

      fetch(`http://localhost:3000/users/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      })
        .then(() => {
          const updatedAssignment = { ...assignment, feedback: values.feedback };

          return fetch(`http://localhost:3000/assignments/${assignment.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAssignment),
          });
        })
        .then(() => {
          alert("Grade and feedback updated successfully!");
          navigate("/teachers");
        })
        .catch((error) => console.error("Error updating data:", error));
    },
  });

  if (!assignment || !student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Add Grade for {student.fullName}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Assignment: {assignment.id} | Task: {moment(assignment.assignDate).format("MMM Do YY")}
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="grade" className="block text-gray-700">
            Grade (0-100)
          </label>
          <input
            type="number"
            name="grade"
            id="grade"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={formik.values.grade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.grade && formik.errors.grade ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.grade}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-gray-700">
            Feedback
          </label>
          <textarea
            name="feedback"
            id="feedback"
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={formik.values.feedback}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.feedback && formik.errors.feedback ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.feedback}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddGrade;
