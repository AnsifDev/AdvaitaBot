'use client'

import { useAppState } from "@/providers/app_state_provider"
import { Verse } from "@/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type OverlayParams = {
  children: React.ReactNode
}

export function Overlay({ children }: OverlayParams) {
  // const searchParams = useSearchParams()
  // const chat = searchParams.has('chat')? searchParams.get('chat') == 'true': false;
  const { docked, setDocked, chat } = useAppState()
  
  return (
    <div className={`fixed z-20 bg-black/30 top-0 bottom-0 left-0 right-0 ${docked? 'flex': 'hidden'} ${chat? 'xl:hidden': 'lg:hidden'} flex-row`}>
      <div className="bg-neutral-800 max-w-96 min-w-72 basis-1/4 shadow-2xl shadow-black flex flex-col">{children}</div>
      <div className="flex-1 min-w-16" onClick={() => setDocked(false)}/>
    </div>
  )
}

export function OverlayButton () {
  // const searchParams = useSearchParams()
  // const chat = searchParams.has('chat')? searchParams.get('chat') == 'true': false;
  const { setDocked, chat } = useAppState()
  
  return (
    <button className={`h-10 w-10 hover:bg-white/10 rounded-md flex ${chat? 'xl': 'lg'}:hidden items-center justify-center`} onClick={() => {
      setDocked(true)
    }}>
      <span className={`material-symbols-rounded filled-icons`}>dock_to_right</span>
    </button>
  );
}

export function CommentarySanskitSwitch() {
  const { sanskritCommentary, setSanskritCommentary, showCommentary, chat } = useAppState()
  // const searchParams = useSearchParams()
  // const chat = searchParams.has('chat')? searchParams.get('chat') == 'true': false;

  return (
    <div className={`${showCommentary || !chat? 'flex': 'sm:flex hidden'} flex-row p-1 gap-1 rounded bg-white/5 select-none`}>
      <div onClick={() => {
        if (!sanskritCommentary) return;
        setSanskritCommentary(false)
      }} className={`py-0.5 px-1.5 rounded ${sanskritCommentary? 'hover:bg-white/5 active:bg-white/10': 'hover:bg-white/15 bg-white/10'}`}>Translations</div>
      <div onClick={() => {
        if (sanskritCommentary) return;
        setSanskritCommentary(true)
      }} className={`py-0.5 px-1.5 rounded ${sanskritCommentary? 'hover:bg-white/15 bg-white/10': 'hover:bg-white/5 active:bg-white/10'}`}>Sanskrit</div>
    </div>
  )
}

export function CommentaryShowButton() {
  const { showCommentary, setShowCommentary } = useAppState()

  return (
    <button className="select-none flex items-center p-1.5 rounded hover:bg-white/10" onClick={() => {
      setShowCommentary(!showCommentary);
    }}>
      <span className="material-symbols-rounded">{showCommentary? 'keyboard_arrow_up': 'keyboard_arrow_down'}</span>
    </button>
  )
}

export function CommentaryView( { quote }: { quote: Verse } ) {
  const { showCommentary, sanskritCommentary, chat } = useAppState()
  // const searchParams = useSearchParams()
  // const chat = searchParams.has('chat')? searchParams.get('chat') == 'true': false;

  return (
    <div>
      <div className={`${showCommentary || !chat? 'flex': 'hidden sm:flex'} flex-col gap-2`}>
        {sanskritCommentary? quote?.commentary: quote?.commentary_en}
      </div>
    </div>
  )
}

export function VerseHeaderView({ children }: { children: React.ReactNode }) {
  const { chat } = useAppState()

  return <div className={`flex flex-row pb-2 justify-between sticky top-16 sm:top-0 bg-neutral-900 ${chat? 'xl:bg-[#1F1F1F] sm:bg-neutral-800': ''}`}>{children}</div>
}

export function Quotes({ quote }: { quote: Verse }) {
  const { chat } = useAppState()

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className={`flex flex-col ${chat? 'lg:flex-row': 'md:flex-row'}  h-min items-stretch gap-2 font-normal overflow-auto`}>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  bg-white/10 py-3 px-4 text-center flex items-center justify-center`}>{quote?.verse}</div>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  bg-white/10 py-3 px-4 text-center flex items-center justify-center`}>{quote?.verse_en}</div>
      </div>
      <div className={`flex flex-col gap-2 text-justify italic rounded ${chat? 'bg-white/10 sm:bg-transparent px-4 sm:px-2 py-3 sm:py-2': 'p-2'}`}>
        <div className="not-italic flex flex-row gap-3 items-center">
          <div className="flex-1">Commentary</div>
          <CommentarySanskitSwitch/>
          {/* <div className={``}></div> */}
          <div className={`${chat? 'sm:hidden': 'hidden'}`}><CommentaryShowButton/></div>
        </div>
        <CommentaryView quote={quote}/>
      </div>
    </div>
  )
}