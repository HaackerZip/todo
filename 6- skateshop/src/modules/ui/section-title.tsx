import type React from "react"

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return <h2 className={`text-3xl font-bold text-vintage-gold ${className}`}>{children}</h2>
}
