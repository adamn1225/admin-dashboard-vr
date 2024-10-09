import './globals.css';

import Link from 'next/link';


import { NavItem } from './nav-item';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PrecisionManufacturingSharpIcon from '@mui/icons-material/PrecisionManufacturingSharp';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[360px_1fr]">
          <div className="hidden border-r bg-slate-900 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">

                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/"
                >
                  <PrecisionManufacturingSharpIcon style={{ color: '#f3f4f6' }} />
                  <span className="text-slate-100">Nationwide Equipment Funding</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem href="/">
                    <span className="text-slate-100">Prequalification Form</span>
                  </NavItem>
                </nav>
              </div>

              <div className="absolute bottom-0 flex-1 overflow-auto py-8">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem href="/user-login">
                    <EngineeringRoundedIcon className="h-4 w-4 text-slate-100" />
                    <span className=" text-slate-100">Log in</span>
                  </NavItem>
                  <NavItem href="/settings">
                  
                    <span className="text-slate-100">Settings</span>
                  </NavItem>

                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">


            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}