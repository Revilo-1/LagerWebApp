import type { ComponentType } from "react";

export const DASHBOARD_PAGE_VALUES = ["default", "analytics", "crm", "finance", "productivity"] as const;

export type DashboardPage = (typeof DASHBOARD_PAGE_VALUES)[number];

export const DASHBOARD_WIDGET_CATEGORY_VALUES = ["metrics", "chart", "table", "summary"] as const;

export type DashboardWidgetCategory = (typeof DASHBOARD_WIDGET_CATEGORY_VALUES)[number];

export const DASHBOARD_WIDGET_SIZE_VALUES = ["sm", "md", "lg", "full"] as const;

export type DashboardWidgetSize = (typeof DASHBOARD_WIDGET_SIZE_VALUES)[number];

export type DashboardWidgetId = `${DashboardPage}.${string}`;

export interface DashboardWidgetMeta {
  id: DashboardWidgetId;
  label: string;
  description?: string;
  category: DashboardWidgetCategory;
  size: DashboardWidgetSize;
}

export interface DashboardWidgetDefinition {
  meta: DashboardWidgetMeta;
  component: ComponentType;
}

export interface PageWidgetLayout {
  page: DashboardPage;
  widgetIds: DashboardWidgetId[];
}

export interface GenericPageWidgetLayout<TWidgetId extends string> {
  page: DashboardPage;
  widgetIds: TWidgetId[];
}
