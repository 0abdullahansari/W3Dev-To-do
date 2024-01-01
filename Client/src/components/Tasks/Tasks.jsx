import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import "./Tasks.css";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { v4 } from "uuid";

const Tasks = () => {
  const { state, dispatch } = useStateValue();
  const [taskContent, setTaskContent] = useState("");
  // useEffect(() => {
  //   const update = async () => {
  //     const response = await axios.patch("http://localhost:8080/update", {
  //       email: state.email,
  //       tasks: state.tasks,
  //     });
  //   };
  //   update();
  // }, [state.tasks]);

  // const addTask = async () => {
  //   console.log(state);
  //   const id = v4();
  //   await axios.patch(
  //     "http://localhost:8080/update/add",
  //     {
  //       newtask: {
  //         id: id,
  //         content: taskContent,
  //         pending: true,
  //       },
  //     },
  //     {
  //       withCredentials: true,
  //       credentials: "include",
  //     }
  //   )


  //   dispatch({
  //     type: "ADD_TASK",
  //     id: id,
  //     content: taskContent,
  //   })
  //   setTaskContent("");
  // };

  const addTask = async () => {
    try {
      console.log(state);
      const id = v4();
      const response = await axios.patch(
        "http://localhost:8080/update/add",
        {
          newtask: {
            id: id,
            content: taskContent,
            pending: true,
          },
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
  
      dispatch({
        type: "ADD_TASK",
        id: id,
        content: taskContent,
      });
  
      setTaskContent("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  

  const renderTasks = (pending) =>
    state.tasks
      .filter((task) => task.pending === pending)
      .map((item) => (
        <div key={item.id} className="task-container">
          <Task it={item} />
        </div>
      ));

  return (
    <div className="Tasks">
      <h1>To-do's</h1>
      <div>
        <h2>
          Pending: {state.tasks.filter((task) => task.pending === true).length}
        </h2>
        {renderTasks(true)}
      </div>
      <div>
        <h2>
          Completed:{" "}
          {state.tasks.filter((task) => task.pending === false).length}
        </h2>
        {renderTasks(false)}
      </div>
      <div>
        <input
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          className="task-input"
          placeholder="Add a new task..."
        />
        <button type="button" onClick={addTask} className="task-button">
          ADD
        </button>
      </div>
    </div>
  );
};

export default Tasks;
