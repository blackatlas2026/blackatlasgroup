"use client";

import { useEffect, useState } from "react";
import AddUserModal from "@/app/components/admin/AddUserModal";
import { useAdminRole } from "@/lib/context/AdminRoleContext";

export default function SuperAdminPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {name, isSuperadmin } = useAdminRole();

  async function fetchAdmins() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/superadmin/admins");
      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data.admins);
      setFiltered(data.admins);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveAdmin(uid) {
    if (!confirm("Remove admin role?")) return;

    try {
      const res = await fetch("/api/superadmin/admins", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      fetchAdmins();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      users.filter(
        u =>
          u.email?.toLowerCase().includes(q) ||
          u.name?.toLowerCase().includes(q)
      )
    );
  }, [search, users]);

  function getInitials(email) {
    if (!email) return "?";
    return email.substring(0, 2).toUpperCase();
  }

return (
  <div className="flex-1 overflow-y-auto bg-background-light  ">

    {/* Header */}
    <header className="sticky top-0 z-10 bg-background-light/80   backdrop-blur-md border-b border-zinc-200  ">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between lg:items-center">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 w-full">
          
          {/* Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              User Management
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Manage system administrators and permission levels.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">
                search
              </span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 bg-white   border border-zinc-200   rounded-full text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none w-full transition-all"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-orange-400 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-orange-400/90 transition-colors"
            >
              + Add User
            </button>

          </div>
        </div>

        {/* RIGHT SIDE - PROFILE */}
        {name && (
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white   border border-zinc-200   shadow-sm self-start lg:self-auto">
            
            <div className="w-9 h-9 rounded-full bg-orange-400 text-white flex items-center justify-center text-sm font-bold">
              {name.charAt(0).toUpperCase()}
            </div>

            <div className="leading-tight text-right">
              <p className="text-sm font-semibold text-zinc-900  ">
                {name}
              </p>
              <p className="text-[11px] text-zinc-500 tracking-wide">
                {isSuperadmin ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
        )}

      </div>
    </header>

    {/* Table Section */}
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
      
      {error && (
        <p className="mb-4 text-orange-400 text-sm font-medium">
          {error}
        </p>
      )}

      <div className="bg-white   border border-zinc-200   rounded-2xl overflow-hidden shadow-sm">
        
        {/* Horizontal Scroll Wrapper */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left border-collapse">
            
            <thead>
              <tr className="bg-zinc-50   text-zinc-500   text-xs uppercase tracking-wider font-bold">
                <th className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">Email</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">Name</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">Role</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">Created</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100  ">
              
              {filtered.map(user => (
                <tr
                  key={user.uid}
                  className="hover:bg-zinc-50   transition-colors"
                >
                  
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-200   flex items-center justify-center text-xs font-bold text-zinc-600  ">
                        {getInitials(user.email)}
                      </div>
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    {user.name}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    {user.superadmin ? (
                      <span className="px-2.5 py-1 rounded-full bg-orange-400/10 text-orange-400 text-[10px] font-black uppercase tracking-widest">
                        Super Admin
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-zinc-100   text-zinc-500   text-[10px] font-black uppercase tracking-widest">
                        Admin
                      </span>
                    )}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-zinc-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                    {!user.superadmin ? (
                      <button
                        onClick={() => handleRemoveAdmin(user.uid)}
                        className="text-xs font-bold px-3 py-1.5 rounded-full bg-orange-400 text-white hover:bg-orange-400/90 transition-colors shadow-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <span className="text-xs text-zinc-400 font-medium">
                        Protected
                      </span>
                    )}
                  </td>

                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-zinc-400 py-8">
                    No users found
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-zinc-100   flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            Showing <span className="font-bold">{filtered.length}</span> users
          </p>
        </div>

      </div>
    </div>
  </div>
);


}
