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
      <main className="bg-scale-300">
        <Sidebar pid={project_id} />
        <div className="pl-10">
          {children}
        </div>
      </main>
    </>
  )
}
