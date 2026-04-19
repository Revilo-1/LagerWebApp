"use client";

import * as React from "react";

import { InventoryMetricCards } from "./_components/inventory-metric-cards";
import { InventoryTable } from "./_components/inventory-table";
import type { ProductRow } from "./_components/schema";

export default function Page() {
  const [products, setProducts] = React.useState<ProductRow[]>([]);

  function handleAddProduct(product: ProductRow) {
    setProducts((prev) => [product, ...prev]);
  }

  function handleDeleteProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <InventoryMetricCards products={products} />
      <InventoryTable products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />
    </div>
  );
}
