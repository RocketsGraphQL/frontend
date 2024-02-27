export const metadata = {
    title: 'Sign In - Mosaic',
    description: 'Page description',
}

  import { type Message } from 'ai/react'

  const messages: Message[] = [
    {
      id: '123445',
      content: "Rocketgraph lets developers build production grade web applications in minutes rather than in weeks.",
      role: "user"
    },
    {
      id: '678991',
      content: "We do this by providing pre-configured PostgresDB, built-in authentication, Managed GraphQl API and console, serverless functions and a custom chatbot right out of the box.",
      role: "system"
    }
  ]
  

  import { Chat } from '@/components/ai/chat'
  
  export interface ChatPageProps {
    params: {
      id: string
    }
  }
  
  export default async function ChatPage({ params }: ChatPageProps) {
  
    return <Chat id={"12345"} initialMessages={messages} />
  }

  