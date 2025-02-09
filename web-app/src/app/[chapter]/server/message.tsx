import React from "react"

export function PromptResponseSkel() {
    return (
        <div className={`flex flex-row-reverse animate-pulse`}>
            <div className="min-w-20 flex-1"/>
            <div className="rounded-lg dark:bg-white/10 bg-black/10 px-3 py-2 dark:text-white/40 text-black/40">Loading...</div>
        </div>
    )
}

export function Message({ msg, asPrompt }: { msg: string, asPrompt: boolean }) {
    return (
        <div>
            <div className={`flex ${asPrompt? 'flex-row': 'flex-row-reverse'}`}>
                <div className="min-w-12 flex-1"/>
                <div className="rounded-lg bg-black/10 dark:bg-white/10 px-3 py-2 break-all">{msg}</div>
            </div>
        </div>
    )
}