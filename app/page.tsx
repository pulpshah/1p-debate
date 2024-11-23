"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {session && session.user ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Hello, {session.user.name || "User"}!
            </h2>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Sign In with Google
            </h2>
            <button
              onClick={() => signIn("google")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </section>
  );
}
