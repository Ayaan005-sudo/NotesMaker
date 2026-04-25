import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotesForm from './NotesForm';
import { logout,login } from '../ReduxStore/AuthSlice';
import { apiFetch } from '../../utils/apiFetch';
import API_URL from '../../utils/api';

function Dashboard() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [isshow, setIsshow] = useState(false);
  const [notes, setNotes] = useState([]);
  const userdata = useSelector((state) => state.auth.userData);
const dispatch=useDispatch();
  const handleSubmit = () => {
    setIsshow(true);
  };

  async function onDelete(id) {
    try {
      
      await apiFetch(
        `${API_URL}/notes/${id}`, 
        dispatch,
        accessToken,
        "DELETE",
       null,
       login,
       logout
      );

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  }

  async function logouthandle(){
let res=await fetch(`${API_URL}/logout`,{
    method:"POST",
    credentials:"include"
});
if(res.ok){
    dispatch(logout());
}

  };

  useEffect(() => {
    async function getNotes() {
      try {
        const res = await apiFetch(
  `${API_URL}/notes`,
  dispatch,
  accessToken,
  "GET",
  null,
  login,
  logout
);
        let data = await res.json();
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    }
    getNotes();
  }, [isshow]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {userdata ? (
        <h1 className="text-2xl font-bold mb-4">Welcome {userdata.name}</h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Not available data</h1>
      )}

      

      {notes.length === 0 && (
        <p className="text-gray-600 mb-4">
          You can add notes by clicking on Add Note
        </p>
      )}
      <div className='flex flex-row gap-10'>
 <button
        type="button"
        onClick={logouthandle}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Logout
      </button>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Add Note
      </button>
      </div>
    

      {isshow && <NotesForm setIsshow={setIsshow} />}

      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note._id}
            className="border rounded p-3 bg-gray-50 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-700">{note.content}</p>
            </div>
            <button
              type="button"
              onClick={() => onDelete(note._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
