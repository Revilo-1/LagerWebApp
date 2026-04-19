"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { MoreHorizontal, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ProductRow } from "./schema";

function formatDKK(amount: number | undefined) {
  if (amount === undefined) return "—";
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function buildProductColumns(onDelete: (id: string) => void): ColumnDef<ProductRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Vælg alle produkter på denne side"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Vælg ${row.original.name}`}
          />
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Produktnavn",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md border bg-muted">
            <Package className="size-4 text-muted-foreground" />
          </span>
          <div className="min-w-0 flex-1">
            <span className="truncate font-medium text-sm leading-none">{row.original.name}</span>
          </div>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "search",
      accessorFn: (row) => `${row.id} ${row.name} ${row.category}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "category",
      header: "Kategori",
      filterFn: "equalsString",
    },
    {
      accessorKey: "addedDate",
      header: "Tilføjet dato",
      cell: ({ row }) => {
        try {
          return format(parseISO(row.original.addedDate), "d. MMM yyyy");
        } catch {
          return row.original.addedDate;
        }
      },
    },
    {
      accessorKey: "costPrice",
      header: "Kostpris",
      cell: ({ row }) => formatDKK(row.original.costPrice),
    },
    {
      accessorKey: "estimatedValue",
      header: "Estimeret værdi",
      cell: ({ row }) => formatDKK(row.original.estimatedValue),
    },
    {
      accessorKey: "soldPrice",
      header: "Salgspris",
      cell: ({ row }) => formatDKK(row.original.soldPrice),
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: "equalsString",
      cell: ({ row }) => {
        const status = row.original.status;
        return <Badge variant={status === "Solgt" ? "default" : "secondary"}>{status}</Badge>;
      },
    },
    {
      id: "handling",
      header: "Handling",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Åbn menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => onDelete(row.original.id)}
            >
              Slet produkt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
    },
  ];
}
