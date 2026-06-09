"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="border-b border-slate-700 bg-slate-900 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="text-white font-bold text-xl tracking-tight">
        🎰 BetPlatform
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{user.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button variant="primary" size="sm">
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
}
