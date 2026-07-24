import { useState } from "react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

export default function OptionPicker({
  options,
  placeHolder,
  selected,
  fieldName,
  className,
  onSelect,
  id,
}: {
  options?: OptionType[]
  placeHolder?: string
  selected?: string
  fieldName?: string
  id?: string
  className?: string
  onSelect?: () => void
}) {
  const defaultOption = options?.find((op) => op.key === selected)
  const [item, setItem] = useState<OptionType | undefined>(defaultOption)

  return (
    <div className={cn("w-full", className)}>
      <DropdownMenu>
        <Input
          id={id}
          defaultValue={item?.key}
          className="hidden"
          name={fieldName}
        ></Input>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            {item?.name || placeHolder || "Select"}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            {options?.map(({ key, name }) => {
              return (
                <DropdownMenuItem
                  key={key}
                  onClick={() => {
                    setItem({ key, name })
                    if (onSelect) {
                      onSelect()
                    }
                  }}
                >
                  {name}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export interface OptionType {
  key: string
  name: string
}
