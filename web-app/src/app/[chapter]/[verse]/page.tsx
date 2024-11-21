import { generateArray } from "@/utils";
import Link from "next/link";
import { DropDown } from "./client/drop_down";
import { CommentarySanskitSwitch, CommentaryShowButton, Overlay, OverlayButton } from "./client/components";
import ChatClient from "./client/chat_client";
import ChatButton from "./client/chat_button";

type SidebarParams = {
  sidebarChild?: React.ReactNode
}

function NavSidebar({ sidebarChild }: SidebarParams) {
  return (
    <div className="contents">
      <div className="flex flex-row min-h-16 p-4 gap-2 items-center">
        <div className="text font-bold text-lg text-center flex-1">{process.env.NEXT_PUBLIC_APP_NAME}</div>
      </div>
      {sidebarChild}
    </div>
  )
}
type AppLayoutParams = { 
  searchParams: SearchParams
  chatClient?: React.ReactNode,
  contentsChild?: React.ReactNode,
  contentTitle?: React.ReactNode,
} & SidebarParams;

function AppLayout({ sidebarChild, contentsChild, contentTitle, chatClient, searchParams }: AppLayoutParams) {
  const chat = searchParams.chat != undefined? searchParams.chat == 'true': false;
  return (
    <div className="h-screen bg-neutral-900 flex flex-row text-white">
      <div className="fixed top-0 left-0 z-20 h-16 w-16 flex items-center justify-center"><OverlayButton/></div>
      <div className={`bg-neutral-800 basis-1/5 max-w-96 min-w-72 hidden ${chat?'xl:flex': 'lg:flex'} flex-col`}><NavSidebar sidebarChild={sidebarChild}/></div>
      <div className={`flex flex-col flex-1 sm:flex-row sm:overflow-hidden overflow-auto`}>
        <div className={`flex flex-col flex-1 ${chat? 'xl:bg-[#1F1F1F] sm:bg-neutral-800': ''}`}>
          <div className={`flex flex-row min-h-16 px-4 gap-2 items-center sticky top-0 z-10 bg-neutral-900 ${chat? 'xl:bg-[#1F1F1F] sm:bg-neutral-800': ''}`}>
            <div className={`text font-bold text-lg text-center flex-1`}>{contentTitle}</div>
          </div>
          {contentsChild}
        </div>
        <div className={`flex-1 sm:flex-none sm:basis-[45%] lg:basis-[33.33%] min-w-72 ${chat? 'flex': 'hidden'} flex-col`}>
          <div className="flex flex-row min-h-16 px-4 gap-2 items-center sticky top-0 z-10 bg-neutral-900">
            <div className={`text font-bold text-lg  text-center flex-1`}>Chats</div>
          </div>
          {chatClient}
        </div>
      </div>
      <Overlay>
        <NavSidebar sidebarChild={sidebarChild}/>
      </Overlay>
    </div>
  );
}

async function Quotes({ searchParams }: { searchParams: SearchParams }) {
  const chat = searchParams.chat != undefined? searchParams.chat == 'true': false;
  const showCommentary = searchParams.showCommentary != undefined? searchParams.showCommentary == 'true': false;

  // const quote = await fetchQuote(chapter, verse);
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const quote = {
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    translation: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    commentary: `${lorem}\n\n${lorem}\n\n${lorem}\n\n${lorem}`
  }
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className={`flex flex-col ${chat? 'lg:flex-row': 'md:flex-row'}  h-min items-stretch gap-2 font-normal overflow-auto`}>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  bg-white/10 py-3 px-4 text-center flex items-center justify-center`}>{quote?.quote}</div>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  bg-white/10 py-3 px-4 text-center flex items-center justify-center`}>{quote?.translation}</div>
      </div>
      <div className={`flex flex-col gap-2 text-justify italic rounded ${chat? 'bg-white/10 sm:bg-transparent px-4 sm:px-2 py-3 sm:py-2': 'p-2'}`}>
        <div className="not-italic flex flex-row gap-3 items-center">
          <div className="flex-1">Commentary</div>
          <div className={`${showCommentary || !chat? 'block': 'sm:block hidden'}`}><CommentarySanskitSwitch/></div>
          <div className={`${chat? 'sm:hidden': 'hidden'}`}><CommentaryShowButton/></div>
        </div>
        <div className={`${showCommentary || !chat? 'flex': 'hidden sm:flex'} flex-col gap-2`}>
          {quote?.commentary?.split('\n\n').map((v, i) => <p key={i}>{v}</p>)}
        </div>
        
      </div>
    </div>
  )
}

type SearchParams = {
  docked?: string,
  chat?: string,
  sanskritCommentary?: string,
  showCommentary?: string
}

type PageParams = {
  params: {
    chapter: string,
    verse: string
  },
  searchParams: SearchParams
}

export default async function Page({ params, searchParams }: PageParams) {
  const chapters = generateArray<string>(18, (i) => `Chapter ${i+1}`);
  const verses = generateArray<string>(20, (i) => `Verse ${i+1}`);
  const chat = searchParams.chat != undefined? searchParams.chat == 'true': false;
  return (
    <AppLayout 
      searchParams={searchParams}
      contentTitle={`Chapter ${params.chapter}`}
      sidebarChild = {
        <div className="flex flex-col flex-1 gap-2 px-2 py-2 overflow-auto rounded-scrollbar hover:rounded-scrollbar-thumb-neutral-600 rounded-scrollbar-track-neutral-800">
          {chapters.map((s, i) => (<Link href={`/${i+1}/1`} key={i} className={`px-4 py-2 rounded-md ${Number.parseInt(params.chapter) == i+1? 'hover:bg-white/20 bg-white/15': 'hover:bg-white/10'} text-start`}>{s}</Link>))}
        </div>
      }
      contentsChild={
        <div className={`flex flex-1 flex-col sm:overflow-auto px-4 rounded-scrollbar rounded-scrollbar-track-neutral-900 hover:rounded-scrollbar-thumb-neutral-700 ${chat? 'xl:rounded-scrollbar-track-[#1F1F1F] hover:xl:rounded-scrollbar-thumb-[#4F4F4F] sm:rounded-scrollbar-track-neutral-800 hover:sm:rounded-scrollbar-thumb-neutral-600': 'pb-16'}`}>
          <div className="flex flex-1 flex-col max-w-[960px] self-center container ">
            <div className="sm:flex hidden flex-col pb-6">
              <div className="text-3xl font-extrabold text-center mb-8">Chapter Name</div>
              <div className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
            
            <div className={`flex flex-row pb-2 justify-between sticky top-16 sm:top-0 bg-neutral-900 ${chat? 'xl:bg-[#1F1F1F] sm:bg-neutral-800': ''}`}>
              <DropDown list={verses}/>
              <div className="flex flex-row gap-2">
                <Link href={`/${params.chapter}/${Number.parseInt(params.verse)-1}`} className="h-9 w-9 rounded hover:bg-white/10 flex items-center justify-center"><span className="material-symbols-rounded">keyboard_arrow_left</span></Link>
                <Link href={`/${params.chapter}/${Number.parseInt(params.verse)+1}`} className="h-9 w-9 rounded hover:bg-white/10 flex items-center justify-center"><span className="material-symbols-rounded">keyboard_arrow_right</span></Link>
              </div>
            </div>
            <Quotes searchParams={searchParams}/>
          </div>
          <div hidden={chat} className="fixed bottom-4 right-8">
            <ChatButton />
          </div>
        </div>
      }
      chatClient={
        <div className="flex flex-col flex-1 overflow-y-auto rounded-scrollbar hover:rounded-scrollbar-thumb-neutral-700 rounded-scrollbar-track-neutral-900">
          <ChatClient quoteInView="2.3"/>
        </div>
      }
    />
  )
}