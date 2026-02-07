import React, { useEffect, useState } from "react";
import './DashBoard.css'

const DashBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/task/allTask");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= ADD TASK =================
  const addTask = async () => {
    if (!title.trim()) {
      alert("Enter task title");
      return;
    }

    await fetch("http://localhost:8080/task/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  };

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    await fetch(`http://localhost:8080/task/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  // ================= EDIT TASK TITLE =================
  const editTask = async (task) => {
    const newTitle = prompt("Edit Task Title", task.title);
    if (!newTitle || !newTitle.trim()) return;

    await fetch(`http://localhost:8080/task/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        status: task.status ?? "PENDING",
      }),
    });

    fetchTasks();
  };

  // ================= UPDATE TASK STATUS =================
  const updateStatus = async (task, newStatus) => {
    await fetch(`http://localhost:8080/task/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        status: newStatus,
      }),
    });

    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Manager Dashboard</h2>

      {/* ADD TASK */}
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add Task
      </button>

      <hr />

      {/* TASK TABLE */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                No Tasks Found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>

                <td>{task.title}</td>

                <td>
                  <select
                    value={task.status ?? "PENDING"}
                    onChange={(e) =>
                      updateStatus(task, e.target.value)
                    }
                  >
                    <option value="PENDING">Pending</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </td>

                <td>
                  <button onClick={() => editTask(task)}>Edit</button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoard;
