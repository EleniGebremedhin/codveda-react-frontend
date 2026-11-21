function TaskItem({
  task,
  onToggle,
  onDelete,
  updatingTaskId,
  deletingTaskId,
}) {
  return (
    <div className="task-item">
      <span className={task.completed ? "completed" : ""}>{task.title}</span>

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          disabled={updatingTaskId !== null}
        >
          {updatingTaskId === task.id
            ? "Updating..."
            : task.completed
              ? "Undo"
              : "Complete"}
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          disabled={deletingTaskId !== null}
        >
          {deletingTaskId === task.id ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
