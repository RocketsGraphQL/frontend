'use client'
import Sidebar from "@/components/ui/sidebar";

export default function DefaultLayout({
  params,
  children,
}: {
  params: { id: String },
  children: React.ReactNode
}) {  
  console.log("params", params)
  const project_id = params.id;
  return (
    <>      
      <main className="h-screen bg-scale-300">
        <Sidebar pid={project_id} />
        <div className="ml-20">
          {children}
        </div>
      </main>
    </>
  )
}
