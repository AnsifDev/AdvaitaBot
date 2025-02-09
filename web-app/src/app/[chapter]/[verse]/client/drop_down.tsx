"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { usePathname, useRouter } from 'next/navigation'

type DropDownParams = {
  list: Array<string>,
}

export function DropDown({list}: DropDownParams) {
  const router = useRouter();
  const [ chapter, verse ] = usePathname().split('/').slice(1);

  const selectedIndex = Number.parseInt(verse)-1;

  return (
    <Listbox value={list[selectedIndex]} onChange={(value) => router.push(`/${chapter}/${list.indexOf(value)+1}`)}>
      <ListboxButton className={"text-left dark:hover:bg-white/10 hover:bg-black/10 py-1 px-4 rounded-md flex flex-row items-center gap-4"}>
        <div>{list[selectedIndex]}</div>
        <span className='material-symbols-rounded !text-base'>unfold_more</span>
      </ListboxButton>
      <ListboxOptions anchor="bottom" className={"z-40 dark:bg-neutral-700 bg-neutral-300 dark:text-white text-black min-w-64 rounded-lg p-2"}>
        {list.map((item) => (
          <ListboxOption key={item} value={item} className="dark:data-[focus]:bg-neutral-500 data-[focus]:bg-neutral-400 py-1 px-3 rounded">
            {item}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}