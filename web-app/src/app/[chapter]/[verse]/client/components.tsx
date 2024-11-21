'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

type OverlayParams = {
  children: React.ReactNode
}

export function Overlay({ children }: OverlayParams) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const docked = searchParams.has('docked')? searchParams.get('docked') == 'true': false;
  const chat = searchParams.has('chat')? searchParams.get('chat') == 'true': false;
  return (
    <div className={`fixed z-20 bg-black/30 top-0 bottom-0 left-0 right-0 ${docked? 'flex': 'hidden'} ${chat? 'xl:hidden': 'lg:hidden'} flex-row`}>
      <div className="bg-neutral-800 max-w-96 min-w-72 basis-1/4 shadow-2xl shadow-black flex flex-col">{children}</div>
      <div className="flex-1 min-w-16" onClick={() => router.back()}/>
    </div>
  )
}

export function OverlayButton () {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const chat = searchParams.has('chat')? searchParams.get('chat') == 'true': false;
  
  return (
    <button className={`h-10 w-10 hover:bg-white/10 rounded-md flex ${chat? 'xl': 'lg'}:hidden items-center justify-center`} onClick={() => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('docked', 'true');
      router.push(`${pathname}?${newParams}`)
    }}>
      <span className={`material-symbols-rounded filled-icons`}>dock_to_right</span>
    </button>
  );
}

export function CommentarySanskitSwitch() {
  const searchParams = useSearchParams()
  const sanskritCommentary = searchParams.has('sanskritCommentary')? searchParams.get('sanskritCommentary') == 'true': false;
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex flex-row p-1 gap-1 rounded bg-white/5 select-none">
      <div onClick={() => {
        if (!sanskritCommentary) return;
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('sanskritCommentary');
        router.replace(`${pathname}?${newParams}`)
      }} className={`py-0.5 px-1.5 rounded ${sanskritCommentary? 'hover:bg-white/5 active:bg-white/10': 'hover:bg-white/15 bg-white/10'}`}>Translations</div>
      <div onClick={() => {
        if (sanskritCommentary) return;
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sanskritCommentary', 'true')
        router.replace(`${pathname}?${newParams}`)
      }} className={`py-0.5 px-1.5 hover:bg-white/5 rounded ${sanskritCommentary? 'hover:bg-white/15 bg-white/10': 'hover:bg-white/5 active:bg-white/10'}`}>Sanskrit</div>
    </div>
  )
}

export function CommentaryShowButton() {
  const searchParams = useSearchParams()
  // const sanskritCommentary = searchParams.has('sanskritCommentary')? searchParams.get('sanskritCommentary') == 'true': false;
  const showCommentary = searchParams.has('showCommentary')? searchParams.get('showCommentary') == 'true': false;
  const router = useRouter()
  const pathname = usePathname()

  return (
    <button className="select-none flex items-center p-1.5 rounded hover:bg-white/10" onClick={() => {
      const newParams = new URLSearchParams(searchParams);
      if (showCommentary) newParams.delete('showCommentary')
      else newParams.set('showCommentary', 'true');
      router.replace(`${pathname}?${newParams}`)
    }}>
      <span className="material-symbols-rounded">{showCommentary? 'keyboard_arrow_up': 'keyboard_arrow_down'}</span>
    </button>
  )
}