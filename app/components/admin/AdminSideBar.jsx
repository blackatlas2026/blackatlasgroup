"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminRole } from "@/lib/context/AdminRoleContext";

export default function AdminSideBar() {
  const pathname = usePathname();
  const { name, isSuperadmin } = useAdminRole();
 

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

  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 bg-white z-10">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-orange-600 p-1.5 rounded-lg">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 10V3L4 14h7v7l9-11h-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            AdminPanel
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${
                  isActive(item.href)
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50 m-4 rounded-lg">
  <div className="flex items-center gap-3">
    <img
      alt="Marcus Aurelius"
      className="h-10 w-10 rounded-full object-cover border border-gray-200"
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7ZyP2doPA4saKmGeIQbvPcg7oOqpLX7GaRrNQEiJo-XPc2cdV4J0O_wwg8KCj3_OWwporQNw6lvGoWvVuIQGHx0vRhqorgwk_Sx0SqpAspRvNUvHD2SQzSsLUHb_rUxX_9sOmUsYGeYCMMWxPtQ2cVk1gemYPAJ6PfLkVNTGy4j2o98FCZXG2uerMvQJNtOykO7Akyq7MraUPYwZpXmwpN46lWBA5Fp6fyKjPZAV1-Lh_lnKTm1Ju6BxadwevbfzQQ0x-oKNd60"
    />
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-900 leading-tight">
        {name}
      </p>
      {isSuperadmin && <p className="text-xs text-gray-500">
        Super Admin
      </p>}
    </div>
  </div>

  {/* Logout Button */}
  <button
    className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
               text-sm font-medium text-gray-600 
               hover:bg-red-50 hover:text-red-600 
               transition-colors"
  >
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
      />
    </svg>
    Logout
  </button>
</div>
    </aside>
  );
}