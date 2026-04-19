import { MetricCards } from "@/app/(main)/dashboard/default/_components/metric-cards";
import { PerformanceOverview } from "@/app/(main)/dashboard/default/_components/performance-overview";
import { SubscriberOverview } from "@/app/(main)/dashboard/default/_components/subscriber-overview";
import type { DashboardWidgetDefinition, DashboardWidgetId } from "@/types/widgets";

export const dashboardWidgetRegistry = {
  "default.metric-cards": {
    meta: {
      id: "default.metric-cards",
      label: "Metric Cards",
      description: "Top-level revenue and growth metrics.",
      category: "metrics",
      size: "full",
    },
    component: MetricCards,
  },
  "default.performance-overview": {
    meta: {
      id: "default.performance-overview",
      label: "Performance Overview",
      description: "Customer activity chart for the selected period.",
      category: "chart",
      size: "full",
    },
    component: PerformanceOverview,
  },
  "default.subscriber-overview": {
    meta: {
      id: "default.subscriber-overview",
      label: "Subscriber Overview",
      description: "Recent customers table and export action.",
      category: "table",
      size: "full",
    },
    component: SubscriberOverview,
  },
} satisfies Record<DashboardWidgetId, DashboardWidgetDefinition>;

export type RegisteredDashboardWidgetId = keyof typeof dashboardWidgetRegistry;

export function getDashboardWidget(widgetId: RegisteredDashboardWidgetId): DashboardWidgetDefinition {
  return dashboardWidgetRegistry[widgetId];
}
