import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardWidgetRegistry } from "@/widgets";

const CATEGORY_TITLES: Record<string, string> = {
  metrics: "Metrikker",
  chart: "Graf",
  table: "Tabel",
};

const SIZE_TITLES: Record<string, string> = {
  full: "Fuld bredde",
  half: "Halv bredde",
};

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
          <CardTitle className="leading-none">Elementbibliotek</CardTitle>
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
                  <Badge variant="secondary">{CATEGORY_TITLES[widget.category] ?? toTitle(widget.category)}</Badge>
                  <Badge variant="outline">{toTitle(widget.dashboard)}</Badge>
                  <Badge variant="outline">{SIZE_TITLES[widget.size] ?? toTitle(widget.size)}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
