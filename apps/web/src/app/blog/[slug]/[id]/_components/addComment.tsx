import SubmitButton from "@/components/submitbutton";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/commentActions";
// import { useToast } from "@/hooks/use-toast";
// import { saveComment } from "@/lib/actions/commentActions";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};
const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);

  useEffect(() => {
    if (state?.message) {
      if (state.ok) {
        toast.success("Success", { description: state.message });
      } else {
        toast.error("Oops!", { description: state.message });
      }
    }
    if (state?.ok) props.refetch();
  }, [state]);

  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write your comment</DialogTitle>
        <form className={cn("flex flex-col gap-3", props.className)} action={action}>
          <input hidden name="postId" defaultValue={props.postId} />
          <div className="overflow-hidden rounded-xl border border-input">
            <Textarea
              className="border-none rounded-none active:outline-none focus-visible:ring-0 shadow-none min-h-28"
              name="content"
              placeholder="Share your thoughts..."
            />
            <p className="border-t bg-gray-50 px-3 py-2 text-sm">
              <span className="text-gray-400">Write as </span>
              <span className="font-medium text-gray-700">{props.user.name}</span>
            </p>
          </div>
          {!!state?.errors?.content && (
            <p className="text-red-500 text-sm animate-shake">
              {state.errors.content}
            </p>
          )}
          <SubmitButton className="w-full">Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
