import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const employeeToken = cookieStore.get("employeeToken")?.value;
  const adminToken = cookieStore.get("adminToken")?.value;

  
  // if (!employeeToken) {
  //   redirect("/login");
  // }


  if (adminToken) {
    redirect("/admin-dashboard");
  }

  return <>{children}</>;
}