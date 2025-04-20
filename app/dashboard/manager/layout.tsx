"use client"
import type React from "react"
import { ManagerSidebar } from "@/components/layout/manager-sidebar"

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ManagerSidebar>{children}</ManagerSidebar>
}
