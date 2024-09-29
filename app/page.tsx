"use client"
import PrequalForm from '../components/PrequalForm'
import { NavItem } from './nav-item';
import Link from 'next/link';
export default async function SettingsPage() {
  return (
    <main className="flex w-full flex-1 flex-col items-center gap-1 p-4 md:gap-8 md:p-6">
      <h1 className="font-semibold pb-1 text-lg md:text-2xl">Equipment Loan - Prequalification Form</h1>

     <div className='flex flex-nowrap gap-2'>
          <h3>Already have an account?</h3>
        <Link href="/">
          <span className="text-cyan-950 font-semibold underline">Sign In</span>
        </Link>  
     </div>

        <PrequalForm />
    </main>
  );
}
