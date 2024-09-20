"use client"
import { createContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStorageData, clearStorageData } from '@/lib/adapters/localStorage';

const SessionContext = createContext({})

export function SessionContextProvider({ children }) {
    const queryClient = useQueryClient()
    const session = useQuery({
        queryKey: [ "sessions" ],
        queryFn: () => getStorageData()
    })

    function logOut() {
        clearStorageData();
        queryClient.invalidateQueries("sessions")
    }

    return (
        <SessionContext.Provider value={{
            ...session,
            logOut
        }}>
            { children }
        </SessionContext.Provider>
    )
}

export default SessionContext;