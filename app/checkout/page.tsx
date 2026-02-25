"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import {
  setShippingAddress,
  setPaymentMethod,
  setCouponCode,
} from "@/redux/features/checkoutSlice";
import toast from "react-hot-toast";

/*
========================================
Checkout Page
========================================
- Multi-step checkout
- Step 1: Shipping
- Step 2: Payment
- Step 3: Review + Shipping Calculation
*/

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { step, shippingAddress, paymentMethod, couponCode } = useSelector(
    (state: RootState) => state.checkout,
  );

  const handleShippingSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    dispatch(
      setShippingAddress({
        fullName: form.fullName.value,
        address: form.address.value,
        city: form.city.value,
        postalCode: form.postalCode.value,
        country: form.country.value,
      }),
    );
    toast.success("Shipping address saved");
    dispatch(setStep(2)); // Move to payment
  };

  const handlePaymentSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    dispatch(setPaymentMethod(form.paymentMethod.value));
    toast.success("Payment method saved");
    dispatch(setStep(3)); // Move to review
  };

  const calculateShipping = () => {
    /*
    Simple shipping calculation based on country
    - For demo: $5 for USA, $10 others
    */
    if (!shippingAddress.country) return 0;
    return shippingAddress.country.toLowerCase() === "usa" ? 5 : 10;
  };

  const calculateTotal = () => {
    // Example cart total (mocked for demo)
    const cartTotal = 100; // Replace with cart state in real project
    const shipping = calculateShipping();
    const discount = couponCode === "DISCOUNT10" ? 10 : 0;
    return cartTotal + shipping - discount;
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <CheckoutSteps />

      {step === 1 && (
        <form
          onSubmit={handleShippingSubmit}
          className="flex flex-col gap-4 max-w-md"
        >
          <input
            name="fullName"
            placeholder="Full Name"
            required
            className="border p-2"
          />
          <input
            name="address"
            placeholder="Address"
            required
            className="border p-2"
          />
          <input
            name="city"
            placeholder="City"
            required
            className="border p-2"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            required
            className="border p-2"
          />
          <input
            name="country"
            placeholder="Country"
            required
            className="border p-2"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded mt-2"
          >
            Save Shipping
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handlePaymentSubmit}
          className="flex flex-col gap-4 max-w-md"
        >
          <select name="paymentMethod" required className="border p-2">
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded mt-2"
          >
            Save Payment
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="max-w-md flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Review Order</h2>
          <p>Shipping: ${calculateShipping()}</p>
          <p>Coupon Discount: {couponCode ? "$10" : "$0"}</p>
          <p>Total: ${calculateTotal()}</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
