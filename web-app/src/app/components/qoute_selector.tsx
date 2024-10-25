'use client'

import { DropDown } from "@/components/client/dropdown";
import { ChapterIndex } from "@/components/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QouteSelector({ index }:{ index: ChapterIndex[] }) {
    const [chapter, setChapter] = useState(0);
    const [verse, setVerse] = useState(0);
    const router = useRouter();
    
    function generateArray<T>(length: number, value: (i: number) => T): T[] {
        const rt = Array<T>()
        for (let index = 0; index < length; index++) 
            rt.push(value(index))
        return rt;
    }

    function getVersesIndex(chapter: number): string[]|null {
        for (let i = 0; i < index.length; i++) {
            const element = index[i];
            if (element._id == chapter) 
                return generateArray<string>(element.verses, (i) => `Verse ${i+1}`)
        }
        return null
    }

    return (
        <div className="min-w-72 md:min-w-96 px-4 py-3 gap-2 md:gap-3 flex flex-col rounded-xl bg-white/10">
            <div className='text-center font-bold text-xl md:text-3xl mt-4 mb-2'>Select Quote</div>
            <div className="flex flex-col gap-1">
                <div className='text-xs text-neutral-300'>Select Chapter</div>
                <DropDown list={index.map((v) => `Chapter ${v._id}`)} selectedIndex={chapter} onChange={setChapter}/>
            </div>
            <div className="flex flex-col gap-1">
                <div className='text-xs text-neutral-300'>Select Verse</div>
                <DropDown list={getVersesIndex(chapter+1) ?? []} selectedIndex={verse} onChange={setVerse}/>
            </div>
            <button onClick={() => {
                router.push(`/${chapter+1}/${verse+1}`)
            }} className="w-min self-end py-2 px-6 my-2 rounded-full bg-white text-neutral-700 font-bold">Continue</button>
        </div>
    )
}