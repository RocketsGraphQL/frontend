
"use client"

import * as React from "react"

import { Button } from "@/components/shadcn-ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"
import { Input } from "@/components/shadcn-ui/input"
import { Label } from "@/components/shadcn-ui/label"

import { AnimatePresence, motion } from "framer-motion";
import { useChat, type Message } from 'ai/react'


import { type ChatProps } from "./chat"

export function MessageBox({ messages }: ChatProps ) {
    const [messages_, setMessages ] = React.useState<Message[]>([])

    console.log("message list:", messages_)
    React.useEffect(() => {
        if (messages) {
            setMessages(messages);
        }
    }, [messages])

    return (
        <>
            <div className="rounded-md bg-white h-96">
                <div
                    className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col rounded-sm"
                >
                    {
                        messages_ && messages_.map((message) => {
                            return (
                                <div className="grid grid-cols-12 p-2">
                                    <div className={`${message.role == 'user' ? 'col-start-3' : ''} col-span-10`}>
                                        <motion.div>
                                            <div className={`${message.role == 'user' ?  'bg-black' : 'bg-accent text-black'} p-4 rounded-md whitespace-pre-wrap`}>
                                                {message.content}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

