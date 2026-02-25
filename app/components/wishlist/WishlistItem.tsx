"use client";

import { useDispatch } from "react-redux";
import { removeFromWishlist } from "@/redux/features/wishlistSlice";
import { addToCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";

/*
========================================
WishlistItem Component
========================================
- Displays a single wishlist item
- Allows user to:
  1. Move item to cart
  2. Remove item from wishlist
*/

export default function WishlistItem({ item }: any) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center border-b py-4">
      {/* Product Info */}
      <div className="flex gap-4 items-center">
        <img src={item.image} className="h-20 w-20 object-contain" />
        <span>{item.title}</span>
      </div>

      {/* Price */}
      <div>${item.price.toFixed(2)}</div>

      {/* Actions */}
      <div className="flex gap-2">
        {/* Move to Cart */}
        <button
          onClick={() => {
            dispatch(addToCart({ ...item, qty: 1 }));
            toast.success("Item moved to cart");
            dispatch(removeFromWishlist(item.id));
          }}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Add to Cart
        </button>

        {/* Remove from Wishlist */}
        <button
          onClick={() => {
            dispatch(removeFromWishlist(item.id));
            toast.error("Item removed from wishlist");
          }}
          className="text-red-500 px-4 py-1 border rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
