
interface ToolbarProps {
       isAuthor: boolean;
       isPending: boolean;
       handleEdit:() => void;
       handleThread:() => void;
       handleDelete: () => void;
       handleReaction: (value:string) => void;
       hideThreadButton: boolean | undefined;
}

export const Toolbar = ({
 isAuthor,
 isPending,
 handleEdit,
 handleDelete,
 handleReaction,
 handleThread,
 hideThreadButton,
}:ToolbarProps) => {
 return (
  <div>

  </div>
 )
}