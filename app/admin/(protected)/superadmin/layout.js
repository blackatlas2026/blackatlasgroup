import { requireAdminPage } from "@/lib/auth/requireAdmin";
import { AdminRoleProvider } from "@/lib/context/AdminRoleContext";

export default async function AdminLayout({ children }) {
  const user = await requireAdminPage(true);

  return (
    <AdminRoleProvider
      isSuperadmin={user.superadmin === true}
      name={user.name || user.displayName || ""}
    >
      {children}
    </AdminRoleProvider>
  );
}
