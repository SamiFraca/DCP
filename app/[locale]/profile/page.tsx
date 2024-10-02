import { Divider } from "@/components/global/divider";
import CustomPinProjectsList from "@/components/profile/custom-pin-projects-list";
import { CustomPinProjectsModal } from "@/components/profile/custom-pin-projects-modal";
import { ModifyDescription } from "@/components/profile/modify-description";
import { Pin } from "lucide-react";
import withUser from "@/components/hocs/with-user"; 
import { CustomUser } from "@/context/user-context";
import { useTranslations } from "next-intl";


function Profile({ user }: { user: CustomUser }) { 
  const t = useTranslations("Profile");
  return (
    <div>
      <h1 className="text-6xl font-bold sm:text-4xl text-start mb-6">{t('profile')}</h1>
      <p className="text-3xl">
        {t('greetings')}, <span className="capitalize">{user?.user_metadata.name}</span>
      </p>
      <Divider className="my-4" />
      <ModifyDescription descriptionValue={user?.user_metadata.description ?? 'No description provided'} />
      <div className="flex">
        <div className="flex flex-col grow">
          <div className="flex grow">
            <p className="flex gap-2 items-center grow">
              <Pin width={20} height={20} />
              {t('pinnedProjects')}
            </p>
          </div>
          <CustomPinProjectsList />
        </div>
        <CustomPinProjectsModal />
      </div>
    </div>
  );
}

export default withUser(Profile);