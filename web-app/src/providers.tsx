'use client'

import { ThemeProvider } from 'next-themes'
import { AppStateProvider } from './providers/app_state_provider'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
    const [ mounted, setMounted ] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return children
    
    return (
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
            <AppStateProvider>
                {children}
            </AppStateProvider>
        </ThemeProvider>
    )
}