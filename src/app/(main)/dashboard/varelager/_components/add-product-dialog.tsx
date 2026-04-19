"use client";

import * as React from "react";

import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";

import { PRODUCT_CATEGORY_OPTIONS, PRODUCT_STATUS_OPTIONS, type ProductRow } from "./schema";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (product: ProductRow) => void;
}

const EMPTY_FORM = {
  name: "",
  category: "",
  costPrice: "",
  estimatedValue: "",
  status: "Opslåt" as ProductRow["status"],
  description: "",
};

export function AddProductDialog({ open, onOpenChange, onAdd }: AddProductDialogProps) {
  const [form, setForm] = React.useState(EMPTY_FORM);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const product: ProductRow = {
      id: crypto.randomUUID(),
      name: form.name,
      category: form.category,
      addedDate: format(new Date(), "yyyy-MM-dd"),
      costPrice: form.costPrice ? parseFloat(form.costPrice) : undefined,
      estimatedValue: parseFloat(form.estimatedValue) || 0,
      status: form.status,
      description: form.description,
    };
    onAdd(product);
    setForm(EMPTY_FORM);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Tilføj produkt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ap-name">
              Produktnavn <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ap-name"
              required
              placeholder="Fx. iPhone 15 Pro"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ap-category">
                Kategori <span className="text-destructive">*</span>
              </Label>
              <Select value={form.category} onValueChange={(v) => setForm((prev) => ({ ...prev, category: v }))}>
                <SelectTrigger id="ap-category">
                  <SelectValue placeholder="Vælg kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kategori</SelectLabel>
                    {PRODUCT_CATEGORY_OPTIONS.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ap-costPrice">Kostpris (valgfri)</Label>
              <Input
                id="ap-costPrice"
                type="number"
                min={0}
                step="0.01"
                placeholder="0"
                value={form.costPrice}
                onChange={(e) => setForm((prev) => ({ ...prev, costPrice: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ap-estimatedValue">
                Estimeret værdi <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ap-estimatedValue"
                type="number"
                min={0}
                step="0.01"
                required
                placeholder="0"
                value={form.estimatedValue}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    estimatedValue: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ap-status">
                Status <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    status: v as ProductRow["status"],
                  }))
                }
              >
                <SelectTrigger id="ap-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PRODUCT_STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ap-description">
              Beskrivelse <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="ap-description"
              required
              rows={4}
              placeholder="Beskriv produktet..."
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuller
            </Button>
            <Button type="submit">
              <Plus />
              Tilføj produkt
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
