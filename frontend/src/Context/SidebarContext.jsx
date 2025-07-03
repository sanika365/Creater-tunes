import React, { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <SidebarContext.Provider value={{ showMenu, setShowMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};
