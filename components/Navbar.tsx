import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/connectvice.svg"
          width={80}
          height={60}
          alt="yoom logo"
          className="max-sm:size-10"
        />
         <p className="text-[26px] font-extrabold text-white">ConnectVice</p>
            <p className="text-[10px] font-thin text-white max-sm:text-[5px]">Tool from MachineVice</p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
