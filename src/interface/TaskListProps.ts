import Task from "./Task";

interface TaskListProps {
    tasks: Task[];
    onAddTask: (text: string) => void;
    onDeleteTask: (id: number) => void;
    onToggleComplete: (id: number) => void;
    filter: string;
  }

export default TaskListProps;