
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


import { type ChatProps } from "./chat"

export function MessageBox({ messages }: ChatProps ) {
    return (
        <>
        <div className="rounded-md bg-white">
        <div
            className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col rounded-sm"
        >
            <div className="grid grid-cols-12 p-2">
                <div className="col-span-10">
                    <motion.div>
                        <div className="bg-black p-4 rounded-md whitespace-pre-wrap">
                            Rocketgraph lets developers build production grade web applications in minutes rather than in weeks.
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-12 p-2">
                <div className="col-span-10 col-start-3">
                    <motion.div>
                        <div className="bg-accent text-black p-4 rounded-md whitespace-pre-wrap">
                            Rocketgraph lets developers build production grade web applications in minutes rather than in weeks.
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
        </div>

        </>
        // <Card className="w-full">
        //   <CardContent className="overflow-y-auto overflow-x-hidden">


        //   </CardContent>
        // </Card>
    )
}

