'use client'

import { ThemeProvider } from 'next-themes'
import { AppStateProvider } from './providers/app_state_provider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        // <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
            <AppStateProvider>
                {children}
            </AppStateProvider>
        // </ThemeProvider>
    )
}