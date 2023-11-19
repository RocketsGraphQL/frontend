"use client"
import {useState} from "react";
import Image from 'next/image'
import Particles from './particles'
import Highlighter, { HighlighterItem } from './highlighter'

import FeatureImg01 from '@/public/images/feature-image-01.png'
import FeatureImg02 from '@/public/images/feature-image-02.png'
import FeatureImg03 from '@/public/images/feature-image-03.png'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faFlask, faKey, faDatabase, faWandMagicSparkles, faTimes, faVolumeUp, faVolumeMute, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons'


export default function Features02() {
  const [muted, setMuted] = useState(true);
  return (
    <section className="relative">

      {/* Particles animation */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24 -ml-32">
        <Particles className="absolute inset-0 -z-10" quantity={6} staticity={30} />    
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-16 md:pt-32">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Built with technologies you love </h2>
            <p className="text-lg text-slate-400">Building authentication, authorisation and realtime functionality can be difficult and time consuming. Instead save one third of your developer time by using Rocketgraph.</p>
          </div>

          {/* Highlighted boxes */}
          <div className="relative pb-12 md:pb-20">
            {/* Blurred shape */}
            <div className="absolute bottom-0 -mb-20 left-1/2 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
                <defs>
                  <linearGradient id="bs2-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path fill="url(#bs2-a)" fillRule="evenodd" d="m346 898 461 369-284 58z" transform="translate(-346 -898)" />
              </svg>
            </div>
            {/* Grid */}
            <Highlighter className="grid md:grid-cols-12 gap-6 group">
              {/* Box #1 */}
              <div className="md:col-span-12" data-aos="fade-down">
                <HighlighterItem>
                  <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      {/* Blurred shape */}
                      <div className="absolute right-0 top-0 blur-2xl" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="342" height="393">
                          <defs>
                            <linearGradient id="bs-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                              <stop offset="0%" stopColor="#6366F1" />
                              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#bs-a)" fillRule="evenodd" d="m104 .827 461 369-284 58z" transform="translate(0 -112.827)" opacity=".7" />
                        </svg>
                      </div>
                      {/* Radial gradient */}
                      <div className="absolute flex items-center justify-center bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 h-full aspect-square" aria-hidden="true">
                        <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-70" />
                        <div className="absolute w-1/4 h-1/4 translate-z-0 bg-purple-400 rounded-full blur-[40px]" />
                      </div>
                      {/* Text */}
                      <div className="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 pt-0 md:p-8 md:pr-0">
                        <div className="mb-5">
                          <div>
                            <h3 className="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">A complete backend</h3>
                            <p className="text-slate-400">Watch our founder speak about what Rocketgraph is and the roadmap that lay ahead.</p>
                          </div>
                        </div>
                        <div>
                          <a className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="https://calendly.com/kaushik-94/30min" target="_blank">
                            <span className="relative inline-flex items-center">
                              Book a call 
                              {/* <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span> */}
                              <FontAwesomeIcon className="group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" icon={faPhone} />
                            </span>
                          </a>
                        </div>
                      </div>
                      {/* Image */}
                      <div className="relative w-full h-64 md:h-auto overflow-hidden">
                        {/* <Image className="absolute bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:relative md:left-0{md}transla{}-x-0" src={FeatureImg01} width="504" height="400" alt="Feature 01" /> */}
                        <video autoPlay preload="none" loop muted={muted} style={{ }} className="filter-blur-lg">
                          <source src="https://production-customer-site-public.s3.us-east-2.amazonaws.com/rocketgraph_introduction.mov" />
                        </video>
                        {
                          muted ?
                          <FontAwesomeIcon onClick={() => setMuted(!muted)} className="2x absolute bottom-10 right-10 z-100" icon={faVolumeMute} />
                          : <FontAwesomeIcon onClick={() => setMuted(!muted)} className="2x absolute bottom-10 right-10 z-100" icon={faVolumeUp} />
                        }
                      </div>
                    </div>
                  </div>
                </HighlighterItem>
              </div>
              {/* Box #2 */}
              {/* Box #3 */}
            </Highlighter>
          </div>

          {/* Features list */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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

        </div>
      </div>
    </section>
  )
}