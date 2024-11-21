import { generateArray } from "@/utils"
import Link from "next/link"

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

type ContentsParams = {
  contentChild?: React.ReactNode
}

function Contents({ contentChild }: ContentsParams) {
  return (
    <div className="contents">
      {contentChild}
    </div>
  )
} 

type AppLayoutParams = {} & SidebarParams & ContentsParams;

function AppLayout({ sidebarChild, contentChild }: AppLayoutParams) {
  return (
    <div className="h-screen bg-neutral-900 flex flex-col">
      <div className="flex flex-row text-white h-full">
        <div className="sm:bg-neutral-800 bg-neutral-900 sm:basis-1/4 sm:max-w-96 flex-1 sm:flex-none min-w-72 flex flex-col"><NavSidebar sidebarChild={sidebarChild}/></div>
        <div className="flex-col flex-1 items-center justify-center hidden sm:flex">
          <Contents contentChild={ contentChild } />
        </div>
      </div>
    </div>
  );
}

export default async function Page() {
  // const chapterCount = await getChapterCount();
  const chapters = generateArray<string>(18, (i) => `Chapter ${i+1}`);

  return (
    <AppLayout
      sidebarChild={
        <div className="flex flex-col flex-1 gap-2 px-2 py-2 overflow-auto">
          <div className="px-4 py-24 flex sm:hidden flex-col items-center">
            {/* <div className="sm:text-3xl text-2xl font-bold mx-4 my-16 text-center">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</div> */}
            <div className="material-symbols-rounded !text-[240px]">web_asset_off</div>
            <div className="text-3xl font-extrabold mt-8 mb-2 mx-4">No Chapter Selected</div>
            <div className=" text-white/70">Select a chapter to get started</div>
          </div>
          {chapters.map((s, i) => (<Link href={`/${i+1}/1`} key={i} className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/15 sm:bg-transparent sm:hover:bg-white/10 text-center sm:text-start">{s}</Link>))}
        </div>
      }
      contentChild={
        <div className="contents">
          {/* <div className="sm:text-3xl text-2xl font-extrabold mx-4 my-16 text-center">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</div> */}
          <div className="material-symbols-rounded !text-[288px]">web_asset_off</div>
          <div className="text-3xl font-extrabold mt-8 mb-2 mx-4">No Chapter Selected</div>
          <div className=" text-white/70">Select a chapter to get started</div>
        </div>
      }
    />
    // <div className="flex flex-col min-h-screen bg-neutral-900 items-center text-white">
    //   <div className="sm:text-3xl text-2xl font-bold mx-4 mt-44 mb-32 text-center">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</div>
    //   <div className="max-w-[960px] container flex flex-col gap-2 px-4 pb-6">
    //     <div className="text-white/80">Choose a chapter to begin</div>
    //     <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
    //       {chapters.map((s, i) => (<div key={i} className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/15 text-center">{s}</div>))}
    //     </div>
    //   </div>
    // </div>
  )
}