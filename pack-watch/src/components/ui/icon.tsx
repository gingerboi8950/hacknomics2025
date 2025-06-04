// src/components/ui/icon.tsx
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"

type IconName = keyof typeof Icons

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  const LucideIcon = Icons[name] as LucideIcon

  if (!LucideIcon) return null

  return <LucideIcon className={className} />
}
