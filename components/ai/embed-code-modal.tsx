import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import { Textarea } from "@/components/shadcn-ui/textarea"
import { useRef } from "react";

export function EmbedCodeModal({ embedCode, onClose }: any) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null); // Specify the type of ref explicitly

    const copyToClipboard = () => {
        if (textAreaRef.current) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // Optionally, you can provide feedback to the user upon successful copying
        alert('Text copied to clipboard!');
        }
    };
    console.log("embedcode: ", embedCode)
  return (
    <>
        <Textarea
            className="text-black"
            ref={textAreaRef}
            value={embedCode}
            readOnly
        />
        <Button className="w-full pt-4" onClick={copyToClipboard}>Copy to Clipboard</Button>
    </>

  )
}
