import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();

  // const adminToken = cookieStore.get("adminToken")?.value;


  // if (adminToken) {
  //   redirect("/admin-dashboard");
  // }
ww
  return <>{children}</>;
}