// ~/features/tasks/components/TaskList.tsx
import { CheckCircle2, IconProps } from "lucide-react-native";
import { ReactElement } from "react";
import { View } from "react-native";
import { TFunction } from "i18next";

import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Task } from "~/lib/api/types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  t: TFunction;
  tasks: Task[];
  searchTerm: string; // To customize empty message
  editingId: string | null;
  editText: string;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onStartEdit: (id: string, text: string) => void;
  onEditTextChange: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  getPriorityColor: (priority: string) => string;
  getPriorityIcon: (
    priority: string,
    iconProps?: IconProps
  ) => ReactElement | null;
  isOverdue: (dueDate?: Date) => boolean;
}

export function TaskList({
  t,
  tasks,
  searchTerm,
  editingId,
  editText,
  onToggleTask,
  onDeleteTask,
  onStartEdit,
  onEditTextChange,
  onSaveEdit,
  onCancelEdit,
  getPriorityColor,
  getPriorityIcon,
  isOverdue,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card className="shadow-lg border-gray-200/50 dark:border-neutral-700/50 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <View className="items-center justify-center mb-2">
            <CheckCircle2 className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </View>
          <Text className="text-gray-500 dark:text-gray-400">
            {searchTerm
              ? t("tasks.taskList.empty.noMatch")
              : t("tasks.taskList.empty.noTasks")}
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <View className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          t={t}
          task={task}
          isEditingThisTask={editingId === task.id}
          editTextForThisTask={editText}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onStartEdit={onStartEdit}
          onEditTextChange={onEditTextChange}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          getPriorityColor={getPriorityColor}
          getPriorityIcon={getPriorityIcon}
          isOverdue={isOverdue}
        />
      ))}
    </View>
  );
}
