"use client";
import { createContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStorageData,
  clearStorageData,
  setStorageData,
} from "@/lib/adapters/localStorage";

const SessionContext = createContext({});

export function SessionContextProvider({ children }) {
  const queryClient = useQueryClient();
  const session = useQuery({
    queryKey: ["sessions"],
    queryFn: () => getStorageData(),
  });

  function logOut() {
    clearStorageData();
    queryClient.invalidateQueries("sessions");
  }

  function updateSessionData(novaSession) {
    setStorageData({
      token: session.data.token,
      ...session.data,
      ...novaSession,
    });

    console.log("sesh update" + novaSession);
    queryClient.invalidateQueries("sessions");
  }

  return (
    <SessionContext.Provider
      value={{
        ...session,
        logOut,
        updateSessionData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
