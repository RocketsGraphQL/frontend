'use client'

import { useState } from 'react'
import { useRef } from "react";
import { useInView } from "framer-motion";

import Image from 'next/image'
import { Transition } from '@headlessui/react'
import Particles from './particles'
import Illustration from '@/public/images/glow-top.svg'
import { HighlighterItem } from './highlighter'
import CodeImage from "@/public/code_showcase_15fps.gif"
import RocketgraphDashboard from "@/public/rocketgraph_dashboard_15fps.gif"
import HasuraDashboard from "@/public/hasura_dashboard_showcase_15fps.gif"
import { motion } from "framer-motion"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faFlask, faKey, faDatabase, faWandMagicSparkles, faMagnifyingGlass, faCrown } from '@fortawesome/free-solid-svg-icons'

// testing
import GrayFeatures from "@/components/features-gray-01";


const TabFeatures = () => {
  const [tab, setTab] = useState<number>(1)

  return (
    <>
      <div className="pt-16 pb-12 md:pt-52 md:pb-20 hidden md:block">

      <div>

        {/* Section content */}
        <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

          {/* Content */}
          <div className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center" data-aos="fade-down">
            {/* Content #1 */}
            {/* <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">The security first platform</div>
            </div> */}
            <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">Easy setup</h3>
            <p className="text-lg text-slate-400 mb-8">Define access roles for the end-users, and extend your authorization capabilities to implement dynamic access control.</p>
            <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
              <button className={`flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${tab !== 1 ? 'border-slate-700 opacity-50' : 'border-purple-700 shadow shadow-purple-500/25'}`} onClick={() => setTab(1)}>
                <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                </svg>
                <span>API</span>
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
                <span>Authorization</span>
              </button>
            </div>
          </div>

          {/* Box #2 */}
          {
            tab == 1 ?
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
            tab == 2 ?
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
            tab == 3 ?
            <div className="md:col-span-7 pt-16" data-aos="fade-down">
              <HighlighterItem>
                <Image
                  src={HasuraDashboard}
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
    </>
  )
}


const CodeFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, 
    { once: true}
  );

  return(
    <>
      <div className="pt-16 pb-12 md:pt-36 md:pb-20">

        <div>

          {/* Section content */}
          <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

            {/* Content */}
            <div className="md:w-7/12 lg:w-1/2 order-1 md:order-none" data-aos="fade-down">
              {/* Content #1 */}
              <motion.div 
                  id="animate-code-block" 
                  ref={ref}
                  // transition-style={inView ? "in:wipe:right": null} 
                  className="code-container-react rounded-sm">
                  <div className="code-editor-header text-center">React.js
                  </div>
                  <div className="hero-code-showcase">
                      <pre className="code-content">
                          <motion.div
                            animate={{
                              x: isInView ? [-200, 0] : "none",
                            }}
                            transition={{
                              x: {
                                duration: isInView ? 1.8: "none",
                              }
                            }}
                          >
                          <span><p className="code-line import-pink">import</p> <p className="code-line dep-blue">React, &#123; useState &#125;</p> <p className="code-line import-pink">from </p><p className="import-red code-line">&quot;react&quot;</p>&#59;</span>
                          <span><p className="code-line import-pink">import</p> &#123;</span> 
                          <span>    <p className="dep-blue code-line">gql,</p></span> 
                          <span>    <p className="dep-blue code-line">useQuery,</p></span> 
                          <span>    <p className="dep-blue code-line">useMutation,</p></span> 
                          <span>    <p className="dep-blue code-line">useSubscription</p></span>
                          <span>&#125;  <p className="code-line import-pink">from </p>&quot;<p className="import-red code-line">@apollo/client </p> <p className="code-line dep-blue">&quot;&#59; </p></span>
                          <br />
                          </motion.div>

                          <motion.div
                            animate={{
                              x: isInView ? [-250, 0] : "none",
                            }}
                            transition={{
                              x: {
                                duration: isInView ? 2.7: "none",
                              }
                            }}
                          >
                          <span><p className="code-line dep-blue">const</p> <p className="code-line text-yellow-var">SUBSCRIBE_TODOS</p> = <p className="code-line text-green-color">gql</p>`</span>
                          <span>    <p className="code-line dep-blue">subscription</p> &#123;</span>
                          <span>        <p className="code-line dep-blue">todos</p> &#123;</span>
                          <span>            <p className="code-line dep-blue">id</p></span>
                          <span>            <p className="code-line dep-blue">created_at</p></span>
                          <span>            <p className="code-line dep-blue">name</p></span>
                          <span>        &#125;</span>
                          <span>    &#125;</span>
                          <span>`;</span>

                          <br/>
                          </motion.div>

                          <motion.div
                            animate={{
                              x: isInView ? [-300, 0] : "none",
                            }}
                            transition={{
                              x: {
                                duration: isInView ? 3.5: "none",
                              }
                            }}
                          >
                          <span><p className="code-line dep-blue">function</p> <p className="code-line text-yellow-var">App</p>&#40;&#41; &#123;</span>
                          <span>    <p className="code-line dep-blue">const</p> &#123; </span>
                          <span>        <p className="code-line text-yellow-var">data</p>,</span> 
                          <span>        <p className="code-line text-yellow-var">loading</p></span> 
                          <span>    &#125; = <p className="code-line text-yellow-var">useSubscription</p>&#40;<p className="code-line dep-blue">SUBSCRIBE_TODOS</p>&#41;&#59;</span>

                          <span>&#125;</span>
                          </motion.div>

                      </pre>
                  </div>
              </motion.div>
            </div>

            {/* Box #2 */}
            <div className="md:col-span-7 pt-16" data-aos="fade-down">
              <h3 className="h3 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Simplify your authentication</h3>
              {/* <p className="text-lg text-slate-400 mb-8">Once you define the auth client and use RApolloProvider, subscribing to your data is as simple as writing a JSON of what you want. Simply plugin your favourite frontend framework and deploy production grade web applications in minutes.</p> */}
              {/* <div className="flex items-center space-x-2 mb-1">
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-purple" icon={faCloud} />
                </div>
                <h4 className="font-medium text-slate-50">Configure your Next.js/React code to connect to the backend</h4>
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-purple" icon={faCloud} />
                </div>
                <h4 className="font-medium text-slate-50">Connect RApolloProvider to </h4>
              </div> */}

              <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
                  <li className="mb-10 ml-6">            
                    <span className='border-sm rounded px-2 py-1 bg-scale-300 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700'>
                      <FontAwesomeIcon className="feature-showcase-halogen" icon={faRocket} />
                    </span>
                    <p className="text-md pt-1">Configure Rocketgraph js SDK using createClient</p>
                  </li>
                  <li className="mb-10 ml-6">
                    <span className='border-sm rounded px-2 py-1 bg-scale-300 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700'>
                      <FontAwesomeIcon className="feature-showcase-halogen" icon={faKey} />
                    </span>
                    <p className="text-md pt-1">Connect your Next.js/React.js app with the RApolloProvider</p>
                  </li>
                  <li className="mb-10 ml-6">
                    <span className='border-sm rounded px-2 py-1 bg-scale-300 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700'>
                      <FontAwesomeIcon className="feature-showcase-halogen" icon={faDatabase} />
                    </span>
                    <p className="text-md pt-1">Setup your data and permission rules in the Hasura console</p>
                  </li>
                  <li className="ml-6">
                    <span className='border-sm rounded px-2 py-1 bg-scale-300 absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700'>
                      <FontAwesomeIcon className="feature-showcase-halogen" icon={faWandMagicSparkles} />
                    </span>
                    <p className="text-md pt-1">Subscribe to your tables/data using useSubscription</p>
                  </li>
              </ol>

            </div>
          </div>



        </div>

      </div>
    </>
  )
}

export default function Features() {

  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={1404} height={658} alt="Features Illustration" />
          </div>
        </div>


        {GrayFeatures()}

        {CodeFeatures()}

      </div>
    </section>
  )
}