'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function ChatButton() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    return (
        <button>
            <div onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('chat', 'true');
                router.push(`${pathname}?${newParams}`)
            }} className="flex flex-row items-center bg-neutral-800 px-4 py-3 gap-3 rounded-xl shadow-md">
                <div className="material-symbols-rounded !text-[24] pt-1">chat</div>
                <div className="text-lg">Start a Chat</div>
            </div>
        </button>
    )
}