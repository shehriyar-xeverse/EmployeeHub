import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();

  const token = cookieStore.get("employeeToken")?.value;

  if (token) {
    redirect("/employee-dashboard");
  }

  redirect("/login");
}