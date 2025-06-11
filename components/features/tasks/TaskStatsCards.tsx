import { TFunction } from "i18next";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
// ~/features/tasks/components/TaskStatsCards.tsx
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { useTaskStore } from "~/lib/stores/tasks-store";

interface TaskStatsCardsProps {
  t: TFunction;
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
}

const StatCard = ({
  title,
  value,
  bgColorClass,
  textColorClass,
  borderColorClass,
}: {
  title: string;
  value: number | string;
  bgColorClass: string;
  textColorClass: string;
  borderColorClass: string;
}) => (
  <Card
    className={`${bgColorClass} ${borderColorClass} border dark:border-opacity-50`}
  >
    <CardContent className="p-4 text-center">
      <Text className={`text-2xl font-bold ${textColorClass}`}>{value}</Text>
      <Text className={`text-sm ${textColorClass}`}>{title}</Text>
    </CardContent>
  </Card>
);

export function TaskStatsCards() {
  const { t } = useTranslation();
  const { tasks } = useTaskStore();

  const activeTasksCount = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks]
  );
  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  return (
    <View className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        title={t("tasks.stats.totalTasks")}
        value={tasks.length}
        bgColorClass="bg-blue-50 dark:bg-blue-900/30"
        textColorClass="text-blue-600 dark:text-blue-300"
        borderColorClass="border-blue-200 dark:border-blue-700"
      />
      <StatCard
        title={t("tasks.stats.activeTasks")}
        value={activeTasksCount}
        bgColorClass="bg-orange-50 dark:bg-orange-900/30"
        textColorClass="text-orange-600 dark:text-orange-300"
        borderColorClass="border-orange-200 dark:border-orange-700"
      />
      <StatCard
        title={t("tasks.stats.completedTasks")}
        value={completedTasksCount}
        bgColorClass="bg-green-50 dark:bg-green-900/30"
        textColorClass="text-green-600 dark:text-green-300"
        borderColorClass="border-green-200 dark:border-green-700"
      />
    </View>
  );
}
