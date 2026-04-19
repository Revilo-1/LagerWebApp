"use client";

import * as React from "react";

import { supabaseClient } from "@/lib/supabase/client";

import { InventoryMetricCards } from "./_components/inventory-metric-cards";
import { InventoryTable } from "./_components/inventory-table";
import type { ProductRow } from "./_components/schema";

type ProductDbRow = {
  id: string;
  name: string;
  category: string;
  added_date: string;
  cost_price: number | string | null;
  estimated_value: number | string;
  sold_price: number | string | null;
  status: string;
  description: string;
};

function toNumber(value: number | string | null | undefined): number | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function mapDbRowToProduct(row: ProductDbRow): ProductRow {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    addedDate: row.added_date,
    costPrice: toNumber(row.cost_price),
    estimatedValue: toNumber(row.estimated_value) ?? 0,
    soldPrice: toNumber(row.sold_price),
    status: row.status === "Solgt" ? "Solgt" : "Opslåt",
    description: row.description,
  };
}

function mapProductToDbRow(product: ProductRow): ProductDbRow {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    added_date: product.addedDate,
    cost_price: product.costPrice ?? null,
    estimated_value: product.estimatedValue,
    sold_price: product.soldPrice ?? null,
    status: product.status,
    description: product.description,
  };
}

export default function Page() {
  const [products, setProducts] = React.useState<ProductRow[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchProducts = React.useCallback(async () => {
    const { data, error } = await supabaseClient
      .from("products")
      .select("id,name,category,added_date,cost_price,estimated_value,sold_price,status,description")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[supabase] Failed to load products", error);
      return;
    }

    setProducts((data as ProductDbRow[]).map(mapDbRowToProduct));
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    async function loadInitialProducts() {
      await fetchProducts();

      if (isMounted) {
        setIsLoading(false);
      }
    }

    loadInitialProducts();

    return () => {
      isMounted = false;
    };
  }, [fetchProducts]);

  async function handleAddProduct(product: ProductRow) {
    const { error } = await supabaseClient.from("products").insert(mapProductToDbRow(product));

    if (error) {
      console.error("[supabase] Failed to add product", error);
      return;
    }

    await fetchProducts();
  }

  async function handleDeleteProduct(id: string) {
    const { error } = await supabaseClient.from("products").delete().eq("id", id);

    if (error) {
      console.error("[supabase] Failed to delete product", error);
      return;
    }

    await fetchProducts();
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <InventoryMetricCards products={products} />
      <InventoryTable products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />
      {isLoading ? <p className="text-muted-foreground text-sm">Indlæser produkter...</p> : null}
    </div>
  );
}
