"use client";
"use no memo";

import * as React from "react";

import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { AddProductDialog } from "./add-product-dialog";
import { buildProductColumns } from "./columns";
import { PRODUCT_CATEGORY_OPTIONS, type ProductRow } from "./schema";

const sortOptions = [
  { value: "newest", label: "Nyeste først" },
  { value: "oldest", label: "Ældste først" },
  { value: "price-asc", label: "Pris: Lav til høj" },
  { value: "price-desc", label: "Pris: Høj til lav" },
] as const;

interface InventoryTableProps {
  products: ProductRow[];
  onAddProduct: (product: ProductRow) => void;
  onDeleteProduct: (id: string) => void;
}

export function InventoryTable({ products, onAddProduct, onDeleteProduct }: InventoryTableProps) {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "addedDate", desc: true }]);
  const [columnVisibility] = React.useState<VisibilityState>({
    search: false,
  });
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = React.useMemo(() => buildProductColumns(onDeleteProduct), [onDeleteProduct]);

  const table = useReactTable({
    data: products,
    columns,
    state: { columnFilters, sorting, columnVisibility, pagination },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const searchQuery = (table.getColumn("search")?.getFilterValue() as string) ?? "";
  const categoryFilter = (table.getColumn("category")?.getFilterValue() as string) ?? "all";

  const sortValue = React.useMemo(() => {
    const s = sorting[0];
    if (!s) return "newest";
    if (s.id === "addedDate" && s.desc) return "newest";
    if (s.id === "addedDate" && !s.desc) return "oldest";
    if (s.id === "estimatedValue" && !s.desc) return "price-asc";
    if (s.id === "estimatedValue" && s.desc) return "price-desc";
    return "newest";
  }, [sorting]);

  function handleSortChange(value: string) {
    const nextSort: SortingState =
      value === "oldest"
        ? [{ id: "addedDate", desc: false }]
        : value === "price-asc"
          ? [{ id: "estimatedValue", desc: false }]
          : value === "price-desc"
            ? [{ id: "estimatedValue", desc: true }]
            : [{ id: "addedDate", desc: true }];
    setSorting(nextSort);
    table.setPageIndex(0);
  }

  const { pageIndex, pageSize } = table.getState().pagination;
  const filteredCount = table.getFilteredRowModel().rows.length;
  const firstRow = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
  const lastRow = Math.min((pageIndex + 1) * pageSize, filteredCount);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-medium text-base leading-snug">Varelager</CardTitle>
          <CardDescription>Oversigt over dit lager</CardDescription>
          <CardAction>
            <Button size="sm" onClick={() => setAddDialogOpen(true)}>
              <Plus />
              Tilføj produkt
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Søg efter produkter..."
                value={searchQuery}
                onChange={(e) => {
                  table.getColumn("search")?.setFilterValue(e.target.value || undefined);
                  table.setPageIndex(0);
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {sortOptions.find((o) => o.value === sortValue)?.label ?? "Sortering"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuRadioGroup value={sortValue} onValueChange={handleSortChange}>
                    {sortOptions.map((opt) => (
                      <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Select
                value={categoryFilter}
                onValueChange={(v) => {
                  table.getColumn("category")?.setFilterValue(v === "all" ? undefined : v);
                  table.setPageIndex(0);
                }}
              >
                <SelectTrigger size="sm" className="w-36">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kategori</SelectLabel>
                    <SelectItem value="all">Alle kategorier</SelectItem>
                    {PRODUCT_CATEGORY_OPTIONS.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Download />
                Eksporter
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border bg-card">
            <Table>
              <TableHeader className="bg-muted/15">
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan} className="h-11 p-3 font-medium">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-3 align-middle">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                      Ingen produkter fundet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-1 text-muted-foreground text-sm">
            <span>
              Viser {firstRow} til {lastRow} af {filteredCount} produkter
            </span>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="varelager-rows-per-page" className="font-medium text-sm">
                  Rækker per side
                </Label>
                <Select value={`${pageSize}`} onValueChange={(v) => table.setPageSize(Number(v))}>
                  <SelectTrigger size="sm" className="w-20" id="varelager-rows-per-page">
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    <SelectGroup>
                      {[10, 20, 30, 50].map((n) => (
                        <SelectItem key={n} value={`${n}`}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Gå til første side</span>
                <ChevronsLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="size-4" />
                Forrige
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Næste
                <ChevronRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Gå til sidste side</span>
                <ChevronsRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddProductDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onAdd={onAddProduct} />
    </>
  );
}
