"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success("Added to cart");
  };

  return (
    <div
      className="
      bg-white 
      border 
      rounded-xl 
      p-4 
      shadow-sm 
      hover:shadow-xl 
      transition-all 
      duration-300 
      flex 
      flex-col 
      h-full
    "
    >
      {/* Image Section */}
      <div className="relative w-full h-40 sm:h-48 md:h-52 lg:h-56 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h2
        className="
        font-semibold 
        text-sm 
        sm:text-base 
        line-clamp-2 
        min-h-[48px]
      "
      >
        {product.title}
      </h2>

      {/* Price */}
      <p
        className="
        font-bold 
        text-base 
        sm:text-lg 
        mt-2
      "
      >
        ${product.price}
      </p>

      {/* Button */}
      <button
        onClick={handleAdd}
        className="
          mt-auto 
          bg-black 
          text-white 
          py-2 
          sm:py-3 
          rounded-lg 
          text-sm 
          sm:text-base 
          hover:bg-gray-800 
          transition
        "
      >
        Add To Cart
      </button>
    </div>
  );
}
