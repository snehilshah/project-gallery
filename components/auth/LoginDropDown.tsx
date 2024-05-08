import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

function LoginDropDown() {
  const { data: session, status } = useSession();
  // console.log(""session)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === 'unauthenticated' && (
          <>
            <DropdownMenuItem>
              <Link href="/signin">SignIn</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/signup">SignUp</Link>
            </DropdownMenuItem>
          </>
        )}
        {status === 'authenticated' && (
          <>
            <Link href="/new">
              <DropdownMenuItem>
                <p className="text-teal-400">New</p>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <p>{session.user?.name}</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <p className="text-red-400">Sign Out</p>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LoginDropDown };
