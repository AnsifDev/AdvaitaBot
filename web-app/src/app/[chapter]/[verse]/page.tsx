import { fetchQuote } from "@/ports"
import Link from "next/link"
import { Suspense } from "react";

type PageParams = {
    params: {
        chapter: string,
        verse: string, 
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
    const quote = await fetchQuote(chapter, verse);
    return (
        <div className="flex flex-col container gap-4 py-4">
            <div className="flex flex-col md:flex-row h-min items-stretch gap-2 font-normal overflow-auto">
                <div className="rounded flex-none md:flex-1 bg-white/10 py-3 px-4 text-center flex items-center justify-center">{quote?.quote}</div>
                <div className="rounded flex-none md:flex-1 bg-white/10 py-3 px-4 text-center flex items-center justify-center">{quote?.translation}</div>
            </div>
            <div className="flex flex-col gap-2 p-2 text-justify italic">
                <div>Commentary</div>
                    {quote?.commentary?.split('\n\n').map((v, i) => <p key={i}>{v}</p>)}
                </div>
                
                {/* <p className="p-4 text-justify"></p> */}
            </div>
            
    )
}

export default function Page({ params }: PageParams) {
    return (
        <div className="min-h-screen pt-8 pb-24 md:pb-8 px-4 flex flex-col items-center justify-center text-white bg-neutral-900">
            <div className="text-3xl font-bold mb-4 mx-6 mt-16">Chapter {params.chapter}, Verse {params.verse}</div>
            <Suspense fallback={<QuoteSkel/>}><Quotes chapter={Number.parseInt(params.chapter)} verse={Number.parseInt(params.verse)}/></Suspense>
            <Link href={`/${params.chapter}/${params.verse}/chat`} className="bg-white hover:bg-white/80 active:bg-white/60 text-neutral-900 py-2 px-4 rounded-full font-bold">Start A Chat</Link>
            <div className="fixed bottom-4 right-8 min-h-8 min-w-24 w-max flex items-center justify-between gap-2">
                <Link href={`/`} className="w-11 h-11 rounded-full flex flex-col items-center justify-center bg-neutral-700 hover:bg-neutral-600"><div className="material-symbols-rounded !text-lg h-min text-center">home</div></Link>
                <div className="p-1.5 rounded-full bg-neutral-700 flex items-center gap-2">
                    <Link href={`/${params.chapter}/${Number.parseInt(params.verse)-1}`} className="material-symbols-rounded !text-base px-2 py-1 rounded-full hover:bg-neutral-600 rotate-180">arrow_forward_ios</Link>
                    <div className="flex gap-2 items-center">
                        
                        <div>Quote {params.chapter}.{params.verse}</div>
                    </div>
                    <Link href={`/${params.chapter}/${Number.parseInt(params.verse)+1}`} className="material-symbols-rounded !text-base px-2 py-1 rounded-full hover:bg-neutral-600">arrow_forward_ios</Link>
                </div>
            </div>
        </div>
    )
}