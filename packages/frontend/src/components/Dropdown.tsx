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
      className="relative display"
      data-testid="dropdown"
      onClick={() => {
        setOpen(!open)
      }}
    >
      <summary className="btn m-1 w-full">{options[value]}</summary>
      {open && (
        <ul className="absolute menu dropdown-content dropdown-hover z-[1] m-1 w-52 rounded-md bg-base-100 p-2 shadow">
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
        className="fill-neutral-content absolute top-1/2 transform -translate-y-1/2 right-4"
        width="20px"
        height="20px"
      />
    </div>
  )
}
