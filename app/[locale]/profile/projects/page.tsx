import { Divider } from "@/components/global/divider";
import withUser from "@/components/hocs/with-user";
import { ToggleProjectLayout } from "@/components/profile/projects/toggle-project-layout";
import { UserProjectList } from "@/components/profile/projects/user-projects-list";
import { CustomUser } from "@/context/user-context";
import { useTranslations } from "next-intl";

function Projects({ user }: { user: CustomUser }) {
  const t = useTranslations("Profile");
  return (
    <div>
      <h1 className="text-6xl font-bold sm:text-4xl text-start mb-6">
        {t("yourProjects")}
      </h1>
      <ToggleProjectLayout/>
      
      <Divider className="my-4" />
      <UserProjectList/>
    </div>
  );
}

export default withUser(Projects);
