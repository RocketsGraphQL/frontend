'use client';

import { auth } from "@/utils/config";


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
import { RApolloProvider } from '@/experimental/rapollo'
  
  export interface ChatPageProps {
    params: {
      id: string
    }
  }
  
  export default async function ChatPage({ params }: ChatPageProps) {
  

    return (
      <RApolloProvider auth={auth} gqlEndpoint="https://hasura-endpoint.rocketgraph.io/v1/graphql">
        <Chat id={"12345"} initialMessages={messages} instanceId={params.id} />
      </RApolloProvider>
    )
  }

  