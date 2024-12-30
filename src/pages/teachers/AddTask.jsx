import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Tiptap from '../../TipTap';

const AddTask = () => {
  const { teacherId, classId } = useParams();
  const navigate = useNavigate();

  const currentDate = new Date().toISOString().slice(0, 16);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      topic: '',
      deadline: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Task title is required'),
      description: Yup.string().required('Task description is required'),
      topic: Yup.string().required('Topic is required'),
      deadline: Yup.date()
        .min(new Date(), 'Deadline cannot be in the past')
        .required('Deadline is required'),
    }),
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
        const response = await fetch(`http://localhost:3000/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          navigate(`/teachers`);
        } else {
          throw new Error('Failed to add task');
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
  });

  return (
    <div className="add-task-container">
      <h2 className="text-center text-3xl font-thin">Add New Task</h2>

      <form onSubmit={formik.handleSubmit} className="task-form">
        <div className="mt-4">
          <label htmlFor="title" className="block">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="block w-full p-2 mt-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block">Task Description</label>
          <textarea
            id="description"
            name="description"
            className="block w-full p-2 mt-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="topic" className="block">Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            className="block w-full p-2 mt-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.topic}
          />
          {formik.touched.topic && formik.errors.topic && (
            <div className="text-red-500">{formik.errors.topic}</div>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="deadline" className="block">Deadline</label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            className="block w-full p-2 mt-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deadline}
            min={currentDate}  
          />
          {formik.touched.deadline && formik.errors.deadline && (
            <div className="text-red-500">{formik.errors.deadline}</div>
          )}
        </div>
          <Tiptap />
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-4 px-8 py-2 bg-blue-500 text-white rounded-lg"
        >
          {formik.isSubmitting ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
