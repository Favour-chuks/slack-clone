import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, Loader } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";

interface WorkspaceSidebarProps{

}

export const WorkspaceSidebar = ({}:WorkspaceSidebarProps) => {
 const workspaceId = useWorkspaceId();

 const {data:member, isLoading:memberLoading} = useCurrentMember({workspaceId});
 const {data:workspace, isLoading:workspaceLoading} = useGetWorkspace({id: workspaceId});

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
    </div>
 )
}