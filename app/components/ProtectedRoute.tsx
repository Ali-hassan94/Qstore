"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return children;
}
