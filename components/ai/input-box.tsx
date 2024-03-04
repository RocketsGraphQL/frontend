import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState } from "react";
import { EmbedCodeModal } from "./embed-code-modal";

export function InputWithButton({onClick, onChangeName, onChangeURL, isTraining, website_name = '' }: any) {
  const [ isTrained, setIsTrained ] = useState(false);
  console.log(isTraining)
  let embedCode = ``;
  if (website_name != '') {
    setIsTrained(true);
    embedCode = `
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
    `
  }
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="grid gap-2 w-full">
        {
          !isTraining &&
          <>
            <Input type="text" placeholder="Website Name" className="text-black" onChange={(e) => {console.log(e.target.value); onChangeName(e.target.value)}}/>
            <Input type="url" placeholder="Website URL" className="text-black" onChange={(e) => {console.log(e.target.value); onChangeURL(e.target.value);}}/>
          </>
        }

        <Button className="text-white" onClick={onClick}>
          {
            isTraining && 
            <>
              Your chatbot is training <FontAwesomeIcon className="project-creation-event-spinner ml-2" icon={faSpinner} spin />
            </>
          }
          {
            !isTraining &&
            'Train'
          }
        </Button>
        {/* <EmbedCodeModal embedCode={embedCode}/> */}
      </div>
    </div>
  )
}
