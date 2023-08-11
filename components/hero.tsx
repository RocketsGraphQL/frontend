'use client'

import Image from 'next/image'
import Particles from './particles'
import Features01 from '@/components/features-01'

import Illustration from '@/public/images/glow-bottom.svg'
import CodeImage from "@/public/carbon.svg"
import Highlighter, { HighlighterItem } from './highlighter'

export default function Hero() {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        {/* <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={CodeImage} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div> */}

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">
          {/* https://blog.rocketgraph.io/posts/messaging-app */}
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            {/* <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md">
                <a className="btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow" href="https://twitter.com/RGraphql/status/1679465674849271809?s=20">
                  <span className="relative inline-flex items-center">
                    AI Studio is now in beta <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </span>
                </a>
              </div>
            </div> */}
            <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-purple-500 before:blur-md">
                <a className="btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.purple.500),_theme(colors.purple.500))_padding-box,_linear-gradient(theme(colors.purple.500),_theme(colors.purple.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow" href="https://github.com/RocketsGraphQL/rgraph/releases/tag/v0.2-stable">
                  <span className="relative inline-flex items-center">
                    Checkout the v0.2.0 stable release <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </span>
                </a>
              </div>
            </div>
            <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" data-aos="fade-down">Backend with superpowers</h1>
            {/* <div className='wrapper mb-10'>
              <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" data-aos="fade-down">The Platform for your           
                <div className="slidingVertical text-center">
                      <span>Authentication</span>
                      <span>Subscriptions</span>
                      <span >Storage</span>
                      <span>Machine Learning</span>
                </div>
              </h1>
            </div> */}

            <p className="text-lg text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">Supercharge your web applications with Authentication, Database, GraphQL and serverless functions right from day zero.</p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-down" data-aos-delay="400">
              <div>
                <a className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group" href="/signup">
                  Get Started <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </a>
              </div>
              <div>
                <a className="btn text-slate-200 hover:text-white bg-slate-800 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out" href="https://docs.rocketgraph.io/">
                  <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
                  </svg>
                  <span>Read the docs</span>
                </a>
              </div>
            </div>
          </div>

          {/* Box #2 */}
          <div className="hidden md:block md:col-span-7 pt-16" data-aos="fade-down">
            <HighlighterItem>
              <Image
                src={CodeImage}
                alt="Picture of the rgql"
                className="code-container"
                // width={600}
                // height={300}
              /> 
            </HighlighterItem>
          </div>
        </div>

      </div>
    </section>
  )
}