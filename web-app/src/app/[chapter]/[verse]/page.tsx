import { generateArray } from "@/utils";
import Link from "next/link";
import { DropDown } from "./client/drop_down";
import { CommentarySanskitSwitch, CommentaryShowButton, Quotes, VerseHeaderView } from "./client/components";
import { getVerse } from "@/ports";
import { Suspense } from "react";
import { chapters } from "@/chapters";
import { notFound } from "next/navigation";
import ErrorBoundary from "@/components/error_boundary"

function QuoteError() {
  return <div className="flex-1 flex flex-col items-center justify-center">
      <div className="material-symbols-rounded !text-[192px] text-red-600">report</div>
      <div className="mt-4 text-center">Sorry for the inconvenience. It looks like we are unable to fetch the requested data. Please contact the Web App Admin for this data</div>
  </div>
}

async function QuoteSection({ props }: { props: PageParams }) {
  const params = await props.params;
  const quote = await getVerse(Number.parseInt(params.chapter), Number.parseInt(params.verse));

  if (quote == null) notFound()

  return <Quotes quote={quote}/>
}


type SearchParams = {
  chat: string
}

type Params = {
  chapter: string,
  verse: string
}

type PageParams = {
  searchParams: Promise<SearchParams>,
  params: Promise<Params>
}

function QuoteSkel() {
  const chat = false
  return (
    <div className="flex flex-col gap-4 py-4 animate-pulse">
      <div className={`flex flex-col ${chat? 'lg:flex-row': 'md:flex-row'}  h-min items-stretch gap-2 font-normal overflow-auto`}>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  dark:bg-white/10 bg-black/10 py-3 px-4 text-center flex items-center justify-center h-24`}></div>
          <div className={`rounded flex-none ${chat? 'lg:flex-1': 'md:flex-1'}  dark:bg-white/10 bg-black/10 py-3 px-4 text-center flex items-center justify-center h-24`}></div>
      </div>
      <div className={`flex flex-col gap-2 text-justify italic rounded ${chat? 'dark:bg-white/10 bg-black/10 sm:bg-transparent px-4 sm:px-2 py-3 sm:py-2': 'p-2'}`}>
        <div className="not-italic flex flex-row gap-3 items-center">
          <div className="flex-1">Commentary</div>
          <CommentarySanskitSwitch/>
          <div className={`${chat? 'sm:hidden': 'hidden'}`}><CommentaryShowButton/></div>
        </div>
        <div className="h-32 rounded-lg dark:bg-white/10 bg-black/10"/>
      </div>
    </div>
  )
}

export default async function Page(props: PageParams) {
  const params = await props.params;
  const verses = generateArray<string>(chapters[Number.parseInt(params.chapter)-1].verse_count, (i) => `Verse ${i+1}`);
  return (
    <div className="flex flex-1 flex-col ">
      <VerseHeaderView>
        <DropDown list={verses}/>
        <div className="flex flex-row gap-2">
          <Link href={`/${params.chapter}/${Number.parseInt(params.verse)-1}`} className="h-9 w-9 rounded dark:hover:bg-white/10 hover:bg-black/10 flex items-center justify-center"><span className="material-symbols-rounded">keyboard_arrow_left</span></Link>
          <Link href={`/${params.chapter}/${Number.parseInt(params.verse)+1}`} className="h-9 w-9 rounded dark:hover:bg-white/10 hover:bg-black/10 flex items-center justify-center"><span className="material-symbols-rounded">keyboard_arrow_right</span></Link>
        </div>
      </VerseHeaderView>
      
      <ErrorBoundary fallback={<QuoteError />}>
        <Suspense fallback={<QuoteSkel />}>
          <QuoteSection props={props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}