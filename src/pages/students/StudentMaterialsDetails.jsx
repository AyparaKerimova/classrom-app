import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMaterialsQuery, useAddCommentMutation } from '../../features/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StudentMaterialDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetMaterialsQuery();
  const [comment, setComment] = useState('');
  const [addComment] = useAddCommentMutation();

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment({ materialId: id, comments: comment }).then(() => {
        setComment('');
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-red-500">Error loading material details!</div>
      </div>
    );

  const materials = data?.find((item) => item.id === id);

  if (!materials) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-500">Material not found!</div>
      </div>
    );
  }

  // Ensure comments are an array
  const comments = Array.isArray(materials.comments) ? materials.comments : [];

  return (
    <div className="min-h-screen w-full bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">{materials.title}</h1>
        <p className="mt-6 text-gray-600 text-lg leading-relaxed">{materials.description}</p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">Likes</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mt-2">
            {materials.likes.length} {materials.likes.length === 1 ? 'like' : 'likes'}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
          {comments.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="text-gray-800 font-medium">User {comment.userId}</div>
                  <p className="mt-2 text-gray-600">{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">No comments available.</p>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6 mt-10">
          <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
          <ReactQuill
            value={comment}
            onChange={setComment}
            placeholder="Add your comment..."
            className="mb-4"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Add Comment
          </button>
        </div>

        <div className="mt-10">
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentMaterialDetails;
