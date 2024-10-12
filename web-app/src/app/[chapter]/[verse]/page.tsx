import { FetchQuote } from "@/app/actions"
import Link from "next/link"
import { Suspense } from "react";

type PageParams = {
    params: {
        chapter: number,
        verse: number, 
    } 
}

function QuoteSkel() {
    return (
        <div className="flex flex-col md:flex-row h-min items-stretch gap-2 p-4 font-normal overflow-auto container animate-pulse">
            <div className="rounded flex-none md:flex-1 bg-white/10 py-2 px-4 text-center h-32"/>
            <div className="rounded flex-none md:flex-1 bg-white/10 py-2 px-4 text-center h-32"/>
        </div>
    )
}

async function Quotes({ chapter, verse }: { chapter: number, verse: number }) {
    const quote = await FetchQuote(chapter, verse);
    return (
        <div className="flex flex-col md:flex-row h-min items-stretch gap-2 p-4 font-normal overflow-auto container">
            <div className="rounded flex-none md:flex-1 bg-white/10 py-2 px-4 text-center">{quote.quote}</div>
            <div className="rounded flex-none md:flex-1 bg-white/10 py-2 px-4 text-center">{quote.translation}</div>
        </div>
    )
}

export default function Page({ params }: PageParams) {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-white bg-neutral-900">
            <div className="text-3xl font-bold my-4 mx-6">Chapter {params.chapter}, Verse {params.verse}</div>
            <Suspense fallback={<QuoteSkel/>}><Quotes chapter={params.chapter} verse={params.verse}/></Suspense>
            <Link href={`/${params.chapter}/${params.verse}/chat`} className="bg-white hover:bg-white/80 active:bg-white/60 text-neutral-900 py-2 px-4 rounded-full font-bold">Start A Chat</Link>
        </div>
    )
}