import { Search } from "lucide-react-native";
import { View } from "react-native";
import { TFunction } from "i18next";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TaskFilter } from "~/lib/api/types";

interface TaskFilterControlsProps {
  t: TFunction;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onClearCompleted: () => void;
  canClearCompleted: boolean;
}

export function TaskFilterControls({
  t,
  searchTerm,
  onSearchTermChange,
  filter,
  onFilterChange,
  onClearCompleted,
  canClearCompleted,
}: TaskFilterControlsProps) {
  return (
    <Card className="mb-6 shadow-lg border-gray-200/50 dark:border-neutral-700/50 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm">
      <CardContent className="p-4">
        <View className="flex flex-col sm:flex-row gap-4 items-center">
          <View className="flex-1 w-full sm:min-w-[200px]">
            {" "}
            {/* Adjusted min-width */}
            <View className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <Input
                type="text"
                placeholder={t("tasks.filter.searchPlaceholder")}
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchTermChange(e.target.value)
                }
                className="pl-10 dark:bg-neutral-700 dark:text-gray-200 dark:border-neutral-600"
              />
            </View>
          </View>

          <Tabs
            value={filter}
            onValueChange={(value) => onFilterChange(value as TaskFilter)}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex dark:bg-neutral-700">
              <TabsTrigger
                value="all"
                className="dark:text-gray-300 dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:text-gray-100"
              >
                {t("tasks.filter.all")}
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="dark:text-gray-300 dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:text-gray-100"
              >
                {t("tasks.filter.active")}
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="dark:text-gray-300 dark:data-[state=active]:bg-neutral-600 dark:data-[state=active]:text-gray-100"
              >
                {t("tasks.filter.completed")}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {canClearCompleted && (
            <Button
              variant="outline"
              onClick={onClearCompleted}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:border-red-500/50 dark:hover:bg-red-900/30 w-full sm:w-auto"
            >
              {t("tasks.filter.clearCompletedButton")}
            </Button>
          )}
        </View>
      </CardContent>
    </Card>
  );
}
