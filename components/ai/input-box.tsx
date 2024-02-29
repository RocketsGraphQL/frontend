import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"

export function InputWithButton({onClick, onChangeName, onChangeURL}: any) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="grid gap-2 w-full">
        <Input type="text" placeholder="Website Name" className="text-black" onChange={(e) => {console.log(e.target.value); onChangeName(e.target.value)}}/>
        <Input type="url" placeholder="Website URL" className="text-black" onChange={(e) => {console.log(e.target.value); onChangeURL(e.target.value);}}/>
        <Button type="submit" onClick={onClick}>Train</Button>
      </div>
    </div>
  )
}
