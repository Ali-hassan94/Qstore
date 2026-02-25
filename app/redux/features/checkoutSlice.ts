import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
========================================
checkoutSlice
========================================
- Redux slice for checkout process
- Stores:
  1. Shipping address
  2. Payment method
  3. Coupon code
  4. Step number (multi-step checkout)
*/

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CheckoutState {
  step: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  couponCode: string;
}

const initialState: CheckoutState = {
  step: 1,
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: "",
  couponCode: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setCouponCode: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  setStep,
  setShippingAddress,
  setPaymentMethod,
  setCouponCode,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
