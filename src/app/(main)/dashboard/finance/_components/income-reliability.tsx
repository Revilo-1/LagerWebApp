"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export function IncomeReliability() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indkomststabilitet</CardTitle>
        <CardDescription>Hvor stabil din indkomst har vaeret pa det seneste.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-0.5">
          <p className="font-medium text-xl">Hoj stabilitet</p>
          <p className="text-muted-foreground text-xs">Baseret pa de sidste 6 maaneders indkomst</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">Fast indkomst</p>
            <p className="text-muted-foreground text-xs">Tilbagevendende · Forudsigelig</p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(90000, { noDecimals: true })}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">Variabel indkomst</p>
            <p className="text-muted-foreground text-xs">Svingende kilder</p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(46500, { noDecimals: true })}</p>
        </div>
        <Separator />
        <p className="text-muted-foreground text-xs">
          Stabilitetstrend: <span className="font-medium text-primary">Stabil</span>
        </p>
      </CardContent>
    </Card>
  );
}
