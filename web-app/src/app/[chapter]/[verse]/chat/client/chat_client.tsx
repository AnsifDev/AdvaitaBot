"use client"

import { useEffect, useRef, useState } from "react"
import { Message, PromptResponseSkel } from "../server/message"
import PromptBar from "./prompt_bar"
import { ChatBotPrompt } from "@/app/actions";

export default function ChatClient() {
    const [chats, updateChats] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chats, messagesEndRef])

    return (
        <div className="flex flex-col flex-1">
            <div className="flex-1 flex flex-col gap-2 px-4 items-stretch self-center w-full max-w-[720px]">
                {chats.map((v, i) => <Message key={i} msg={v} asPrompt={i%2 == 0}/>)}
                <div hidden={!loading}><PromptResponseSkel/></div>
                <div className="" ref={messagesEndRef}/>
            </div>
            <div className="sticky bottom-0 py-2 px-3 bg-neutral-900 self-stretch">
                <PromptBar onPrompt={(pr) => {
                    setLoading(true);
                    updateChats([...chats, pr])
                    ChatBotPrompt(pr).then((resp) => {
                        setLoading(false);
                        updateChats([...chats, pr, resp])
                    });
                }}/>
            </div>
        </div>
        
    )
}