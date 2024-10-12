import React from "react"

type AppLayoutParams = {
    headerbar?: React.ReactNode,
    sidebar?: React.ReactNode,
    contentHeaderbar?: React.ReactNode,
    children?: React.ReactNode,
}

export default function AppLayout({ headerbar, sidebar, contentHeaderbar, children }: AppLayoutParams) {
    return (
        <div className="flex flex-col md:flex-row h-full overflow-auto">
            <div className="flex flex-col md:flex-1 md:basis-1/4 min-w-64 md:max-w-96 md:bg-white/10">
                <div>{headerbar}</div>
                <div className="hidden md:block flex-1 overflow-auto">
                    {sidebar}
                </div>
            </div>
            <div className="flex gap-2 flex-col flex-1 md:basis-3/4 items-stretch overflow-auto">
                <div className="md:hidden flex bg-neutral-900 text-lg font-bold">{sidebar}</div>
                <div className="md:sticky md:top-0 flex-col">{contentHeaderbar}</div>
                {children}
            </div>
        </div>
    )
}