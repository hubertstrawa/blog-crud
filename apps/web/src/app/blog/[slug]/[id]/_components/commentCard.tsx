import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentEntity } from "@/lib/types/modelTypes";
import { UserIcon } from "@heroicons/react/20/solid";

type Props = {
  comment: CommentEntity;
};

const CommentCard = ({ comment }: Props) => {
  return (
    <div className="rounded-xl bg-white ring-1 ring-black/5 p-4">
      <div className="flex gap-3 items-center">
        <Avatar className="size-9 ring-1 ring-black/10">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            <UserIcon className="w-5 text-slate-400" />
          </AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="text-sm font-medium text-gray-900">
            {comment.author.name}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mt-3 text-gray-700 leading-relaxed">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
