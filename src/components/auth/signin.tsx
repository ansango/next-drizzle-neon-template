import { signIn, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { SignInAccount } from "../blocks/signin-account"
import { Icons } from "../ui/icons"

export function SignIn({
  children = "Sign in",
  provider,
  ...props
}: {
  provider?: string
  children?: React.ReactNode
} & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button {...props}>{children}</Button>
    </form>
  )
}

export function SignInCard() {
  return (
    <SignInAccount>
      <SignIn provider="google" variant="outline" className="w-full" type="submit" >
        <Icons.google className="mr-2 h-4 w-4" />
        Sign in with Google
      </SignIn>
    </SignInAccount>
  )
}

export function SignOut({ children = "Sign out", ...props }: {
  children?: React.ReactNode
} & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button variant="ghost" {...props}>
        {children}
      </Button>
    </form>
  )
}