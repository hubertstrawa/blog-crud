import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
const PostsLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center mt-24">
      {children}
    </div>
  );
};

export default PostsLayout;
