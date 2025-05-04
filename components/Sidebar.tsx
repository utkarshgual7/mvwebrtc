'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1a1a1a] p-6 pt-28 text-gray-300 border-r border-gray-800 max-sm:hidden lg:w-[280px]">
      <div className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-xl transition-all duration-200 hover:bg-[#2a2a2a]',
                {
                  'bg-[#3a3a3a] text-white': isActive,
                  'hover:text-white': !isActive,
                }
              )}
            >
              <div className={cn(
                'p-2 rounded-lg',
                {
                  'bg-blue-500/20': isActive,
                }
              )}>
                <Image
                  src={item.imgUrl}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={cn('opacity-80', {
                    'opacity-100': isActive
                  })}
                />
              </div>
              <p className="text-[15px] font-medium max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
