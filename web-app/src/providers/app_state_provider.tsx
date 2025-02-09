'use client'

import { createContext, useContext, useState } from "react"

export type AppState = {
    chat: boolean,
    setChat: (b: boolean) => void,
    sanskritCommentary: boolean,
    setSanskritCommentary: (b: boolean) => void,
    docked: boolean,
    setDocked: (b: boolean) => void,
    showCommentary: boolean,
    setShowCommentary: (b: boolean) => void
}

const AppStateContext = createContext<AppState>({
    chat: false,
    sanskritCommentary: false,
    docked: false,
    showCommentary: false,
    setChat(b) {},
    setSanskritCommentary(b) {},
    setDocked(b) {},
    setShowCommentary(b) {},
})

export function AppStateProvider({ children }: { children: React.ReactNode }) {
    const [ chat, setChat ] = useState<boolean>(false);
    const [ sanskritCommentary, setSanskritCommentary ] = useState<boolean>(false);
    const [ docked, setDocked ] = useState<boolean>(false);
    const [ showCommentary, setShowCommentary ] = useState<boolean>(false);

    return (
        <AppStateContext.Provider value={{
            chat: chat,
            setChat: setChat,
            sanskritCommentary: sanskritCommentary,
            setSanskritCommentary: setSanskritCommentary,
            docked: docked,
            setDocked: setDocked,
            showCommentary: showCommentary,
            setShowCommentary: setShowCommentary
        }} >
            {children}
        </AppStateContext.Provider>
    )
}

export function useAppState() {
    return useContext(AppStateContext)
}