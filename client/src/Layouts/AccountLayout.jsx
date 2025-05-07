import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AccountHeader from "../components/Accounts/AccountHeader";
import AccountSidebar from "../components/Accounts/AccountSidebar";
import BottomMenu from "../components/Accounts/BottomMenu";

export default function AccountLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar on mobile
  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to toggle sidebar collapse on desktop
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300 overflow-hidden">
      {/* Mobile Overlay - show when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar - fixed on all screen sizes */}
      <aside 
        className={`
          fixed z-30 
          transition-all duration-300 ease-in-out
          w-3/4 sm:w-64 max-w-xs h-screen
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}
          bg-card border-r border-border shadow-sm
          flex-shrink-0
        `}
      >
        <AccountSidebar 
          collapsed={sidebarCollapsed} 
          toggleCollapse={toggleSidebarCollapse}
          closeMobileSidebar={toggleMobileSidebar}
        />
      </aside>

      {/* Main Content - with padding to account for fixed sidebar */}
      <div 
        className={`
          flex flex-col flex-1 min-w-0 
          ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 h-16 bg-card border-b border-border shadow-sm z-20 lg:left-auto lg:pl-0"
        style={{ 
          width: 'calc(100% - 0px)',
          ...(window.innerWidth >= 1024 && { 
            width: `calc(100% - ${sidebarCollapsed ? '5rem' : '16rem'})` 
          })
        }}>
          <AccountHeader 
            toggleSidebar={toggleMobileSidebar} 
            toggleCollapse={toggleSidebarCollapse}
            isSidebarOpen={sidebarOpen}
          />
        </header>

        {/* Page Content - with padding for fixed header and footer */}
        <main className="flex-grow p-4 lg:p-6 overflow-auto mt-16 mb-16 lg:mb-0">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Bottom Menu (Only on mobile) - fixed position */}
        <footer className="lg:hidden h-16 fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
          <BottomMenu />
        </footer>
      </div>
    </div>
  );
}