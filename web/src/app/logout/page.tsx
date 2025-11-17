// src/app/logout/page.tsx
"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // kill the auth cookie
    document.cookie =
      "rlauth=; Max-Age=0; path=/; SameSite=Lax";

    // send them back to the homepage (or /login if you prefer)
    window.location.href = "/";
  }, []);

  return null;
}
