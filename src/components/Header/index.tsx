import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { List, SignOut, X } from "phosphor-react";
import { Logo } from "../Logo";
import { LogoMobile } from "../LogoMobile";

interface HeaderProps {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (value: boolean) => void;
}

export function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="w-full flex justify-between py-4 lg:py-[19px] bg-gray-700 border-b border-gray-600 px-6 items-center">
      <div className="hidden lg:block">
        <Link href={'/'} passHref>
          <a>
            <Logo />
          </a>
        </Link>
      </div>

      <div className="lg:hidden">
        <Link href={'/'} passHref>
          <a>
            <LogoMobile />
          </a>
        </Link>
      </div>

      <div className="rounded-full relative hidden lg:flex items-center gap-4">
        <h2 className="text-lg font-bold">{session.user.name}</h2>
        <button className="hover:text-red-500" onClick={() => signOut()}>
          <SignOut size={28} />
        </button>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <button className="hover:text-red-500" onClick={() => signOut()}>
          <SignOut size={24} />
        </button>
        
        {isSidebarOpen && 
          <>
            <button className={`${isSidebarOpen && 'hidden'}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <List size={32} className='text-blue-500' />
            </button>

            <button className={`${!isSidebarOpen && 'hidden'}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <X size={32} className='text-blue-500' />
            </button>
          </>
        }
      </div>
    </header>
  );
}