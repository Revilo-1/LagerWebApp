import { DollarSign, Package, PieChart } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import type { ProductRow } from "./schema";

function formatDKK(amount: number) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(amount);
}

interface InventoryMetricCardsProps {
  products: ProductRow[];
}

export function InventoryMetricCards({ products }: InventoryMetricCardsProps) {
  const soldCount = products.filter((p) => p.status === "Solgt").length;
  const totalSales = products
    .filter((p) => p.status === "Solgt")
    .reduce((sum, p) => sum + (p.soldPrice ?? p.estimatedValue), 0);
  const estimatedValue = products.filter((p) => p.status === "Opslåt").reduce((sum, p) => sum + p.estimatedValue, 0);

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <Package className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Solgte</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{soldCount}</div>
          <p className="text-muted-foreground text-sm">Enheder</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <DollarSign className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Samlet salg</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{formatDKK(totalSales)}</div>
          <p className="text-muted-foreground text-sm">Siden start</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <PieChart className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Estimeret værdi</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">
            {formatDKK(estimatedValue)}
          </div>
          <p className="text-muted-foreground text-sm">Af ikke solgte enheder</p>
        </CardContent>
      </Card>
    </div>
  );
}
