"use client";

import { createContext, useContext } from "react";

const AdminRoleContext = createContext({
  isSuperadmin: false,
  name: "",
});

export function AdminRoleProvider({ children, isSuperadmin, name }) {
  return (
    <AdminRoleContext.Provider value={{ isSuperadmin, name }}>
      {children}
    </AdminRoleContext.Provider>
  );
}

export function useAdminRole() {
  return useContext(AdminRoleContext);
}
