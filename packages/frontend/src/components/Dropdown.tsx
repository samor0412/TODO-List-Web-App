import { useState } from 'react'
import ArrowDown from 'assets/arrow-down.svg?react'

interface Props {
  value: string
  onClick: (value: string) => void
  options: Record<string, string>
}
export const Dropdown: React.FC<Props> = ({ value, options, onClick }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="display relative"
      data-testid="dropdown"
      onClick={() => {
        setOpen(!open)
      }}
    >
      <summary className="btn m-1 w-full">{options[value]}</summary>
      {open && (
        <ul className="menu dropdown-content dropdown-hover absolute z-[1] m-1 w-52 rounded-md bg-base-100 p-2 shadow">
          {Object.entries(options).map(([value, display]) => (
            <li
              className="py-2 pl-2"
              key={value}
              onClick={() => {
                onClick(value)
                setOpen(false)
              }}
            >
              {display}
            </li>
          ))}
        </ul>
      )}
      <ArrowDown
        className="absolute right-4 top-1/2 -translate-y-1/2 fill-neutral-content"
        width="20px"
        height="20px"
      />
    </div>
  )
}
