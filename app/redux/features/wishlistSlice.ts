import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
========================================
wishlistSlice
========================================
- Redux slice for wishlist
- Stores all wishlist items
- Handles add / remove functionality
- Can be persisted like cart
*/

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add item to wishlist
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    // Remove item from wishlist
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
