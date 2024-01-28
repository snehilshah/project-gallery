import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import Link from 'next/link'

function LoginDropDown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<User className="h-[1.2rem] w-[1.2rem]" />
				</Button>
			</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href='/signup'>Sign Up</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/login'>Login</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
		</DropdownMenu>
	)
}

export { LoginDropDown }
