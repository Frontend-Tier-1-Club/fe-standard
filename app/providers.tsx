"use client"

import { TooltipProvider } from "@radix-ui/react-tooltip"
import { RootProvider } from "fumadocs-ui/provider"
import type { ReactNode } from "react"

export function AppProvider({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <RootProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </RootProvider>
  )
}
