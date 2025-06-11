"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Text } from "~/components/ui/text";
import { Task, TaskFilter } from "~/lib/api/types";
import { useTaskStore } from "~/lib/stores/tasks-store";
import { toastService } from "~/lib/toast/toast-service";
import { AddTaskDialog } from "./AddTaskDialog";
import { TaskFilterControls } from "./TaskFilterControls";
import { TaskList } from "./TaskList";
import { TaskStatsCards } from "./TaskStatsCards";
import { getPriorityColor, getPriorityIcon, isOverdue } from "./utils";

export default function TodoPage() {
  const { t } = useTranslation();
  const {
    addTask: storeAddTask,
    clearCompletedTasks,
    deleteTask,
    editTask,
    tasks,
    toggleTask,
    initializeTasks
  } = useTaskStore();

  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    initializeTasks();
  }, []);

  const handleAddTask = (
    text: string,
    priority: Task["priority"],
    dueDate?: Date
  ) => {
    storeAddTask(text, priority, dueDate);
    // Toast is now handled in AddTaskDialog, but you can add more here if needed
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() !== "" && editingId) {
      editTask(editingId, editText.trim());
      setEditingId(null);
      setEditText("");
      toastService.success(t("tasks.taskEditedSuccess")); // Add translation
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed);
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filter]);

  const activeTasksCount = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks]
  );
  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  return (
    <View className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 dark:bg-neutral-950">
      <View className="flex flex-row justify-between text-center mb-8">
        <View>
          <Text className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {t("tasks.pageTitle")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            {t("tasks.pageSubtitle")}
          </Text>
        </View>
        <AddTaskDialog
          onTaskAdd={handleAddTask}
          isOpen={isAddTaskDialogOpen}
          onOpenChange={setIsAddTaskDialogOpen}
        />
      </View>

      <TaskStatsCards
        t={t}
        totalTasks={tasks.length}
        activeTasks={activeTasksCount}
        completedTasks={completedTasksCount}
      />

      <TaskFilterControls
        t={t}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={() => {
          clearCompletedTasks();
          toastService.info(t("tasks.completedTasksCleared")); // Add translation
        }}
        canClearCompleted={completedTasksCount > 0}
      />

      <TaskList
        t={t}
        tasks={filteredTasks}
        searchTerm={searchTerm}
        editingId={editingId}
        editText={editText}
        onToggleTask={toggleTask}
        onDeleteTask={(id) => {
          deleteTask(id);
          toastService.info(t("tasks.taskDeletedSuccess")); // Add translation
        }}
        onStartEdit={startEditing}
        onEditTextChange={setEditText}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        getPriorityColor={getPriorityColor}
        getPriorityIcon={getPriorityIcon}
        isOverdue={isOverdue}
      />
    </View>
  );
}
