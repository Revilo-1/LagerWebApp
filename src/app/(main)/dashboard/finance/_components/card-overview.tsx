"use client";

import { addDays, format } from "date-fns";
import { da } from "date-fns/locale";
import { Home, Receipt, Sparkles, Zap } from "lucide-react";
import { siApple, siMastercard } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

const now = new Date();

const upcomingPayments = [
  {
    id: 1,
    icon: Home,
    title: "Leje af lejlighed",
    amount: 1200,
    date: `Forfalder ${format(addDays(now, 2), "d. MMMM yyyy", { locale: da })}`,
  },
  {
    id: 2,
    icon: Zap,
    title: "Elregning",
    amount: 75,
    date: `Forfalder ${format(addDays(now, 2), "d. MMMM yyyy", { locale: da })}`,
  },
  {
    id: 3,
    icon: Sparkles,
    title: "ChatGPT Plus",
    amount: 20,
    date: `Forfalder ${format(addDays(now, 7), "d. MMMM yyyy", { locale: da })}`,
  },
  {
    id: 4,
    icon: Receipt,
    title: "Kreditkortbetaling",
    amount: 420,
    date: `Forfalder ${format(addDays(now, 9), "d. MMMM yyyy", { locale: da })}`,
  },
];

export function CardOverview() {
  return (
    <Card className="shadow-xs">
      <CardHeader className="items-center">
        <CardTitle>Mit kort</CardTitle>
        <CardDescription>1 af 4 kort tilfoejet · Overblik over dit primære kort og kommende betalinger</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full place-items-center">
            <div className="relative flex aspect-8/5 w-full max-w-100 flex-col justify-between overflow-hidden rounded-xl bg-primary p-6">
              <div className="flex items-start justify-between">
                <SimpleIcon icon={siApple} className="size-5 fill-primary-foreground sm:size-8" />
              </div>

              <div className="space-y-1">
                <p className="font-mono text-primary-foreground/90 text-sm tracking-[0.15em] sm:text-lg">
                  •••• •••• •••• 2301
                </p>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <p className="font-medium font-mono text-primary-foreground text-sm uppercase tracking-wide">
                    Arham Khan
                  </p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] text-primary-foreground/80 uppercase tracking-wider">Gyldig til</p>
                      <p className="font-mono text-primary-foreground/80 text-xs">06/30</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-foreground/80 uppercase tracking-wider">CVV</p>
                      <p className="font-mono text-primary-foreground/80 text-xs">•••</p>
                    </div>
                  </div>
                </div>
                <SimpleIcon icon={siMastercard} className="size-7 fill-primary-foreground/80 sm:size-10" />
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Korttype</span>
              <span className="font-medium tabular-nums">Virtuelt</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Faktureringscyklus</span>
              <span className="font-medium tabular-nums">21. hver maaned</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Kortgraense</span>
              <span className="font-medium tabular-nums">{formatCurrency(62000)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tilgaengelig saldo</span>
              <span className="font-medium tabular-nums">{formatCurrency(13100.06)}</span>
            </div>
          </div>

          <div className="space-y-1">
            <Button className="w-full" size="sm">
              Administrer kort
            </Button>

            <Button className="w-full" variant="outline" size="sm">
              Tilfoej kort
            </Button>
          </div>
          <Separator />

          <div className="space-y-4">
            <h6 className="text-muted-foreground text-sm uppercase">Kommende betalinger</h6>

            <div className="space-y-4">
              {upcomingPayments.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-2">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <transaction.icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex w-full items-end justify-between">
                    <div>
                      <p className="font-medium text-sm">{transaction.title}</p>
                      <p className="text-muted-foreground text-xs">{transaction.date}</p>
                    </div>
                    <div>
                      <span className="font-medium text-destructive text-sm tabular-nums leading-none">
                        {formatCurrency(transaction.amount, {
                          noDecimals: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full" size="sm" variant="outline">
              Se alle betalinger
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
