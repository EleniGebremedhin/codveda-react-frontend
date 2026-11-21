import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggle,
  onDelete,
  updatingTaskId,
  deletingTaskId,
}) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          updatingTaskId={updatingTaskId}
          deletingTaskId={deletingTaskId}
        />
      ))}
    </div>
  );
}

export default TaskList;
