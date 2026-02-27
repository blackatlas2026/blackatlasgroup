"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminRole } from "@/lib/context/AdminRoleContext";

import { useRouter } from "next/navigation";

export default function AdminSideBar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { name, isSuperadmin } = useAdminRole();
  const router = useRouter()

  function getInitials(email) {
    if (!email) return "?";
    return email.substring(0, 2).toUpperCase();
  }

  const navItems = [
   {
      name: "Dashboard",
      href: "/admin",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
          />
        </svg>
      ),
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: (
         <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V7a2 2 0 00-2-2h-4l-2-2H8a2 2 0 00-2 2v6m16 0l-8 4-8-4"
          />
        </svg>

      ),
    },
    {
      name: "Brands",
      href: "/admin/brands",
      icon: (
        <svg className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2">
                </path>
          </svg>
        
      ),
    },
    {
      name: "Product Schema",
      href: "/admin/schema",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      ),
    },
  // Only push Users if superadmin
  ...(isSuperadmin
    ? [
        {
          name: "Users",
          href: "/admin/users",
          icon: (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ),
        },
      ]
    : []),
];

  const isActive = (href) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }


  return (
    

      <>
  {/* Overlay (Mobile Only) */}
  {isOpen && (
    <div
      className="fixed inset-0 bg-black/40 z-30 md:hidden"
      onClick={onClose}
    />
  )}

  <aside
    className={`
  fixed inset-y-0 left-0 z-40 
  w-[80%]  md:w-64
  bg-white border-r border-gray-200
  flex flex-col
  transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0
`}
  >
    

    {/* Content Wrapper */}
    <div className="flex-1 flex flex-col overflow-y-auto">
      
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          
        
          <span className="text-xl font-bold tracking-tight">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose} // auto-close on mobile
              className={`flex items-center gap-4 
                px-4 py-3 md:px-3 md:py-2.5 
                rounded-lg transition-colors
                ${
                  isActive(item.href)
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              {item.icon}
              <span className="text-base md:text-sm">
  {item.name}
</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50 m-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-200   flex items-center justify-center text-xs font-bold text-zinc-600  ">
                        {getInitials(name)}
                      </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            {isSuperadmin && (
              <p className="text-xs text-gray-500">
                Super Admin
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
                     text-sm font-medium text-gray-600 
                     hover:bg-red-50 hover:text-red-600 
                     transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </aside>
</>
    
  );
}