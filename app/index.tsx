import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { ScrollView, View } from "react-native";

import TodoPage from "~/components/features/tasks/TodoPage";
import { queryClient } from "~/lib/api/query-client";
import { useAppStore } from "~/lib/stores/app-store";
import { isRTL } from "~/lib/utils";

export default function Screen() {
  const { language } = useAppStore();
  const rtl = isRTL(language);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView className="flex-1 bg-secondary/30">
        <View dir={rtl ? "rtl" : "ltr"} className="flex-1 p-4 gap-6">
          <TodoPage />
        </View>
      </ScrollView>
    </QueryClientProvider>
  );
}
