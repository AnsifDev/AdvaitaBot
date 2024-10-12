"use client"

import { DropDown } from '@/components/client/dropdown';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const chapters = [
  'Chapter 1',
  'Chapter 2',
  'Chapter 3',
  'Chapter 4',
  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
  'Chapter 8',
  'Chapter 9',
  'Chapter 10',
  'Chapter 11',
]

const verses = [
  'Verse 1',
  'Verse 2',
  'Verse 3',
  'Verse 4',
  'Verse 5',
  'Verse 6',
  'Verse 7',
  'Verse 8',
  'Verse 9',
  'Verse 10',
  'Verse 11',
  'Verse 12',
  'Verse 13',
  'Verse 14',
  'Verse 15',
  'Verse 16',
  'Verse 17',
]

export default function Home() {
  const [chapter, setChapter] = useState(0);
  const [verse, setVerse] = useState(0);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-neutral-900">
      <div className="min-w-72 md:min-w-96 px-4 py-3 gap-2 md:gap-3 flex flex-col rounded-xl bg-white/10">
        <div className='text-center font-bold text-xl md:text-3xl mt-4 mb-2'>Select Quote</div>
        <div className="flex flex-col gap-1">
          <div className='text-xs text-neutral-300'>Select Chapter</div>
          <DropDown list={chapters} selectedIndex={chapter} onChange={setChapter}/>
        </div>
        <div className="flex flex-col gap-1">
          <div className='text-xs text-neutral-300'>Select Verse</div>
          <DropDown list={verses} selectedIndex={verse} onChange={setVerse}/>
        </div>
        <button onClick={() => {
          router.push(`/${chapter+1}/${verse+1}`)
        }} className="w-min self-end py-2 px-6 my-2 rounded-full bg-white text-neutral-700 font-bold">Continue</button>
      </div>
    </div>
  );
}
