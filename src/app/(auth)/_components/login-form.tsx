'use client'
import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';
import { Eye, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  // simulasi logn
  function handleLogin() {
    setLoading(true)
    setTimeout(() => {
      router.push('/')
    }, 1500);
  }
  return (
    <div className="flex-1 py-4 max-w-sm mx-auto w-full flex flex-col justify-center px-3 md:px-0">
      <div>
        <h1 className="text-xl font-semibold">Welcome Back</h1>
        <h2 className="text-sm">Please Login To Continue</h2>
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="username" className="flex text-sm text-slate-400 mb-2">Username</label>
          <div className="bg-primary/5 border flex items-center px-3 rounded-md focus-within:border-primary/50 focus-within:bg-primary/10">
            <div>
              <User className="w-4 h-4" />
            </div>
            <input id="username" className="focus:outline-none bg-transparent border-none w-full h-10 px-2" autoComplete="new-password" type="text" placeholder="email/username" />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="flex text-sm text-slate-400 mb-2">Password</label>
          <div className="bg-primary/5 border flex items-center px-3 rounded-md focus-within:border-primary/50 focus-within:bg-primary/10">
            <div>
              <Lock className="w-4 h-4" />
            </div>
            <input id="password" className="focus:outline-none bg-transparent border-none w-full h-10 px-2" autoComplete="new-password" type={showPassword ? 'text' : 'password'} placeholder="password" />
            <button onClick={() => setShowPassword(!showPassword)} type="button">
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <Link href="/reset-password" className="text-sm block text-end mt-1 font-semibold text-primary">Lupa password</Link>
        </div>
        <div className="pt-3">
          <Button onClick={handleLogin} disabled={loading} className="w-full items-center" size={'lg'}>
            {loading && <Icon icon='mingcute:loading-fill' className="animate-spin mt-1" />}
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
