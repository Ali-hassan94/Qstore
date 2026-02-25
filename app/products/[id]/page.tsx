// "use client";
// import { useParams } from "next/navigation";
// import { useGetProductByIdQuery } from "@/redux/api/apiSlice";

// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const { data, isLoading } = useGetProductByIdQuery(Number(id));

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold">{data?.title}</h1>
//       <img src={data?.image} className="h-64 object-contain my-4" />
//       <p className="mt-4">${data?.price}</p>
//       <p className="mt-4">{data?.description}</p>
//     </div>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "@/redux/api/apiSlice";
import { addToCart } from "@/redux/features/cartSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{data?.title}</h1>

      <img src={data?.image} className="h-64 object-contain my-6" />

      <p className="text-xl font-semibold">${data?.price}</p>

      <p className="mt-4 text-gray-600">{data?.description}</p>

      <button
        onClick={() => dispatch(addToCart({ ...data, qty: 1 }))}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Add To Cart
      </button>
    </div>
  );
}
