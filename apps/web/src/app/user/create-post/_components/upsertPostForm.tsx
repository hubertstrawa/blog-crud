"use client";

import SubmitButton from "@/components/submitbutton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PostFormState } from "@/lib/types/formState";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};
const UpsertPostForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (state?.message) toast.success(state?.message);
  }, [state]);

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
    >
      <input hidden name="postId" defaultValue={state?.data?.postId} />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter The Title of Your Post"
          defaultValue={state?.data?.title}
        />
      </div>
      {!!state?.errors?.title && (
        <p className="text-red-500 animate-shake">{state.errors.title}</p>
      )}

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
          defaultValue={state?.data?.content}
        />
      </div>
      {!!state?.errors?.content && (
        <p className="text-red-500 animate-shake">{state.errors.content}</p>
      )}
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0])
              setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {!!state?.errors?.thumbnail && (
          <p className="text-red-500 animate-shake">{state.errors.thumbnail}</p>
        )}
        {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && (
          <Image
            src={(imageUrl || state?.data?.previousThumbnailUrl) ?? ""}
            alt="post thumbnail"
            width={200}
            height={150}
            className="mt-3 rounded-xl object-cover ring-1 ring-black/5"
          />
        )}
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={state?.data?.tags}
        />
      </div>
      {!!state?.errors?.tags && (
        <p className="text-red-500 animate-shake">{state.errors.tags}</p>
      )}
      <div className="flex items-center gap-2.5 rounded-xl bg-gray-50 px-4 py-3">
        <input
          className="w-4 h-4 accent-blue-600"
          type="checkbox"
          name="published"
          defaultChecked={state?.data?.published}
        />
        <Label htmlFor="published" className="!text-gray-700">
          Publish now
        </Label>
      </div>
      {!!state?.errors?.published && (
        <p className="text-red-500 animate-shake">{state.errors.published}</p>
      )}

      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
