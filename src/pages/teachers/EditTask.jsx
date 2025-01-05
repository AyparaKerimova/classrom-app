import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { editTaskSchema } from "../../validations/task.edit.validation.js";
import { Helmet } from "react-helmet-async";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(`https://fish-distinct-divan.glitch.me/tasks/${id}`);
        if (!resp.ok) throw new Error("Failed to fetch task");
        const result = await resp.json();
        setTask(result);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      topic: task?.topic || "",
      deadline: task?.deadline || "",
    },
    enableReinitialize: true,
    validationSchema: editTaskSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`https://fish-distinct-divan.glitch.me/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error("Failed to update task");

        navigate(`/teachers`); 
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
  });

  const handleEditorChange = (content) => {
    formik.setFieldValue("description", content);
  };

  return (
    <>
      <Helmet>
        <title>Edit Task</title>
      </Helmet>
    <div className="max-w-4xl mx-auto w-full p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-center text-3xl font-bold text-gray-800">Edit Task</h2>

      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Task Description
          </label>
          <Editor
            apiKey="oiofb85x4m90lv02gaiyruzwcgf2ifhqhza9rl9wuvydjj9f"
            initialValue={task?.description || ""}
            init={{
              plugins: "lists advlist autolink",
              toolbar: "undo redo | bold italic | bullist numlist",
              menubar: false,
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.topic}
          />
          {formik.touched.topic && formik.errors.topic && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.topic}</p>
          )}
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deadline}
          />
          {formik.touched.deadline && formik.errors.deadline && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.deadline}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {formik.isSubmitting ? "Updating Task..." : "Update Task"}
        </button>
      </form>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Go back
      </button>
    </div>
    </>
  );
};

export default EditTask;
