"use client";
// 🔹 Ye file Client Component hai.
// 🔹 Kyun? Kyunki hum Redux hooks (useSelector, useDispatch) use kar rahe hain.
// 🔹 Next.js App Router me by default file Server Component hoti hai.
// 🔹 Redux sirf Client me kaam karta hai.

import { useSelector, useDispatch } from "react-redux";
// 🔹 Redux ke hooks.
// 🔹 useSelector → store se data read karta hai.
// 🔹 useDispatch → store me action bhejta hai (state change karne ke liye).

import { RootState } from "@/redux/store";
// 🔹 Ye TypeScript type hai.
// 🔹 Ye batata hai global Redux state ka structure kya hai.
// 🔹 Ye file redux/store.ts me define hoti hai.
import CartSummary from "@/cart/CartSummary";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "@/redux/features/cartSlice";
// 🔹 Ye actions cartSlice.ts file se aa rahe hain.
// 🔹 Ye functions state ko modify karte hain.
// 🔹 cartSlice = cart ka logic center.

import toast from "react-hot-toast";
// 🔹 Toast notification ke liye.
// 🔹 User ko feedback dene ke liye (UX improvement).

export default function CartPage() {
  // 🔹 Ye page component hai.
  // 🔹 Next.js me app/cart/page.tsx route ko represent karta hai.

  const dispatch = useDispatch();
  // 🔹 dispatch function Redux store ko action bhejne ke liye.
  // 🔹 Example: dispatch(removeFromCart(id))

  const cartItems = useSelector((state: RootState) => state.cart.items);
  // 🔹 Ye Redux store se cart.items data nikal raha hai.
  // 🔹 state.cart → cartSlice ka state.
  // 🔹 items → cart me jo products hain.
  // 🔹 Ye automatic re-render karega jab cart change hoga.

  // 🔹 Total price calculate karne ke liye reduce use kiya.
  const total = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.qty,
    0,
  );
  // 🔹 acc = accumulator (total)
  // 🔹 item.price * item.qty = product total
  // 🔹 0 = initial value
  // 🔹 Ye derived state hai (store me save nahi hoti).

  return (
    <div className="p-10">
      {/* 🔹 Tailwind padding 10 */}

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* 🔹 Agar cart empty ho */}
      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {/* 🔹 Map function har cart item ko render karta hai */}
      {cartItems.map((item: any) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          {/* 🔹 key React ko batata hai kaunsa item unique hai */}

          {/* 🔹 Product title */}
          <span className="w-1/3">{item.title}</span>

          {/* 🔹 Quantity Controls */}
          <div className="flex items-center gap-3">
            {/* 🔹 Decrease button */}
            <button
              onClick={() => dispatch(decreaseQty(item.id))}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              -
            </button>
            {/* 🔹 decreaseQty action cartSlice me qty ko -1 karega */}

            <span>{item.qty}</span>
            {/* 🔹 Current quantity show ho rahi hai */}

            {/* 🔹 Increase button */}
            <button
              onClick={() => dispatch(increaseQty(item.id))}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>
            {/* 🔹 increaseQty action qty +1 karega */}
          </div>

          {/* 🔹 Price section */}
          <div>
            ${item.price} × {item.qty}
          </div>

          {/* 🔹 Remove button */}
          <button
            onClick={() => {
              dispatch(removeFromCart(item.id));
              toast.success("Item removed");
            }}
            className="text-red-500"
          >
            Remove
          </button>
          {/* 🔹 removeFromCart item ko state se delete karega */}
          {/* 🔹 Toast user ko feedback dega */}
        </div>
      ))}

      {/* 🔹 Agar cart me item hai to total show karo */}
      {cartItems.length > 0 && (
        <>
          <h2 className="mt-6 text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          {/* 🔹 toFixed(2) decimal format ke liye */}

          <button
            onClick={() => {
              dispatch(clearCart());
              toast.success("Cart cleared");
            }}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded"
          >
            Clear Cart
          </button>
          <CartSummary />
          {/* 🔹 clearCart poora cart empty karega */}
        </>
      )}
    </div>
  );
}
