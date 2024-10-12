'use server'

import { setTimeout } from "timers/promises"

export default async function ChatBotPrompt(prompt: string) {
    await setTimeout(3000)
    return `Response for the prompt: "${prompt}"`
}