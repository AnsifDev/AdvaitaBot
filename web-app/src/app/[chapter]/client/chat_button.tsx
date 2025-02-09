'use client'

import { useAppState } from "@/providers/app_state_provider";

export default function ChatButton() {
    const { chat, setChat } = useAppState()
    
    return (
        <button hidden={chat}>
            <div onClick={() => { setChat(true) }} className="flex flex-row items-center dark:bg-neutral-800 bg-neutral-200 px-4 py-3 gap-3 rounded-xl shadow-md">
                <div className="material-symbols-rounded !text-[24] pt-1">chat</div>
                <div className="text-lg">Start a Chat</div>
            </div>
        </button>
    )
}