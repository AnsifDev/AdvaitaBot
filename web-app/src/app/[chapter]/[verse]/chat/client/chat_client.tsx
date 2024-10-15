"use client"

import { useEffect, useRef, useState } from "react"
import { Message, PromptResponseSkel } from "../server/message"
import PromptBar from "./prompt_bar"
import { makePrompt } from "@/ports";

type Msg = {
    role: 'user'|'assistant'|'system'
    content: string
}

export default function ChatClient() {
    const [chats, updateChats] = useState<Array<Msg>>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chats, messagesEndRef])

    return (
        <div className="flex flex-col flex-1">
            <div className="flex-1 flex flex-col gap-2 px-4 items-stretch self-center w-full max-w-[720px]">
                {chats.map((v, i) => <Message key={i} msg={v.content} asPrompt={v.role == 'user'}/>)}
                <div hidden={!loading}><PromptResponseSkel/></div>
                <div className="" ref={messagesEndRef}/>
            </div>
            <div className="sticky bottom-0 py-2 px-3 bg-neutral-900 self-stretch">
                <PromptBar disablePrompt={loading} onPrompt={(pr) => {
                    setLoading(true);
                    updateChats([...chats, { role: 'user', content: pr }])
                    makePrompt(pr).then((resp) => {
                        setLoading(false);
                        updateChats([...chats, { role: 'user', content: pr }, { role: 'assistant', content: resp }])
                    });
                }}/>
            </div>
        </div>
        
    )
}