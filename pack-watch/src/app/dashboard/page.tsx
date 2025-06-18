"use client" // Enables client-side rendering for this component

// React hooks and Next.js navigation
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

// Custom components for the UI layout and content
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { CalendarDashboard } from "@/components/calendar-dashboard"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

// Sample data to populate the table initially
import initialData from "./data.json"

export default function Page() {
  const [tableData, setTableData] = useState(initialData) // State to manage table data

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for token in URL query string (after Google OAuth redirect)
    const token = searchParams.get("token")

    if (token) {
      // Save token to localStorage and clean up URL
      localStorage.setItem("jwt", token)
      console.log("✅ JWT saved to localStorage:", token)
      router.replace("/dashboard")
    } else {
      // If no token in URL, check localStorage
      const existingToken = localStorage.getItem("jwt")
      if (!existingToken) {
        // If no token at all, redirect user to login page
        console.warn("No JWT found, redirecting to login")
        router.push("/")
      }
    }
  }, [router, searchParams])

  // Function to add a new placeholder row to the table
  const handleAddRow = () => {
    const newRow = {
      id: tableData.length + 1,
      expense: "N/A",
      category: "N/A N",
      price: "N/A",
      date: "N/A",
      status: "N/A",
      reviewer: "N/A",
    }
    setTableData([...tableData, newRow])
  }

  return (
    <SidebarProvider
      // Custom CSS properties for layout dimensions
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* App layout with sidebar and header */}
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Main dashboard sections */}
              <SectionCards tableData={tableData} onAddRow={handleAddRow} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="px-4 lg:px-6">
                <CalendarDashboard />
              </div>
              <DataTable data={tableData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// export default function Page() {
//   return (
//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "calc(var(--spacing) * 72)",
//           "--header-height": "calc(var(--spacing) * 12)",
//         } as React.CSSProperties
//       }
//     >
//       <AppSidebar variant="inset" />
//       <SidebarInset>
//         <SiteHeader />
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//               <SectionCards />
//               <div className="px-4 lg:px-6">
//                 <ChartAreaInteractive />
//               </div>
//               <DataTable data={data} />
//             </div>
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }