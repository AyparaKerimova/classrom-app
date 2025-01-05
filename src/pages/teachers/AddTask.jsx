import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { addTaskSchema } from "../../validations/task.add.validation.js";
import { Helmet } from "react-helmet-async";

const AddTask = () => {
  const { teacherId, classId } = useParams();
  const navigate = useNavigate();

  const currentDate = new Date().toISOString().slice(0, 16);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      topic: "",
      deadline: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: async (values) => {
      const newTask = {
        title: values.title,
        description: values.description,
        topic: values.topic,
        deadline: values.deadline,
        classId: classId,
        teacherId: teacherId,
        assignmentIds: [],
        completionRate: 0,
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await fetch(`https://fish-distinct-divan.glitch.me/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          navigate(`/teachers`);
        } else {
          throw new Error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
  });

  const handleEditorChange = (content) => {
    formik.setFieldValue("description", content);
  };

  return (
    <>
      <Helmet>
          <title>Add Task</title>
      </Helmet>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-center text-3xl font-bold text-gray-800">Add New Task</h2>

      <form onSubmit={formik.handleSubmit} className="mt-6 ">
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
            initialValue=""
            init={{
              plugins: "lists advlist autolink",
              toolbar: "undo redo | bold italic | bullist numlist",
              menubar: false,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
            min={currentDate}
          />
          {formik.touched.deadline && formik.errors.deadline && (
            <p className="mt-2 text-sm text-red-600">{formik.errors.deadline}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        >
          {formik.isSubmitting ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddTask;
