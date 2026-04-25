import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { apiFetch } from '../../utils/apiFetch';
import { login,logout } from '../ReduxStore/AuthSlice';
import API_URL from '../../utils/api';
function NotesForm({ setIsshow }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const accessToken = useSelector((state) => state.auth.accessToken);
const dispatch=useDispatch();
  const Handler = async (data) => {
    console.log(data);
    try {
      
      let res = await apiFetch(
        `${API_URL}/addNotes`, 
        dispatch,
        accessToken,
        "POST",
        data,
        login,
        logout
        
      );

      if (!res.ok) {
        throw new Error("notes not add");
      } else {
        setIsshow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Note</h2>
      <form onSubmit={handleSubmit(Handler)} className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="title"
            id="title"
            className="w-full border px-2 py-1 rounded"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            placeholder="content"
            className="w-full border px-2 py-1 rounded"
            {...register("content", { required: true })}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">Content is required</span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setIsshow(false)}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NotesForm;
