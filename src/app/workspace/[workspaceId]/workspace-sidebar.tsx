import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from "lucide-react";

import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannnels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";


import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";



export const WorkspaceSidebar = () => {
 const workspaceId = useWorkspaceId();

 const [_open, setOpen] = useCreateChannelModal()

 const {data:member, isLoading:memberLoading} = useCurrentMember({workspaceId});
 const {data:workspace, isLoading:workspaceLoading} = useGetWorkspace({id: workspaceId});
  const {data:channels, isLoading: channelsLoading} = useGetChannnels({workspaceId})
const {data:members, isLoading:MembersLoading} = useGetMembers({workspaceId})

 if(workspaceLoading || memberLoading){
  return (
   <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
    <Loader className="size-5 animate-spin text-white"/>
   </div>
  )
 }

 if(!workspace || !member){
  return (
   <div className="flex flex-col bg-[#5e2c5f] h-full items-center justify-center">
    <AlertTriangle className="size-5 text-white"/>
    <p className="text-white text-sm">
     workspace not found
    </p>
   </div>
  )
 }
 return ( 
   <div className="flex flex-col bg-[#5e2c5f] h-full">
    <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"}/>
    <div className="flex flex-col px-2 mt-3">
      <SidebarItem
      label="Threads"
      icon={MessageSquareText}
      id="threads"
      />
      <SidebarItem
      label="Drafts & sent"
      icon={SendHorizonal}
      id="drafts"
      />
    </div>
      <WorkspaceSection
      label="Channels"
      hint="New Chnnel"
      onNew={member.role === "admin"? () => setOpen(true): undefined}
      >
      {channels?.map((item) => (
        <SidebarItem
        key={item._id}
        label={item.name}
        id={item._id}
        icon={HashIcon}
        />
      ))}
      </WorkspaceSection>
      
      <WorkspaceSection
      label="Direct Messages"
      hint="New direct message"
      onNew={() => {}}
      >
      {members?.map((item) => (
        <UserItem key={item._id} id={item._id} label={item.user.name} image={item.user.image} /> 
      )
      )}
      </WorkspaceSection>
    </div>
 )
}