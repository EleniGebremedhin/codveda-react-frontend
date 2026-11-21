function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task-item">
      <span className={task.completed ? "completed" : ""}>{task.title}</span>

      <div className="task-actions">
        <button type="button" onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
