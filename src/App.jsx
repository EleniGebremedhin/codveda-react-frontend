import { useState, useEffect } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  // Store the text entered by the user
  const [taskTitle, setTaskTitle] = useState("");

  // Store all the tasks
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Fetch tasks from the backend when the app loads
  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3000/tasks");

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  // Function to add a new task
  async function addTask() {
    if (taskTitle.trim() === "" || isAdding) {
      return;
    }

    try {
      setIsAdding(true);
      setError("");

      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTaskTitle("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAdding(false);
    }
  }
  // Function to mark a task as completed or pending
  async function toggleTask(id) {
    const taskToUpdate = tasks.find((task) => task.id === id);

    if (!taskToUpdate || updatingTaskId !== null) {
      return;
    }

    const updatedStatus = !taskToUpdate.completed;

    try {
      setUpdatingTaskId(id);
      setError("");

      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: updatedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: updatedStatus } : task,
        ),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingTaskId(null);
    }
  }
  // Function to delete a task
  async function deleteTask(id) {
    if (deletingTaskId !== null) {
      return;
    }

    try {
      setDeletingTaskId(id);
      setError("");

      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingTaskId(null);
    }
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
      <TaskForm
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        onAddTask={addTask}
        isAdding={isAdding}
      />

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
        {loading && <p>Loading tasks...</p>}

        {error && <p className="error-message">{error}</p>}

        {tasks.length === 0 ? (
          <p>No tasks yet. Add your first task!</p>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks match your search or filter.</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            updatingTaskId={updatingTaskId}
            deletingTaskId={deletingTaskId}
          />
        )}
      </section>
    </div>
  );
}

export default App;
