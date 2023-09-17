import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
    return null;
  }

  return <main className="h-screen flex flex-col">{children}</main>;
}
