import { requireAdminPage } from "@/lib/auth/requireAdmin";
import { AdminRoleProvider } from "@/lib/context/AdminRoleContext";
import AdminSideBar from "@/app/components/admin/AdminSideBar";
import AdminShell from "@/app/components/admin/AdminShell";


export default async function AdminLayout({ children }) {
  const user = await requireAdminPage();


  return(<AdminRoleProvider
          isSuperadmin={user.superadmin === true}
          name={user.name || user.displayName || ""}
        >
          <AdminShell>{children}</AdminShell>
        </AdminRoleProvider>)
  
}




