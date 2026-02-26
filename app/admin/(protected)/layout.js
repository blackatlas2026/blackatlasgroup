import { requireAdminPage } from "@/lib/auth/requireAdmin";
import { AdminRoleProvider } from "@/lib/context/AdminRoleContext";
import AdminSideBar from "@/app/components/admin/AdminSideBar";

export default async function AdminLayout({ children }) {
  const user = await requireAdminPage();

  return(<AdminRoleProvider
          isSuperadmin={user.superadmin === true}
          name={user.name || user.displayName || ""}
        >
          <div className="flex min-h-screen">
            <AdminSideBar />

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
          </div>
        </AdminRoleProvider>)
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />

      {/* Main Content */}
     <main className="flex-1 ml-64 p-8">
        <AdminRoleProvider
          isSuperadmin={user.superadmin === true}
          name={user.name || user.displayName || ""}
        >
          {children}
        </AdminRoleProvider>
      </main>
    </div>
  );
}

