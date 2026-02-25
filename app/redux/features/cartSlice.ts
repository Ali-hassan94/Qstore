import { createSlice } from "@reduxjs/toolkit"

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  qty: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const exist = state.items.find(i => i.id === action.payload.id)

      if (exist) {
        exist.qty += 1
      } else {
        state.items.push({ ...action.payload, qty: 1 })
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.qty += 1
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.qty > 1) item.qty -= 1
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },

    clearCart: (state) => {
      state.items = []
    }

  }
})

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
