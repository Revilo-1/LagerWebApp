import { getDashboardWidget } from "@/widgets";

import { defaultDashboardWidgetLayout } from "../_widgets/default.widgets";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      {defaultDashboardWidgetLayout.widgetIds.map((widgetId) => {
        const Widget = getDashboardWidget(widgetId).component;

        return <Widget key={widgetId} />;
      })}
    </div>
  );
}
