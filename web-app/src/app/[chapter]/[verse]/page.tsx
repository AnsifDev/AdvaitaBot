import Link from "next/link"

type PageParams = {
    params: {
        chapter: number,
        verse: number, 
    } 
}

export default function Page({ params }: PageParams) {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-white bg-neutral-900">
            <div className="text-3xl font-bold my-4 mx-6">Chapter {params.chapter}, Verse {params.verse}</div>
            <div className="flex flex-col md:flex-row h-min items-stretch gap-2 p-4 font-normal overflow-auto container">
                <div className="rounded flex-1 bg-white/10 py-2 px-4 text-center select-none">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</div>
                <div className="rounded flex-1 bg-white/10 py-2 px-4 text-center">No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</div>
            </div>
            <Link href={`/${params.chapter}/${params.verse}/chat`} className="bg-white hover:bg-white/80 active:bg-white/60 text-neutral-900 py-2 px-4 rounded-full font-bold">Start A Chat</Link>
        </div>
    )
}