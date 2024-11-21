"use client"

import { ChatMessage } from "@/types";
import { useEffect, useRef, useState } from "react"
import { Message, PromptResponseSkel } from "../server/message";
import PromptBar from "./prompt_bar";
import { makePrompt } from "@/ports";

type ChatClientParams = {
    quoteInView: string
}

export default function ChatClient({ quoteInView }: ChatClientParams) {
    const [chats, updateChats] = useState<Array<ChatMessage>>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chats, messagesEndRef])

    return (
        <div className="flex flex-col flex-1 min-h-64">
            <div className="flex-1 flex flex-col gap-2 px-4 items-stretch self-center w-full max-w-[960px]">
                {chats.map((v, i) => <Message key={i} msg={v.content} asPrompt={v.role == 'user'}/>)}
                <div hidden={!loading}><PromptResponseSkel/></div>
                <div className="" ref={messagesEndRef}/>
            </div>
            <div className="sticky bottom-0 py-2 px-3 bg-neutral-900 self-stretch">
                <PromptBar disablePrompt={loading} onPrompt={(pr) => {
                    setLoading(true);
                    updateChats([...chats, { role: 'user', content: pr }])
                    makePrompt(pr, chats, quoteInView).then((resp) => {
                        setLoading(false);
                        updateChats([...chats, { role: 'user', content: pr }, { role: 'assistant', content: resp }])
                    }).catch(() => {
                        setLoading(false);
                        updateChats([...chats, { role: 'user', content: pr }, { role: 'assistant', content: 'Error Occured' }])
                    });
                }}/>
            </div>
        </div>
    )
}