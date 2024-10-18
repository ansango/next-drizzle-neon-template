
import Link from "next/link"
import { SignOut } from "../auth/signin"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"



export function Header() {
  return (
    <header className="flex justify-between p-5">
      <Link href="/">
        <Button size={"icon"}>
          <Icons.home />
        </Button>
      </Link>
      <SignOut variant={"ghost"} size={"icon"}><Icons.signOut /></SignOut>

    </header>
  )
}