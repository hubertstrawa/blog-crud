"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { deletePost } from "@/lib/actions/postActions";

type Props = {
  params: Promise<{ id: string }>;
};

const InterceptorDeletePostPage = (props: Props) => {
  const params = use(props.params);
  const postId = parseInt(params.id);

  console.log("asdsadsa");

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Post!</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href={"/user/posts"}>Cancel</a>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => deletePost(postId)} variant={"destructive"}>
              <a href="/user/posts">Delete</a>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePostPage;
