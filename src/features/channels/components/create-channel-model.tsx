"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { useCreateChannel } from "../api/use-create-channel";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const CreateChannelModal = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

const [open, setOpen] = useCreateChannelModal()
const {mutate, isPending} = useCreateChannel();

const [name, setName] = useState("")

const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
 const value = e.target.value.replace(/\s+/g, "-").toLowerCase()
 setName(value)
}

const handleClose = () => {
 setOpen(false);
 setName("")
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 mutate(
 { name, workspaceId },
{
 onSuccess:(id) => {
  toast.success("Channnel Created");
  router.push(`/workspace/${workspaceId}/channel/${id}`)
 handleClose();
 },
 onError:() => {
   toast.error("failed to create a channel")
 },
}
);
}
 
 return (
 <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={handleChange }
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="channel name e.g. 'Plan-budjet'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create Workspace</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
 )
}