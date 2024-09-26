import React from "react";
import getUser from "@/lib/getUser";
import { redirect } from "next/navigation";

const withUser = (WrappedComponent: React.ComponentType<any>) => {
  return async function EnhancedComponent(props: any) {
    const { user, error } = await getUser();

    if (error) {
      redirect("/login");
    }

    return <WrappedComponent {...props} user={user} />;
  };
};

export default withUser;
