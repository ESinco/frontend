"use client"
import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStorageData } from '@/lib/adapters/localStorage';

const SessionContext = createContext({})

export function SessionContextProvider({ children }) {
    const session = useQuery({
        queryKey: [ "sessions" ],
        queryFn: getStorageData
    })
    return (
        <SessionContext.Provider value={{
            ...session
        }}>
            { children }
        </SessionContext.Provider>
    )
}

export default SessionContext;