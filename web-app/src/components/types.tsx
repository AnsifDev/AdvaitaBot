export type Quote = {
    chapter: number,
    slogan: number,
    _id: string,
    quote: string,
    translation: string
    commentary?: string
}

export type ChapterIndex = {
    verses: number,
    _id: number,
}

export type ChatMessage = {
    role: 'user'|'assistant'|'system'
    content: string
}