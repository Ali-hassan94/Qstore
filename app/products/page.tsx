// "use client";
// import { useGetProductsQuery } from "@/redux/api/apiSlice";

// export default function ProductsPage() {
//   const { data, isLoading, isError, error, refetch } = useGetProductsQuery();

//   if (isLoading) return <p className="p-10">Loading products...</p>;

//   if (isError)
//     return (
//       <div className="p-10">
//         <p>Error loading products</p>
//         <button onClick={() => refetch()}>Try Again</button>
//       </div>
//     );

//   return (
//     <div className="grid grid-cols-4 gap-6 p-6">
//       {data?.map(product => (
//         <div key={product.id} className="border p-4 rounded">
//           <h2>{product.title}</h2>
//           <p>${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useGetProductsQuery } from "@/redux/api/apiSlice";
import ProductCard from "@/products/ProductCard";
import ProductFilter from "@/products/ProductFilter";
import ProductPagination from "@/products//ProductPagination";

export default function ProductsPage() {
  const { data, isLoading, isError, refetch } = useGetProductsQuery();

  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [page, setPage] = useState(1);

  if (isLoading) return <p className="p-10">Loading...</p>;

  if (isError)
    return (
      <div className="p-10">
        <p>Error loading products</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );

  // 🔹 Filtering Logic
  let filtered = data || [];

  if (category) {
    filtered = filtered.filter((p: any) =>
      p.category?.toLowerCase().includes(category.toLowerCase()),
    );
  }

  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter((p: any) => p.price >= min && p.price <= max);
  }

  // 🔹 Pagination Logic
  const itemsPerPage = 8;
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="p-10">
      <ProductFilter
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <div
        className="  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  gap-6"
      >
        {paginated.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ProductPagination currentPage={page} setPage={setPage} />
    </div>
  );
}
