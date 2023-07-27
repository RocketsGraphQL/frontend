'use client'

import { useState } from 'react'

import Image from 'next/image'
import { Transition } from '@headlessui/react'
import Particles from './particles'
import Illustration from '@/public/images/glow-top.svg'
import { HighlighterItem } from './highlighter'
import CodeImage from "@/public/code_example.gif"
import RocketgraphDashboard from "@/public/rocketgraph_dashboard.gif"
import InsideDashboard from "@/public/kap.gif"

export default function Features() {

  const [tab, setTab] = useState<number>(1)

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Illustration */}

        <div className="pt-16 pb-12 md:pt-52 md:pb-20">

          <div>

            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

              {/* Content */}
              <div className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center" data-aos="fade-down">
                {/* Content #1 */}
                {/* <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">The security first platform</div>
                </div> */}
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">Simplify your Authorisation</h3>
                <p className="text-lg text-slate-400 mb-8">Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.</p>
                <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
                  <button className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${tab !== 1 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'}`} onClick={() => setTab(1)}>
                    <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>Simplify your security</span>
                  </button>
                  <button className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${tab !== 2 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'}`} onClick={() => setTab(2)}>
                    <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>Dashboard</span>
                  </button>
                  <button className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${tab !== 3 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'}`} onClick={() => setTab(3)}>
                    <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>Adaptable authentication</span>
                  </button>
                </div>
              </div>

              {/* Box #2 */}
              {
                tab == 1 ?
                <div className="md:col-span-7 pt-16" data-aos="fade-down">
                  <HighlighterItem>
                    <Image
                      src={RocketgraphDashboard}
                      alt="Picture of the rgql"
                      className="code-container"
                      // width={600}
                      // height={300}
                    /> 
                  </HighlighterItem>
                </div> : null
              }
              {
                tab == 2 ?
                <div className="md:col-span-7 pt-16" data-aos="fade-down">
                  <HighlighterItem>
                    <Image
                      src={CodeImage}
                      alt="Picture of the rgql"
                      className="code-container"
                      // width={600}
                      // height={300}
                    /> 
                  </HighlighterItem>
                </div> : null
              }
              {
                tab == 3 ?
                <div className="md:col-span-7 pt-16" data-aos="fade-down">
                  <HighlighterItem>
                    <Image
                      src={CodeImage}
                      alt="Picture of the rgql"
                      className="code-container"
                      // width={600}
                      // height={300}
                    /> 
                  </HighlighterItem>
                </div> : null
              }
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}