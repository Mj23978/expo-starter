"use client";

import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { TFunction } from "i18next";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"; // ASSUMED COMPONENT
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import { TaskPriority } from "~/lib/api/types";
import { toastService } from "~/lib/toast/toast-service";
import { useTranslation } from "react-i18next";

interface AddTaskDialogProps {
  onTaskAdd: (text: string, priority: TaskPriority, dueDate?: Date) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskDialog({
  onTaskAdd,
  isOpen,
  onOpenChange,
}: AddTaskDialogProps) {
    const { t } = useTranslation();
  
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] =
    useState<TaskPriority>("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>();

  const handleAddTask = () => {
    if (newTaskText.trim() !== "") {
      onTaskAdd(newTaskText.trim(), newTaskPriority, newTaskDueDate);
      setNewTaskText("");
      setNewTaskPriority("medium");
      setNewTaskDueDate(undefined);
      toastService.success(t("tasks.taskAddedSuccess"));
      onOpenChange(false); // Close dialog on success
    } else {
      toastService.error(t("tasks.addTask.emptyTaskError")); // Optional: Add translation for empty task
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle className="text-gray-800 dark:text-gray-100">
            {t("tasks.addTask.title")}
          </DialogTitle>
        </DialogHeader>
        <View className="space-y-4 py-4">
          <Input
            placeholder={t("tasks.addTask.inputPlaceholder")}
            value={newTaskText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTaskText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && handleAddTask()
            }
            className="dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700"
          />

          <View className="flex flex-col sm:flex-row gap-4">
            <View className="flex-1 space-y-1">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("tasks.addTask.priorityLabel")}
              </Text>
              <Select
                value={newTaskPriority}
                onValueChange={(value: TaskPriority) =>
                  setNewTaskPriority(value)
                }
              >
                <SelectTrigger className="w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-200">
                  <SelectValue
                    placeholder={t(`tasks.priority.${newTaskPriority}`)}
                  />
                </SelectTrigger>
                <SelectContent className="dark:bg-neutral-800 dark:border-neutral-700">
                  <SelectItem
                    value="low"
                    label={t("tasks.priority.low")}
                    className="dark:text-gray-200 dark:focus:bg-neutral-700"
                  >
                    {t("tasks.priority.low")}
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    label={t("tasks.priority.medium")}
                    className="dark:text-gray-200 dark:focus:bg-neutral-700"
                  >
                    {t("tasks.priority.high")}
                  </SelectItem>
                  <SelectItem
                    value="high"
                    label={t("tasks.priority.high")}
                    className="dark:text-gray-200 dark:focus:bg-neutral-700"
                  >
                    {t("tasks.priority.high")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </View>

            <View className="flex-1 space-y-1">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("tasks.addTask.dueDateLabel")}
              </Text>
              <View className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                      {newTaskDueDate
                        ? format(newTaskDueDate, "MMM dd, yyyy")
                        : t("tasks.addTask.selectDateButton")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 dark:bg-neutral-800 dark:border-neutral-700">
                    <Calendar
                      mode="single"
                      selected={newTaskDueDate}
                      onSelect={setNewTaskDueDate}
                      initialFocus
                      // Assuming Calendar component handles its own dark mode theming
                    />
                  </PopoverContent>
                </Popover>
                {newTaskDueDate && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setNewTaskDueDate(undefined)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </View>
            </View>
          </View>
        </View>
        <DialogFooter className="dark:border-t dark:border-neutral-800 pt-4">
          <Button
            variant="outline"
            onPress={() => onOpenChange(false)}
            className="dark:text-gray-200 dark:border-neutral-700 dark:hover:bg-neutral-700"
          >
            {t("common.cancel")}
          </Button>
          <Button
            onPress={handleAddTask}
            className="dark:bg-primary dark:text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("tasks.addTask.addButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
