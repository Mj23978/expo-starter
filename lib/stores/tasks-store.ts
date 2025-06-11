import { create } from "zustand";
import { tasksStorage, STORAGE_KEYS } from "../storage"; // Adjust path as needed
import { Task } from "../api/types";

const generateId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

interface TaskStore {
  tasks: Task[];
  isTasksInitialized: boolean;
  initializeTasks: () => Promise<void>;
  addTask: (text: string, priority?: "low" | "medium" | "high" | undefined, dueDate?: Date | undefined) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, newText: string) => void;
  deleteTask: (id: string) => void;
  clearCompletedTasks: () => void;
}

const saveTasksToStorage = (tasks: Task[]) => {
  try {
    tasksStorage.setObject<Task[]>(STORAGE_KEYS.TASKS, tasks);
  } catch (error) {
    console.error("Failed to save tasks to storage:", error);
  }
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isTasksInitialized: false,

  initializeTasks: async () => {
    if (get().isTasksInitialized) return; // Already initialized

    try {
      const loadedTasks = tasksStorage.getObject<Task[]>(STORAGE_KEYS.TASKS, []);
      set({ tasks: loadedTasks, isTasksInitialized: true });
    } catch (error) {
      console.warn("Failed to initialize tasks from storage:", error);
      // Fallback to empty array if parsing fails or any other error
      set({ tasks: [], isTasksInitialized: true });
    }
  },

  addTask: (text: string, priority?: "low" | "medium" | "high" | undefined, dueDate?: Date | undefined) => {
    const newTask: Task = {
      id: generateId(), // Or uuidv4()
      text,
      createdAt: new Date(),
      completed: false,
      priority: priority ?? "low",
      dueDate: dueDate ?? undefined,
    };
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    saveTasksToStorage(updatedTasks);
  },

  toggleTask: (id: string) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.completed } : task
    );
    set({ tasks: updatedTasks });
    saveTasksToStorage(updatedTasks);
  },

  editTask: (id: string, newText: string) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    set({ tasks: updatedTasks });
    saveTasksToStorage(updatedTasks);
  },

  deleteTask: (id: string) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    saveTasksToStorage(updatedTasks);
  },

  clearCompletedTasks: () => {
    const updatedTasks = get().tasks.filter((task) => !task.completed);
    set({ tasks: updatedTasks });
    saveTasksToStorage(updatedTasks);
  },
}));
