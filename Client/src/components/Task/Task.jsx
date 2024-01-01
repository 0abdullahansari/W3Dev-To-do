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
    <div className="Task">
      <div className="task-content">
        <input
          type="checkbox"
          checked={!it.pending}
          onChange={handleToggle}
          className="task-checkbox"
        />
        <h4 className={it.pending ? "" : "completed-task"}>{it.content}</h4>
      </div>
      <button className="delete-button" type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Task;
