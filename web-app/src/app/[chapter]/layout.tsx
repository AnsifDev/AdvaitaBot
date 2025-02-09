import { AppLayout, ContentScrollWindow, SidebarLink } from "./client/components"
import ChatClient from "./client/chat_client"
import Link from "next/link"
import { generateArray } from "@/utils"
import { Suspense } from "react"
import { chapters } from "@/chapters"

type SidebarParams = {
  children?: React.ReactNode
}

function NavSidebar({ children }: SidebarParams) {
  return (
    <div className="contents">
      <div className="flex flex-row min-h-16 p-4 gap-2 items-center">
        <div className="text font-bold text-lg text-center flex-1">{process.env.NEXT_PUBLIC_APP_NAME}</div>
      </div>
      {children}
    </div>
  )
}

async function SidebarField({ props }: { props: LayoutParams }) {
  const params = await props.params
  const chapters = generateArray<string>(18, (i) => `Chapter ${i+1}`);

  return (
    <div className="flex flex-col flex-1 gap-2 px-2 py-2 overflow-auto rounded-scrollbar hover:rounded-scrollbar-thumb-neutral-600 rounded-scrollbar-track-neutral-800">
      {chapters.map((s, i) => (<SidebarLink href={`/${i+1}/1`} key={i} className={`flex px-4 py-2 rounded-md ${Number.parseInt(params.chapter) == i+1? 'hover:bg-white/20 bg-white/15': 'hover:bg-white/10'} text-start`}>{s}</SidebarLink>))}
    </div>
  )
}

async function ContentTitle({ props }: { props: LayoutParams }) {
	const params = await props.params;
	return (
		<div className="contents">{`Chapter ${params.chapter}`}</div>
	)
}

async function ChapterDetails({ props }: { props: LayoutParams }) {
	const params = await props.params;
	const chapter = chapters[Number.parseInt(params.chapter)-1]

	return (
		<div className="sm:flex hidden flex-col pb-6">
			<div className="text-3xl font-extrabold text-center mb-2">{chapter.title}</div>
			<div className="text-center">{chapter.title_en}</div>
			
			{/* <div className="text-justify mt-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> */}
		</div>
	)
}

function ChapterDetailsSkel() {
	return (
		<div className="sm:flex hidden flex-col pb-6 animate-pulse">
			<div className="self-center mb-2"><div className="bg-white/10 h-9 w-72 rounded-lg"/></div>
			<div className="self-center"><div className="bg-white/10 h-5 w-64 rounded-lg"/></div>
			
			{/* <div className="text-justify mt-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> */}
		</div>
	)
}

function ContentField( { children, props }: { children: React.ReactNode, props: LayoutParams } ) {
	return (
		<ContentScrollWindow>
			<div className="flex flex-1 flex-col max-w-[960px] self-center container ">
				<Suspense fallback={<ChapterDetailsSkel/>}>
					<ChapterDetails props={props}/>
				</Suspense>
				{children}
			</div>
		</ContentScrollWindow>
	)
}

type Params = {
  chapter: string
}

type LayoutParams = {
	children: React.ReactNode, 
	params: Promise<Params>
}

export default function Layout( props: LayoutParams ) {
  return <AppLayout 
		contentTitle={<ContentTitle props={props} />}
		sidebarChild = {<NavSidebar><SidebarField props={props} /></NavSidebar>}
		contentsChild={ <ContentField props={props}>{props.children}</ContentField> }
		chatClient={
			<div className="flex flex-col flex-1 overflow-y-auto rounded-scrollbar hover:rounded-scrollbar-thumb-neutral-700 rounded-scrollbar-track-neutral-900">
				<ChatClient quoteInView="2.3"/>
			</div>
		}
	/>
}