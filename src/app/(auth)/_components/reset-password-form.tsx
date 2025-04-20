'use client'
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordForm() {
  return (
    <div className="flex-1 py-4 max-w-sm mx-auto w-full flex flex-col justify-center px-3 md:px-0">
      <div>
        <h1 className="text-xl font-semibold">Reset Password</h1>
        <h2 className="text-sm">Enter your email to continue</h2>
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="flex text-sm text-slate-400 mb-2">Email</label>
          <div className="bg-primary/5 border flex items-center px-3 rounded-md focus-within:border-primary/50 focus-within:bg-primary/10">
            <Mail className="w-4 h-4 text-slate-500" />
            <input id="email" className="focus:outline-none bg-transparent border-none w-full h-10 px-2" autoComplete="new-password" type="email" placeholder="email" />
          </div>
        </div>
        <div className="pt-3">
          <Button className="w-full" size={'lg'}>Reset</Button>
        </div>
        <div>
          <Link className="text-sm text-primary block font-semibold text-center" href={'/login'}>Back to login</Link>
        </div>
      </div>
    </div>
  )
}
