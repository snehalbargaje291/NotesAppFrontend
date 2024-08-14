'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcTodoList } from "react-icons/fc";
import { LogOutIcon } from "lucide-react";
import Search from "../ui/search";
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login'); 
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
      <div className="container h-16 grid grid-cols-4 md:grid-cols-3 items-center px-4">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <FcTodoList className="h-6 w-6" />
          <span className="text-lg font-bold">Not.e</span>
        </Link>

        <div className="flex-1 col-span-2 md:col-span-1">
          <Search onSearch={onSearch} />
        </div>

        <div className="flex items-center justify-end">
          <Button variant="ghost" onClick={handleLogout} size="icon">
            <LogOutIcon width={20} height={20} />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
