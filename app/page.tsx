"use client"
import PrequalForm from '../components/PrequalForm'


export default async function SettingsPage() {
  return (
    <main className="flex w-full flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-6">


        <h1 className="font-semibold pb-1 text-lg md:text-2xl">Loan Request Details</h1>
        <PrequalForm />
    </main>
  );
}
