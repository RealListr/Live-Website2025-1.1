// src/app/connection-centre/page.tsx
"use client";

import { useEffect, useState } from "react";
import ConnectionCentreClient from "./ConnectionCentreClient";

export default function ConnectionCentrePage() {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("rlauth=valid"));

    if (!hasCookie) {
      // bounce to login if not authenticated
      window.location.href = "/login";
    } else {
      setAuthed(true);
      setChecked(true);
    }
  }, []);

  if (!checked || !authed) return null;

  return <ConnectionCentreClient />;
}
