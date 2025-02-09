export type ChatMessage = {
    role: 'user'|'assistant'|'system'
    content: string
}

export type Verse = {
    _id: string,
    chapter_number: number,
    verse_number: number,
    speaker: string,
    verse: string,
    commentary?: string,
    verse_en: string,
    commentary_en?: string
}

export type Chapter = {
    chapter_number: number,
    title: string,
    title_en: string,
    verse_count: number,
    introduction?: string
}