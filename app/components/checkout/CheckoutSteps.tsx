"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setStep } from "@/redux/features/checkoutSlice";

/*
========================================
CheckoutSteps Component
========================================
- Displays step navigation (Step 1 → 2 → 3)
- Allows user to move between steps
*/

export default function CheckoutSteps() {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.checkout.step);

  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="flex justify-center gap-4 mb-6">
      {steps.map((label, index) => (
        <button
          key={index}
          onClick={() => dispatch(setStep(index + 1))}
          className={`px-4 py-2 rounded ${
            step === index + 1
              ? "bg-black text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
