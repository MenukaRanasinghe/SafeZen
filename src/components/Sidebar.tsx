'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GrHomeRounded } from 'react-icons/gr';
import { LiaUserSolid } from 'react-icons/lia';
import { IoDocumentsOutline } from 'react-icons/io5';
import { FiMenu, FiSettings } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ isOpen, toggleSidebar, onTabChange }: SidebarProps) => {
  const [selected, setSelected] = useState<string>('Overview');
  const { data: session } = useSession();
  const userRole = session?.user?.role || 'Guest';
  const userEmail = session?.user?.email || 'Guest'; 

  const menuItems = {
    Admin: [
      { label: 'Dashboard', icon: <GrHomeRounded />, path: '/admin' },
      { label: 'Users', icon: <LiaUserSolid />, path: '/admin/users' },
      { label: 'Tasks', icon: <IoDocumentsOutline />, path: '/admin/tasks' },
      { label: 'Settings', icon: <FiSettings />, path: '/admin/settings' },
    ],
    Leader: [
      { label: 'Tasks', icon: <IoDocumentsOutline />, path: '/leader' },
      { label: 'Settings', icon: <FiSettings />, path: '/leader/settings' },
    ],
    Member: [
      { label: 'My Tasks', icon: <IoDocumentsOutline />, path: '/member' },
      { label: 'Settings', icon: <FiSettings />, path: '/member/settings' },
    ],
  };

  return (
    <div>
      <div className="p-4 lg:hidden">
        <FiMenu
          className="text-3xl cursor-pointer text-sec"
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`h-screen bg-secondary text-black w-[250px] flex-shrink-0 transition-transform duration-300 lg:translate-x-0 fixed lg:relative z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-10 flex items-center space-x-4">
        </div>
        <div className="flex-1">
          {menuItems[userRole]?.map((item) => (
            <Link href={item.path} key={item.label}>
              <div
                className={`flex items-center p-4 space-x-4 cursor-pointer rounded-sm ${
                  selected === item.label
                    ? 'bg-primary text-secondary ml-5 mr-5'
                    : 'hover:bg-gray-200 ml-5 mr-5'
                }`}
                onClick={() => {
                  setSelected(item.label);
                  onTabChange(item.label);
                }}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="leading-none">{item.label}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{userEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
