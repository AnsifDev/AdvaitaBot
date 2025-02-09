'use client'

import { useAppState } from "@/providers/app_state_provider"
import ChatButton from "./chat_button"
import Link from "next/link"

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

type AppLayoutParams = { 
  chatClient?: React.ReactNode,
  contentsChild?: React.ReactNode,
  contentTitle?: React.ReactNode,
  sidebarChild?: React.ReactNode
};

export function AppLayout({ sidebarChild, contentsChild, contentTitle, chatClient }: AppLayoutParams) {
  const { chat, setChat } = useAppState()
//   const searchParams = await props.searchParams
//   const chat = searchParams.chat != undefined? searchParams.chat == 'true': false;

  return (
    <div className="h-screen bg-neutral-900 flex flex-row text-white">
      <div className="fixed top-0 left-0 z-20 h-16 w-16 flex items-center justify-center"><OverlayButton/></div>
      <div className={`bg-neutral-800 basis-1/5 max-w-96 min-w-72 hidden ${chat?'xl:flex': 'lg:flex'} flex-col`}>{sidebarChild}</div>
      <div className={`flex flex-col flex-1 sm:flex-row sm:overflow-hidden overflow-auto`}>
        <div className={`flex flex-col flex-1 ${chat? 'xl:bg-[#1F1F1F] sm:bg-neutral-800': ''}`}>
          <div className={`flex flex-row min-h-16 px-4 gap-2 items-center sticky top-0 z-10 bg-neutral-900 ${chat? 'xl:bg-[#1F1F1F] sm:bg-neutral-800': ''}`}>
            <div className={`text font-bold text-lg text-center flex-1`}>{contentTitle}</div>
          </div>
          {contentsChild}
        </div>
        <div className={`flex-1 sm:flex-none sm:basis-[45%] lg:basis-[33.33%] min-w-72 ${chat? 'flex': 'hidden'} flex-col`}>
          <div className="flex flex-row min-h-16 px-4 gap-2 items-center sticky top-0 z-10 bg-neutral-900">
            <div className={`text font-bold text-lg  text-center flex-1 ml-7`}>Chats</div>
            <button onClick={() => setChat(false)} className="hover:bg-white/10 h-7 w-7 flex items-center justify-center rounded-full select-none"><span className="material-symbols-rounded !text-base text-center">close</span></button>
          </div>
          {chatClient}
        </div>
      </div>
      <Overlay>{sidebarChild}</Overlay>
      <div className="fixed bottom-4 right-8">
        <ChatButton />
      </div>
    </div>
  );
}

export function ContentScrollWindow({ children }: { children: React.ReactNode }) {
  const { chat } = useAppState()
  return <div className={`flex flex-1 flex-col sm:overflow-auto px-4 rounded-scrollbar rounded-scrollbar-track-neutral-900 hover:rounded-scrollbar-thumb-neutral-700 ${chat? 'xl:rounded-scrollbar-track-[#1F1F1F] hover:xl:rounded-scrollbar-thumb-[#4F4F4F] sm:rounded-scrollbar-track-neutral-800 hover:sm:rounded-scrollbar-thumb-neutral-600': 'pb-16'}`}>{children}</div>
}

export function SidebarLink({ href, className, children }: { href: string, className: string, children: React.ReactNode }) {
  const { setDocked } = useAppState()

  return <div onClick={() => { setDocked(false) }} className={className}><Link className="flex-1" href={href} >{children}</Link></div>
}