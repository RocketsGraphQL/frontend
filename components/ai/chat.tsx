'use client'

import { useChat, type Message } from 'ai/react'

import { ChatHeader } from "@/components/ai/chat-header"
import { ChatInput } from "@/components/ai/chat-input"
import { MessageBox } from "@/components/ai/message-box"
import { InputWithButton } from "@/components/ai/input-box"
import { Button } from "@/components/shadcn-ui/button"
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { EmbedCodeModal } from './embed-code-modal'

import { gql, useMutation, useQuery } from '@apollo/client';

// Define mutation
const ADD_WEBSITE = gql`
  mutation MyMutation($website_name: String!, $website_url: String!, $instance_id: uuid!) {
    insert_ai_chatbots_one(object: {website_name: $website_name, website_url: $website_url, instance_id: $instance_id}) {
      id
      instance_id
    }
  }
`;

const GET_WEBSITE = gql`
    query MyQuery($instance_id: uuid!) {
        ai_chatbots(where: {instance_id: {_eq: $instance_id}}) {
            instance_id
            website_name
            website_url
        }
    }
  
`

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    messages?: Message[]
    id?: string
    chatId?: string
    instanceId?: string
}

const uniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function Chat({ id, initialMessages, className, chatId, instanceId }: ChatProps) {

    const [ currentMessage, setCurrentMessage ] = useState('');
    const [ messages, setMessages ] = useState<Message[]>([]);
    const [ website, setWebsite ] = useState('');
    const [ name, setName ] = useState('');
    const [ isTraining, setIsTraining ] = useState(false);

    const [ isTrained, setIsTrained ] = useState(false);

    const [ embedCode, setEmbedCode ] = useState('');

    const [addWebsite, { data, loading, error }] = useMutation(ADD_WEBSITE);
    const query_result = useQuery(GET_WEBSITE, {
        variables: { instance_id: instanceId },
    });

    let website_name: any;

    useEffect(() => {
        if (query_result && query_result.data && query_result.data.ai_chatbots && query_result.data.ai_chatbots.length) {
            console.log(query_result.data.ai_chatbots);
            website_name = query_result.data.ai_chatbots[0].website_name;
            setWebsite(website_name)
            setIsTrained(true);

            setEmbedCode(`
    <div id="iframe-container">
        <iframe src='http://localhost:3002?id=${website_name}' id="rocketgraph-chatbot-widget" style='position: fixed; right: 1rem; z-index: 9999999; border: none; width: 448px; bottom: 5rem; height: 85vh; border-radius: 0.75rem; box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px; display: block;' frameBorder='0' width='100%' height='500px' allowFullScreen ></iframe> 
        <button id="btn-trigger"  style='position: fixed; right: 1rem; z-index: 9999999; border: none; width: 44px; bottom: 1rem; height: 50px; border-radius: 0.75rem; box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px; display: block;' frameBorder='0' width='100%' height='50px'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
        </svg>
        </button> 
    </div>
    <script type="text/javascript">
        const triggerBtn = document.getElementById("btn-trigger");
        // let show = false;
        triggerBtn.addEventListener("click", function () {
        chatElement = document.getElementById("rocketgraph-chatbot-widget");
        isOpen = chatElement.style.display !== 'none'
        if (isOpen) {
            chatElement.style.display = 'none'
        } else {
            chatElement.style.display = 'block'          
        }
        });
    </script>
            `)
        }
    }, [query_result])

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

    const trainGPT = async () => {
        setIsTraining(true);
        const ACTIVATE_API_URL = `${process.env.NEXT_PUBLIC_AI_STUDIO_BASE_URL}/activate`;
        const response = await axios.post(
          ACTIVATE_API_URL,
          {
            name: name,
          }
        );
        console.log(response);
        if (response.status === 200 && response.data) {
          const { answer } = response.data;
          const TRAIN_API_URL = `${process.env.NEXT_PUBLIC_AI_STUDIO_BASE_URL}/insert`;
          const resp = await axios.post(
            TRAIN_API_URL,
            {
              name: name,
              url: website
            }
          );
          console.log("response: ", resp);
          Cookies.set("website_name", name);
          setIsTraining(false);
          addWebsite({ variables: { website_name: name, website_url: website, instance_id: instanceId } })
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
                  {/* <div className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                      Coming Soon
                  </div>  */}
                  {
                    !isTrained ?
                        <InputWithButton onClick={trainGPT} onChangeURL={setWebsite} onChangeName={setName} isTraining={isTraining} />
                    : <EmbedCodeModal embedCode={embedCode} />
                  }
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