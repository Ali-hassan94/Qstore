"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import WishlistItem from "@/components/wishlist/WishlistItem";

/*
========================================
Wishlist Page
========================================
- Lists all wishlist items
- Integrates WishlistItem component
- Shows message if empty
*/

export default function WishlistPage() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlistItems.map(item => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
