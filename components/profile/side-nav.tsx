import { ProfileSideNavData } from "./profile-side-nav-data";
import ProfileImageEditor from "./profile-image-editor";
import { SideNavItemList } from "./sidenav-item-list";
export async function SideNav() {
  return (
    <aside className="md:p-4 pt-0 flex flex-col gap-2 md:w-96 w-full mt-4 mb-4 md:mt-0">
      <ProfileImageEditor />
      <div className="flex gap-4 w-full md:w-auto md:gap-2 md:flex-col flex-wrap">
        <ProfileSideNavData />
      </div>
      <span className="border-b border-gray-800 w-full my-4"></span>
      <nav>
        <SideNavItemList />
      </nav>
    </aside>
  );
}
