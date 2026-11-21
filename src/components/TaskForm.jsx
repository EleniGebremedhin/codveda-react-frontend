function TaskForm({ taskTitle, setTaskTitle, onAddTask, isAdding }) {
  return (
    <section className="task-form">
      <h2>Add a new task</h2>

      <input
        type="text"
        placeholder="Enter your task title..."
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />

      <button type="button" onClick={onAddTask} disabled={isAdding}>
        {isAdding ? "Adding..." : "+ Add Task"}
      </button>
    </section>
  );
}

export default TaskForm;
