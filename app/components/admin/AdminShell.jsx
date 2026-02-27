// components/admin/AdminShell.jsx
"use client";

import { useState } from "react";
import AdminSideBar from "./AdminSideBar";


export default function AdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="md:flex">
      
      <AdminSideBar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 md:ml-64">

        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-xl"
          >
            ☰
          </button>
         
        </div>

        <main className="">
          {children}
        </main>
      </div>
    </div>
  );
}