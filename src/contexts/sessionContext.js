"use client"
import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStorageData, setStorageData } from '@/lib/adapters/localStorage';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
const SessionContext = createContext({})

export function SessionContextProvider({ children }) {
    const session = useQuery({
        queryKey: [ "sessions" ],
        queryFn: getStorageData
    })
    console.log(session.data)
    return (
        <SessionContext.Provider value={{
            ...session
        }}>
            { children }
        </SessionContext.Provider>
    )
}

export default SessionContext;