import ChatClient from "./client/chat_client";
import { fetchQuote } from "@/ports";
import { Suspense } from "react";

type PageParams = {
    params: {
        chapter: number,
        verse: number, 
    } 
}

function QuoteSkel() {
  return (
      <div className="flex flex-col sm:flex-row md:flex-col h-min items-stretch gap-2 p-4 font-normal overflow-auto animate-pulse">
          <div className="rounded flex-none sm:flex-1 md:flex-none bg-white/10 py-2 px-4 text-center h-32"/>
          <div className="rounded flex-none sm:flex-1 md:flex-none bg-white/10 py-2 px-4 text-center h-32"/>
      </div>
  )
}

async function Quotes({ chapter, verse }: { chapter: number, verse: number }) {
  const quote = await fetchQuote(chapter, verse);
  return (
      <div className="flex flex-col sm:flex-row md:flex-col h-min items-stretch gap-2 p-4 font-normal overflow-auto">
          <div className="rounded flex-none sm:flex-1 md:flex-none bg-white/10 py-2 px-4 text-center">{quote.quote}</div>
          <div className="rounded flex-none sm:flex-1 md:flex-none bg-white/10 py-2 px-4 text-center">{quote.translation}</div>
      </div>
  )
}

export default function Page({ params }: PageParams) {
  const headerbar = (
    <div className="flex px-8 md:pt-5 md:pb-3 py-3 bg-neutral-800 md:bg-transparent">
      <div className="flex flex-1 md:flex-auto md:flex-col flex-row items-center md:items-start">
        <div className="md:text-xl text-lg font-bold flex-1">WebAppName</div>
        <div className="text-xs text-white/75 py-0.5 h-min">Chapter {params.chapter}, Verse {params.verse}</div>
      </div>
    </div>
  )

  const contentHeaderbar = (
    <div className="px-6 pb-2 pt-3 bg-neutral-900 text-lg text-center font-bold">Chats</div>
  )

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-auto text-white bg-neutral-900">
      <div className="flex flex-col md:flex-1 md:basis-1/4 min-w-64 md:max-w-96 md:bg-white/10">
          <div>{headerbar}</div>
          <div className="hidden md:flex flex-col justify-center flex-1 overflow-auto">
            <Suspense fallback={<QuoteSkel/>}><Quotes chapter={params.chapter} verse={params.verse}/></Suspense>
          </div>
      </div>
      <div className="flex gap-2 flex-col flex-1 md:basis-3/4 items-stretch overflow-auto">
          <div className="md:hidden flex flex-col justify-center bg-neutral-900 text-lg font-bold">
            <Suspense fallback={<QuoteSkel/>}><Quotes chapter={params.chapter} verse={params.verse}/></Suspense>
          </div>
          <div className="md:sticky md:top-0 flex-col">{contentHeaderbar}</div>
          <ChatClient/>
      </div>
    </div>
  );
}
