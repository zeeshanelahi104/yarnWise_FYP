import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    if (session.user) {
      return (
        <>
          Signed in as {session.user.role} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    } else {
      // Handle the case when session.user is null or undefined
      return (
        <>
          Signed in, but user data is not available <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      );
    }
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
