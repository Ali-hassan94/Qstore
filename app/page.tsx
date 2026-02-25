"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/redux/api/apiSlice";

export default function Home() {
  // RTK Query se products fetch
  const { data, isLoading } = useGetProductsQuery();

  return (
    <div className="bg-gray-50 text-fuchsia-500 ">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-black text-white py-24 text-center">
        <h1 className="text-5xl font-bold">Welcome to Euro Store</h1>
        <p className="mt-4 text-lg text-gray-300">
          Premium Products. Best Prices. Fast Delivery.
        </p>

        <Link
          href="/products"
          className="inline-block mt-6 bg-fuchsia-500 text-white  text-black px-6 py-3 rounded-md font-semibold"
        >
          Shop Now
        </Link>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>

        {isLoading && <p className="text-center">Loading products...</p>}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {data?.slice(0, 4).map((product: any) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto object-contain"
              />

              <h3 className="mt-4 font-semibold text-sm">
                {product.title.substring(0, 40)}...
              </h3>

              <p className="mt-2 font-bold text-lg">${product.price}</p>

              <Link
                href={`/products/${product.id}`}
                className="block mt-3 text-center bg-black text-white py-2 rounded"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="text-fuchsia-500 py-16 text-center">
        <h2 className="text-3xl text-shadow-lime-400 font-bold mb-10">
          Why Choose Euro Store?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 px-10">
          <div>
            <h3 className="font-semibold text-xl">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">
              Get your products delivered within 2-3 days.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl">Secure Payment</h3>
            <p className="text-gray-600 mt-2">
              100% secure and encrypted transactions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl">24/7 Support</h3>
            <p className="text-gray-600 mt-2">
              We are always here to help you.
            </p>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-bold">Subscribe to Newsletter</h2>

        <div className="mt-6 flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2  border-2 rounded-4xl text-black w-64"
          />
          <button className="text-fuchsia-500  bg-white text-black px-6 py-2 rounded font-semibold">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
