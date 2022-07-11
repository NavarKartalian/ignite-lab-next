import { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";


interface LoginButtonProps {
  icon: ReactNode;
  type: 'github' | 'google' | 'twitter';
}

export function LoginButton({ icon, type }: LoginButtonProps) {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <button 
          className={`flex items-center p-4 justify-center border border-gray-500 rounded gap-4 
          hover:bg-gray-500 transition-colors ${type === 'google' ? 'text-[#EA4335]' : 
          type === 'twitter' ? 'text-blue-500' : ''}`}
          onClick={() => signIn(type)}
        >
          {icon} 
          <span className="uppercase font-bold">{type}</span>
        </button>
      ) : (
        <button 
          className="flex items-center p-4 justify-center bg-gray-600 rounded gap-4 
          hover:bg-gray-500 transition-colors"
          onClick={() => signOut()}
        >
          {icon} 
          <span className="uppercase font-bold">logout</span>
        </button>
      )}
    </>
  );
}