import { ModeToggle } from "@/components/mode-toggle";
import Logo from "../(admin)/logo";
import Image from "next/image";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='h-screen flex bg-gradient-to-tr from-primary/40 via-primary/20 to-primary/50 relative'>
      <div className="absolute top-2 right-2"><ModeToggle /></div>
      <div className='flex-1 h-full hidden lg:flex relative'>
        <div className="absolute px-2 left-0 right-0 top-0 bottom-0 bg-gradient-to-tr from-primary to-primary/5 z-10 flex flex-col items-center justify-center">
          <div className="p-12 bg-white/10 backdrop-blur-lg rounded-3xl max-w-lg w-full mx-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="absolute top-2 left-2">
                <Logo logoSize="w-16 h-16" noText />
              </div>
              <h2 className="text-xl lg:text-2xl text-center font-semibold text-white">
                Focus on Growing Your Business.
              </h2>
              <h3 className="leading-none text-center text-base lg:text-lg text-white">
                Let Us Handle the Complexity Behind the System
              </h3>
            </div>
            <div className="italic text-sm font-bold text-slate-100/80 mt-4 text-center">
              Say goodbye to complex systems and endless coding. With our app, you don't need to be a developer to run your business efficiently.
            </div>
          </div>
        </div>
        <Image unoptimized className="h-full w-full object-cover z-0" width={1200} height={1200} alt="img" src={'/images/auth-ill.png'} />
      </div>
      <div className='w-full md:w-1/2 xl:w-1/3 shrink-0 bg-white dark:bg-primary-foreground flex flex-col px-4'>
        <div className="flex-1 shrink-0 flex flex-col justify-end max-w-sm mx-auto w-full px-3 md:px-0">
          <Logo logoSize="w-12 h-12 md:hidden" noText />
        </div>
        {children}
        <div className="flex-1 shrink-0 flex flex-col justify-end pb-4 max-w-sm mx-auto w-full px-6 md:px-0">
          <div>
            <div className="text-center text-sm font-semibold text-slate-400">Powered By: <a href="https://geneurasys.com" target="_blank" rel="noopener noreferrer">Geneurasys</a></div>
            <div className="text-xs text-center text-slate-400">Version: 1.0.0</div>
          </div>
        </div>
      </div>
    </main>
  );
}
