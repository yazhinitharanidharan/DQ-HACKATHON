import { createContext, useContext, useState } from "react";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: "High" | "Normal";
};

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string, priority?: "High" | "Normal") => void;
  toggleTask: (id: number) => void;
  updateTaskPriority: (
    title: string,
    priority: "High" | "Normal"
  ) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (
    title: string,
    priority: "High" | "Normal" = "Normal"
  ) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        completed: false,
        priority,
      },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };
  const updateTaskPriority = (
  title: string,
  priority: "High" | "Normal"
) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.title.toLowerCase() === title.toLowerCase()
        ? { ...task, priority }
        : task
    )
  );
};

  return (
    <TaskContext.Provider
  value={{ tasks, addTask, toggleTask, updateTaskPriority }}
>
      {children}
    </TaskContext.Provider>
  );
  
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
