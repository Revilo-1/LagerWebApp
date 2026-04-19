import type { GenericPageWidgetLayout } from "@/types/widgets";
import type { RegisteredDashboardWidgetId } from "@/widgets/widgets.registry";

export const defaultDashboardWidgetLayout: GenericPageWidgetLayout<RegisteredDashboardWidgetId> = {
  page: "default",
  widgetIds: ["default.metric-cards", "default.performance-overview", "default.subscriber-overview"],
};
