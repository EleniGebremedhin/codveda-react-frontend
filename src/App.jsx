import { useState } from "react";
import "./App.css";

function App() {
  // Store the text entered by the user
  const [taskTitle, setTaskTitle] = useState("");

  // Store all the tasks
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Function to add a new task
  function addTask() {
    if (taskTitle.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
  }
  // Function to mark a task as completed or pending
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
  // Function to delete a task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  // Filter tasks based on their completion status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      {/* Application Header */}
      <header className="header">
        <h1>TaskFlow</h1>
        <p>Manage your tasks efficiently.</p>
      </header>

      {/* Task Creation Form */}
      <section className="task-form">
        <h2>Add a new task</h2>

        <input
          type="text"
          placeholder="Enter your task title..."
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
        />

        <button type="button" onClick={addTask}>
          + Add Task
        </button>
      </section>

      {/* Display Tasks */}
      <section className="task-list">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>All</button>

          <button onClick={() => setFilter("pending")}>Pending</button>

          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <h2>My Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet. Add your first task!</p>
        ) : (
          filteredTasks.map((task) => (
            <div className="task-item" key={task.id}>
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>

              <div className="task-actions">
                <button type="button" onClick={() => toggleTask(task.id)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
