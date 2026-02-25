"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";

/*
========================================
CartSummary Component
========================================
- Shows total amount
- Clear cart button
- Ready for checkout integration
*/

export default function CartSummary() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) return null;

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>

      <button
        onClick={() => {
          dispatch(clearCart());
          toast.success("Cart cleared");
        }}
        className="mt-4 bg-red-500 text-white px-6 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}
