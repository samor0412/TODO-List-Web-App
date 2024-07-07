import { useState } from 'react'
import ArrowDown from 'assets/arrow-down.svg?react'

interface Props {
  icon?: React.ReactNode
  value: string
  onClick: (value: string) => void
  options: Record<string, string>
}
export const Dropdown: React.FC<Props> = ({
  icon,
  value,
  options,
  onClick
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      data-testid="dropdown"
      onClick={() => {
        setOpen(!open)
      }}
    >
      <summary className="btn m-1 flex w-full flex-nowrap items-center justify-between">
        {icon}
        {options[value]}
        <ArrowDown
          className="fill-neutral-content"
          width="20px"
          height="20px"
        />
      </summary>
      {open && (
        <ul className="menu dropdown-content dropdown-hover absolute z-[1] m-1 w-52 rounded-md bg-base-100 p-2 shadow">
          {Object.entries(options).map(([value, display]) => (
            <li
              className="cursor-pointer py-2 pl-2"
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
