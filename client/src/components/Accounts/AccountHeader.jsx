import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from "lucide-react";
import ThemeToggle from '../ThemeToggle';
import { useAuth } from '@/context/AuthContext';

export default function AccountHeader({ toggleSidebar, toggleCollapse, isSidebarOpen }) {
  const {logout} = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='h-full flex items-center justify-between px-4 lg:px-6'>
      <div className='flex items-center space-x-4'>
        {/* Mobile menu button */}
        <button 
          onClick={toggleSidebar} 
          className='lg:hidden text-muted-foreground hover:text-primary transition-colors'
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <LucideIcons.Menu size={24} />
        </button>
        
        {/* Desktop sidebar toggle */}
        <button 
          onClick={toggleCollapse} 
          className='hidden lg:block text-muted-foreground hover:text-primary transition-colors'
        >
          <LucideIcons.Menu size={20} />
        </button>
        
        <h1 className='text-xl font-semibold text-foreground'>Dashboard</h1>
      </div>
      
      <div className='flex items-center space-x-3'>
        {/* Theme toggle button */}
        <div className='p-2 text-muted-foreground hover:text-primary transition-colors'>
          <ThemeToggle />
        </div>
        
        {/* Notification bell */}
        <button className='relative p-2 text-muted-foreground hover:text-primary transition-colors'>
          <LucideIcons.Bell size={20} />
          <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
        </button>
        
        {/* Search button */}
        <button className='p-2 text-muted-foreground hover:text-primary transition-colors'>
          <LucideIcons.Search size={20} />
        </button>
        
        {/* User profile menu */}
        <div className='relative' ref={userMenuRef}>
          <button 
            className='flex items-center ml-4 cursor-pointer'
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-label="Open user menu"
          >
            <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground'>
              <LucideIcons.User size={16} />
            </div>
          </button>
          
          {/* Dropdown menu */}
          {userMenuOpen && (
            <div className='absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover border border-border z-50'>
              <div className='py-2 px-4 border-b border-border'>
                <p className='text-sm font-medium text-foreground'>User Name</p>
                <p className='text-xs text-muted-foreground'>user@example.com</p>
              </div>
              <div className='py-1'>
                <button className='flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted'>
                  <LucideIcons.User className='w-4 h-4 mr-2 text-muted-foreground' />
                  Profile
                </button>
                <button className='flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted'>
                  <LucideIcons.Settings className='w-4 h-4 mr-2 text-muted-foreground' />
                  Settings
                </button>
                <button className='flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted'>
                  <LucideIcons.HelpCircle className='w-4 h-4 mr-2 text-muted-foreground' />
                  Help
                </button>
              </div>
              <div className='py-1 border-t border-border'>
                <button 
                  className='flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted'
                  onClick={() => logout()}
                >
                  {/* Logout icon */}
                  <LucideIcons.LogOut className='w-4 h-4 mr-2 text-muted-foreground' />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}