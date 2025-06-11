import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  Edit3,
  Trash2,
  X,
  IconProps,
} from "lucide-react-native";
import { ReactElement } from "react";
import { View } from "react-native";
import { TFunction } from "i18next";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Task } from "~/lib/api/types";

interface TaskItemProps {
  t: TFunction;
  task: Task;
  isEditingThisTask: boolean;
  editTextForThisTask: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
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

export function TaskItem({
  t,
  task,
  isEditingThisTask,
  editTextForThisTask,
  onToggle,
  onDelete,
  onStartEdit,
  onEditTextChange,
  onSaveEdit,
  onCancelEdit,
  getPriorityColor,
  getPriorityIcon,
  isOverdue,
}: TaskItemProps) {
  const overdue = isOverdue(task.dueDate);

  return (
    <Card
      className={`shadow-lg border-gray-200/50 dark:border-neutral-700/50 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm transition-all duration-200 hover:shadow-xl 
        ${task.completed ? "opacity-60 dark:opacity-50" : ""} 
        ${
          overdue && !task.completed
            ? "ring-2 ring-red-400 dark:ring-red-600/70"
            : ""
        }`}
    >
      <CardContent className="p-4">
        <View className="flex flex-row items-start sm:items-center gap-3">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1.5 sm:mt-0 dark:border-neutral-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />

          <View className="flex-1 min-w-0">
            {isEditingThisTask ? (
              <View className="flex flex-col sm:flex-row gap-2 items-center">
                <Input
                  value={editTextForThisTask}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onEditTextChange(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") onSaveEdit();
                    if (e.key === "Escape") onCancelEdit();
                  }}
                  className="flex-1 w-full dark:bg-neutral-700 dark:text-gray-200 dark:border-neutral-600"
                  autoFocus
                />
                <View className="flex flex-row gap-1 self-end sm:self-center">
                  <Button
                    size="sm"
                    onClick={onSaveEdit}
                    className="dark:bg-green-600 dark:hover:bg-green-500"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onCancelEdit}
                    className="dark:text-gray-200 dark:border-neutral-600 dark:hover:bg-neutral-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </View>
              </View>
            ) : (
              <View className="space-y-1.5">
                <View className="flex flex-col sm:flex-row sm:items-center gap-x-2 gap-y-1 flex-wrap">
                  <Text
                    className={`text-base sm:text-lg ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {task.text}
                  </Text>
                  <Badge
                    variant="outline" // Use outline variant for better default styling control
                    className={`text-xs ${getPriorityColor(
                      task.priority
                    )} px-1.5 py-0.5`}
                  >
                    <Text className="flex items-center gap-1 font-medium">
                      {getPriorityIcon(task.priority, { className: "w-3 h-3" })}
                      {t(`tasks.priority.${task.priority}`)}
                    </Text>
                  </Badge>
                </View>

                <View className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                  <Text>
                    {t("tasks.taskItem.createdDate", {
                      date: format(task.createdAt, "PP"), // PP for localized date
                    })}
                  </Text>
                  {task.dueDate && (
                    <Text
                      className={`flex items-center gap-1 ${
                        overdue && !task.completed
                          ? "text-red-600 dark:text-red-400 font-semibold"
                          : ""
                      }`}
                    >
                      <CalendarIcon className="w-3 h-3" />
                      {t("tasks.taskItem.dueDate", {
                        date: format(task.dueDate, "PP"),
                      })}
                      {overdue && !task.completed && (
                        <Text className="font-semibold ml-1">
                          ({t("tasks.taskItem.overdue")})
                        </Text>
                      )}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>

          {/* Actions - ensure they don't overlap with edit form */}
          {!isEditingThisTask && (
            <View className="flex flex-row gap-0.5 sm:gap-1 ml-auto shrink-0">
              <Button
                size="icon" // Made icon for smaller footprint
                variant="ghost"
                onClick={() => onStartEdit(task.id, task.text)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                size="icon" // Made icon for smaller footprint
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </View>
          )}
        </View>
      </CardContent>
    </Card>
  );
}
