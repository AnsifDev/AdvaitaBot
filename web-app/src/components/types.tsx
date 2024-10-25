export type Quote = {
    chapter: number,
    verse: number,
    _id: string,
    quote: string,
    translation: string
    commentary?: string
}

export type ChapterIndex = {
    verses: number,
    _id: number,
}