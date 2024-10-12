"use client"

import { useState } from "react"

type PromptBarParams = {
    className?: string,
    onPrompt?: (string: string) => void
}

export default function PromptBar({ className, onPrompt }: PromptBarParams) {
    const [prompt, setPrompt] = useState("");

    function sendPrompt() {
        setPrompt("");
        if (onPrompt) onPrompt(prompt);
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <textarea value={prompt} onKeyDown={(e) => {
                if (e.key != 'Enter' || e.shiftKey) return;
                e.preventDefault();
                sendPrompt();
            }} onChange={(e) => setPrompt(e.target.value)} rows={1} placeholder="Ask Questions" className="bg-neutral-800 outline-none py-3 px-5 resize-none rounded-3xl max-w-[720px] overflow-none max-h-[6lh] auto-sizing container"/>
            <span onClick={sendPrompt} className="material-symbols-rounded filled-icons p-2 rounded-full bg-white hover:bg-white/80 active:bg-white/60 select-none text-black !text-[32px]">send</span>
        </div>
    )
}