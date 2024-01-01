import React from "react";
import "./Task.css";
import { useStateValue } from "../../StateProvider";
import axios from "axios";

const Task = ({ it }) => {
  const { dispatch } = useStateValue();

  const handleToggle = async () => {
    try {

       await axios.patch(
        "http://localhost:8080/update/toggle",
        {
          id: it.id,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
  
      dispatch({
        type: "TOGGLE_TASK",
        id: it.id,
      });

    } catch(error) {
      console.log("Error adding task: ,", error)
    }
  };

  const handleDelete = async () => {
    try{
      await axios.patch(
        "http://localhost:8080/update/delete",
        {
          id: it.id,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
  
      dispatch({
        type: "DELETE_TASK",
        id: it.id,
      });
    } catch(error) {
      console.log("Error deleting task:", error)
    }
  };

  return (
    <div className='mb-8 flex flex-row items-center'>
      <div className='mr-4 flex min-w-[232px] flex-row items-center truncate rounded-md border px-3 py-2'>
        <input
          type='checkbox'
          className='form-checkbox mr-4 h-[14px] w-[14px] text-blue-500'
          checked={!it.pending}
          onChange={handleToggle}
          
        />
        <h4 className='font-regular mr-4 truncate text-[15px]'>{it.content}</h4>
      </div>
      <button className='min-h-9 min-w-24 rounded-md bg-black text-sm font-medium text-white' type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Task;
