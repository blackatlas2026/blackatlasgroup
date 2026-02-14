import { requireAdminPage } from "@/lib/auth/requireAdmin";
import { headers } from "next/headers";

export default async function AdminLayout({ children }) {
  

  await requireAdminPage();

  return <>{children}</>;
}
