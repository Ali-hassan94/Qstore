"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function Header() {
  // Redux se cart items lena
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <header className="bg-black text-white px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        EuroStore
      </Link>

      {/* Navigation */}
      <nav className="flex gap-6 items-center">
        <Link href="/" className="hover:text-fuchsia-500 ">
          Home
        </Link>
        <Link href="/products" className="hover:text-fuchsia-500 ">
          Products
        </Link>
        <Link href="/cart" className="relative">
          Cart
          {/* Cart Count Badge */}
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
