import AppLayout from "@/components/server/app_layout";
import ChatClient from "./client/chat_client";

type PageParams = {
    params: {
        chapter: number,
        verse: number, 
    } 
}

export default function Page({ params }: PageParams) {
  var headerbar = (
    <div className="flex px-8 md:pt-5 md:pb-3 py-3 bg-neutral-200 dark:bg-neutral-800 dark:md:bg-transparent md:bg-transparent">
      <div className="flex flex-1 md:flex-auto md:flex-col flex-row items-center md:items-start">
        <div className="md:text-xl text-lg font-bold flex-1">WebAppName</div>
        <div className="text-xs text-white/75 py-0.5 h-min">Chapter {params.chapter}, Verse {params.verse}</div>
      </div>
    </div>
  )

  var contentHeaderbar = (
    <div className="px-6 pb-2 pt-3 bg-neutral-900 text-lg text-center font-bold">Chats</div>
  )

  var sidebar = (
    <div className="flex flex-col h-full justify-center">
        <div className="flex flex-col sm:flex-row md:flex-col h-min items-stretch gap-2 p-4 font-normal overflow-auto">
            <div className="rounded flex-1 md:flex-none bg-white/10 py-2 px-4 text-center select-none">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</div>
            <div className="rounded flex-1 md:flex-none bg-white/10 py-2 px-4 text-center">No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</div>
        </div>
    </div>
  )

  return (
    <div className="h-screen flex flex-col text-white bg-neutral-900">
      <AppLayout headerbar={headerbar} sidebar={sidebar} contentHeaderbar={contentHeaderbar} >
        <ChatClient/>
      </AppLayout>
    </div>
  );
}
