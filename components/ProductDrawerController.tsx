"use client";

import { useState } from "react";
import FloatingProductButton from "@/components/FloatingProductButton";
import ProductListDrawer from "@/components/ProductListDrawer";

export default function ProductDrawerController() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingProductButton onClick={() => setOpen(true)} />
      <ProductListDrawer open={open} setOpen={setOpen} />
    </>
  );
}