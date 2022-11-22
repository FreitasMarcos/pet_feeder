import { createContext, ReactNode, useEffect, useState } from "react";

interface UserContextType {
    accessToken: string
    setUserToken: (token: string) => void
}

interface UserContextProviderProps {
    children: ReactNode
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {

    const [accessToken, setAccessToken] = useState('')
    async function setUserToken(token: string) {
        setAccessToken(token);
    }

    useEffect(() => { }, [accessToken])

    return (
        <UserContext.Provider
            value={{
                accessToken,
                setUserToken
            }}
        >
            {children}
        </UserContext.Provider>
    )
}