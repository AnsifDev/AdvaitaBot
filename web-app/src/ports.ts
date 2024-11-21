'use server'

import { setTimeout } from "timers/promises"
import { ChatMessage } from "./types";

export async function getChapterCount() {
    await setTimeout(3000);

    return 40
}

export async function makePrompt(question: string, history: ChatMessage[], quoteInView: string) {
    await setTimeout(3000);
    return `Response for ${question}`
}