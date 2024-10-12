'use server'

import { Quote } from "@/components/types"
import { setTimeout } from "timers/promises"

export async function ChatBotPrompt(prompt: string) {
    await setTimeout(3000)
    return `Response for the prompt: "${prompt}"`
}

export async function FetchQuote(chapter: number, verse: number): Promise<Quote> {
    await setTimeout(3000)
    return {
        chapter: chapter,
        verse: verse,
        _id: `${chapter}.${verse}`,
        quote: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.',
        translation: 'No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'
    }
}