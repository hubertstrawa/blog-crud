import { SessionUser } from "@/lib/session";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  user: SessionUser;
};
const Profile = ({ user }: Props) => {
  console.log(user);
  return (
    <Popover>
      <PopoverTrigger className="rounded-full outline-none ring-offset-2 transition focus-visible:ring-2 focus-visible:ring-blue-500 hover:opacity-90">
        <Avatar className="size-9 ring-1 ring-black/10 cursor-pointer">
          <AvatarImage
            className="rounded-full"
            src={user.avatar}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>
            <UserIcon className="w-8 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="flex items-center gap-3 px-3 py-2.5 border-b border-black/5">
          <Avatar className="size-9 ring-1 ring-black/10">
            <AvatarImage src={user.avatar} referrerPolicy="no-referrer" />
            <AvatarFallback>
              <UserIcon className="w-5 text-slate-500" />
            </AvatarFallback>
          </Avatar>
          <p className="font-medium text-sm truncate">{user.name}</p>
        </div>
        <div className="mt-1 flex flex-col *:flex *:items-center *:gap-3 *:px-3 *:py-2.5 *:rounded-lg *:text-sm *:text-gray-700 *:transition-colors [&>*:hover]:bg-gray-100 [&_svg]:w-4 [&_svg]:text-gray-400">
          <Link href="/user/create-post">
            <PencilSquareIcon className="w-4" />
            <span>Create New Post</span>
          </Link>
          <Link href="/user/posts">
            <ListBulletIcon className="w-4" />
            <span>Posts</span>
          </Link>
          <a
            href="/api/auth/signout"
            className="!text-red-600 [&_svg]:!text-red-400 hover:!bg-red-50"
          >
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span>Sign Out</span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
