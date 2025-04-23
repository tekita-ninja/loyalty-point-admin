import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RiPencilLine } from "react-icons/ri"
import { TWallet } from "./table"

export default function FormTemplate({ id, data }: { id?: number, data?: TWallet }) {
  console.log(data)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {
            id ? <Button className="w-full flex justify-start items-center" variant={'table'}><RiPencilLine /> Edit</Button> : <Button>Add New</Button>
          }
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Form Wallet</DialogTitle>
          <DialogDescription>
            Form Create New Wallet
          </DialogDescription>
        </DialogHeader>
        <div>
          Form Here...
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
