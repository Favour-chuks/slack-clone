import { JSX, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export const UseConfirm = (title:string, message:string):[() => JSX.Element, () => Promise<unknown>] => {
 const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null)

 const confirm = () => new Promise((resolve, reject) => {
  setPromise({resolve})
 })

 const handleCLose = () => {
  setPromise(null)
 }

 const handleCancel = () => {
  promise?.resolve(false)
  handleCLose()
 }

 
 const handleConfirm = () => {
  promise?.resolve(true)
  handleCLose()
 }

 const confirmDialog = () => (
  <Dialog open={promise !== null}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>
      {title}
     </DialogTitle>
     <DialogDescription>
      {message}
     </DialogDescription>
    </DialogHeader>
    <DialogFooter className="pt-2">
     <Button onClick={handleCancel} variant="outline">
      Cancel
     </Button>
     <Button onClick={handleConfirm}>
      Confirm
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 )

 return [confirmDialog, confirm]
}