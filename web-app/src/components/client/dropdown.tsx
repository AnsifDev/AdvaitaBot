"use client"

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

type DropDownParams = {
  list: Array<string>,
  selectedIndex: number,
  onChange: (index: number) => void
}

export function DropDown({list, selectedIndex, onChange}: DropDownParams) {
  return (
    <Listbox value={list[selectedIndex]} onChange={(value) => onChange(list.indexOf(value))}>
      <ListboxButton className={"text-left bg-neutral-700 py-1 px-3 rounded-md"}>{list[selectedIndex]}</ListboxButton>
      <ListboxOptions anchor="bottom" className={"bg-neutral-600 text-white min-w-64 rounded-lg p-2"}>
        {list.map((item) => (
          <ListboxOption key={item} value={item} className="data-[focus]:bg-neutral-500 py-1 px-3 rounded">
            {item}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}