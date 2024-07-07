import { useState } from 'react'

interface Props {
  value: string
  onClick: (value: string) => void
  options: Record<string, string>
}
export const Dropdown: React.FC<Props> = ({ value, options, onClick }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      data-testid='dropdown'
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
    </div>
  )
}
