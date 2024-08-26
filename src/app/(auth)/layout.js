"use client";
import { useContext, useEffect } from "react";
import SessionContext from "@/contexts/sessionContext";

export default function AuthLayout({ children }) {
  const session = useContext(SessionContext);

  // If session data is loaded without errors, redirect to tha main app
  useEffect(() => {
    if (session.isLoading) return;
    if (!session.isError && session.data) redirect("/student/profile");
  }, [session.isLoading]);

  return <>{children}</>;
}
