"use client"

import { useState } from "react"

type PromptBarParams = {
    disablePrompt?: boolean
    onPrompt?: (string: string) => void
}

export default function PromptBar({ disablePrompt = false, onPrompt }: PromptBarParams) {
    const [prompt, setPrompt] = useState("");

    function sendPrompt() {
        if (disablePrompt) return;
        if (prompt.length == 0) return;
        setPrompt("");
        if (onPrompt) onPrompt(prompt);
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <textarea value={prompt} onKeyDown={(e) => {
                if (e.key != 'Enter' || e.shiftKey) return;
                e.preventDefault();
                sendPrompt();
            }} onChange={(e) => setPrompt(e.target.value)} rows={1} placeholder="Ask Questions" className="dark:bg-neutral-800 bg-neutral-200 dark:placeholder:text-neutral-400 placeholder:text-neutral-600 outline-none py-3 px-5 resize-none rounded-3xl max-w-[960px] overflow-none max-h-[6lh] auto-sizing container"/>
            <button disabled={disablePrompt || prompt.length == 0} className="p-2 w-[48px] h-[48px] rounded-full dark:bg-white bg-black dark:disabled:bg-white/30 disabled:bg-black/30 dark:hover:bg-white/80 hover:bg-black/80 dark:active:bg-white/60 active:bg-black/60 dark:text-black text-white">
            <span onClick={sendPrompt} className="material-symbols-rounded filled-icons select-none !text-[32px]">send</span>
            </button>
            
        </div>
    )
}
