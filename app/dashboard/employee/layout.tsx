"use client"
import type React from "react"
import { EmployeeSidebar } from "@/components/layout/employee-sidebar"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EmployeeSidebar>{children}</EmployeeSidebar>
}
