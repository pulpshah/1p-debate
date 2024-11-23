"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from 'react';
import Image from "next/image";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect to home if already logged in
  if (session) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/'
      });
      
      if (!result?.error) {
        router.push('/debate');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleForgotPassword = () => {
    console.log('Forgot password needs to be implemented');
    // TODO: Implement password reset functionality
  };

  return (
    <div 
    className="min-h-screen flex items-center justify-center relative"
    style={{
      backgroundImage: `
        linear-gradient(to bottom right, #2E227E, #815D81),
        url("/images/Background.png")
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundBlendMode: 'overlay',
      width: '100vw',
      height: '100vh'
    }}
  >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div className="text-center mb-6">
          <Image
            src="/images/LOGO.png"
            alt="PULP Logo"
            width={120}
            height={48}
            className="mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">Log in to your account</h2>
        <p className="text-gray-600 mb-6">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember for 30 days
              </label>
            </div>
            <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-purple-600 hover:text-purple-500"
            >
              Forgot password
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/debate' })}
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Image
              src="/images/Social icon.png"
              alt="Google"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            Sign in with Google
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push('/signup')} // or '/login/signup' depending on where you put it
            className="text-purple-600 hover:text-purple-500"
            >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}