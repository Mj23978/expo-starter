import { AlertCircle, Clock, Circle, IconProps } from "lucide-react-native";
import { ReactElement } from "react";

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50";
    case "low":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600/50";
  }
};

export const getPriorityIcon = (
  priority: string,
  iconProps?: IconProps
): ReactElement | null => {
  const defaultProps: IconProps = { className: "w-3 h-3", ...iconProps };
  switch (priority) {
    case "high":
      return <AlertCircle {...defaultProps} />;
    case "medium":
      return <Clock {...defaultProps} />;
    case "low":
      return <Circle {...defaultProps} />;
    default:
      return null;
  }
};

export const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  // Ensure time is not a factor for "overdue today"
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return today > due;
};
