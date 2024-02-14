'use client'

import Image from 'next/image'
import Particles from './particles'
import Features01 from '@/components/features-01'

import Illustration from '@/public/images/glow-bottom.svg'
import CodeImage from "@/public/carbon.svg"
import Highlighter, { HighlighterItem } from './highlighter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faFlask, faKey, faDatabase, faWandMagicSparkles, faTimes, faVolumeUp, faVolumeMute, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons'


const Features03 = () => {
  return (
    <>
          {/* Features list */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12 pl-8">
            {/* Feature */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {/* <svg className="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M7.999 2.34a4.733 4.733 0 0 0-6.604 6.778l5.904 5.762a1 1 0 0 0 1.4 0l5.915-5.77a4.733 4.733 0 0 0-6.615-6.77Zm5.208 5.348-5.208 5.079-5.2-5.07a2.734 2.734 0 0 1 3.867-3.864c.182.19.335.404.455.638a1.04 1.04 0 0 0 1.756 0 2.724 2.724 0 0 1 5.122 1.294 2.7 2.7 0 0 1-.792 1.923Z" />
                </svg> */}
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-pink" icon={faDatabase} />
                </div>

                <h4 className="font-medium text-slate-50">PostgreSQL DB</h4>
              </div>
              <p className="text-sm text-slate-400">PostgresSQL DB automatically deployed and configured. You can access this from the Hasura console as well.</p>
            </div>
            {/* Feature */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {/* <svg className="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                </svg> */}
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-halogen" icon={faKey} />
                </div>
                <h4 className="font-medium text-slate-50">Authentication</h4>
              </div>
              <p className="text-sm text-slate-400">Authentication with Email/Password, Social, Magic Link, OTP and 2FA right out of the box integrated into PostgresDB</p>
            </div>
            {/* Feature */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {/* <svg className="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M14 0a2 2 0 0 1 2 2v4a1 1 0 0 1-2 0V2H2v12h4a1 1 0 0 1 0 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm-1.957 10.629 3.664 3.664a1 1 0 0 1-1.414 1.414l-3.664-3.664-.644 2.578a.5.5 0 0 1-.476.379H9.5a.5.5 0 0 1-.48-.362l-2-7a.5.5 0 0 1 .618-.618l7 2a.5.5 0 0 1-.017.965l-2.578.644Z" />
                </svg> */}
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-orange" icon={faWandMagicSparkles} />
                </div>
                <h4 className="font-medium text-slate-50">Hasura</h4>
              </div>
              <p className="text-sm text-slate-400">Hasura console deployed and connected to the Postgres Instance. You can manage granular authorization rules here.</p>
            </div>
            {/* Feature */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {/* <svg className="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                </svg> */}
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-blue" icon={faMagnifyingGlass} />
                </div>
                <h4 className="font-medium text-slate-50">Postgres Logger</h4>
              </div>
              <p className="text-sm text-slate-400">Write complex queries to filter your Postgres logs. See it in action below</p>
            </div>
            {/* Feature */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-purple" icon={faCloud} />
                </div>
                <h4 className="font-medium text-slate-50">Management</h4>
              </div>
              <p className="text-sm text-slate-400">Manage your data with ease using the Rocketgraph Dashboard.</p>
            </div>
            {/* Feature */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className='border-sm rounded px-2 py-1 bg-scale-300'>
                  <FontAwesomeIcon className="feature-showcase-yellow" icon={faFlask} />
                </div>
                <h4 className="font-medium text-slate-50">Lambda functions</h4>
              </div>
              <p className="text-sm text-slate-400">Our Github bot compiles your code automatically to thin AWS Lambdas</p>
            </div>
          </div>
    </>
  )
}


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
        {/* Illustration */}
        {/* <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
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
                  🎉 &nbsp; Checkout the v0.2.0 stable release 
                  {/* <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">

                  </span> */}
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
                  Get Started 
                  {/* <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span> */}
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

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
          {/* <div className="hidden md:block md:col-span-7 pt-16" data-aos="fade-down">
            <HighlighterItem>
              <Image
                src={CodeImage}
                alt="Picture of the rgql"
                className="code-container"
                // width={600}
                // height={300}
              /> 
            </HighlighterItem>
          </div> */}
          {Features03()}
        </div>

      </div>
    </section>
  )
}