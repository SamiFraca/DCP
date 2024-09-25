import Image from "next/image";
import defaultImageAvatar from "@/assets/img/default-profile.png";
import getUser from "@/lib/getUser";
import { Bell, Book, Info, MapPinIcon, User } from "lucide-react";
import Link from "next/link";
export async function SideNav() {
  const { user } = await getUser();
  return (
    <aside className="md:p-4 pt-0 flex flex-col gap-2 md:w-80 w-full mt-4 mb-4 md:mt-0">
      <Image
        src={defaultImageAvatar.src}
        width={120}
        height={120}
        alt="profile"
        className="md:mx-auto"
      />
      <div className="flex gap-4 w-full md:w-auto md:gap-2 md:flex-col flex-wrap">
        <p className="font-semibold text-xl capitalize">
          {user?.user_metadata.lastName && (
            <span> {user.user_metadata.lastName}, </span>
          )}
          {user?.user_metadata.name}
        </p>
        <div className="flex gap-2">
          <MapPinIcon /> <p>{user?.user_metadata.country},</p>
        </div>
        <p>Main interest: {user?.user_metadata.mainField}</p>
      </div>
      <span className="border-b border-gray-800 w-full my-4"></span>
      <nav>
        <ul className="flex md:flex-col gap-4 w-full md:w-auto flex-wrap">
          <li className="flex gap-2">
            <User width={20} height={20} />
            <Link href={"/profile"} className="underline-animation">
              Profile
            </Link>
          </li>
          <li className="flex gap-2">
            <Book width={20} height={20} />
            <Link href={"/profile/projects"} className="underline-animation">
              Your projects
            </Link>
          </li>
          <li className="flex gap-2">
            <Bell width={20} height={20} />
            <Link
              href={"/profile/notifications"}
              className="underline-animation"
            >
              Notifications
            </Link>
          </li>
          <li className="flex gap-2">
            <Info width={20} height={20} />
            <Link
              href={"/profile/personal-information"}
              className="underline-animation"
            >
              Personal information
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
