import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardWidgetRegistry } from "@/widgets";

function toTitle(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const widgets = Object.values(dashboardWidgetRegistry)
  .map((entry) => ({
    ...entry.meta,
    dashboard: entry.meta.id.split(".")[0],
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="leading-none">Element Library</CardTitle>
          <CardDescription>Central oversigt over genbrugelige dashboard-elementer.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {widgets.map((widget) => (
              <Card key={widget.id} className="shadow-xs">
                <CardHeader>
                  <CardTitle className="leading-none">{widget.label}</CardTitle>
                  <CardDescription>{widget.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-2 pt-0">
                  <Badge variant="secondary">{toTitle(widget.category)}</Badge>
                  <Badge variant="outline">{toTitle(widget.dashboard)}</Badge>
                  <Badge variant="outline">{toTitle(widget.size)}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
