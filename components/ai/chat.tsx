'use client'

import { useChat, type Message } from 'ai/react'

import { ChatHeader } from "@/components/ai/chat-header"
import { ChatInput } from "@/components/ai/chat-input"
import { MessageBox } from "@/components/ai/message-box"
import { Button } from "@/components/shadcn-ui/button"
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    messages?: Message[]
    id?: string
    chatId?: string
}

const uniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function Chat({ id, initialMessages, className, chatId }: ChatProps) {

    const [ currentMessage,  setCurrentMessage ] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);



    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages)
        }
    }, [])

    const handleChange = (message: string) => {
        setCurrentMessage(message)
    }

    const sendMessageToAIStudio = async (message: string, callback: Function) => {
        const API_URL = `${process.env.NEXT_PUBLIC_AI_STUDIO_BASE_URL}/query`;
        const jwt = Cookies.get("jwt");
        const website_name = Cookies.get("website_name");
        const response = await axios.post(
          API_URL,
          {
            name: "rocketgraph",
            query: message
          }
        );
        console.log(response);
        if (response.status === 200 && response.data) {
          const { answer } = response.data;
          callback(answer)
        }
    }

    const sendMessage = (message: string) => {
        if (initialMessages) {
            const newMessage : Message = {
                id: uniqueId(),
                role: 'user',
                content: message
            };
            initialMessages.push(newMessage)
            setMessages([...initialMessages])

            // send message to AI API
            sendMessageToAIStudio(message, (answer: any) => {
                const newAIMessage : Message = {
                    id: uniqueId(),
                    role: 'system',
                    content: answer
                };
                initialMessages.push(newAIMessage)
                setMessages([...initialMessages])
            })
        }
    }
    return (
      <section className="bg-white dark:bg-transparent">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className="mr-auto lg:col-span-5">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">AI Studio for Training machine learning models</h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From Chatbots to Text to image, use Rocketgraph's AI studio to integrate machine learning tools easily into your tech stack.</p>
                  <div className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                      Coming Soon
                  </div> 
              </div>
              <div className="hidden lg:mt-0 lg:col-span-7 lg:flex ml-4">
                    <div className='grid w-full gap-2 justify-normal'>
                        {/* <ChatHeader /> */}
                        <MessageBox messages={messages} />
                        <div className='row-span-2'>
                            <ChatInput value={currentMessage} onChangeMessage={handleChange} />
                        </div>
                        <div className='row-span-2'>
                            <Button onClick={(e) => {currentMessage.trim() != '' && sendMessage(currentMessage); setCurrentMessage('')}} className='w-full text-red'>Send message</Button>
                        </div>
                    </div>
              </div>                
          </div>
      </section>
    )
}