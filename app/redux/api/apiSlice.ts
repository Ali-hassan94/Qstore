// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://fakestoreapi.com", // API base URL yaha define karo
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       if (token) headers.set("authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ["Products", "Orders"],
//   endpoints: builder => ({
//     // ✅ GET PRODUCTS
//     getProducts: builder.query<
//       any[],
//       { page?: number; search?: string; sort?: string }
//     >({
//       query: ({ page = 1, search = "", sort = "" } = {}) =>
//         `/products?page=${page}&search=${search}&sort=${sort}`,
//       providesTags: ["Products"],
//     }),

//     // ✅ GET SINGLE PRODUCT
//     getProductById: builder.query<any, number>({
//       query: id => `/products/${id}`,
//       providesTags: ["Products"],
//     }),

//     // ✅ CREATE ORDER
//     createOrder: builder.mutation({
//       query: orderData => ({
//         url: "/orders",
//         method: "POST",
//         body: orderData,
//       }),
//       invalidatesTags: ["Orders"],
//     }),
//   }),
// });

// // Auto-generated hooks
// export const {
//   useGetProductsQuery,
//   useGetProductByIdQuery,
//   useCreateOrderMutation,
// } = apiSlice;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com", // frontend testing
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Products", "Orders"],

  endpoints: builder => ({
    // ✅ QUERY
    getProducts: builder.query<any[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    getProductById: builder.query<any, number>({
      query: id => `/products/${id}`,
      providesTags: ["Products"],
    }),

    // ✅ MUTATION
    createOrder: builder.mutation({
      query: orderData => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateOrderMutation,
} = apiSlice;
