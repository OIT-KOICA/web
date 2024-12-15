import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateCompanyModal from "@/components/auth/company/create-company-modal";
import { redirect } from "next/navigation";
import useUserStore from "@/lib/stores/user-store";

export default async function CompanyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userStore = useUserStore.getState();

  if (userStore.isNewUser === null) {
    // Charge l'état utilisateur si ce n'est pas déjà fait
    await userStore.setUserStatus(session.accessToken);
  }

  const { isNewUser } = userStore;

  if (!isNewUser) {
    redirect("/dashboard");
  }

  return <CreateCompanyModal />;
}
