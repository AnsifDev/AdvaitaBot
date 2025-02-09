'use client'

import { useAppState } from "@/providers/app_state_provider"
import { Verse } from "@/types"

export function CommentarySanskitSwitch() {
  const { sanskritCommentary, setSanskritCommentary, showCommentary, chat } = useAppState()
  // const searchParams = useSearchParams()
  // const chat = searchParams.has('chat')? searchParams.get('chat') == 'true': false;

  return (
    <div className={`${showCommentary || !chat? 'flex': 'sm:flex hidden'} flex-row p-1 gap-1 rounded dark:bg-white/5 bg-black/5 select-none`}>
      <div onClick={() => {
        if (!sanskritCommentary) return;
        setSanskritCommentary(false)
      }} className={`py-0.5 px-1.5 rounded ${sanskritCommentary? 'dark:hover:bg-white/5 hover:bg-black/5 dark:active:bg-white/10 active:bg-black/10': 'dark:hover:bg-white/15 hover:bg-black/15 dark:bg-white/10 bg-black/10'}`}>Translations</div>
      <div onClick={() => {
        if (sanskritCommentary) return;
        setSanskritCommentary(true)
      }} className={`py-0.5 px-1.5 rounded ${sanskritCommentary? 'dark:hover:bg-white/15 hover:bg-black/15 dark:bg-white/10 bg-black/10': 'dark:hover:bg-white/5 hover:bg-black/5 dark:active:bg-white/10 active:bg-black/10'}`}>Sanskrit</div>
    </div>
  )
}

export function CommentaryShowButton() {
  const { showCommentary, setShowCommentary } = useAppState()

  return (
    <button className="select-none flex items-center p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10" onClick={() => {
      setShowCommentary(!showCommentary);
    }}>
      <span className="material-symbols-rounded">{showCommentary? 'keyboard_arrow_up': 'keyboard_arrow_down'}</span>
    </button>
  )
}

export function CommentaryView( { quote }: { quote: Verse } ) {
  const { showCommentary, sanskritCommentary, chat } = useAppState()

  return (
    <div>
      <div className={`${showCommentary || !chat? 'flex': 'hidden sm:flex'} flex-col gap-2`}>
        {sanskritCommentary? quote?.commentary ?? 'No commentary in sanskrit available': quote?.commentary_en ?? 'No commentary in available'}
      </div>
    </div>
  )
}

export function VerseHeaderView({ children }: { children: React.ReactNode }) {
  const { chat } = useAppState()

  return <div className={`flex flex-row mb-2 justify-between sticky top-16 sm:top-0 dark:bg-neutral-900 bg-white ${chat? 'dark:xl:bg-[#1F1F1F] xl:bg-neutral-100 dark:sm:bg-neutral-800 sm:bg-neutral-200': ''}`}>{children}</div>
}

export function Quotes({ quote }: { quote: Verse }) {
  const { chat } = useAppState()

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className={`flex flex-col ${chat? 'lg:flex-row': 'md:flex-row'}  h-min items-stretch gap-2 font-normal overflow-auto`}>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  dark:bg-white/10 bg-black/10 py-3 px-4 text-center flex items-center justify-center`}>{quote?.verse}</div>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  dark:bg-white/10 bg-black/10 py-3 px-4 text-center flex items-center justify-center`}>{quote?.verse_en}</div>
      </div>
      <div className={`flex flex-col gap-2 text-justify italic rounded ${chat? 'dark:bg-white/10 bg-black/10 sm:bg-transparent px-4 sm:px-2 py-3 sm:py-2': 'p-2'}`}>
        <div className="not-italic flex flex-row gap-3 items-center">
          <div className="flex-1">Commentary</div>
          <CommentarySanskitSwitch/>
          <div className={`${chat? 'sm:hidden': 'hidden'}`}><CommentaryShowButton/></div>
        </div>
        <CommentaryView quote={quote}/>
      </div>
    </div>
  )
}