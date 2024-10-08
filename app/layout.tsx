import './globals.css';

import Link from 'next/link';
import { Logo, SettingsIcon, UsersIcon, VercelLogo } from './components/icons'; // Corrected import path
import { NavItem } from './nav-item';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PrecisionManufacturingSharpIcon from '@mui/icons-material/PrecisionManufacturingSharp';
//comment for push
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
      <body className="h-full">
        <div className="grid min-h-screen w-full lg:grid-cols-[360px_1fr]">
          <div className="hidden border-r bg-slate-900 lg:flex lg:flex-col dark:bg-gray-800/40">
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
                <NavItem href="/debt-payoff">
                  <span className="text-slate-100">Debt Pay Off Calculator</span>
                </NavItem>
              </nav>
            </div>
            <div className="py-8">
              <nav className="grid items-start px-4 text-sm font-medium">
                <NavItem href="/user-login">
                  <EngineeringRoundedIcon className="h-4 w-4 text-slate-100" />
                  <span className="text-slate-100">Log in</span>
                </NavItem>
                <NavItem href="/settings">
                  <SettingsIcon className="h-4 w-4 text-slate-100" />
                  <span className="text-slate-100">Settings</span>
                </NavItem>
              </nav>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              {/* Header content */}
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}