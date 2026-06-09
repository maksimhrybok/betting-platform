"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (_hasHydrated && !user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [user, _hasHydrated, pathname, router]);

  // Waiting for localStorage hydration — avoid flash redirect
  if (!_hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!user && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}
